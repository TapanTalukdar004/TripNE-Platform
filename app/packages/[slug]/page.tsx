import { notFound } from "next/navigation";
import { PACKAGES_DATA } from "@/lib/data/packages";
import PackageClientWrapper from "./PackageClientWrapper";

export const dynamicParams = true; // Tell Next.js to render paths not returned by generateStaticParams

export async function generateStaticParams() {
  return PACKAGES_DATA.map((pkg) => ({
    slug: pkg.id,
  }));
}

export default async function PackageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pkg = PACKAGES_DATA.find((p) => p.id === resolvedParams.slug);

  if (!pkg) {
    notFound();
  }

  return <PackageClientWrapper pkg={pkg} />;
}
