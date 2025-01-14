"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOrder = void 0;
const Order_1 = require("../entities/Order");
const DynamoOrdersRepository_1 = require("../repository/DynamoOrdersRepository");
const SQSGateway_1 = require("../gateways/SQSGateway");
class PlaceOrder {
    excute() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerEmail = "customer@email.com";
            const amount = Math.ceil(Math.random() * 100);
            const order = new Order_1.Order(customerEmail, amount);
            //Salva no dynamo
            const dynamoOrdersRepository = new DynamoOrdersRepository_1.DynamoOrdersRepository();
            yield dynamoOrdersRepository.create(order);
            const sqsGateway = new SQSGateway_1.SQSGateway();
            yield sqsGateway.sendMessage({
                orderId: order.id,
                customerEmail,
                amount,
            });
            return { orderId: order.id };
        });
    }
}
exports.PlaceOrder = PlaceOrder;
