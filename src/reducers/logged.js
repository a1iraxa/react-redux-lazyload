const loggedReducer = (state = 0, action) => {

    switch (action.type) {
        case "SING_IN":
            return !state

        default:
            return state;
    }
}

export default loggedReducer;
