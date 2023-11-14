async function test() {
  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("x-apikey", "5J0jCR1dAkvDt3YVoahpux0eawahkQB9");
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2ZDM1NWQ5Zi1jMDMwLTQzYjgtNWYxMC0wOGRiZGI1ZmMxMjgiLCJFbWFpbCI6Im5oYW1xczIwMDJAZ21haWwuY29tIiwiVXNlcm5hbWUiOiJuaGFtcXMyMDAyIiwiSXNBY3RpdmUiOiJGYWxzZSIsIm5iZiI6MTY5ODkwMDg5MywiZXhwIjoxNjk4OTExNjkzLCJpYXQiOjE2OTg5MDA4OTMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvIn0.dYHmw7kUedEARSFpli2dw5eg1aHoWszhioU2ttpvIeI"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch("https://api.firar.live/api/Channel/byname/123", requestOptions)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        if (response.status === 401) {
          // Handle 401 Unauthorized error here
          console.log("Unauthorized");
        }
        if (response.status == 400) {
          console.log("other error");
        }
      } else return response.json();
    })
    .catch((error) => {
      console.log(
        "There has been a problem with your fetch operation: ",
        error
      );
    });
}

test();


