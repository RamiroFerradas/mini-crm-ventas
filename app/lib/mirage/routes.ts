/* eslint-disable @typescript-eslint/no-explicit-any */
export function routes(this: any) {
  this.namespace = "/api";

  // CLIENTES
  this.get("/clients", (schema: any) => {
    return schema.clients.all();
  });

  this.get("/clients/:id", (schema: any, request: any) => {
    return schema.clients.find(request.params.id);
  });

  this.post("/clients", (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.clients.create(attrs);
  });

  this.put("/clients/:id", (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.clients.find(request.params.id)?.update(attrs);
  });

  this.del("/clients/:id", (schema: any, request: any) => {
    return schema.clients.find(request.params.id)?.destroy();
  });
  // OPORTUNIDADES
  this.get("/opportunities", (schema: any) => {
    return schema.opportunities.all();
  });

  this.get("/opportunities/:id", (schema: any, request: any) => {
    return schema.opportunities.find(request.params.id);
  });

  this.post("/opportunities", (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    const created = schema.opportunities.create(attrs);
    // Simular evento realtime (solo en dev)
    if (window && window.dispatchEvent) {
      window.dispatchEvent(
        new CustomEvent("mirage:opportunity:created", {
          detail: created.attrs,
        }),
      );
    }
    return created;
  });

  this.put("/opportunities/:id", (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    const updated = schema.opportunities.find(request.params.id)?.update(attrs);
    if (window && window.dispatchEvent) {
      window.dispatchEvent(
        new CustomEvent("mirage:opportunity:updated", {
          detail: updated?.attrs,
        }),
      );
    }
    return updated;
  });

  this.del("/opportunities/:id", (schema: any, request: any) => {
    const deleted = schema.opportunities.find(request.params.id)?.destroy();
    if (window && window.dispatchEvent) {
      window.dispatchEvent(
        new CustomEvent("mirage:opportunity:deleted", {
          detail: request.params.id,
        }),
      );
    }
    return deleted;
  });

  // PRODUCTOS
  this.get("/products", (schema: any) => {
    return schema.products.all();
  });

  this.get("/products/:id", (schema: any, request: any) => {
    return schema.products.find(request.params.id);
  });

  this.post("/products", (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.products.create(attrs);
  });

  this.put("/products/:id", (schema: any, request: any) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.products.find(request.params.id)?.update(attrs);
  });

  this.del("/products/:id", (schema: any, request: any) => {
    return schema.products.find(request.params.id)?.destroy();
  });
}
