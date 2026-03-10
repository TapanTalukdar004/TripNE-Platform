import { notFound } from "next/navigation";
import { PACKAGES_DATA } from "@/lib/data/packages";
import BookingWizard from "./BookingWizard";

export const dynamic = "force-dynamic";

export default async function BookingPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ vehicle?: string, capacity?: string, cost?: string }>
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const pkg = PACKAGES_DATA.find((p) => p.id === resolvedParams.slug);

  if (!pkg) {
    notFound();
  }

  // Pass these down to the client wizard
  const defaultVehicle = resolvedSearchParams.vehicle || "Standard Transport";
  const defaultCapacity = parseInt(resolvedSearchParams.capacity || "2", 10);
  const defaultCost = parseInt(resolvedSearchParams.cost || "0", 10);

  return (
    <BookingWizard 
      pkg={pkg}
      defaultVehicle={defaultVehicle}
      defaultCapacity={defaultCapacity}
      defaultCost={defaultCost}
    />
  );
}
