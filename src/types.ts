import { Product } from './entities/Product';

export interface IContext {
  db: {
    products: Product[];
  };
}
