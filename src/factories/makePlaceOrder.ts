import { PlaceOrder } from "../useCases/PlaceOrder";
import { makeDynamoOrdersRepository } from "./makeDynamoOrdersRepository";
import { makeSqsGateway } from "./makeSqsGateway";

// Função de fábrica que monta o caso de uso PlaceOrder com suas dependências
export function makePlaceOrder() {
  return new PlaceOrder(
    makeDynamoOrdersRepository(), // repositório de pedidos
    makeSqsGateway() // gateway de fila
  );
}
