import { gql } from 'apollo-server-core';

export default gql`
  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
    product(id: String!): Product
  }

  input CreateProductInput {
    title: String!
    description: String!
    price: Float!
  }

  type Mutation {
    createProduct(data: CreateProductInput!): Product!
  }
`;
