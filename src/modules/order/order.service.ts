import { Injectable } from "@nestjs/common";
import { OrderInput } from "./dto/order.input";
import { GraphQLError } from "graphql";
import { MailService } from "../mail/mail.service";
import { Order } from "./entities/order.entity";
import { OrderStatusEnum } from "../../utils/types/order.enum";
import { ProductService } from "../product/product.service";
import { OrderApiService } from "../api/order-api.service";
import { AuthApiService } from '../api/auth.service';

@Injectable()
export class OrderService {
    constructor(
        private mailService: MailService,
        private productService: ProductService,
        private orderApiService: OrderApiService,
        private authApiService: AuthApiService
    ) {}

    async createOrder(input: OrderInput, session: any) {
        try {
            const product = await this.productService.findProductById(input.id_product);
            const user = await this.authApiService.findUserById(Number(session?.session?.userId))
            if (!product) {
                throw new GraphQLError("Product not found");
            }

            // const order = await this.prisma.order.create({
            //     data: {
            //         productId: product.product_id,
            //         productName: product.product_name,
            //         receiverLocation: input.receiverLocation,
            //         receiverPhone: input.receiverPhone,
            //         quantity: input.quantity,
            //         totalPrice: input.totalPrice,
            //         ownerId: userData.id,
            //         orderStatus: OrderStatusEnum.PENDING,
            //     },
            // });
            const data = {
                ...input,
                status: OrderStatusEnum.PENDING,
            };

            const order = await this.orderApiService.createOrderApi({ ...data, id_customer: session?.session?.userId });

            if (order) {
                await this.mailService.sendUserOrder(user, order as Order);

                return order;
            }
        } catch (err) {
            throw new GraphQLError(err);
        }
    }
}
