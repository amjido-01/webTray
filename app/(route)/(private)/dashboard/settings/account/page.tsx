import { Metadata } from "next"
import { AccountClient } from "./_components/account-client"

export const metadata: Metadata = {
  title: "Account Settings | webTray",
  description: "Manage your personal account information and preferences.",
}

export default function AccountSettingsPage() {
  return <AccountClient />
}
