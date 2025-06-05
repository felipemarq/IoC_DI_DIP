import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { IQueueGateway } from "../interfaces/gateways/IQueueGateway";

export class SQSGateway implements IQueueGateway {
  private sqsClient = new SQSClient({ region: "us-east-1" });

  async sendMessage(message: Record<string, unknown>): Promise<void> {
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl:
        "https://sqs.us-east-1.amazonaws.com/379443323181/ProcessPaymentQueue",
      MessageBody: JSON.stringify(message),
    });

    await this.sqsClient.send(sendMessageCommand);
  }
}
