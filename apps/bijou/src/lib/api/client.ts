import "server-only";
import { request } from "undici";

const REVALIDATE_SECONDS = 300;

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

function authHeaders(token: string): Record<string, string> {
	const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
	const origin = process.env.EXTRACOM_API_ORIGIN;
	if (origin) headers.Origin = origin;
	return headers;
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

export async function fetchJson<T>(
	path: string,
	revalidate: number = REVALIDATE_SECONDS,
): Promise<T> {
	const { baseUrl, token } = config();
	const response = await fetch(`${baseUrl}${path}`, {
		headers: authHeaders(token),
		next: { revalidate },
	});
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

export async function requestWithBody<T>(path: string, body: unknown): Promise<T> {
	const { baseUrl, token } = config();
	const response = await request(`${baseUrl}${path}`, {
		method: "GET",
		headers: {
			...authHeaders(token),
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	const text = await response.body.text();
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

async function safeJson(response: Response): Promise<{ error?: string; message?: string } | null> {
	try {
		return await response.json();
	} catch {
		return null;
	}
}
