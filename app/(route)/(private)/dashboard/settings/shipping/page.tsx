import { Metadata } from "next"
import { ShippingClient } from "./_components/shipping-client"

export const metadata: Metadata = {
  title: "Shipping & Delivery | webTray",
  description: "Define shipping areas and delivery methods.",
}

export default function ShippingSettingsPage() {
  return <ShippingClient />
}
