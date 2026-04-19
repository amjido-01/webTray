import { Metadata } from "next";
import { ProfileClient } from "./_components/profile-client";

export const metadata: Metadata = {
  title: "Profile Settings | webTray",
  description: "Manage your profile settings and password.",
};

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800">Profile Settings</h2>
      </div>
      <div className="mt-8 space-y-8">
        <ProfileClient />
      </div>
    </div>
  );
}
