const fixtures = require("express").Router();
const axios = require("axios");
const cache = require("../cache/cache");

/**
 * Fixture details
 */
fixtures.get("/gameweeks", async (req, res, next) => {
  try {
    const eventsCache = cache.get("events");
    if (eventsCache) {
      res.send(eventsCache);
    } else {
      const { data } = await axios.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      cache.set("events", data["events"]);
      console.log(data["events"][0]);
      res.send(data["events"]);
    }
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
});

/**
 * Fixture details
 */
fixtures.get("/:fixtureId", async (req, res, next) => {
  try {
    const { fixtureId } = req.params;
    const { data } = await axios.get(
      "https://fantasy.premierleague.com/api/fixtures/"
    );
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
    next(error);
  }
});

module.exports = fixtures;
