var myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("x-apikey", "5J0jCR1dAkvDt3YVoahpux0eawahkQB9");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  Email: "haidangltv@gmail.com",
  Username: "test",
  Password: "1234",
  FirstName: "string",
  LastName: "string",
  Phone: "3",
  Gender: true,
  BirthDay: "2023-11-08T07:36:16.447Z",
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

async function fetchData() {
  const result = await fetch(
    "https://api.firar.live/api/Auth/signup",
    requestOptions
  );
  return result.json();
}

const data = await fetchData();

console.log(data);
