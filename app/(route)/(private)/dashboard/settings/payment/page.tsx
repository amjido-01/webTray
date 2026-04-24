import { Metadata } from "next"
import { PaymentClient } from "./_components/payment-client"

export const metadata: Metadata = {
  title: "Payment Settings | webTray",
  description: "Manage payment methods, gateways, and processing.",
}

export default function PaymentSettingsPage() {
  return <PaymentClient />
}
