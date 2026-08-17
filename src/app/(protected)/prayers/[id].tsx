import { COLORS } from "@/constants/colors";
import { useLocalPrayersQuery } from "@/mutations/prayers";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrayerDetailScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id?: string | string[] }>();
	const prayerId = typeof id === "string" ? id : undefined;
	const { data: localPrayers = [], error, isLoading } = useLocalPrayersQuery();
	const prayer = prayerId
		? localPrayers.find((localPrayer) => localPrayer.id === prayerId)
		: undefined;

	function returnToPrayers() {
		if (router.canGoBack()) {
			router.back();
			return;
		}

		router.replace("/prayers");
	}

	return (
		<SafeAreaView
			style={styles.container}
			edges={["top", "left", "right", "bottom"]}
		>
			<View style={styles.header}>
				<Pressable
					onPress={returnToPrayers}
					style={({ pressed }) => [
						styles.backButton,
						pressed && styles.backButtonPressed,
					]}
					accessibilityRole="button"
					accessibilityLabel="Back to prayers"
				>
					<Text style={styles.backButtonText}>‹</Text>
				</Pressable>
				<Text style={styles.headerTitle}>Prayer</Text>
				<View style={styles.headerSpacer} />
			</View>

			{isLoading ? (
				<View style={styles.centeredState}>
					<ActivityIndicator color={COLORS.HIGHLIGHT} />
					<Text style={styles.statusText}>Loading prayer…</Text>
				</View>
			) : error || !prayer ? (
				<View style={styles.centeredState}>
					<View style={styles.unavailableContent}>
						<Text style={styles.unavailableTitle}>Prayer unavailable</Text>
						<Text style={styles.unavailableText}>
							This prayer may have been removed or is no longer available on
							this device.
						</Text>
						<Pressable
							onPress={returnToPrayers}
							style={({ pressed }) => [
								styles.returnButton,
								pressed && styles.returnButtonPressed,
							]}
							accessibilityRole="button"
						>
							<Text style={styles.returnButtonText}>Return to prayers</Text>
						</Pressable>
					</View>
				</View>
			) : (
				<ScrollView
					contentContainerStyle={styles.content}
					showsVerticalScrollIndicator={false}
				>
					<Text style={styles.prayerTitle}>{prayer.title}</Text>
					<View style={styles.metaChip}>
						<Text style={styles.metaChipText}>
							Saved{" "}
							{new Date(prayer.createdAt).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</Text>
					</View>
					<View style={styles.contentDivider} />
					<Text style={styles.prayerBody}>{prayer.text}</Text>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 24, backgroundColor: "#FFFFFF" },
	header: {
		height: 64,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.SECONDARY,
	},
	backButton: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F3E8DA",
		borderWidth: 1,
		borderColor: "#E3CEB5",
	},
	backButtonPressed: { opacity: 0.75 },
	backButtonText: {
		marginTop: -4,
		fontFamily: "Inter_500Medium",
		fontSize: 32,
		color: "#5A4738",
	},
	headerTitle: {
		fontFamily: "Lora_600SemiBold",
		fontSize: 22,
		color: "#5F3A26",
	},
	headerSpacer: { width: 40 },
	content: { paddingTop: 32, paddingBottom: 40 },
	prayerTitle: {
		fontFamily: "Lora_600SemiBold",
		fontSize: 28,
		lineHeight: 36,
		color: "#5F3A26",
	},
	metaChip: {
		alignSelf: "flex-start",
		marginTop: 16,
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
	contentDivider: { height: 1, marginTop: 28, backgroundColor: COLORS.ACCENT },
	prayerBody: {
		marginTop: 28,
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 28,
		color: "#3F342C",
	},
	centeredState: { flex: 1, alignItems: "center", justifyContent: "center" },
	statusText: {
		marginTop: 12,
		fontFamily: "Inter_400Regular",
		fontSize: 15,
		color: "#556274",
	},
	unavailableContent: { alignItems: "center", paddingHorizontal: 16 },
	unavailableTitle: {
		fontFamily: "Lora_600SemiBold",
		fontSize: 20,
		color: "#5F3A26",
		textAlign: "center",
	},
	unavailableText: {
		marginTop: 8,
		fontFamily: "Inter_400Regular",
		fontSize: 15,
		lineHeight: 22,
		color: "#556274",
		textAlign: "center",
	},
	returnButton: {
		marginTop: 20,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: COLORS.PRIMARY,
	},
	returnButtonPressed: { opacity: 0.8 },
	returnButtonText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#FFFFFF",
	},
});
