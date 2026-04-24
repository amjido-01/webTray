import { Metadata } from "next"
import { BusinessClient } from "./_components/business-client"

export const metadata: Metadata = {
  title: "Business Settings | webTray",
  description: "Configure your business information and store details.",
}

export default function BusinessSettingsPage() {
  return <BusinessClient />
}
