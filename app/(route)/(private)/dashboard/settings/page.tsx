import { Metadata } from "next"
import { SettingsClient } from "./_components/settings-client"

export const metadata: Metadata = {
  title: "Settings | webTray",
  description: "Manage your business settings and account preferences.",
}

export default function SettingsPage() {
  return <SettingsClient />
}
