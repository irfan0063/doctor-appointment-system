"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("clinic_access_token");
    if (pathname !== "/login" && !token) router.replace("/login");
    if (pathname === "/login" && token) router.replace("/dashboard");
    setReady(true);
  }, [pathname, router]);

  if (!ready) return <div suppressHydrationWarning className="grid min-h-screen place-items-center text-slate-400">Loading clinic workspace…</div>;
  return <>{children}</>;
}
