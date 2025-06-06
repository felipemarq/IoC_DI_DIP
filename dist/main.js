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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fastify_1 = __importDefault(require("fastify"));
const container_1 = require("./di/container");
const app = (0, fastify_1.default)();
app.post("/orders", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const placeOrder = container_1.container.resolve("PlaceOrder");
    const { orderId } = yield placeOrder.excute();
    response.status(201).send({ orderId });
}));
app.listen({ port: 3000 }).then((server) => {
    console.log(`Server listening on port ${server}`);
});
