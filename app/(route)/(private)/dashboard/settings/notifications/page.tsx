import { Metadata } from "next"
import { NotificationsClient } from "./_components/notifications-client"

export const metadata: Metadata = {
  title: "Notification Settings | webTray",
  description: "Control email, SMS, and push notification preferences.",
}

export default function NotificationsPage() {
  return <NotificationsClient />
}
