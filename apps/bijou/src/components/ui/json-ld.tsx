export function JsonLd({ data }: { data: object | object[] }) {
	const payload = Array.isArray(data) ? data : [data];
	return (
		<>
			{payload.map((item) => {
				const json = JSON.stringify(item);
				return (
					<script
						key={json}
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: json }}
					/>
				);
			})}
		</>
	);
}
