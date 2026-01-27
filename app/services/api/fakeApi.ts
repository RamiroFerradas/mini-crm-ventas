export async function sendToApi(
  entity: string,
  action: string,
  payload: unknown
) {
  // Simula latencia
  await new Promise((r) => setTimeout(r, 500));

  // Simula fallo aleatorio
  if (Math.random() < 0.2) {
    throw new Error("Simulated network error");
  }

  return { ok: true };
}
