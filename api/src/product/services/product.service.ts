import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/shared/models/product.model';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
    constructor(
        private productRepository: ProductRepository,
    ) { }

    async create(data: Product): Promise<Product> {
        const products = await this.productRepository.findBy({name: data.name});
        if (products && products.length > 0) {
            throw new Error('Já existe um produto com o nome informado!');
        } else {
            return await this.productRepository.create(data);
        }
    }

    async update(document: string, data: Product): Promise<Product> {
        return await this.productRepository.update(document, data);
    }

    async getById(document): Promise<Product> {
        return await this.productRepository.find(document);
    }

    async getAll(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }

    async delete(document): Promise<Product> {
        const findProduct = await this.getById(document);

        if (findProduct) {
            return await this.productRepository.delete(document);
        } else {
            throw new Error('Produto não encontrado!');
        }
    }
}
