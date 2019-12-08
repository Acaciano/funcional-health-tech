import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot(process.env.CONNECTION_STRING), ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
