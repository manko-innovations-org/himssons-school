import { notFound } from "next/navigation";
import { DomainPlaceholder } from "../../../components/domain-placeholder";
import { domains } from "../../../lib/content.mjs";

export function generateStaticParams() {
  return domains.map((domain) => ({ domain: domain.id }));
}

export async function generateMetadata({ params }) {
  const { domain: id } = await params;
  const domain = domains.find((entry) => entry.id === id);
  return { title: domain ? domain.name.en : "Not found" };
}

export default async function DomainPage({ params }) {
  const { domain: id } = await params;
  const domain = domains.find((entry) => entry.id === id);

  if (!domain) notFound();

  return <DomainPlaceholder domainId={domain.id} />;
}
