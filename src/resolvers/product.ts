import { Context } from 'apollo-server-core';
import {
  Arg,
  Ctx,
  Query,
  Resolver,
  Mutation,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Product, CreateProductInput } from '../entities';
import { IContext } from '../types';

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => [Product])
  async products(@Ctx() ctx: Context<IContext>) {
    const result = await ctx.dbClient.query('SELECT * FROM products');
    return result?.rows || [];
  }

  @Query(() => Product, { nullable: true })
  async product(@Arg('id') id: number, @Ctx() ctx: Context<IContext>) {
    const result = await ctx.dbClient.query(
      'SELECT * FROM products WHERE id=$1',
      [id]
    );
    return result?.rows?.[0];
  }

  @FieldResolver()
  async category(@Root() product: Product, @Ctx() ctx: Context<IContext>) {
    const result = await ctx.dbClient.query(
      'SELECT * FROM categories WHERE id=$1',
      [product.category]
    );
    return result?.rows?.[0] || null;
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('data') { title, description, price, category }: CreateProductInput,
    @Ctx() ctx: Context<IContext>
  ) {
    const result = await ctx.dbClient.query(
      'INSERT INTO products(title, description, price, category) VALUES($1, $2, $3, $4) RETURNING *',
      [title, description, price, category]
    );

    return result?.rows?.[0];
  }
}
