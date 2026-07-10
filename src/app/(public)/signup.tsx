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

import { COLORS } from "@/constants/colors";
import { useRouter } from "expo-router";
export default function SignUp() {
	// const [showDatePicker, setShowDatePicker] = useState(false);
	// const [selectedDate, setSelectedDate] = useState(new Date());

	const router = useRouter();

	const handleLoginRedirection = () => {
		router.replace("/(public)");
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
					/>

					<Pressable
						onPress={() => {
							router.push("/otp");
						}}
						style={({ pressed }) => ({
							backgroundColor: COLORS.PRIMARY,
							padding: 16,
							borderRadius: 8,
							alignItems: "center",
							marginTop: 18,
							opacity: pressed ? 0.85 : 1,
							transform: [{ scale: pressed ? 0.98 : 1 }],
						})}
						android_ripple={{ color: `${COLORS.SECONDARY}15` }}
					>
						<Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
							Create account
						</Text>
					</Pressable>

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
					{/* <View
						style={{
							gap: 8,
						}}
					>
						<Text style={{ fontSize: 18, fontWeight: "600" }}>
							Date of Birth
						</Text>
						<DateTimePicker
							presentation="dialog"
							accentColor="#63b566"
							value={selectedDate}
							onValueChange={(event, selectedDate) => {
								setSelectedDate(selectedDate);
							}}
							style={{ width: 100, marginLeft: 10 }}
							mode="date"
						/>
					</View> */}
					{/* {Platform.OS === "ios" ? (
						<Host style={{ borderWidth: 1, borderColor: "red" }} matchContents>
							<DatePicker
								title="Date of Birth:"
								modifiers={[
									background("white"),
									border({ color: "#cce7cd" }),
									padding({ horizontal: 16, vertical: 16 }),
									frame({ maxWidth: 500 }),
									datePickerStyle("compact"),
								]}
							/>
						</Host>
					) : (
						<AndroidHost
							style={{
								height: 100,
								// borderWidth: 1,
								// borderColor: "red",
							}}
						>
							<Column verticalArrangement={{ spacedBy: 24 }}>
								<RNHostView matchContents>
									<Pressable
										onPress={() => setShowDatePicker(true)}
										style={{
											backgroundColor: "white",
											padding: 16,
											borderWidth: 1,
											borderColor: "#cce7cd",
											borderRadius: 8,
										}}
									>
										<Text style={{ fontSize: 16, fontWeight: 600 }}>
											Date of Birth: {selectedDate.toLocaleDateString()}
										</Text>
									</Pressable>
								</RNHostView>
								{showDatePicker && (
									<DatePickerDialog
										onDateSelected={(date) => {
											setSelectedDate(date);
											setShowDatePicker(false);
										}}
										onDismissRequest={() => {
											setShowDatePicker(false);
										}}
									/>
								)}
							</Column>
						</AndroidHost>
					)} */}
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
}
