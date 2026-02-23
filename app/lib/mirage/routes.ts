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
}
