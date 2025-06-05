import { SQSGateway } from "../gateways/SQSGateway";

export const makeSqsGateway = () => {
  return new SQSGateway();
};
