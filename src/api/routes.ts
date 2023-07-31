export const routes = {
  checks: {
    get: "/checks",
    create: "/checks",
    update: "/checks",
    delete: "/checks",
  },
  products: {
    getAll: "/products",
    delete: "/products?id={productId}",
    update: "/products",
    create: "/products",
  },
};
