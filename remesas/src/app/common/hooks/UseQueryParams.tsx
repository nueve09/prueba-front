"use client";

import { EMPTY_STRING } from "@common/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getParam = React.useCallback(
    (key: string) => searchParams.get(key) ?? EMPTY_STRING,
    [searchParams],
  );

  const setParams = React.useCallback(
    (updates: Record<string, string>) => {
      const current = new URLSearchParams(window.location.search);
      const next = new URLSearchParams(window.location.search);

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
      });

      if (next.toString() === current.toString()) {
        return;
      }

      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname],
  );

  return {
    getParam,
    setParams,
  };
}
