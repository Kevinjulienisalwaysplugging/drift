import { LegalShell } from "../legal-page";
import AccountClient from "./account-client";
import { getAuthSession } from "../../lib/auth-session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Your DRIFT Profile | Account",
  description: "View and manage your DRIFT account profile.",
  alternates: {
    canonical: "/account",
  },
};

export default async function AccountPage() {
  const { user } = await getAuthSession();

  if (!user) {
    redirect("/");
  }

  return (
    <LegalShell
      eyebrow="Account"
      title="Your DRIFT profile."
      intro="A simple place for your account details, saved name, and purchase history."
    >
      <AccountClient />
    </LegalShell>
  );
}

