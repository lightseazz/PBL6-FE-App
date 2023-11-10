var myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("x-apikey", "5J0jCR1dAkvDt3YVoahpux0eawahkQB9");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  username: "dang",
  password: "1234",
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

async function test() {
  const result = await fetch(
    "https://api.firar.live/api/Auth/signin",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => error.json());

  console.log(result);
}

test();
