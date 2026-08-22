import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

const PRAYING_ROSARY_CHANNEL_ID = "rosary-reminders";
const CREATING_PRAYER_CHANNEL_ID = "create-prayer-reminders";
const DAILY_PRAYER_REMINDER = "daily-prayer-reminder";
const CREATE_PRAYER_REMINDER = "create-prayer-reminder";

// TEST NOTIFS
const TEST_PRAYER_REMINDER = "test-prayer-reminder";
const TEST_CREATE_PRAYER_REMINDER = "test-create-prayer-reminder";

// Set this to false after testing so the app returns to its 8:00 PM reminder.
const USE_TWO_SECOND_TEST_REMINDER = false;

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldPlaySound: true,
		shouldSetBadge: false,
		shouldShowBanner: true,
		shouldShowList: true,
	}),
});

const setupNotificationChannelForAndroid = async () => {
	if (Platform.OS === "android") {
		// Setup notification for prayer rosary channel
		await Notifications.setNotificationChannelAsync(PRAYING_ROSARY_CHANNEL_ID, {
			name: "Prayer reminders",
			importance: Notifications.AndroidImportance.DEFAULT,
		});

		// Setup notification for creating prayer channel
		await Notifications.setNotificationChannelAsync(
			CREATING_PRAYER_CHANNEL_ID,
			{
				name: "Create Prayer Reminders",
				importance: Notifications.AndroidImportance.DEFAULT,
			},
		);
	}
};

const getUserNotificationPermission = async () => {
	const { status: existingStatus } = await Notifications.getPermissionsAsync();
	const { status } =
		existingStatus === "granted"
			? { status: existingStatus }
			: await Notifications.requestPermissionsAsync();

	if (status !== "granted") {
		return;
	}
};

// For setting up testing.
const setupTwoSecondNotifTest = async (
	testNotifications: Notifications.NotificationRequest[],
) => {
	if (!USE_TWO_SECOND_TEST_REMINDER) {
		await Promise.all(
			testNotifications.map(({ identifier }) =>
				Notifications.cancelScheduledNotificationAsync(identifier),
			),
		);
	}

	if (USE_TWO_SECOND_TEST_REMINDER) {
		if (testNotifications.length > 0) {
			return;
		}

		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Time to pray the Rosary 📿",
				body: "Take a moment for your prayer today.",
				data: { type: TEST_PRAYER_REMINDER },
			},
			trigger: {
				type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
				seconds: 2,
				repeats: Platform.OS === "android",
				channelId: PRAYING_ROSARY_CHANNEL_ID,
			},
		});

		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Time to create a prayer 📿",
				body: "Take a moment to add a reflection today.",
				data: { type: TEST_CREATE_PRAYER_REMINDER },
			},
			trigger: {
				type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
				seconds: 2,
				repeats: Platform.OS === "android",
				channelId: CREATING_PRAYER_CHANNEL_ID,
			},
		});

		return;
	}
};

async function configureDailyPrayerReminder() {
	await setupNotificationChannelForAndroid();

	await getUserNotificationPermission();

	const scheduledNotifications =
		await Notifications.getAllScheduledNotificationsAsync();

	const testNotifications = scheduledNotifications.filter(
		({ content }) =>
			content.data?.type === TEST_PRAYER_REMINDER ||
			content.data?.type === TEST_CREATE_PRAYER_REMINDER,
	);

	await setupTwoSecondNotifTest(testNotifications);

	const hasDailyRosaryReminder = scheduledNotifications.some(
		({ content }) => content.data?.type === DAILY_PRAYER_REMINDER,
	);

	if (hasDailyRosaryReminder) {
		return;
	}

	await Notifications.scheduleNotificationAsync({
		content: {
			title: "Time to pray the Rosary 📿",
			body: "Take a moment for your prayer today.",
			data: { type: DAILY_PRAYER_REMINDER },
		},
		trigger: {
			type: Notifications.SchedulableTriggerInputTypes.DAILY,
			hour: 20,
			minute: 0,
			channelId: PRAYING_ROSARY_CHANNEL_ID,
		},
	});

	await Notifications.scheduleNotificationAsync({
		content: {
			title: "Time to create a prayer 🙏🏼",
			body: "Take a moment to add a reflection today.",
			data: { type: CREATE_PRAYER_REMINDER },
		},
		trigger: {
			type: Notifications.SchedulableTriggerInputTypes.DAILY,
			hour: 9,
			minute: 0,
			channelId: CREATING_PRAYER_CHANNEL_ID,
		},
	});
}

export const Notification = () => {
	useEffect(() => {
		void configureDailyPrayerReminder().catch((error: unknown) => {
			console.error("Unable to schedule the daily prayer reminder.", error);
		});
	}, []);

	return null;
};
