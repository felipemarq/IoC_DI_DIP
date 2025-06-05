// Importa a classe que implementa o gateway da SQS
import { SQSGateway } from "../gateways/SQSGateway";

// Função de fábrica que retorna uma instância do SQSGateway
export const makeSqsGateway = () => {
  return new SQSGateway();
};
