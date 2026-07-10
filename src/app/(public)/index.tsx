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
							<Text style={{ fontSize: 16, fontWeight: 600, color: "#6663b5" }}>
								Username
							</Text>
							<TextInput
								style={{
									borderWidth: 1,
									padding: 16,
									borderRadius: 8,
									borderColor: "#cce7cd",
								}}
								placeholder="Username"
								autoCapitalize="words"
								keyboardType="email-address"
							/>
						</View>

						<View style={{ gap: 8 }}>
							<Text style={{ fontSize: 16, fontWeight: 600, color: "#6663b5" }}>
								Password
							</Text>
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
				</SafeAreaView>
			</View>
		</TouchableWithoutFeedback>
	);
}
