"use client";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
