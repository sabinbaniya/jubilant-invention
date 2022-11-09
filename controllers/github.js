const axios = require("axios");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const github = async (req, res) => {
  if (!!req.body.code) {
    console.log("inside");
    try {
      const axiosInstance = new axios.Axios({
        headers: {
          // "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const resp = await axiosInstance.post(
        `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.body.code}`
      );

      const responseFromGithub = JSON.parse(resp.data);

      console.log(responseFromGithub);

      if (responseFromGithub.access_token) {
        console.log("Authenticated from github");
        const resp2 = await axiosInstance.get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${responseFromGithub.access_token}`,
          },
        });

        // console.log(resp2.data);
        const result = JSON.parse(resp2.data);
        console.log(result);
        if (resp2.status === 200) {
          try {
            const token = jwt.sign(
              {
                uid: result.id,
                name: result.name,
                image: result.avatar_url,
                // email: result.email,
                github_join_date: result.created_at,
              },
              process.env.JWT_SECRET
            );

            const clientCookie = cookie.serialize("access_token", token, {
              maxAge: 30 * 24 * 60 * 60,
            });

            // res.setHeader("Set-Cookie", clientCookie);
            return res.json({
              status: "success",
              msg: "Sucessfully authenticated",
              cookie: clientCookie,
            });
          } catch (error) {}
        }
        console.log(result);
      } else {
        console.log("Not authenticated from github");
        return res.json({ data_err: responseFromGithub.error_description });
      }
    } catch (error) {
      console.log(error);
      return res.json({ error: error });
    }
  }
  console.log("outside");
  return res.json({ msg: req.body });
};

module.exports = github;
