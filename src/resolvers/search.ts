import { Resolver, Query, Arg } from 'type-graphql';
import { Category, Product } from '../entities';
import { SearchResult } from '../entities/SearchResult';
import { ILike } from 'typeorm';

@Resolver()
export class SearchResolver {
  @Query(() => [SearchResult])
  async search(
    @Arg('string') string: string
  ): Promise<Array<typeof SearchResult>> {
    const lower = `%${string.toLowerCase()}%`;
    const products = await Product.find({
      where: [{ title: ILike(lower) }, { description: ILike(lower) }],
    });
    const categories = await Category.find({ name: ILike(lower) });

    return [...products, ...categories];
  }
}
