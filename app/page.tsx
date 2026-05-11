"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("dev_mode")) {
      router.replace("/login");
      return;
    }
    if (!localStorage.getItem("dev_couple")) {
      router.replace("/couple");
      return;
    }
    router.replace("/mood");
  }, [router]);

  return null;
}
