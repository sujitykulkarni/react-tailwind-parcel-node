const teams = require("express").Router();
const axios = require("axios");
const cache = require("../cache/cache");

/**
 * List of elements
 */
teams.get("/", async (req, res) => {
  try {
    const teamsCache = cache.get("teams");
    if (teamsCache) {
      res.send(teamsCache);
      return;
    } else {
      const { data } = await axios.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      cache.set("teams", data["teams"]);
      res.send(data["teams"]);
    }
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
});

module.exports = teams;
