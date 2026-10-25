export type AnalyticsWriteError = { code?: string; message: string } | Error | null | undefined;
export type RetryAnalyticsWriteOptions = {
  maxAttempts?: number;
  delays?: number[];
  wait?: (milliseconds: number) => Promise<void>;
  onFailure?: (details: { attempt: number; maxAttempts: number; error: unknown }) => void;
};
export function retryAnalyticsWrite(
  write: (attempt: number) => Promise<AnalyticsWriteError> | AnalyticsWriteError,
  options?: RetryAnalyticsWriteOptions,
): Promise<{ success: true; attempt: number } | { success: false; attempts: number; error: unknown }>;
