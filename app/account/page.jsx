import { LegalShell } from "../legal-page";
import AccountClient from "./account-client";

export const metadata = {
  title: "Your DRIFT Profile | Account",
  description: "View and manage your DRIFT account profile.",
  alternates: {
    canonical: "/account",
  },
};

export default function AccountPage() {
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
