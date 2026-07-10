import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
	const colorScheme = useColorScheme();
	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<AnimatedSplashOverlay />
			<Stack>
				<Stack.Protected guard={true}>
					<Stack.Screen name="(public)" options={{ headerShown: false }} />
					<Stack.Screen
						name="(public)/signup"
						options={{
							headerTitle: "Sign Up",
							headerBackButtonDisplayMode: "minimal",
							headerBackTitle: "Sign In",
						}}
					/>
					<Stack.Screen
						name="(public)/otp"
						options={{
							headerShown: false,
							animation: "ios_from_right",
						}}
					/>
				</Stack.Protected>
			</Stack>
		</ThemeProvider>
	);
}
