export const initialState = {
  basket: [],
  user: null
};

// Selector
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      let data = 
          {
          interaction: 
            {
              name: "Add To Basket",
              lineItem: 
                {
                  catalogObjectType: "Product",
                  catalogObjectId: "product-1",
                  quantity: 1,
                  price: item.price,
                  currency: "USD",
                  attributes: 
                      {
                          giftWrapping: true
                      }
                 }
             }
          }
      fetch('https://putsreq.com/G2uibGUkE5WGZdywAroG', 
      {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type':    'application/json'
               },
      body: JSON.stringify(data),
      })
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      }

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);

      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }

      return {
        ...state,
        basket: newBasket
      }
    
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
};

export default reducer;
