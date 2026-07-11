import {
	login,
	signUp,
	type LoginPayload,
	type LoginResponse,
	type SignUpPayload,
	type SignUpResponse,
} from "@/api/auth";
import {
	useMutation,
	type UseMutationOptions,
	type UseMutationResult,
} from "@tanstack/react-query";

export function useLoginMutation(
	options?: UseMutationOptions<LoginResponse, Error, LoginPayload>,
): UseMutationResult<LoginResponse, Error, LoginPayload> {
	return useMutation({
		mutationFn: login,
		...options,
	});
}

export function useSignUpMutation(
	options?: UseMutationOptions<SignUpResponse, Error, SignUpPayload>,
): UseMutationResult<SignUpResponse, Error, SignUpPayload> {
	return useMutation({
		mutationFn: signUp,
		...options,
	});
}
