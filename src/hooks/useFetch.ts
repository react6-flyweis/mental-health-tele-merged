"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type UnknownRecord = Record<string, unknown>;
type ApiCall<TParams = unknown, TResult = unknown> = (
  params?: TParams,
) => Promise<TResult>;

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs = 15000,
): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Request timed out. Please try again."));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

const normalizeResponse = (res: unknown): unknown => {
  const response = res as UnknownRecord | undefined;
  const data = response?.data as UnknownRecord | undefined;

  return (
    data?.data ?? data?.jobs ?? data?.reviews ?? response?.data ?? res ?? []
  );
};

const toErrorMessage = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === "string") {
    return err;
  }

  return "Something went wrong";
};

export const useFetch = <TParams = unknown, TResult = unknown>(
  apiCall: ApiCall<TParams, TResult>,
  params?: TParams,
) => {
  const [requestParams, setRequestParams] = useState<TParams | undefined>(
    params,
  );

  useEffect(() => {
    setRequestParams(params);
  }, [params]);

  const queryKey = useMemo(
    () => ["useFetch", apiCall.name || "anonymous", requestParams],
    [apiCall, requestParams],
  );

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await withTimeout(apiCall(requestParams));
      return normalizeResponse(res);
    },
    initialData: [],
    retry: 1,
  });

  const refetch = useCallback(
    async (customParams?: TParams) => {
      if (typeof customParams !== "undefined") {
        setRequestParams(customParams);
        return;
      }

      await query.refetch();
    },
    [query],
  );

  return {
    data: query.data,
    loading: query.isLoading || query.isFetching,
    error: query.error ? toErrorMessage(query.error) : null,
    refetch,
  };
};
