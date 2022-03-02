import { createUnionType } from 'type-graphql';
import { Product, Category } from '.';

export const SearchResult = createUnionType({
  name: 'SearchResult',
  types: () => [Product, Category],
  resolveType: (obj) => {
    if ('name' in obj) {
      return Category;
    }
    if ('price' in obj) {
      return Product;
    }
    return null;
  },
});
