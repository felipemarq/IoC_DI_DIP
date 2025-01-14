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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client_sqs_1 = require("@aws-sdk/client-sqs");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const Order_1 = require("../entities/Order");
class PlaceOrder {
    excute() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerEmail = "customer@email.com";
            const amount = Math.ceil(Math.random() * 100);
            const order = new Order_1.Order(customerEmail, amount);
            const ddbClient = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" }));
            const putItemCommand = new lib_dynamodb_1.PutCommand({
                TableName: "Orders",
                Item: order,
            });
            yield ddbClient.send(putItemCommand);
            const sqsClient = new client_sqs_1.SQSClient({ region: "us-east-1" });
            const sendMessageCommand = new client_sqs_1.SendMessageCommand({
                QueueUrl: "https://sqs.us-east-1.amazonaws.com/379443323181/ProcessPaymentQueue",
                MessageBody: JSON.stringify({
                    orderId: order.id,
                }),
            });
            yield sqsClient.send(sendMessageCommand);
            console.log(`Email Sent to ${customerEmail} with order id ${order.id}`);
            return { orderId: order.id };
        });
    }
}
exports.PlaceOrder = PlaceOrder;
