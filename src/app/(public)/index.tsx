import { useRouter } from "expo-router";
import {
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

	const handleSignUpRedirection = () => {
		router.push("/(public)/signup");
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{ flex: 1 }}>
				<SafeAreaView
					style={{
						flex: 1,
						backgroundColor: "white",
						justifyContent: "center",
						padding: 20,
						gap: 16,
					}}
				>
					<Text
						style={{
							fontSize: 32,
							fontWeight: 600,
							color: "#63b566",
							textAlign: "center",
						}}
					>
						Take Your Notes
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
									borderColor: "#cce7cd",
								}}
								placeholder="Username"
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>

						<View style={{ gap: 8 }}>
							{/* <Text style={{ fontSize: 16, fontWeight: 600 }}>Password</Text> */}
							<TextInput
								style={{
									borderWidth: 1,
									padding: 16,
									borderRadius: 8,
									borderColor: "#cce7cd",
								}}
								placeholder="Password"
								autoCapitalize="words"
								keyboardType="email-address"
								secureTextEntry
							/>
						</View>

						<Pressable
							style={{
								backgroundColor: "#63b566",
								padding: 16,
								borderRadius: 8,
								alignItems: "center",
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
								Sign In
							</Text>
						</Pressable>
					</KeyboardAvoidingView>

					<View
						style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
					>
						<Text style={{ fontWeight: 600, fontSize: 16 }}>
							Don't have an account yet?
						</Text>
						<TouchableWithoutFeedback onPress={handleSignUpRedirection}>
							<Text style={{ fontWeight: 600, fontSize: 16, color: "#63b566" }}>
								Sign Up
							</Text>
						</TouchableWithoutFeedback>
					</View>
				</SafeAreaView>
			</View>
		</TouchableWithoutFeedback>
	);
}
