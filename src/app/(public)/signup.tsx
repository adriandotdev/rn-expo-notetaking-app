import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { useSignUpMutation } from "@/mutations/auth";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignUp() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleLoginRedirection = () => {
		router.replace("/(public)");
	};

	const signUpMutation = useSignUpMutation({
		onSuccess: (data) => {
			Alert.alert("Account created", data.message ?? "Signup successful.", [
				{ text: "OK", onPress: () => router.push("/(public)/otp") },
			]);
		},
		onError: (error: Error) => {
			Alert.alert("Signup failed", error.message);
		},
	});

	const handleSignUp = () => {
		const trimmedName = name.trim();
		const trimmedUsername = username.trim();

		if (!trimmedName || !trimmedUsername || !password || !confirmPassword) {
			Alert.alert("Missing details", "Enter name, username, and password.");
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert("Password mismatch", "Passwords do not match.");
			return;
		}

		signUpMutation.mutate({
			name: trimmedName,
			username: trimmedUsername,
			password,
		});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View
				style={{
					padding: 24,
					backgroundColor: "white",
					flex: 1,
				}}
			>
				<Text
					style={{
						fontSize: 32,
						fontWeight: 600,
						color: COLORS.HIGHLIGHT,
					}}
				>
					Create your account
				</Text>

				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ gap: 16, marginTop: 24 }}
				>
					<TextInput
						style={{
							borderWidth: 1,
							padding: 16,
							borderRadius: 8,
							borderColor: COLORS.ACCENT,
						}}
						placeholder="Name"
						autoCorrect={false}
						value={name}
						onChangeText={setName}
					/>

					<TextInput
						style={{
							borderWidth: 1,
							padding: 16,
							borderRadius: 8,
							borderColor: COLORS.ACCENT,
						}}
						placeholder="Username"
						autoCapitalize="none"
						autoCorrect={false}
						value={username}
						onChangeText={setUsername}
					/>

					<TextInput
						style={{
							borderWidth: 1,
							padding: 16,
							borderRadius: 8,
							borderColor: COLORS.ACCENT,
						}}
						placeholder="Password"
						autoCapitalize="none"
						autoCorrect={false}
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>

					<TextInput
						style={{
							borderWidth: 1,
							padding: 16,
							borderRadius: 8,
							borderColor: COLORS.ACCENT,
						}}
						placeholder="Confirm Password"
						autoCapitalize="none"
						autoCorrect={false}
						secureTextEntry
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>

					<Pressable
						onPress={handleSignUp}
						disabled={signUpMutation.isPending}
						style={({ pressed }) => ({
							backgroundColor: COLORS.PRIMARY,
							padding: 16,
							borderRadius: 8,
							alignItems: "center",
							marginTop: 18,
							opacity: signUpMutation.isPending ? 0.7 : pressed ? 0.85 : 1,
							transform: [{ scale: pressed ? 0.98 : 1 }],
						})}
						android_ripple={{ color: `${COLORS.SECONDARY}15` }}
					>
						<Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
							{signUpMutation.isPending
								? "Creating account..."
								: "Create account"}
						</Text>
					</Pressable>

					{signUpMutation.isError ? (
						<Text style={{ color: "#b00020", textAlign: "center" }}>
							{signUpMutation.error.message}
						</Text>
					) : null}

					<View
						style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
					>
						<Text style={{ fontWeight: 600, fontSize: 16 }}>
							Already have an account?
						</Text>
						<TouchableWithoutFeedback onPress={handleLoginRedirection}>
							<Text
								style={{
									fontWeight: 600,
									fontSize: 16,
									color: COLORS.HIGHLIGHT,
								}}
							>
								Sign In
							</Text>
						</TouchableWithoutFeedback>
					</View>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
}
