const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export type CreatePrayerPayload = {
	title: string;
	text: string;
};

export type CreatePrayerResponse = {
	message?: string;
};

export async function createPrayer(
	payload: CreatePrayerPayload,
	accessToken: string,
): Promise<CreatePrayerResponse> {
	const response = await fetch(`${API_BASE_URL}/api/v1/prayers`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(payload),
	});

	const data: CreatePrayerResponse = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(
			data.message ?? "Unable to create prayer. Please try again.",
		);
	}

	return data;
}
