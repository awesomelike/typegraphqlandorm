import { Context } from 'apollo-server-core';
import {
  Resolver,
  Query,
  Ctx,
  FieldResolver,
  Root,
  Mutation,
  Arg,
} from 'type-graphql';
import { Category, Product, CreateCategoryInput } from '../entities';
import { IContext } from '../types';

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories(@Ctx() ctx: Context<IContext>) {
    const result = await ctx.dbClient.query('SELECT * FROM categories');
    return result?.rows || [];
  }

  @FieldResolver(() => [Product])
  async products(@Root() category: Category, @Ctx() ctx: Context<IContext>) {
    const result = await ctx.dbClient.query(
      'SELECT * FROM products WHERE category=$1',
      [category.id]
    );
    return result?.rows || [];
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg('data') { name }: CreateCategoryInput,
    @Ctx() ctx: Context<IContext>
  ) {
    const result = await ctx.dbClient.query(
      'INSERT INTO categories(name) VALUES($1) RETURNING *',
      [name]
    );

    return result?.rows?.[0];
  }
}
