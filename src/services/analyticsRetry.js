export async function retryAnalyticsWrite(
  write,
  {
    maxAttempts = 3,
    delays = [300, 900],
    wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
    onFailure = () => {},
  } = {},
) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const error = await write(attempt);
      if (!error) return { success: true, attempt };
      lastError = error;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }

    onFailure({ attempt, maxAttempts, error: lastError });

    if (attempt < maxAttempts) {
      await wait(delays[attempt - 1] ?? delays[delays.length - 1] ?? 0);
    }
  }

  return { success: false, attempts: maxAttempts, error: lastError };
}
