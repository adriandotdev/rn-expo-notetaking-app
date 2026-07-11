import { COLORS } from "@/constants/colors";
import { Pressable, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Otp() {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				padding: 24,
				paddingTop: 42,
				gap: 24,
				backgroundColor: "white",
			}}
		>
			<Text
				style={{
					fontSize: 32,
					fontFamily: "Lora_600SemiBold",
					color: COLORS.HIGHLIGHT,
				}}
			>
				OTP Verification
			</Text>
			<Text style={{ fontSize: 18, color: COLORS.PRIMARY }}>
				Enter OTP number verification we've sent to your number associated with
				your account.
			</Text>

			<OtpInput
				theme={{
					focusStickStyle: { borderWidth: 1, borderColor: COLORS.ACCENT },
					focusedPinCodeContainerStyle: {
						borderWidth: 1,
						borderColor: COLORS.HIGHLIGHT,
					},
				}}
				autoFocus={false}
				blurOnFilled
				type="numeric"
			/>

			<View style={{ flex: 1, justifyContent: "flex-end" }}>
				<Pressable
					style={{
						backgroundColor: COLORS.PRIMARY,
						padding: 16,
						borderRadius: 8,
						alignItems: "center",
					}}
				>
					<Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
						Continue
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
