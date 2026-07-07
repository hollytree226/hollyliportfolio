import { InfoPageClient } from "@/components/InfoPageClient";
import { site } from "@/data/site";

export const metadata = {
  title: `${site.info.title} — ${site.name}`,
};

export default function InfoPage() {
  return <InfoPageClient />;
}
