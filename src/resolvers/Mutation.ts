export default {
  createProduct(parent, args, { db }, info) {
    const product = {
      ...args.data,
      id: String(Math.floor(1000 * Math.random())),
    };
    db.push(product);
    return product;
  },
};
