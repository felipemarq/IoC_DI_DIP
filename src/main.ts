import "reflect-metadata";
import Fastify from "fastify";
import { PlaceOrder } from "./useCases/PlaceOrder";
import { Registry } from "./di/Registry";
import { container } from "./di/container";

const app = Fastify();

app.post("/orders", async (request, response) => {
  const placeOrder = container.resolve<PlaceOrder>("PlaceOrder");
  const { orderId } = await placeOrder.excute();

  response.status(201).send({ orderId });
});

app.listen({ port: 3000 }).then((server) => {
  console.log(`Server listening on port ${server}`);
});
