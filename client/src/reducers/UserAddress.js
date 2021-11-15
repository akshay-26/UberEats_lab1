
const initialState = {  address: {} };

const UserAddress = (state = initialState, action) =>{

    switch(action.type) {
        case 'UserAddress' :
            state={
                ...state,
                address :action.payload
            }
            console.log('inside reducer', state);
    }
    return state;
}

export default UserAddress;