export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  console.log('-===-=-=-', state);
  // Calculate items price
  state.itemsPrice = Number(
    addDecimals(
      state.cartItems.reduce((acc, item) => {
        return acc + item.price * item.qty;
      }, 0)
    )
  );
  // );

  // Calculate shipping price(if order > Rs100 then free else Rs10 shipping)
  state.shippingPrice = Number(addDecimals(state.itemsPrice > 100 ? 0 : 10));

  // Calculate tax price(15% tax)
  state.taxPrice = Number(
    addDecimals(Number(0.15 * state.itemsPrice).toFixed(2))
  );

  // Calculate total price
  state.totalPrice = Number(
    (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2)
  );

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
