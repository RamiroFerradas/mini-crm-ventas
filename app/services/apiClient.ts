export const apiClient = {
  get: <T>(url: string) => fetch(url).then((res) => handleResponse<T>(res)),

  post: <T>(url: string, body: unknown) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => handleResponse<T>(res)),

  put: <T>(url: string, body: unknown) =>
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => handleResponse<T>(res)),

  del: <T>(url: string) =>
    fetch(url, { method: "DELETE" }).then((res) => handleResponse<T>(res)),
};
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = "API error";

    try {
      const body = await res.json();
      message = body?.error ?? message;
    } catch {}

    throw createApiError(res.status, message);
  }

  return res.json();
}
function createApiError(status: number, message: string): ApiError {
  return {
    type: "api",
    status,
    message,
  };
}
export type ApiError = {
  type: "api";
  status: number;
  message: string;
};
