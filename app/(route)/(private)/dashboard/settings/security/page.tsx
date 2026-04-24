import { Metadata } from "next"
import { SecurityClient } from "./_components/security-client"

export const metadata: Metadata = {
  title: "Security & Privacy | webTray",
  description: "Configure your security settings and privacy preferences.",
}

export default function SecurityPage() {
  return <SecurityClient />
}
