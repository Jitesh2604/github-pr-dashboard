import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";
import "./auth.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get(
  "/auth/github",
  (req, res, next) => {
    console.log("Redirecting to GitHub OAuth");
    next();
  },
  passport.authenticate("github", { scope: ["user", "repo"] })
);

app.get(
  "/auth/github/callback",
  (req, res, next) => {
    console.log("Callback query:", req.query);
    next();
  },
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/profile", async (req, res) => {
  if (!req.user) return res.redirect("/");

  const axios = (await import("axios")).default;

  try {
    const repoResponse = await axios.get(
      `https://api.github.com/users/${req.user.username}/repos`,
      {
        headers: {
          Authorization: `token ${req.user.token}`,
        },
      }
    );

    const repos = repoResponse.data.map((r) => r.name);
    const owner = req.user.username;

    const prFetches = repos.map(async (repo) => {
      const prRes = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`,
        {
          headers: {
            Authorization: `token ${req.user.token}`,
          },
        }
      );

      return prRes.data.map((pr) => ({
        repo,
        title: pr.title,
        state: pr.state,
        url: pr.html_url,
        created_at: pr.created_at,
        merged_at: pr.merged_at,
      }));
    });

    const prResults = await Promise.all(prFetches);
    const allPRs = prResults.flat();

    const openPRs = allPRs.filter((pr) => pr.state === "open");
    const closedPRs = allPRs.filter(
      (pr) => pr.state === "closed" && !pr.merged_at
    );
    const mergedPRs = allPRs.filter((pr) => pr.merged_at);

    res.render("profile", {
      user: req.user,
      openPRs,
      closedPRs,
      mergedPRs,
    });
  } catch (err) {
    console.error("Error fetching PRs:", err.message);
    res.send("Error fetching PRs: " + err.message);
  }
});

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
