"use client";

import { useEffect } from "react";

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamically import to avoid SSR issues
    import("@/lib/firebase");
  }, []);

  return <>{children}</>;
}
