export type FakeApiMode = "success" | "fail" | "random";

export async function fakeApi<T>(
  result: T,
  mode: FakeApiMode = "random",
  failRate = 0.3,
): Promise<T> {
  await new Promise((r) => setTimeout(r, 800));

  if (mode === "fail") {
    throw new Error("API rejected operation (forced)");
  }

  if (mode === "random" && Math.random() < failRate) {
    throw new Error("API rejected operation (random)");
  }

  return result;
}
