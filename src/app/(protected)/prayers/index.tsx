import { COLORS } from "@/constants/colors";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Prayers() {
	const todayLabel = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
	});

	// @TODO: This must be get from the API (API NOT YET IMPLEMENTED)
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
			<View style={styles.headerRow}>
				<View>
					<Text style={styles.headerTitle}>Prayers</Text>
					<Text style={styles.headerDate}>{todayLabel}</Text>
				</View>

				<Pressable style={styles.headerAction}>
					<Text style={styles.headerActionText}>+</Text>
				</Pressable>
			</View>
			{/* <Text style={styles.subtitle}>
				Deepen your faith with a prayer companion designed to help you pray
				consistently and intentionally.
			</Text> */}

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

			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<Pressable
					style={({ pressed }) => ({
						...styles.prayerCardWrap,
						transform: [{ scale: pressed ? 0.98 : 1 }],
					})}
				>
					<View style={styles.prayerCardGlow} />
					<View style={styles.prayerCard}>
						<View style={styles.prayerTopRow}>
							<Text style={styles.prayerTitle}>Morning Prayer</Text>
							{/* <View style={styles.timeChip}>
								<Text style={styles.timeChipText}>06:30 AM</Text>
							</View> */}
						</View>

						<Text style={styles.prayerBody}>
							Lord, guide my thoughts, steady my heart, and help me walk in
							kindness today.
						</Text>

						<View style={styles.prayerBottomRow}>
							<View style={styles.metaChip}>
								<Text style={styles.metaChipText}>Peace</Text>
							</View>
							<View style={styles.metaChip}>
								<Text style={styles.metaChipText}>3 min</Text>
							</View>
							{/* <View style={styles.metaChipMuted}>
								<Text style={styles.metaChipMutedText}>Reminder On</Text>
							</View> */}

							{/* <Pressable style={styles.doneButton}>
								<Text style={styles.doneButtonText}>Done</Text>
							</Pressable> */}
						</View>
					</View>
				</Pressable>
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
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		paddingBottom: 16,
		borderBottomColor: COLORS.SECONDARY,
		position: "relative",
	},
	headerTitle: {
		fontFamily: "Lora_600SemiBold",
		fontSize: 30,
		color: "#5F3A26",
	},
	headerDate: {
		marginTop: 3,
		fontFamily: "Inter_500Medium",
		fontSize: 13,
		color: "#7A685A",
	},
	headerAction: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F3E8DA",
		borderWidth: 1,
		borderColor: "#E3CEB5",
	},
	headerActionText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 22,
		lineHeight: 24,
		color: "#5A4738",
	},
	title: {
		marginTop: 14,
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
		paddingTop: 16,
		paddingBottom: 32,
		gap: 14,
	},
	prayerCardWrap: {
		position: "relative",
		borderRadius: 24,
	},
	prayerCardGlow: {
		position: "absolute",
		top: 6,
		left: 10,
		right: 10,
		bottom: -4,
		borderRadius: 24,
		backgroundColor: "#E9DCCF",
		opacity: 0.46,
	},
	prayerCard: {
		borderRadius: 24,
		padding: 18,
		backgroundColor: "#FFFCF7",
		borderWidth: 1,
		borderColor: "#E9DED1",
		shadowColor: "#8A6342",
		shadowOffset: { width: 0, height: 9 },
		shadowOpacity: 0.12,
		shadowRadius: 22,
		elevation: 4,
	},
	prayerTopRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 12,
	},
	prayerTitle: {
		flex: 1,
		fontFamily: "Lora_600SemiBold",
		fontSize: 24,
		color: "#5F3A26",
	},
	timeChip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: "#F3E8DA",
		borderWidth: 1,
		borderColor: "#E3CEB5",
	},
	timeChipText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
		letterSpacing: 0.2,
		color: "#5A4738",
	},
	prayerBody: {
		marginTop: 14,
		fontFamily: "Inter_400Regular",
		fontSize: 15,
		lineHeight: 24,
		color: "#3F342C",
	},
	prayerBottomRow: {
		marginTop: 16,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		flexWrap: "wrap",
	},
	metaChip: {
		paddingHorizontal: 11,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: "#F8EFE3",
	},
	metaChipText: {
		fontFamily: "Inter_500Medium",
		fontSize: 12,
		color: "#6A4D39",
	},
	metaChipMuted: {
		paddingHorizontal: 11,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: "#EFEDE6",
	},
	metaChipMutedText: {
		fontFamily: "Inter_500Medium",
		fontSize: 12,
		color: "#556274",
	},
	doneButton: {
		marginLeft: "auto",
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 999,
		backgroundColor: COLORS.PRIMARY,
	},
	doneButtonText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
		color: "#FFFFFF",
	},
	badgeCard: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 16,
		borderWidth: 1,
		borderColor: "#E8EDF4",
		marginTop: 32,
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
