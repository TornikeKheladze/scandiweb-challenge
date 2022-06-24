export const getProductsByCategory = (categoryName) => {
  return fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
           category(input : {
             title : "${categoryName}"
           }) {
               name
               products {
                  id
                  name
                  inStock
                  gallery
                  description
                  category
                  attributes {
                    id
                    name
                    type
                    items {
                      displayValue
                      id
                      value
                    }
                  }
                  prices {
                    currency {
                      label
                      symbol
                    }
                    amount
                  }
                  brand
                }
           }
        }
          `,
    }),
  });
};

export const getCurrencies = fetch("http://localhost:4000", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      query getCurrencies  {
        currencies {
          label
          symbol
        }
      }
            `,
  }),
});

export const getCategories = fetch("http://localhost:4000", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `
      query categories {
        categories {
          name
        }
      }
            `,
  }),
});

export const getSingleProduct = (productId) => {
  return fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
           product(id : "${productId}") {
            id
            name
            inStock
            gallery
            description
            category
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            prices{
              currency {
                label
                symbol
              }
              amount
            }
            brand
          }
        }
          `,
    }),
  });
};
