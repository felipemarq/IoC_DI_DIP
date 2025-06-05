// Interface que define o contrato para gateways de envio de mensagens (ex: SQS, Kafka, etc.)
export interface IQueueGateway {
  // Método assíncrono que recebe uma mensagem genérica (objeto com chave-valor) e não retorna nada
  sendMessage(message: Record<string, unknown>): Promise<void>;
}
