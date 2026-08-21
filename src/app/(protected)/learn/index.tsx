import { COLORS } from "@/constants/colors";
import {
	getRosarySteps,
	ROSARY_MYSTERY_SETS,
	type RosaryBeadLocation,
	type RosaryMysterySet,
} from "@/constants/rosary";
import {
	clearRosaryGuideProgress,
	getRosaryGuideProgress,
	saveRosaryGuideProgress,
} from "@/repositories/rosary-progress";
import { useEffect, useMemo, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LearnRosaryScreen() {
	const [isLoading, setIsLoading] = useState(true);
	const [savedSet, setSavedSet] = useState<RosaryMysterySet | null>(null);
	const [activeSet, setActiveSet] = useState<RosaryMysterySet | null>(null);
	const [stepIndex, setStepIndex] = useState(0);
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		void (async () => {
			const progress = await getRosaryGuideProgress();
			if (progress) {
				const set = ROSARY_MYSTERY_SETS.find(
					(candidate) => candidate.id === progress.mysterySetId,
				);
				if (set) {
					const steps = getRosarySteps(set);
					if (progress.stepIndex < steps.length) {
						setSavedSet(set);
						setStepIndex(progress.stepIndex);
					}
				}
			}
			setIsLoading(false);
		})();
	}, []);

	const steps = useMemo(
		() => (activeSet ? getRosarySteps(activeSet) : []),
		[activeSet],
	);
	const currentStep = steps[stepIndex];

	function begin(set: RosaryMysterySet, index = 0) {
		setSavedSet(null);
		setActiveSet(set);
		setStepIndex(index);
		setIsComplete(false);
		void saveRosaryGuideProgress({ mysterySetId: set.id, stepIndex: index });
	}

	function goToStep(nextIndex: number) {
		if (!activeSet) return;
		setStepIndex(nextIndex);
		void saveRosaryGuideProgress({
			mysterySetId: activeSet.id,
			stepIndex: nextIndex,
		});
	}

	function finish() {
		setIsComplete(true);
		void clearRosaryGuideProgress();
	}

	function chooseAnotherSet() {
		setActiveSet(null);
		setSavedSet(null);
		setStepIndex(0);
		setIsComplete(false);
		void clearRosaryGuideProgress();
	}

	if (isLoading) {
		return <LoadingState />;
	}

	if (isComplete && activeSet) {
		return (
			<SafeAreaView style={styles.container} edges={["top"]}>
				<View style={styles.completion}>
					<Text style={styles.eyebrow}>Rosary complete</Text>
					<Text style={styles.completionTitle}>
						May this prayer stay with you.
					</Text>
					<Text style={styles.completionText}>
						You completed the {activeSet.name.toLowerCase()}.
					</Text>
					<ActionButton label="Pray again" onPress={() => begin(activeSet)} />
					<Pressable onPress={chooseAnotherSet} style={styles.secondaryButton}>
						<Text style={styles.secondaryButtonText}>
							Choose another mystery set
						</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		);
	}

	if (!activeSet) {
		return (
			<SafeAreaView style={styles.container} edges={["top"]}>
				<ScrollView contentContainerStyle={styles.setupContent}>
					<Text style={styles.eyebrow}>Guided devotion</Text>
					<Text style={styles.heading}>Learn the Rosary</Text>
					<Text style={styles.intro}>
						Follow each prayer at your own pace. We will show the bead or rosary
						part to hold along the way.
					</Text>
					{savedSet ? (
						<View style={styles.resumeCard}>
							<Text style={styles.resumeTitle}>Continue where you paused?</Text>
							<Text style={styles.resumeText}>
								Your {savedSet.name.toLowerCase()} session is ready.
							</Text>
							<ActionButton
								label="Continue"
								onPress={() => begin(savedSet, stepIndex)}
							/>
							<Pressable onPress={chooseAnotherSet} style={styles.textButton}>
								<Text style={styles.textButtonText}>Start over instead</Text>
							</Pressable>
						</View>
					) : null}
					<Text style={styles.sectionTitle}>Choose a mystery set</Text>
					{ROSARY_MYSTERY_SETS.map((set) => (
						<Pressable
							key={set.id}
							onPress={() => begin(set)}
							style={({ pressed }) => [
								styles.mysteryCard,
								pressed && styles.pressed,
							]}
							accessibilityRole="button"
							accessibilityLabel={`Begin the ${set.name}`}
						>
							<Text style={styles.mysteryName}>{set.name}</Text>
							<Text style={styles.mysteryDescription}>{set.description}</Text>
							<Text style={styles.mysteryCount}>Five mysteries</Text>
						</Pressable>
					))}
				</ScrollView>
			</SafeAreaView>
		);
	}

	if (!currentStep) return null;
	return (
		<SafeAreaView style={styles.container} edges={["top", "bottom"]}>
			<ScrollView contentContainerStyle={styles.guideContent}>
				<View style={styles.guideHeader}>
					<Pressable
						onPress={chooseAnotherSet}
						style={styles.changeButton}
						accessibilityRole="button"
						accessibilityLabel="Choose another mystery set"
					>
						<Text style={styles.changeButtonText}>Change set</Text>
					</Pressable>
					<Text style={styles.progress}>
						{stepIndex + 1} of {steps.length}
					</Text>
				</View>
				<Text style={styles.setName}>{activeSet.name}</Text>
				<RosaryDiagram
					location={currentStep.beadLocation}
					decade={currentStep.decade}
				/>
				<View style={styles.beadCallout}>
					<Text style={styles.beadCalloutLabel}>Hold</Text>
					<Text style={styles.beadCalloutText}>{currentStep.beadLabel}</Text>
				</View>
				<View style={styles.prayerCard}>
					{currentStep.mystery ? (
						<Text style={styles.mysteryContext}>{currentStep.mystery}</Text>
					) : null}
					<Text style={styles.prayerName}>{currentStep.prayerName}</Text>
					{currentStep.beadCount ? (
						<Text style={styles.countHint}>
							Pray this on each of the {currentStep.beadCount} beads.
						</Text>
					) : null}
					<Text style={styles.prayerText}>{currentStep.text}</Text>
				</View>
				<View style={styles.navigationRow}>
					<Pressable
						disabled={stepIndex === 0}
						onPress={() => goToStep(stepIndex - 1)}
						style={[
							styles.backButton,
							stepIndex === 0 && styles.disabledButton,
						]}
						accessibilityRole="button"
						accessibilityLabel="Previous prayer"
					>
						<Text style={styles.backButtonText}>Back</Text>
					</Pressable>
					<ActionButton
						label={stepIndex === steps.length - 1 ? "Finish" : "Next"}
						onPress={() =>
							stepIndex === steps.length - 1
								? finish()
								: goToStep(stepIndex + 1)
						}
						compact
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

function LoadingState() {
	return (
		<SafeAreaView style={[styles.container, styles.loading]}>
			<ActivityIndicator color={COLORS.HIGHLIGHT} />
			<Text style={styles.loadingText}>Preparing your rosary guide…</Text>
		</SafeAreaView>
	);
}

function ActionButton({
	label,
	onPress,
	compact = false,
}: {
	label: string;
	onPress: () => void;
	compact?: boolean;
}) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.primaryButton,
				compact && styles.compactButton,
				pressed && styles.pressed,
			]}
			accessibilityRole="button"
			accessibilityLabel={label}
		>
			<Text style={styles.primaryButtonText}>{label}</Text>
		</Pressable>
	);
}

