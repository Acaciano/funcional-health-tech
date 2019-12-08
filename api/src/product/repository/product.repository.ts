import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/shared/models/product.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async create(data: Product): Promise<Product> {
        const user = new this.productModel(data);
        return await user.save();
    }

    async update(document: string, data: Product): Promise<Product> {
        return await this.productModel.findOneAndUpdate({ _id: document }, data);
    }

    async find(document): Promise<Product> {
        return await this.productModel.findOne({ _id: document }).exec();
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find({}).exec();
    }

    async findBy(query): Promise<Product[]> {
        return await this.productModel.find(query).exec();
    }

    async delete(document): Promise<Product> {
        const findProduct = await this.find(document);

        if (findProduct) {
            return await this.productModel.deleteOne({ _id: document });
        } else {
            throw new Error('Produto não encontrado!');
        }
    }
}
