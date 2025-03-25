/**
 * Configuration for different Shopify stores
 * Each store has its own configuration object with all necessary details
 */
const sites = {
  torpedo: {
    domain: process.env.TORPEDO_STORE_DOMAIN,
    apiVersion: "2024-01",
    tokens: {
      storefront: process.env.TORPEDO_STORE_STOREFRONT_TOKEN,
      admin: process.env.TORPEDO_STORE_ADMIN_TOKEN,
    },
    corsOrigins: ["https://main-store.myshopify.com", "http://localhost:3000"],
  },
};

module.exports = sites;
