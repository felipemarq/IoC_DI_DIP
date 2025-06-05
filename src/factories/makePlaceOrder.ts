import { PlaceOrder } from "../useCases/PlaceOrder";
import { makeDynamoOrdersRepository } from "./makeDynamoOrdersRepository";
import { makeSqsGateway } from "./makeSqsGateway";

export function makePlaceOrder() {
  return new PlaceOrder(makeDynamoOrdersRepository(), makeSqsGateway());
}
