import {
	createPrayer,
	type CreatePrayerPayload,
	type CreatePrayerResponse,
} from "@/api/prayers";
import { isLocalMode } from "@/config/local-mode";
import { useAuth } from "@/providers/auth-provider";
import { createLocalPrayer, getLocalPrayers, type LocalPrayer } from "@/repositories/local-prayers";
import {
	useMutation,
	useQuery,
	useQueryClient,
	type UseMutationOptions,
	type UseMutationResult,
} from "@tanstack/react-query";

export function useCreatePrayerMutation(
	options?: UseMutationOptions<
		CreatePrayerResponse,
		Error,
		CreatePrayerPayload
	>,
): UseMutationResult<CreatePrayerResponse, Error, CreatePrayerPayload> {
	const { accessToken } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		...options,
		mutationFn: async (payload) => {
			if (isLocalMode) {
				await createLocalPrayer(payload);
				return { message: "Prayer saved on this device." };
			}

			return createPrayer(payload, accessToken);
		},
		onSuccess: async (data, variables, onMutateResult, context) => {
			if (isLocalMode) {
				await queryClient.invalidateQueries({ queryKey: ["local-prayers"] });
			}
			await options?.onSuccess?.(
				data,
				variables,
				onMutateResult,
				context,
			);
		},
	});
}

export function useLocalPrayersQuery() {
	return useQuery<LocalPrayer[], Error>({
		queryKey: ["local-prayers"],
		queryFn: getLocalPrayers,
		enabled: isLocalMode,
	});
}
