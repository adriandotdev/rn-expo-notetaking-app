import { COLORS } from "@/constants/colors";
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
						padding: 24,
						gap: 16,
					}}
				>
					<Text
						style={{
							fontSize: 32,
							fontWeight: 800,
							color: COLORS.HIGHLIGHT,
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
									borderColor: COLORS.ACCENT,
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
									borderColor: COLORS.ACCENT,
								}}
								placeholder="Password"
								autoCapitalize="words"
								keyboardType="email-address"
								secureTextEntry
							/>
						</View>

						<Pressable
							style={{
								backgroundColor: "#003049",
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
