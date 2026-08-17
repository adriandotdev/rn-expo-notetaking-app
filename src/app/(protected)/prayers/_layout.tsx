import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function PrayersLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="[id]" options={{ headerShown: false }} />
			<Stack.Screen
				name="create"
				options={{
					headerShown: false,
					presentation: Platform.OS === "android" ? "pageSheet" : "formSheet",
					...(Platform.OS === "ios" ? { sheetAllowedDetents: [0.8, 1] } : {}),
				}}
			/>
		</Stack>
	);
}
