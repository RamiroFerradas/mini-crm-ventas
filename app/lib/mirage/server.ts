import { createServer } from "miragejs";
import { models } from "./models";
import { routes } from "./routes";
import { seeds } from "./seeds";

export function makeServer() {
  return createServer({
    models,
    seeds,
    routes,
  });
}
