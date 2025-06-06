import { ILogGateway } from "../interfaces/gateways/ILogGateway";

export class ConsoleLogGateway implements ILogGateway {
  async log(logMessage: Record<string, unknown>): Promise<void> {
    console.log("==== LOG Service ====");
    console.log(JSON.stringify(logMessage, null, 2));
  }
}
