import { Context } from 'apollo-server-core';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { SearchResult } from '../entities/SearchResult';
import { IContext } from '../types';

@Resolver()
export class SearchResolver {
  @Query(() => [SearchResult])
  search(
    @Arg('string') string: string,
    @Ctx() ctx: Context<IContext>
  ): Promise<Array<typeof SearchResult>> {
    const lower = string.toLowerCase();
    return Promise.resolve([
      ...ctx.db.products.filter(
        ({ title, description }) =>
          title?.toLowerCase().includes(lower) ||
          description?.toLowerCase().includes(lower)
      ),
      ...ctx.db.categories.filter(({ name }) =>
        name?.toLowerCase().includes(lower)
      ),
    ]);
  }
}
