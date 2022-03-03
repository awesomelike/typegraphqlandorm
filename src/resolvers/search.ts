import { Context } from 'apollo-server-core';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { SearchResult } from '../entities/SearchResult';
import { IContext } from '../types';

@Resolver()
export class SearchResolver {
  @Query(() => [SearchResult])
  async search(
    @Arg('string') string: string,
    @Ctx() ctx: Context<IContext>
  ): Promise<Array<typeof SearchResult>> {
    const lower = `%${string.toLowerCase()}%`;
    const productsResult = await ctx.dbClient.query(
      `SELECT * FROM products WHERE title ILIKE $1 OR description ILIKE $1`,
      [lower]
    );

    const categoriesResult = await ctx.dbClient.query(
      `SELECT * FROM categories WHERE name ILIKE $1`,
      [lower]
    );

    const products = productsResult?.rows || [];
    const categories = categoriesResult?.rows || [];

    return [...products, ...categories];
  }
}
