type RequestLike = {
  params: Record<string, string>;
  requestBody: string;
};

type ModelLike = {
  attrs?: unknown;
  update: (attrs: unknown) => unknown;
  destroy: () => unknown;
};

type CollectionLike = {
  all: () => unknown;
  find: (id: string) => ModelLike | undefined;
  create: (attrs: unknown) => ModelLike;
};

type SchemaLike = {
  clients: CollectionLike;
  opportunities: CollectionLike;
  products: CollectionLike;
};

type RouteHandler = (schema: SchemaLike, request: RequestLike) => unknown;

type MirageServerLike = {
  namespace: string;
  get: (path: string, handler: RouteHandler) => void;
  post: (path: string, handler: RouteHandler) => void;
  put: (path: string, handler: RouteHandler) => void;
  del: (path: string, handler: RouteHandler) => void;
  passthrough: (path?: string) => void;
};

export function routes(this: MirageServerLike) {
  this.namespace = "/api";

  this.get("/clients", (schema) => {
    return schema.clients.all();
  });

  this.get("/clients/:id", (schema, request) => {
    return schema.clients.find(request.params.id);
  });

  this.post("/clients", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.clients.create(attrs);
  });

  this.put("/clients/:id", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.clients.find(request.params.id)?.update(attrs);
  });

  this.del("/clients/:id", (schema, request) => {
    return schema.clients.find(request.params.id)?.destroy();
  });

  this.get("/opportunities", (schema) => {
    return schema.opportunities.all();
  });

  this.get("/opportunities/:id", (schema, request) => {
    return schema.opportunities.find(request.params.id);
  });

  this.post("/opportunities", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    const created = schema.opportunities.create(attrs);

    if (window && window.dispatchEvent) {
      window.dispatchEvent(
        new CustomEvent("mirage:opportunity:created", {
          detail: created.attrs,
        }),
      );
    }
    return created;
  });

  this.put("/opportunities/:id", (schema, request) => {
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

  this.del("/opportunities/:id", (schema, request) => {
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

  this.get("/products", (schema) => {
    return schema.products.all();
  });

  this.get("/products/:id", (schema, request) => {
    return schema.products.find(request.params.id);
  });

  this.post("/products", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.products.create(attrs);
  });

  this.put("/products/:id", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return schema.products.find(request.params.id)?.update(attrs);
  });

  this.del("/products/:id", (schema, request) => {
    return schema.products.find(request.params.id)?.destroy();
  });

  this.passthrough();
}
