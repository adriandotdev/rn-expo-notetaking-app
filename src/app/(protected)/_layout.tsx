import AppTabs from "@/components/app-tabs";
import { Notification } from "@/components/notification";

export default function ProtectedLayout() {
	return (
		<>
			<Notification />
			<AppTabs />
		</>
	);
}
