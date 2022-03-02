export default {
  products: (parent, args, { db }) => db,
  product(parent, args, { db }, info) {
    return db.find((product) => product.id === args.id);
  },
};