function RosaryDiagram({
	location,
	decade,
}: {
	location: RosaryBeadLocation;
	decade?: number;
}) {
	return (
		<View
			style={styles.diagram}
			accessible
			accessibilityLabel={`Rosary diagram. Current location: ${location.replaceAll("-", " ")}`}
		>
			<View style={styles.cross}>
				<View style={styles.crossVertical} />
				<View style={styles.crossHorizontal} />
			</View>
			<Bead active={location === "crucifix"} size="large" />
			<View style={styles.stem} />
			<Bead active={location === "intro-large"} size="large" />
			<View style={styles.introRow}>
				{[0, 1, 2].map((item) => (
					<Bead key={item} active={location === "intro-small"} />
				))}
			</View>
			<Bead
				active={location === "centerpiece" || location === "closing"}
				size="large"
			/>
			<View style={styles.decadeList}>
				{[1, 2, 3, 4, 5].map((item) => (
					<View key={item} style={styles.decadeRow}>
						<Bead
							active={location === "decade-large" && decade === item}
							size="large"
						/>
						{Array.from({ length: 10 }, (_, index) => (
							<Bead
								key={index}
								active={location === "decade-small" && decade === item}
							/>
						))}
					</View>
				))}
			</View>
		</View>
	);
}

function Bead({
	active,
	size = "small",
}: {
	active: boolean;
	size?: "small" | "large";
}) {
	return (
		<View
			style={[
				styles.bead,
				size === "large" && styles.largeBead,
				active && styles.activeBead,
			]}
		/>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#FFFFFF" },
	loading: { alignItems: "center", justifyContent: "center", gap: 12 },
	loadingText: { fontFamily: "Inter_500Medium", color: "#7A685A" },
	setupContent: { padding: 24, paddingBottom: 44 },
	guideContent: { padding: 24, paddingBottom: 44 },
	eyebrow: {
		color: COLORS.HIGHLIGHT,
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
		letterSpacing: 1.2,
		textTransform: "uppercase",
	},
	heading: {
		color: "#5F3A26",
		fontFamily: "Lora_600SemiBold",
		fontSize: 32,
		marginTop: 8,
	},
	intro: {
		color: "#556274",
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 24,
		marginTop: 12,
	},
	sectionTitle: {
		color: "#5F3A26",
		fontFamily: "Lora_600SemiBold",
		fontSize: 21,
		marginTop: 28,
		marginBottom: 12,
	},
	mysteryCard: {
		backgroundColor: "#FFFCF7",
		borderColor: "#E9DED1",
		borderRadius: 20,
		borderWidth: 1,
		marginBottom: 12,
		padding: 18,
	},
	mysteryName: {
		color: "#5F3A26",
		fontFamily: "Lora_600SemiBold",
		fontSize: 19,
	},
	mysteryDescription: {
		color: "#556274",
		fontFamily: "Inter_400Regular",
		fontSize: 14,
		lineHeight: 20,
		marginTop: 6,
	},
	mysteryCount: {
		color: "#6A4D39",
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
		marginTop: 12,
	},
	resumeCard: {
		backgroundColor: "#F8EFE3",
		borderColor: "#E3CEB5",
		borderRadius: 20,
		borderWidth: 1,
		marginTop: 24,
		padding: 18,
	},
	resumeTitle: {
		color: "#5F3A26",
		fontFamily: "Lora_600SemiBold",
		fontSize: 19,
	},
	resumeText: {
		color: "#556274",
		fontFamily: "Inter_400Regular",
		marginTop: 5,
		marginBottom: 16,
	},
	primaryButton: {
		alignItems: "center",
		backgroundColor: COLORS.PRIMARY,
		borderRadius: 8,
		justifyContent: "center",
		minHeight: 50,
		paddingHorizontal: 18,
	},
	compactButton: { flex: 1, minHeight: 46 },
	primaryButtonText: {
		color: "#FFFFFF",
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
	},
	textButton: { alignItems: "center", marginTop: 14, padding: 6 },
	textButtonText: { color: COLORS.HIGHLIGHT, fontFamily: "Inter_600SemiBold" },
	pressed: { opacity: 0.75 },
	guideHeader: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	changeButton: {
		backgroundColor: "#F3E8DA",
		borderColor: "#E3CEB5",
		borderRadius: 999,
		borderWidth: 1,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	changeButtonText: {
		color: "#5A4738",
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
	},
	progress: { color: "#7A685A", fontFamily: "Inter_600SemiBold", fontSize: 13 },
	setName: {
		color: "#5F3A26",
		fontFamily: "Lora_600SemiBold",
		fontSize: 24,
		marginTop: 18,
	},
	diagram: {
		alignItems: "center",
		backgroundColor: "#FFFCF7",
		borderColor: "#E9DED1",
		borderRadius: 20,
		borderWidth: 1,
		marginTop: 16,
		padding: 15,
	},
	cross: { height: 24, marginBottom: 3, position: "relative", width: 24 },
	crossVertical: {
		backgroundColor: "#6A4D39",
		height: 24,
		left: 10,
		position: "absolute",
		width: 4,
	},
	crossHorizontal: {
		backgroundColor: "#6A4D39",
		height: 4,
		position: "absolute",
		top: 7,
		width: 24,
	},
	stem: { backgroundColor: "#D6CCC2", height: 8, width: 2 },
	introRow: { flexDirection: "row", gap: 5, marginVertical: 5 },
	bead: {
		backgroundColor: "#D6CCC2",
		borderColor: "#B99E88",
		borderRadius: 5,
		borderWidth: 1,
		height: 10,
		width: 10,
	},
	largeBead: { borderRadius: 8, height: 16, width: 16 },
	activeBead: {
		backgroundColor: COLORS.PRIMARY,
		borderColor: COLORS.HIGHLIGHT,
		borderWidth: 2,
		shadowColor: COLORS.HIGHLIGHT,
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	decadeList: { gap: 5, marginTop: 10 },
	decadeRow: { alignItems: "center", flexDirection: "row", gap: 4 },
	beadCallout: {
		alignItems: "center",
		backgroundColor: "#F8EFE3",
		borderRadius: 12,
		marginTop: 12,
		padding: 12,
	},
	beadCalloutLabel: {
		color: "#7A685A",
		fontFamily: "Inter_600SemiBold",
		fontSize: 11,
		letterSpacing: 1,
		textTransform: "uppercase",
	},
	beadCalloutText: {
		color: "#5F3A26",
		fontFamily: "Inter_600SemiBold",
		fontSize: 15,
		marginTop: 3,
		textAlign: "center",
	},
	prayerCard: {
		backgroundColor: "#FFFCF7",
		borderColor: "#E9DED1",
		borderRadius: 20,
		borderWidth: 1,
		marginTop: 14,
		padding: 20,
	},
	mysteryContext: {
		color: "#6A4D39",
		fontFamily: "Inter_600SemiBold",
		fontSize: 13,
		marginBottom: 8,
	},
	prayerName: {
		color: "#5F3A26",
		fontFamily: "Lora_600SemiBold",
		fontSize: 24,
	},
	countHint: {
		color: "#7A685A",
		fontFamily: "Inter_500Medium",
		fontSize: 13,
		lineHeight: 19,
		marginTop: 8,
	},
	prayerText: {
		color: "#3F342C",
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 25,
		marginTop: 14,
	},
	navigationRow: { flexDirection: "row", gap: 12, marginTop: 18 },
	backButton: {
		alignItems: "center",
		borderColor: "#E3CEB5",
		borderRadius: 8,
		borderWidth: 1,
		flex: 1,
		justifyContent: "center",
		minHeight: 46,
		paddingHorizontal: 18,
	},
	backButtonText: {
		color: COLORS.HIGHLIGHT,
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
	},
	disabledButton: { opacity: 0.4 },
	completion: { flex: 1, justifyContent: "center", padding: 24 },
	completionTitle: {
		color: "#5F3A26",
		fontFamily: "Lora_600SemiBold",
		fontSize: 30,
		lineHeight: 39,
		marginTop: 10,
	},
	completionText: {
		color: "#556274",
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 26,
		marginTop: 12,
	},
	secondaryButton: { alignItems: "center", marginTop: 16, padding: 10 },
	secondaryButtonText: {
		color: COLORS.HIGHLIGHT,
		fontFamily: "Inter_600SemiBold",
		fontSize: 15,
	},
});
