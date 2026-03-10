export default async function Template({ children }: { children: React.ReactNode }) {
  /* 
    This creates an artificial 1.5 second delay on every route navigation.
    Because `template.tsx` mounts a fresh instance on every route change (unlike layout.tsx),
    this delay explicitly forces the Nearest Next.js Suspense Boundary (app/loading.tsx)
    to remain visible for at least 1500ms so the user can enjoy the Lottie transition animation
    before the new page paints.
  */
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return <>{children}</>;
}
