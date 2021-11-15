
const initialState = {  CustomerOrder: {} };

const CustomerOrder = (state = initialState, action) =>{

    switch(action.type) {
        case 'CustomerOrder' :
            state={
                ...state,
                CustomerOrder :action.payload
            }
            console.log('inside reducer', state);
    }
    return state;
}

export default CustomerOrder;