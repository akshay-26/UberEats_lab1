
const initialState = { cart: [] };

const CartReducer = (state = initialState, action) =>{

    switch(action.type) {
        case 'Cart' :
            state={
                ...state,
                cart :action.payload
            }
            console.log('inside reducer', state);
    }
    return state;
}

export default CartReducer;