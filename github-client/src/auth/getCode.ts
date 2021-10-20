import * as http from "http";
import "cross-fetch/polyfill";
import fetch from "cross-fetch";
import open from "open";
import * as url from "url";
import * as keytar from "keytar";
const FormData = require("form-data");

const PORT = 3000;

/**
 * I really had to stare at this function for a long time to understand it.
 * First, we create the server that will serve as the return URL for GitHub.
 * What's really confusing is that our return URL is localhost:3000, so the
 * return URL isn't like... being accessed by GitHub. What's going on is our
 * client is also its own server. It's really freaking weird.
 *
 * So, what GitHub does it when the page is opened (see function call at end)
 * you're directed to a page where, after you log in (or if you're already
 * logged in and accepting the API) it forwards your browser to, say,
 * "http://localhost:3000/?code=6373298ec5c2b2963ddc&state=abc"
 * That's the server getting it. With that it immediately makes a request to
 * GitHub with that code, along with other specificying information, and gets
 * the sweet-sweet token in return.
 *
 * @returns
 */
export const getCode = () => {
  return new Promise((resolve, reject) => {
    http
      .createServer(function (req, res) {
        if (!req.url) {
          return;
        }
        const { code } = url.parse(req.url, true).query;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(`The code is: ${code}`);
        res.end();

        (async () => {
          const data = new FormData();
          data.append("client_id", process.env.CLIENT_ID!);
          data.append("client_secret", process.env.CLIENT_SECRET!);
          data.append("code", `${code}`);
          data.append("state", "abc");
          data.append("redirect_uri", "http://localhost:3000");

          fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            body: data,
            headers: {
              Accept: "application/json",
            },
          })
            .then((res: any) => res.json())
            .then(async (data: any) => {
              // Saving the token we got from github.
              await keytar.setPassword(
                "github",
                process.env.CLIENT_ID!, // Remember, ! means you insist it's not null.
                data.access_token
              );
              resolve(data.access_token);
            });
        })();
      })
      .listen(PORT);
    open(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user%20read:org%20public_repo%20admin:enterprise&state=abc`
    );
  });
};
