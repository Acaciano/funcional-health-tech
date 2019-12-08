import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { Result } from '../../shared/models/result.model';
import { Product } from 'src/shared/models/product.model';
import { ProductService } from '../services/product.service';
import { ValidatorInterceptor } from '../interceptors/validator.interceptor';
import { CreateProductContract } from '../contracts/product/create-product.contract';

@Controller('v1/products')
export class ProductController {
    constructor(
        private productService: ProductService,
    ) {
    }

    @Get()
    async get() {
        const products = await this.productService.getAll();
        return new Result(null, true, products, null);
    }

    @Get(`:document`)
    async getById(@Param(`document`) document) {
        const products = await this.productService.getById(document);
        return new Result(null, true, products, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateProductContract()))
    async post(@Body() product: Product) {
        try {
            await this.productService.create(product);
            return new Result('Produto cadastrado com sucesso!', true, product, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar seu cadastro ', false, null, error.toString()), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(`:document`)
    async put(@Param(`document`) document, @Body() product: Product) {
        try {
            await this.productService.update(document, product);
            return new Result('Produto alterado com sucesso!', true, product, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error.toString()), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(`:document`)
    async delete(@Param(`document`) document) {
        try {
            await this.productService.delete(document);
            return new Result('Produto removido com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível remover seu produto', false, null, error.toString()), HttpStatus.BAD_REQUEST);
        }
    }
}
