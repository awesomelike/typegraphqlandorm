import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Mutation,
  Arg,
} from 'type-graphql';
import { Category, Product, CreateCategoryInput } from '../entities';

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories() {
    const result = await Category.find();
    return result || [];
  }

  @FieldResolver(() => [Product])
  async products(@Root() category: Category) {
    return Product.find({ category: category.id });
  }

  @Mutation(() => Category)
  async createCategory(@Arg('data') { name }: CreateCategoryInput) {
    return Category.create({ name }).save();
  }
}
