import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	ROSARY_MYSTERY_SETS,
	type RosaryMysterySetId,
} from "@/constants/rosary";

const ROSARY_PROGRESS_STORAGE_KEY = "prayer-haven.rosary-progress.v1";

export type RosaryGuideProgress = {
	mysterySetId: RosaryMysterySetId;
	stepIndex: number;
};

function isRosaryGuideProgress(value: unknown): value is RosaryGuideProgress {
	if (!value || typeof value !== "object") return false;
	const progress = value as Record<string, unknown>;
	return (
		typeof progress.mysterySetId === "string" &&
		ROSARY_MYSTERY_SETS.some((set) => set.id === progress.mysterySetId) &&
		typeof progress.stepIndex === "number" &&
		Number.isInteger(progress.stepIndex) &&
		progress.stepIndex >= 0
	);
}

export async function getRosaryGuideProgress(): Promise<RosaryGuideProgress | null> {
	try {
		const stored = await AsyncStorage.getItem(ROSARY_PROGRESS_STORAGE_KEY);
		if (!stored) return null;
		const parsed: unknown = JSON.parse(stored);
		return isRosaryGuideProgress(parsed) ? parsed : null;
	} catch {
		return null;
	}
}

export async function saveRosaryGuideProgress(
	progress: RosaryGuideProgress,
): Promise<void> {
	await AsyncStorage.setItem(
		ROSARY_PROGRESS_STORAGE_KEY,
		JSON.stringify(progress),
	);
}

export async function clearRosaryGuideProgress(): Promise<void> {
	await AsyncStorage.removeItem(ROSARY_PROGRESS_STORAGE_KEY);
}
