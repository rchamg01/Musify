const express = require("express");
const request = require("request");
const cors = require("cors");
const querystring = require("query-string");
const app = express();
app.use(express.static(__dirname + "/public")).use(cors());

const client_id = "";
const client_secret = "";
const redirect_uri = "http://localhost:8082/callback/";
const server_address = "http://localhost:8080?"; // by default it should be http://localhost:8080 or 8081 by default
const frontend_server_port = "8082"; // Vue server port (8080 or 8081 by default)
const scopes =
  "user-read-private user-read-email user-follow-read playlist-read-private user-read-recently-played user-top-read ";
//https: developer.spotify.com/documentation/general/guides/authorization-guide/#scopes
app.get("/login", function(req, res) {
  // redirect to Spotify login page
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      client_id +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri)
  );
  res.send();
});

app.get("/callback", function(req, res) {
  //change '/callback' if your redirect_uri has different ending (without slash at the end)
  // after successful login make api call to get you profile's data
  const code = req.query.code || null;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      const refresh_token = body.refresh_token;
      //pass the tokens to the browser as a query params to make requests from there
      res.redirect(
        server_address +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          })
      );
    } else {
      res.redirect(
        server_address +
          querystring.stringify({
            error: "invalid_token",
          })
      );
    }
  });
});

// port on where Vue app is running
// eslint-disable-next-line no-console
console.log("App listening on port:" + (frontend_server_port - 2));
app.listen(frontend_server_port);
