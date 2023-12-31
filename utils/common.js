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
  state = checkCorrectInput(password, "Password");
  if (state.correct == false) return state;

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

export function checkCorrectEmail(email) {
  let state = {
    correct: false,
    error: "",
  };
  state = checkCorrectInput(email, "Email");
  if (state.correct == false) return state;

  if (validateEmail(email) == false) {
    state.correct = false;
    state.error = "Email incorrect format";
    return state;
  }
  if (state.error == "") state.correct = true;

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
  if (inputText == "" || inputText == null) {
    state.error = typeInput + " is empty";
    return state;
  }
  if (hasWhiteSpace(inputText)) {
    state.error = typeInput + " has white space";
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

function validateEmail(email) {
  let format = /\S+@\S+\.\S+/;
  return format.test(email);
}

export function compareSendAt(msg1, msg2) {
  if (msg1.sendAt > msg2.sendAt) return -1;
  if (msg1.sendAt < msg2.sendAt) return 1;
  return 0;
}

export function getShortDatetimeSendAt(sendAt) {
  try {
    let time = new Date(sendAt);
    const timeFormat = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    let dayFormat = time.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
      .split('/').reverse().join('/');
    if (!checkIsThisYear(time)) dayFormat = dayFormat + "/" + time.getFullYear();
    if (checkIsToday(time))
      return timeFormat;
    return dayFormat + " " + timeFormat;
  } catch {
    return "";
  }
}

export function getShortDate(date) {
  try {
    let time = new Date(date);
    let dayFormat = time.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
      .split('/').reverse().join('/');
    dayFormat = dayFormat + "/" + time.getFullYear();
    return dayFormat;
  } catch {
    return "";
  }
}
function checkIsToday(time) {
  try {
    const now = new Date();
    if (now.getDay() == time.getDay() &&
      now.getMonth() == time.getMonth() &&
      now.getFullYear() == time.getFullYear()) return true;
    return false;
  } catch {
    return false;
  }
}

function checkIsThisYear(time) {
  try {
    const now = new Date();
    if (now.getFullYear() == time.getFullYear())
      return true;
    return false;

  } catch {
    return false;
  }
}



export const emojis = [{
  key: 128405,
  code: 128405,
}];
for (i = 128147; i <= 128150; i++) {
  emojis.push({
    key: i,
    code: i,
  });
}
for (i = 128077; i <= 128080; i++) {
  emojis.push({
    key: i,
    code: i,
  });
}
for (i = 128512; i <= 128530; i++) {
  emojis.push({
    key: i,
    code: i,
  });
}
