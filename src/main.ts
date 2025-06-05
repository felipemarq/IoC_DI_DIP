import Fastify from "fastify";
import { makePlaceOrder } from "./factories/makePlaceOrder";
import { container } from "./di/container";
import { PlaceOrder } from "./useCases/PlaceOrder";
import { DynamoOrdersRepository } from "./repository/DynamoOrdersRepository";
import { SQSGateway } from "./gateways/SQSGateway";

const app = Fastify();
console.log(container);

app.post("/orders", async (request, response) => {
  const placeOrder = new PlaceOrder(
    container.resolve(DynamoOrdersRepository),
    container.resolve(SQSGateway)
  );

  const { orderId } = await placeOrder.excute();

  response.status(201).send({ orderId });
});

app.listen({ port: 3000 }).then((server) => {
  console.log(`Server listening on port ${server}`);
});
