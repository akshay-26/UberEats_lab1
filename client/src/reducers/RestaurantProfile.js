
const initialState = { user: []};

const UserReducer = (state = initialState, action) =>{

    switch(action.type) {
        case 'USERPROFILE' :
            state={
                ...state,
                user :action.payload
            }
            console.log('inside reducer', state);
    }
    return state;
}

export default UserReducer;