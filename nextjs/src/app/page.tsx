'use client';

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Home({
  children,
  }: {
    children: React.ReactNode;
  }){
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/signin");
    } else {
      setToken(storedToken);
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <>
      {token && (
        <></>
      )}
    </>
  );
}