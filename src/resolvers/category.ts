import { Context } from 'apollo-server-core';
import { Resolver, Query, Ctx, FieldResolver, Root } from 'type-graphql';
import { Category, Product } from '../entities';
import { IContext } from '../types';

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category])
  categories(@Ctx() ctx: Context<IContext>) {
    return ctx.db.categories;
  }

  @FieldResolver(() => [Product])
  products(@Root() category: Category, @Ctx() ctx: Context<IContext>) {
    return ctx.db.products.filter(
      (product) => product.category === category.id
    );
  }
}
