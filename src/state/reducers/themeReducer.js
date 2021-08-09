const reducer = (state = 'dark', action) => {
    switch (action.type) {
        case "changeTheme":
            return state == 'light' ? ('dark') : ('light');
        default:
            return state;
    }
}

export default reducer;