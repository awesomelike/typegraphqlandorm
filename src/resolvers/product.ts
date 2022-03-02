import { Context } from 'apollo-server-core';
import { Arg, Ctx, Query, Resolver, Mutation } from 'type-graphql';
import { Product, CreateProductInput } from '../entities';
import { IContext } from '../types';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  products(@Ctx() ctx: Context<IContext>) {
    return ctx.db.products;
  }

  @Query(() => Product, { nullable: true })
  product(@Arg('id') id: string, @Ctx() ctx: Context<IContext>) {
    return ctx.db.products.find((product) => product.id === id);
  }

  @Mutation(() => Product)
  createProduct(
    @Arg('data') data: CreateProductInput,
    @Ctx() ctx: Context<IContext>
  ) {
    const product = {
      ...data,
      id: String(Math.floor(1000 * Math.random())),
    };
    ctx.db.products.push(product);
    return product;
  }
}
