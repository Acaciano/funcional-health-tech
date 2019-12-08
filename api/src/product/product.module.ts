import { Module, CacheModule, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repository/product.repository';

@Module({
    imports: [
        CacheModule.register(),
        MongooseModule.forFeature([
            {
                name: 'Product',
                schema: ProductSchema,
            },
        ]),
        HttpModule,
    ],
    controllers: [ProductController],
    providers: [ProductRepository, ProductService],
})
export class ProductModule {
}
