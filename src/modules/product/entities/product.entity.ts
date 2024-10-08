import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { FileUpload } from "../../../modules/file/entities/file.entity";
import { Data } from "./data.entity";

@ObjectType()
export class Product {
    @Field(() => Int)
    id: number;

    @Field(() => String, { nullable: false })
    name: string;

    @Field(() => Data, { nullable: true })
    data: Data;

    @Field(() => String, { nullable: false })
    description: string;

    @Field(() => String, { nullable: true })
    instruction: string;

    @Field(() => FileUpload, { nullable: true })
    file_product_id_imageTofile: FileUpload;

    @Field(() => String, { nullable: true })
    status: string;

    @Field(() => Int, { nullable: false })
    @IsNumber()
    price: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    product_characteristic: string;

    @Field(() => String, { nullable: true })
    created_date: string;
}
