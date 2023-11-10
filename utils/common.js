export function header({ title }) {
  return {
    headerTitle: title,
    headerShown: true,
  };
}

export function checkCorrectPassword(password) {
  let state = {
    correct: false,
    error: "",
  };
  state = checkCorrectInput(password, "password");
  if (password.length < 4) {
    state.error = "Password must be at least 4 characters";
    state.correct = false;
    return state;
  }

  if (validatePassword(password) == false) {
    state.correct = false;
    state.error =
      "Password must contain at least 1 uppercase, 1 digit, 1 special symbol";
    return state;
  }

  if (state.error == "") state.correct = true;
  return state;
}

export function checkCorrectUsername(username) {
  let state = {
    correct: false,
    error: "",
  };
  state = checkCorrectInput(username, "Username");
  return state;
}

const hasWhiteSpace = (s) => {
  return s.indexOf(" ") >= 0;
};

function checkCorrectInput(inputText, typeInput) {
  let state = {
    correct: false,
    error: "",
  };
  if (hasWhiteSpace(inputText)) {
    state.error = typeInput + " has white space";
    return state;
  }

  if (inputText == "" || inputText == null) {
    state.error = typeInput + " is empty";
    return state;
  }

  if (state.error == "") state.correct = true;

  return state;
}

function validatePassword(password) {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}
