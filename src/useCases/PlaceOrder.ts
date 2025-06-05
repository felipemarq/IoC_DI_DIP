import { Order } from "../entities/Order";
import { IOrdersRepository } from "../interfaces/repositories/IOrdersRepository";
import { IQueueGateway } from "../interfaces/gateways/IQueueGateway";

export class PlaceOrder {
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly sqsGateway: IQueueGateway
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

    return { orderId: order.id };
  }
}
