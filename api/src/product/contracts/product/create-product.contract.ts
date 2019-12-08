import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Product } from 'src/shared/models/product.model';
import { Contract } from '../contract';

@Injectable()
export class CreateProductContract implements Contract {
    errors: any[];

    validate(model: Product): boolean {
        const flunt = new Flunt();

        flunt.isRequired(model.name, 'Nome do produto é obrigatório!');
        flunt.isRequired(model.description, 'Descrição do produto é obrigatório!');
        flunt.isRequired(model.industry, 'Indústria é obrigatório!');
        flunt.isRequired(model.sku, 'SKU do produto é obrigatório!');
        flunt.isRequired(model.amount, 'Quantidade de produto é obrigatório!');
        flunt.isRequired(model.price, 'Preço do produto é obrigatório!');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
