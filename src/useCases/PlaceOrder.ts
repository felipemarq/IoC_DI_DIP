import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { Order } from "../entities/Order";
import { DynamoOrdersRepository } from "../repository/DynamoOrdersRepository";
import { SQSGateway } from "../gateways/SQSGateway";

export class PlaceOrder {
  async excute() {
    const customerEmail = "customer@email.com";
    const amount = Math.ceil(Math.random() * 100);

    const order = new Order(customerEmail, amount);

    //Salva no dynamo
    const dynamoOrdersRepository = new DynamoOrdersRepository();

    await dynamoOrdersRepository.create(order);

    const sqsGateway = new SQSGateway();

    await sqsGateway.sendMessage({
      orderId: order.id,
      customerEmail,
      amount,
    });

    return { orderId: order.id };
  }
}
