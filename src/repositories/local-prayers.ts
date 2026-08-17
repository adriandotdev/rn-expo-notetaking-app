import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCAL_PRAYERS_STORAGE_KEY = "prayer-haven.local-prayers.v1";

export type LocalPrayer = {
	id: string;
	title: string;
	text: string;
	createdAt: string;
};

export type CreateLocalPrayerPayload = Pick<LocalPrayer, "title" | "text">;

function isLocalPrayer(value: unknown): value is LocalPrayer {
	if (!value || typeof value !== "object") return false;

	const prayer = value as Record<string, unknown>;
	return (
		typeof prayer.id === "string" &&
		prayer.id.length > 0 &&
		typeof prayer.title === "string" &&
		prayer.title.length > 0 &&
		typeof prayer.text === "string" &&
		prayer.text.length > 0 &&
		typeof prayer.createdAt === "string" &&
		Number.isFinite(Date.parse(prayer.createdAt))
	);
}

export async function getLocalPrayers(): Promise<LocalPrayer[]> {
	try {
		const storedPrayers = await AsyncStorage.getItem(LOCAL_PRAYERS_STORAGE_KEY);
		if (!storedPrayers) return [];

		const parsedPrayers: unknown = JSON.parse(storedPrayers);
		if (!Array.isArray(parsedPrayers) || !parsedPrayers.every(isLocalPrayer)) {
			return [];
		}

		return parsedPrayers;
	} catch {
		// Missing or malformed local data must not prevent the app from opening.
		return [];
	}
}

export async function createLocalPrayer(
	payload: CreateLocalPrayerPayload,
): Promise<LocalPrayer> {
	const title = payload.title.trim();
	const text = payload.text.trim();

	if (!title || !text) {
		throw new Error("Enter both a title and prayer before saving.");
	}

	const prayer: LocalPrayer = {
		id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
		title,
		text,
		createdAt: new Date().toISOString(),
	};

	try {
		const prayers = await getLocalPrayers();
		await AsyncStorage.setItem(
			LOCAL_PRAYERS_STORAGE_KEY,
			JSON.stringify([prayer, ...prayers]),
		);
		return prayer;
	} catch {
		throw new Error(
			"Your prayer could not be saved on this device. Please try again.",
		);
	}
}
