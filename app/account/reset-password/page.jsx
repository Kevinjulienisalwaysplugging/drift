import { LegalShell } from "../../legal-page";
import ResetPasswordClient from "./reset-password-client";

export const metadata = {
  title: "Reset Password | DRIFT Account",
  description: "Reset your DRIFT account password.",
  alternates: {
    canonical: "/account/reset-password",
  },
};

export default function ResetPasswordPage() {
  return (
    <LegalShell
      eyebrow="Account access"
      title="Reset your password."
      intro="Create a new password for your DRIFT account using your secure reset link."
    >
      <ResetPasswordClient />
    </LegalShell>
  );
}
