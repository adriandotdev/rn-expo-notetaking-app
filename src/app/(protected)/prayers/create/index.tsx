import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
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
					contentContainerStyle={styles.formContent}
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode={
						Platform.OS === "ios" ? "interactive" : "on-drag"
					}
					automaticallyAdjustKeyboardInsets
				>
					<View style={styles.fieldGroup}>
						<Text style={styles.label}>Title</Text>
						<TextInput
							value={title}
							onChangeText={setTitle}
							placeholder="Enter prayer title"
							placeholderTextColor="#8C7B6B"
							style={styles.title}
							returnKeyType="next"
						/>
					</View>

					<View style={styles.fieldGroup}>
						<Text style={styles.label}>Prayer</Text>
						<TextInput
							value={prayer}
							onChangeText={setPrayer}
							placeholder="Write your prayer"
							placeholderTextColor="#8C7B6B"
							multiline
							scrollEnabled={false}
							textAlignVertical="top"
							style={[styles.input, styles.textarea]}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: "#FFFFFF",
	},
	flex: {
		flex: 1,
	},
	formContent: {
		gap: 24,
		paddingBottom: 24,
	},
	heading: {
		fontSize: 24,
		fontFamily: "Lora_600SemiBold",
		color: "#5F3A26",
		marginBottom: 16,
	},
	fieldGroup: {
		gap: 8,
	},
	label: {
		fontSize: 14,
		fontFamily: "Inter_500Medium",
		color: "#6A4D39",
	},
	title: {
		borderWidth: 0,
		borderRadius: 0,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 16,
		fontFamily: "Inter_700Bold",
		color: "#3F342C",
		backgroundColor: "transparent",
	},
	input: {
		borderWidth: 0,
		borderRadius: 0,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 16,
		fontFamily: "Inter_400Regular",
		color: "#3F342C",
		backgroundColor: "transparent",
		lineHeight: 32,
	},
	textarea: {
		minHeight: 140,
		// maxHeight: Platform.OS === "android" ? 800 : 500,
		paddingTop: 12,
		paddingBottom: 40,
	},
});
