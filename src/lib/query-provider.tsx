"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { PropsWithChildren } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
export const rQueryClient = new QueryClient();
export default function QueryWrapper({ children }: PropsWithChildren) {
  const [queryClient] = React.useState(() => rQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
