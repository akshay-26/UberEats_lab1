
const initialState = {  RestaurantOrder: {} };

const RestaurantOrder = (state = initialState, action) =>{

    switch(action.type) {
        case 'RestaurantOrder' :
            state={
                ...state,
                RestaurantOrder :action.payload
            }
            console.log('inside reducer', state);
    }
    return state;
}

export default RestaurantOrder;