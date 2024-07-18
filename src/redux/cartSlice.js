import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isOpen: false,
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart(state) {
            state.isOpen = !state.isOpen;
        },
        addItemToCart(state, action) {
            const {id, img, title, dateDelivery, price, count = 1} = action.payload;

            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity = count;
            } else {
                state.items.push({id, img, title, dateDelivery, price, count});
            }

            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
    },
});

export const {toggleCart, addItemToCart} = cartSlice.actions;

export default cartSlice.reducer;