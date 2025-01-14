import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

export class PlaceOrder {
  async excute() {
    const customerEmail = "customer@email.com";
    const amount = Math.ceil(Math.random() * 100);

    const ddbClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({ region: "us-east-1" })
    );

    const orderId = randomUUID();

    const putItemCommand = new PutCommand({
      TableName: "Orders",
      Item: {
        id: orderId,
        email: customerEmail,
        amount: amount,
      },
    });

    await ddbClient.send(putItemCommand);

    const sqsClient = new SQSClient({ region: "us-east-1" });

    const sendMessageCommand = new SendMessageCommand({
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/379443323181/ProcessPaymentQueue",
      MessageBody: JSON.stringify({
        orderId,
      }),
    });

    await sqsClient.send(sendMessageCommand);

    console.log(`Email Sent to ${customerEmail} with order id ${orderId}`);

    return { orderId };
  }
}
