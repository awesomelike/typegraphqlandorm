import {
  Arg,
  Query,
  Resolver,
  Mutation,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Product, CreateProductInput, Category } from '../entities';

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    const result = await Product.find();
    return result || [];
  }

  @Query(() => Product, { nullable: true })
  async product(@Arg('id') id: number) {
    return Product.findOne({ id });
  }

  @FieldResolver()
  async category(@Root() product: Product) {
    const result = await Category.findOne({ id: product.category });
    return result || null;
  }

  @Mutation(() => Product)
  async createProduct(@Arg('data') data: CreateProductInput) {
    return Product.create(data).save();
  }
}
