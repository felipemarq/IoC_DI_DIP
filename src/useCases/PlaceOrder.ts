import { Order } from "../entities/Order";
import { IOrdersRepository } from "../interfaces/repositories/IOrdersRepository";
import { IQueueGateway } from "../interfaces/gateways/IQueueGateway";
import { ConsoleLogGateway } from "../gateways/ConsoleLogGateway";
import { Inject } from "../di/Inject";

export class PlaceOrder {
  constructor(
    @Inject("OrdersRepository")
    private readonly ordersRepository: IOrdersRepository,
    @Inject("QueueGateway") private readonly sqsGateway: IQueueGateway,
    @Inject("LogGateway")
    private readonly logService: ConsoleLogGateway /* @Inject("LogService") private readonly logService: ILogService */
  ) {}

  async excute() {
    const customerEmail = "customer@email.com";
    const amount = Math.ceil(Math.random() * 100);

    const order = new Order(customerEmail, amount);

    await this.ordersRepository.create(order);

    await this.sqsGateway.sendMessage({
      orderId: order.id,
      customerEmail,
      amount,
    });

    /* 
    await this.logService.log({
      msg: "Order placed",
      orderId: order.id,
      customerEmail,
      amount,
    }); */

    return { orderId: order.id };
  }
}
