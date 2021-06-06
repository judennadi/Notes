const authReducer = (state, action) => {
  if (action.type === "SET_USER") {
    return { ...state, user: action.payload };
  } else if (action.type === "TOGGLE_SWITCH") {
    if (state.isDarkMode === false) {
      return { ...state, isDarkMode: true };
    } else if (state.isDarkMode === true) {
      return { ...state, isDarkMode: false };
    }
  } else if (action.type === "SET_NOTES") {
    return { ...state, notes: action.payload };
  } else {
    return state;
  }
};

export default authReducer;
