//ejemplo de autenticacion con spotify: https://github.com/klswcz/spotify-auth-code-example-vue
const express = require("express");
const request = require("request");
const cors = require("cors");
const querystring = require("query-string");
const app = express();
app.use(express.static(__dirname + "/public")).use(cors());

const client_id = "bd3966fb1632480b8f804762288479ea";
const client_secret = "04a17ebb19064b4684de3ad59d7a92fb";
const redirect_uri = "http://localhost:8082/callback/";
const server_address = "http://localhost:8080?";
const frontend_server_port = "8082"; // Vue server port
const scopes =
  "user-read-private user-read-email user-follow-read playlist-read-private user-read-recently-played user-top-read ";
//https: developer.spotify.com/documentation/general/guides/authorization-guide/#scopes
app.get("/login", function(req, res) {
  // redirige a la página de login de Spotify
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
  //despues de logearse hacer la peticion para pedir información con el token
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
      //pasa los tokens al navegador como query params para hacer peticiones desde ahi
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

// eslint-disable-next-line no-console
console.log("App listening on port:" + (frontend_server_port - 2));
app.listen(frontend_server_port);
