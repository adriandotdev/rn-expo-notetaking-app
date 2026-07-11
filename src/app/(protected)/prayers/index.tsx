import { COLORS } from "@/constants/colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Prayers() {
	const badges = [
		"Morning Prayer",
		"Gratitude",
		"Peace",
		"Healing",
		"Family",
		"Guidance",
	];

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Welcome back!</Text>
			<Text style={styles.subtitle}>
				Deepen your faith with a prayer companion designed to help you pray
				consistently and intentionally.
			</Text>

			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.badgeCard}>
					<Text style={styles.badgeHeading}>Categories</Text>
					<Text style={styles.badgeHint}>Tap a focus area for today</Text>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.badgeRow}
					>
						{badges.map((badge) => (
							<View key={badge} style={styles.badge}>
								<Text style={styles.badgeText}>{badge}</Text>
							</View>
						))}
					</ScrollView>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
		backgroundColor: "#FFFFFF",
	},
	title: {
		fontSize: 28,
		fontFamily: "Lora_600SemiBold",
		color: COLORS.PRIMARY,
	},
	subtitle: {
		fontFamily: "Inter_400Regular",
		fontSize: 18,
		marginTop: 16,
		lineHeight: 26,
		color: COLORS.HIGHLIGHT,
	},
	content: {
		paddingTop: 24,
		paddingBottom: 32,
	},
	badgeCard: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 16,
		borderWidth: 1,
		borderColor: "#E8EDF4",
	},
	badgeHeading: {
		fontFamily: "Lora_600SemiBold",
		fontSize: 20,
		color: COLORS.PRIMARY,
	},
	badgeHint: {
		marginTop: 6,
		fontFamily: "Inter_400Regular",
		fontSize: 14,
		color: "#556274",
	},
	badgeRow: {
		marginTop: 16,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingRight: 8,
	},
	badge: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 999,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#D8E3F2",
	},
	badgeText: {
		fontFamily: "Inter_500Medium",
		fontSize: 13,
		color: "#1F2D3D",
	},
});
