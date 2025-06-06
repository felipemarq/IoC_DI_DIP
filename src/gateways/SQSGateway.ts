// Importa os comandos e o cliente da SQS (AWS SDK v3)
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
// Importa a interface que este gateway deve implementar
import { IQueueGateway } from "../interfaces/gateways/IQueueGateway";

// Implementação do gateway da AWS SQS que cumpre o contrato da interface

export class SQSGateway implements IQueueGateway {
  // Cria instância do cliente da SQS com a região configurada
  private sqsClient = new SQSClient({ region: "us-east-1" });

  // Método que envia uma mensagem para a fila SQS
  async sendMessage(message: Record<string, unknown>): Promise<void> {
    // Cria o comando para enviar a mensagem
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl:
        "https://sqs.us-east-1.amazonaws.com/379443323181/ProcessPaymentQueue",
      MessageBody: JSON.stringify(message), // Converte a mensagem para JSON
    });

    // Envia o comando para a SQS
    await this.sqsClient.send(sendMessageCommand);
  }
}
