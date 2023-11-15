export const authReducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isLoading: false,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        isLoading: false,
        userToken: null,
      };
    case "LOADING":
      return {
        isLoading: true,
        userToken: null,
      };
  }
};

export const initialAuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};
