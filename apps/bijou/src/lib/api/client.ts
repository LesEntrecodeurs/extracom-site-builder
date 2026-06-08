import "server-only";
import { request } from "undici";

const REVALIDATE_SECONDS = 300;
const MAX_RETRIES = 2;
const MAX_RETRY_WAIT_MS = 2000;
const DEFAULT_BACKOFF_MS = 400;

function config() {
	const baseUrl = process.env.EXTRACOM_API_BASE_URL;
	const token = process.env.EXTRACOM_API_TOKEN;
	if (!baseUrl || !token) {
		throw new Error(
			"EXTRACOM_API_BASE_URL et EXTRACOM_API_TOKEN doivent être définis (voir .env.example).",
		);
	}
	return { baseUrl: baseUrl.replace(/\/$/, ""), token };
}

export class ApiError extends Error {
	constructor(
		public readonly status: number,
		public readonly code: string,
		message: string,
	) {
		super(message);
		this.name = "ApiError";
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryAfterMs(header: string | string[] | undefined | null): number {
	const value = Array.isArray(header) ? header[0] : header;
	if (!value) return DEFAULT_BACKOFF_MS;
	const seconds = Number(value);
	if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
	const date = Date.parse(value);
	if (!Number.isNaN(date)) return Math.max(0, date - Date.now());
	return DEFAULT_BACKOFF_MS;
}

export async function fetchJson<T>(
	path: string,
	revalidate: number = REVALIDATE_SECONDS,
): Promise<T> {
	const { baseUrl, token } = config();
	for (let attempt = 0; ; attempt += 1) {
		const response = await fetch(`${baseUrl}${path}`, {
			headers: { Authorization: `Bearer ${token}` },
			next: { revalidate },
		});
		if (response.status === 429 && attempt < MAX_RETRIES) {
			const wait = retryAfterMs(response.headers.get("retry-after"));
			if (wait <= MAX_RETRY_WAIT_MS) {
				await sleep(wait);
				continue;
			}
		}
		if (!response.ok) {
			const body = await safeJson(response);
			throw new ApiError(
				response.status,
				body?.error ?? "HTTP_ERROR",
				body?.message ?? `Requête échouée (${response.status}).`,
			);
		}
		return (await response.json()) as T;
	}
}

export async function requestWithBody<T>(path: string, body: unknown): Promise<T> {
	const { baseUrl, token } = config();
	for (let attempt = 0; ; attempt += 1) {
		const response = await request(`${baseUrl}${path}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const text = await response.body.text();
		if (response.statusCode === 429 && attempt < MAX_RETRIES) {
			const wait = retryAfterMs(response.headers["retry-after"]);
			if (wait <= MAX_RETRY_WAIT_MS) {
				await sleep(wait);
				continue;
			}
		}
		const parsed = text ? JSON.parse(text) : null;
		if (response.statusCode >= 400) {
			throw new ApiError(
				response.statusCode,
				parsed?.error ?? "HTTP_ERROR",
				parsed?.message ?? `Requête échouée (${response.statusCode}).`,
			);
		}
		return parsed as T;
	}
}

async function safeJson(response: Response): Promise<{ error?: string; message?: string } | null> {
	try {
		return await response.json();
	} catch {
		return null;
	}
}
