"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const ConsoleLogGateway_1 = require("../gateways/ConsoleLogGateway");
const Inject_1 = require("../di/Inject");
let PlaceOrder = class PlaceOrder {
    constructor(ordersRepository, sqsGateway, logService /* @Inject("LogService") private readonly logService: ILogService */) {
        this.ordersRepository = ordersRepository;
        this.sqsGateway = sqsGateway;
        this.logService = logService;
    }
    excute() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerEmail = "customer@email.com";
            const amount = Math.ceil(Math.random() * 100);
            const order = new Order_1.Order(customerEmail, amount);
            yield this.ordersRepository.create(order);
            yield this.sqsGateway.sendMessage({
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
        });
    }
};
exports.PlaceOrder = PlaceOrder;
exports.PlaceOrder = PlaceOrder = __decorate([
    __param(0, (0, Inject_1.Inject)("OrdersRepository")),
    __param(1, (0, Inject_1.Inject)("QueueGateway")),
    __param(2, (0, Inject_1.Inject)("LogGateway")),
    __metadata("design:paramtypes", [Object, Object, ConsoleLogGateway_1.ConsoleLogGateway /* @Inject("LogService") private readonly logService: ILogService */])
], PlaceOrder);
