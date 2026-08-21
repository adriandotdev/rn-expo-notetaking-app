import { isLocalMode } from "@/config/local-mode";
import { COLORS } from "@/constants/colors";
import {
	useDeletePrayerMutation,
	useLocalPrayersQuery,
} from "@/mutations/prayers";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Prayers() {
	const router = useRouter();
	const {
		data: localPrayers = [],
		error: localPrayersError,
		isLoading,
	} = useLocalPrayersQuery();
	const { mutate: deletePrayer, isPending: isDeleting } =
		useDeletePrayerMutation();
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

	const handleOpenCreateTask = () => {
		router.push("/prayers/create");
	};

	const handleOpenPrayer = (id: string) => {
		router.push({ pathname: "/prayers/[id]", params: { id } });
	};

	const handleDeletePrayer = (id: string, title: string) => {
		if (isDeleting) return;

		Alert.alert(
			"Delete prayer?",
			`“${title}” will be permanently removed from this device.`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () => {
						deletePrayer(id, {
							onError: (deleteError: Error) => {
								Alert.alert("Unable to delete prayer", deleteError.message);
							},
						});
					},
				},
			],
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerRow}>
				<View>
					<Text style={styles.headerTitle}>Prayers</Text>
					<Text style={styles.headerDate}>{todayLabel}</Text>
				</View>

				<Pressable onPress={handleOpenCreateTask} style={styles.headerAction}>
					<Text style={styles.headerActionText}>+</Text>
				</Pressable>
			</View>
			{/* <Text style={styles.subtitle}>
				Deepen your faith with a prayer companion designed to help you pray
				consistently and intentionally.
			</Text> */}

			{/* <View style={styles.badgeCard}>
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
			</View> */}

			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				{isLocalMode ? (
					isLoading ? (
						<Text style={styles.statusText}>Loading prayers…</Text>
					) : localPrayersError ? (
						<Text style={styles.errorText}>
							Your saved prayers could not be loaded. Please try again.
						</Text>
					) : localPrayers.length === 0 ? (
						<View style={styles.emptyState}>
							<Text style={styles.emptyTitle}>No saved prayers yet</Text>
							<Text style={styles.emptyText}>
								Use the + button to write your first prayer. It will stay on
								this device.
							</Text>
						</View>
					) : (
						localPrayers.map((prayer) => (
							<PrayerCard
								key={prayer.id}
								title={prayer.title}
								text={prayer.text}
								meta={new Date(prayer.createdAt).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
								onPress={() => handleOpenPrayer(prayer.id)}
								onDelete={() => handleDeletePrayer(prayer.id, prayer.title)}
								isDeleting={isDeleting}
							/>
						))
					)
				) : (
					<PrayerCard
						title="Morning Prayer"
						text="Lord, guide my thoughts, steady my heart, and help me walk in kindness today."
						meta="Peace"
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

type PrayerCardProps = {
	title: string;
	text: string;
	meta: string;
	onPress?: () => void;
	onDelete?: () => void;
	isDeleting?: boolean;
};

function PrayerCard({
	title,
	text,
	meta,
	onPress,
	onDelete,
	isDeleting = false,
}: PrayerCardProps) {
	return (
		<View style={styles.prayerCardWrap}>
			<View style={styles.prayerCardGlow} />
			<View style={styles.prayerCard}>
				<Pressable
					onPress={onPress}
					disabled={!onPress || isDeleting}
					accessibilityRole={onPress ? "button" : undefined}
					accessibilityLabel={onPress ? `Open prayer: ${title}` : undefined}
					style={({ pressed }) => [
						styles.prayerContentButton,
						pressed && onPress && styles.prayerContentButtonPressed,
					]}
				>
					<View style={styles.prayerTopRow}>
						<Text style={styles.prayerTitle}>{title}</Text>
					</View>
					<Text
						style={styles.prayerBody}
						numberOfLines={5}
						ellipsizeMode="tail"
					>
						{text}
					</Text>
				</Pressable>
				<View style={styles.prayerBottomRow}>
					<View style={styles.metaChip}>
						<Text style={styles.metaChipText}>{meta}</Text>
					</View>
					{onDelete ? (
						<Pressable
							onPress={onDelete}
							disabled={isDeleting}
							accessibilityRole="button"
							accessibilityLabel={`Delete prayer: ${title}`}
							style={({ pressed }) => [
								styles.deleteCardButton,
								isDeleting && styles.deleteCardButtonDisabled,
								pressed && styles.deleteCardButtonPressed,
							]}
						>
							{isDeleting ? (
								<ActivityIndicator color={COLORS.ERROR} size="small" />
							) : (
								<Text style={styles.deleteCardButtonText}>Delete</Text>
							)}
						</Pressable>
					) : null}
				</View>
			</View>
		</View>
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
	statusText: {
		fontFamily: "Inter_400Regular",
		fontSize: 15,
		color: "#556274",
	},
	errorText: {
		fontFamily: "Inter_400Regular",
		fontSize: 15,
		lineHeight: 22,
		color: "#B00020",
	},
	emptyState: {
		borderRadius: 20,
		padding: 20,
		backgroundColor: "#FFFCF7",
		borderWidth: 1,
		borderColor: "#E9DED1",
	},
	emptyTitle: {
		fontFamily: "Lora_600SemiBold",
		fontSize: 20,
		color: "#5F3A26",
	},
	emptyText: {
		marginTop: 8,
		fontFamily: "Inter_400Regular",
		fontSize: 15,
		lineHeight: 22,
		color: "#556274",
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
	prayerContentButton: { borderRadius: 12 },
	prayerContentButtonPressed: { opacity: 0.72 },
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
	deleteCardButton: {
		marginLeft: "auto",
		minHeight: 44,
		justifyContent: "center",
		paddingHorizontal: 14,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: COLORS.ERROR,
		backgroundColor: "#FFFFFF",
	},
	deleteCardButtonDisabled: { opacity: 0.5 },
	deleteCardButtonPressed: { opacity: 0.72 },
	deleteCardButtonText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
		color: COLORS.ERROR,
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
