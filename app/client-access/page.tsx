import ClientPortal from "@/components/client-access/ClientPortal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Private Access | Lens & Light",
  description: "Private client portal for reviewing high-resolution photo proofing galleries and selecting print favorites.",
};

export default function ClientAccessPage() {
  return <ClientPortal />;
}
