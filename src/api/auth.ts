const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export type LoginPayload = {
	username: string;
	password: string;
};

export type LoginResponse = {
	token?: string;
	message?: string;
};

export type SignUpPayload = {
	username: string;
	password: string;
	name: string;
};

export type SignUpResponse = {
	message?: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const data: LoginResponse = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(data.message ?? "Unable to sign in. Please try again.");
	}

	return data;
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
	const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	const data: SignUpResponse = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(
			data.message ?? "Unable to create account. Please try again.",
		);
	}

	return data;
}
