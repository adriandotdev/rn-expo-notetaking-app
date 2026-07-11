import { COLORS } from "@/constants/colors";
import { useLoginMutation } from "@/mutations/auth";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "expo-router";
import { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const auth = useAuth();

	const handleSignUpRedirection = () => {
		router.push("/(public)/signup");
	};

	const loginMutation = useLoginMutation({
		onSuccess: (data) => {
			auth.setAuth(true);
			router.replace("/(protected)/prayers");
			Alert.alert("Signed in", data.message ?? "Login successful.");
		},
		onError: (error: Error) => {
			Alert.alert("Sign in failed", error.message);
		},
	});

	const handleSignIn = () => {
		const trimmedUsername = username.trim();
		if (!trimmedUsername || !password) {
			Alert.alert("Missing details", "Enter both username and password.");
			return;
		}

		loginMutation.mutate({ username: trimmedUsername, password });
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{ flex: 1 }}>
				<SafeAreaView
					style={{
						flex: 1,
						backgroundColor: "white",
						justifyContent: "center",
						padding: 24,
						gap: 16,
					}}
				>
					<Text
						style={{
							fontSize: 32,
							color: COLORS.HIGHLIGHT,
							textAlign: "center",
							fontFamily: "Lora_600SemiBold",
							marginBottom: 16,
						}}
					>
						Prayer Haven
					</Text>
					<KeyboardAvoidingView
						style={{ gap: 24 }}
						behavior={Platform.OS === "ios" ? "padding" : "height"}
					>
						<View style={{ gap: 8 }}>
							{/* <Text style={{ fontSize: 16, fontWeight: 600 }}>Username</Text> */}
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
						</View>

						<View style={{ gap: 8 }}>
							{/* <Text style={{ fontSize: 16, fontWeight: 600 }}>Password</Text> */}
							<TextInput
								style={{
									borderWidth: 1,
									padding: 16,
									borderRadius: 8,
									borderColor: COLORS.ACCENT,
								}}
								placeholder="Password"
								autoCapitalize="none"
								secureTextEntry
								value={password}
								onChangeText={setPassword}
							/>
						</View>

						<Pressable
							onPress={handleSignIn}
							disabled={loginMutation.isPending}
							style={{
								backgroundColor: COLORS.PRIMARY,
								padding: 16,
								borderRadius: 8,
								alignItems: "center",
								opacity: loginMutation.isPending ? 0.7 : 1,
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
								{loginMutation.isPending ? "Signing In..." : "Sign In"}
							</Text>
						</Pressable>

						{loginMutation.isError ? (
							<Text style={{ color: "#b00020", textAlign: "center" }}>
								{loginMutation.error.message}
							</Text>
						) : null}
					</KeyboardAvoidingView>

					<View
						style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
					>
						<Text
							style={{ fontWeight: 600, fontSize: 16, color: COLORS.SECONDARY }}
						>
							Don't have an account yet?
						</Text>
						<TouchableWithoutFeedback onPress={handleSignUpRedirection}>
							<Text
								style={{
									fontWeight: 600,
									fontSize: 16,
									color: COLORS.HIGHLIGHT,
								}}
							>
								Sign Up
							</Text>
						</TouchableWithoutFeedback>
					</View>
				</SafeAreaView>
			</View>
		</TouchableWithoutFeedback>
	);
}
