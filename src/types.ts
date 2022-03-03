import { PoolClient } from 'pg';
import { Category } from './entities/Category';
import { Product } from './entities/Product';

export interface IContext {
  db: {
    products: Product[];
    categories: Category[];
  };
  dbClient: PoolClient;
}
