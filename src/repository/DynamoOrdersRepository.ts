import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Order } from "../entities/Order";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { IOrdersRepository } from "../interfaces/repositories/IOrdersRepository";
import { Injectable } from "../di/Injectable";

// Implementação do repositório usando DynamoDB
@Injectable()
export class DynamoOrdersRepository implements IOrdersRepository {
  // Cria cliente configurado com DocumentClient, que facilita o uso com objetos JS
  private client = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: "us-east-1" })
  );

  // Método para criar (persistir) um pedido na tabela Orders
  async create(order: Order): Promise<void> {
    const putItemCommand = new PutCommand({
      TableName: "Orders", // Nome da tabela
      Item: order, // Objeto do pedido a ser salvo
    });

    await this.client.send(putItemCommand);
  }
}
