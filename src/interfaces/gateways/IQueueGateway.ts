export interface IQueueGateway {
  sendMessage(message: Record<string, unknown>): Promise<void>;
}
