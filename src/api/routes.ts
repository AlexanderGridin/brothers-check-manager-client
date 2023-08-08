export const routes = {
  checks: {
    get: "/checks",
    create: "/checks",
    update: "/checks",
    delete: "/checks",
  },

  products: {
    getAll: "/products",
    delete: "/products/{productId}",
    update: "/products",
    create: "/products",
  },

  stores: {
    getAll: "/stores",
    create: "/stores",
    delete: "/stores/{storeId}",
    update: "/stores",
  },
};
