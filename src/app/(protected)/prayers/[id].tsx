import { COLORS } from "@/constants/colors";
import {
	useLocalPrayersQuery,
	useUpdatePrayerMutation,
} from "@/mutations/prayers";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrayerDetailScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id?: string | string[] }>();
	const prayerId = typeof id === "string" ? id : undefined;
	const { data: localPrayers = [], error, isLoading } = useLocalPrayersQuery();
	const prayer = prayerId
		? localPrayers.find((localPrayer) => localPrayer.id === prayerId)
		: undefined;
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const initializedPrayerId = useRef<string | undefined>(undefined);
	const { mutate: updatePrayer, isPending } = useUpdatePrayerMutation();

	useEffect(() => {
		if (!prayer || initializedPrayerId.current === prayer.id) return;

		setTitle(prayer.title);
		setText(prayer.text);
		initializedPrayerId.current = prayer.id;
	}, [prayer]);

	function returnToPrayers() {
		if (router.canGoBack()) {
			router.back();
			return;
		}

		router.replace("/prayers");
	}

	function handleSave() {
		if (!prayerId) return;

		updatePrayer(
			{ id: prayerId, title, text },
			{
				onSuccess: (updatedPrayer) => {
					setTitle(updatedPrayer.title);
					setText(updatedPrayer.text);
				},
				onError: (saveError: Error) => {
					Alert.alert("Unable to save prayer", saveError.message);
				},
			},
		);
	}

	const isSaveDisabled = isPending || !title.trim() || !text.trim();

	return (
		<SafeAreaView
			style={styles.container}
			edges={["top", "left", "right", "bottom"]}
		>
			<View style={styles.header}>
				<Pressable
					onPress={returnToPrayers}
					style={({ pressed }) => [
						styles.backButton,
						pressed && styles.backButtonPressed,
					]}
					accessibilityRole="button"
					accessibilityLabel="Back to prayers"
				>
					<Text style={styles.backButtonText}>‹</Text>
				</Pressable>
				<Text style={styles.headerTitle}>Prayer</Text>
				<View style={styles.headerSpacer} />
			</View>

			{isLoading ? (
				<View style={styles.centeredState}>
					<ActivityIndicator color={COLORS.HIGHLIGHT} />
					<Text style={styles.statusText}>Loading prayer…</Text>
				</View>
			) : error || !prayer ? (
				<View style={styles.centeredState}>
					<View style={styles.unavailableContent}>
						<Text style={styles.unavailableTitle}>Prayer unavailable</Text>
						<Text style={styles.unavailableText}>
							This prayer may have been removed or is no longer available on
							this device.
						</Text>
						<Pressable
							onPress={returnToPrayers}
							style={({ pressed }) => [
								styles.returnButton,
								pressed && styles.returnButtonPressed,
							]}
							accessibilityRole="button"
						>
							<Text style={styles.returnButtonText}>Return to prayers</Text>
						</Pressable>
					</View>
				</View>
			) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 0}
					style={styles.flex}
				>
					<ScrollView
						contentContainerStyle={styles.content}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
						keyboardDismissMode={
							Platform.OS === "ios" ? "interactive" : "on-drag"
						}
						automaticallyAdjustKeyboardInsets
					>
						<Text style={styles.label}>Title</Text>
						<TextInput
							value={title}
							onChangeText={setTitle}
							placeholder="Enter prayer title"
							placeholderTextColor="#8C7B6B"
							style={styles.titleInput}
							returnKeyType="next"
						/>
						<View style={styles.metaChip}>
							<Text style={styles.metaChipText}>
								Saved {new Date(prayer.createdAt).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</Text>
						</View>
						<View style={styles.contentDivider} />
						<Text style={styles.label}>Prayer</Text>
						<TextInput
							value={text}
							onChangeText={setText}
							placeholder="Write your prayer"
							placeholderTextColor="#8C7B6B"
							multiline
							scrollEnabled={false}
							textAlignVertical="top"
							style={styles.bodyInput}
						/>
					</ScrollView>
					<Pressable
						onPress={handleSave}
						disabled={isSaveDisabled}
						style={({ pressed }) => [
							styles.saveButton,
							isSaveDisabled && styles.saveButtonDisabled,
							pressed && styles.saveButtonPressed,
						]}
						accessibilityRole="button"
						accessibilityLabel="Save prayer"
					>
						{isPending ? (
							<ActivityIndicator color="#FFFFFF" />
						) : (
							<Text style={styles.saveButtonText}>Save prayer</Text>
						)}
					</Pressable>
				</KeyboardAvoidingView>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 24, backgroundColor: "#FFFFFF" },
	flex: { flex: 1 },
	header: {
		height: 64,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.SECONDARY,
	},
	backButton: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F3E8DA",
		borderWidth: 1,
		borderColor: "#E3CEB5",
	},
	backButtonPressed: { opacity: 0.75 },
	backButtonText: {
		marginTop: -6,
		fontFamily: "Inter_500Medium",
		fontSize: 32,
		color: "#5A4738",
	},
	headerTitle: {
		fontFamily: "Lora_600SemiBold",
		fontSize: 22,
		color: "#5F3A26",
	},
	headerSpacer: { width: 40 },
	content: { paddingTop: 28, paddingBottom: 24 },
	label: {
		fontFamily: "Inter_500Medium",
		fontSize: 14,
		color: "#6A4D39",
	},
	titleInput: {
		marginTop: 6,
		paddingVertical: 8,
		fontFamily: "Lora_600SemiBold",
		fontSize: 28,
		lineHeight: 36,
		color: "#5F3A26",
	},
	metaChip: {
		alignSelf: "flex-start",
		marginTop: 12,
		paddingHorizontal: 11,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: "#F8EFE3",
	},
	metaChipText: {
		fontFamily: "Inter_500Medium",
		fontSize: 12,
		color: "#6A4D39",
	},
	contentDivider: { height: 1, marginVertical: 28, backgroundColor: COLORS.ACCENT },
	bodyInput: {
		marginTop: 8,
		minHeight: 180,
		paddingVertical: 8,
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 28,
		color: "#3F342C",
	},
	saveButton: {
		marginBottom: 16,
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
		backgroundColor: COLORS.PRIMARY,
	},
	saveButtonDisabled: { opacity: 0.5 },
	saveButtonPressed: { opacity: 0.8 },
	saveButtonText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
		color: "#FFFFFF",
	},
	centeredState: { flex: 1, alignItems: "center", justifyContent: "center" },
	statusText: {
		marginTop: 12,
		fontFamily: "Inter_400Regular",
		fontSize: 15,
		color: "#556274",
	},
	unavailableContent: { alignItems: "center", paddingHorizontal: 16 },
	unavailableTitle: {
		fontFamily: "Lora_600SemiBold",
		fontSize: 20,
		color: "#5F3A26",
		textAlign: "center",
	},
	unavailableText: {
		marginTop: 8,
		fontFamily: "Inter_400Regular",
		fontSize: 15,
		lineHeight: 22,
		color: "#556274",
		textAlign: "center",
	},
	returnButton: {
		marginTop: 20,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: COLORS.PRIMARY,
	},
	returnButtonPressed: { opacity: 0.8 },
	returnButtonText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#FFFFFF",
	},
});
