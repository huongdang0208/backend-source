import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class OrderInput {

    @Field(() => Int, { nullable: false })
    productId: number;

    @Field(() => String, { nullable: false })
    productName: string;

    @Field(() => String, { nullable: false })
    receiverLocation: string;

    @Field(() => String, { nullable: false })
    receiverPhone: string;

    @Field(() => Int, { nullable: false })
    quantity: number;

    @Field(() => Int, { nullable: false })
    totalPrice: number;

    @Field(() => String, { nullable: false })
    orderStatus: string;

    @Field(() => Int, { nullable: false })
    ownerId: number;

    @Field({ nullable: true })
    createdAt: Date;

    @Field({ nullable: true })
    updatedAt: Date;
}