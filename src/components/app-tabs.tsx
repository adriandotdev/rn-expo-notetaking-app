import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

export default function AppTabs() {
	const scheme = useColorScheme();
	const colors = Colors[scheme === "unspecified" ? "light" : scheme];

	return (
		<NativeTabs
			backgroundColor={colors.background}
			indicatorColor={colors.backgroundElement}
			labelStyle={{ selected: { color: colors.text } }}
		>
			<NativeTabs.Trigger name="prayers">
				<NativeTabs.Trigger.Label>Prayers</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon
					sf={{ default: "hands.sparkles", selected: "hands.sparkles.fill" }}
					md="self_improvement"
					src={require("@/assets/images/tabIcons/home.png")}
					renderingMode="template"
				/>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
