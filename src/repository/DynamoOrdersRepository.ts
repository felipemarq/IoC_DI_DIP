import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Order } from "../entities/Order";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { IOrdersRepository } from "../interfaces/repositories/IOrdersRepository";

export class DynamoOrdersRepository implements IOrdersRepository {
  private client = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: "us-east-1" })
  );

  async create(order: Order): Promise<void> {
    const putItemCommand = new PutCommand({
      TableName: "Orders",
      Item: order,
    });

    await this.client.send(putItemCommand);
  }
}
