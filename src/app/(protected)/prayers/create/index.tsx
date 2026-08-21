import { COLORS } from "@/constants/colors";
import { useCreatePrayerMutation } from "@/mutations/prayers";
import { useRouter } from "expo-router";
import { useState } from "react";
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
export default function CreatePrayerScreen() {
	const [title, setTitle] = useState("");
	const [prayer, setPrayer] = useState("");

	const { mutate: createPrayer, isPending } = useCreatePrayerMutation();

	const router = useRouter();

	function handleSubmit() {
		createPrayer(
			{ text: prayer, title },
			{
				onSuccess: () => {
					setTitle("");
					setPrayer("");
					router.replace("/prayers");
				},
				onError: (error: Error) => {
					Alert.alert("Unable to save prayer", error.message);
				},
			},
		);
	}

	return (
		<SafeAreaView
			style={styles.container}
			edges={["top", "left", "right", "bottom"]}
		>
			<Text style={styles.heading}>Create Prayer</Text>

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
					<TextInput
						value={title}
						onChangeText={setTitle}
						placeholder="Prayer title"
						placeholderTextColor="#8C7B6B"
						style={styles.titleInput}
						returnKeyType="next"
					/>
					<View style={styles.contentDivider} />
					<TextInput
						value={prayer}
						onChangeText={setPrayer}
						placeholder="Write your prayer"
						placeholderTextColor="#8C7B6B"
						multiline
						scrollEnabled={false}
						textAlignVertical="top"
						style={styles.bodyInput}
					/>
				</ScrollView>
				<Pressable
					onPress={handleSubmit}
					disabled={
						isPending || title.trim().length === 0 || prayer.trim().length === 0
					}
					style={({ pressed }) => [
						styles.submitButton,
						(isPending ||
							title.trim().length === 0 ||
							prayer.trim().length === 0) &&
							styles.submitButtonDisabled,
						pressed && styles.submitButtonPressed,
					]}
				>
					{isPending ? (
						<ActivityIndicator color="#FFFFFF" />
					) : (
						<Text style={styles.submitButtonText}>Save Prayer</Text>
					)}
				</Pressable>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
		backgroundColor: "#FFFFFF",
	},
	flex: {
		flex: 1,
	},
	content: { paddingBottom: 24 },
	heading: {
		fontSize: 24,
		fontFamily: "Lora_600SemiBold",
		color: "#5F3A26",
		marginBottom: 16,
	},
	titleInput: {
		paddingVertical: 8,
		fontFamily: "Lora_600SemiBold",
		fontSize: 28,
		lineHeight: 36,
		color: "#5F3A26",
	},
	contentDivider: {
		height: 1,
		marginVertical: 28,
		backgroundColor: COLORS.ACCENT,
	},
	bodyInput: {
		minHeight: 180,
		paddingVertical: 8,
		fontSize: 16,
		fontFamily: "Inter_400Regular",
		color: "#3F342C",
		lineHeight: 28,
	},
	submitButton: {
		backgroundColor: COLORS.PRIMARY,
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
	},
	submitButtonDisabled: {
		opacity: 0.5,
	},
	submitButtonPressed: {
		opacity: 0.8,
	},
	submitButtonText: {
		fontSize: 16,
		fontFamily: "Inter_600SemiBold",
		color: "#FFFFFF",
	},
});
