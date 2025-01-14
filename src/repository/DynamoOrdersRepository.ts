import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Order } from "../entities/Order";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export class DynamoOrdersRepository {
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
