const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let port = 3001;

let registerCount = 0;
app.post("/register", (req, res) => {
  registerCount += 1;

  if (registerCount % 3 === 0) {
    res.status(500).send(`register failed (attempt: ${registerCount})`);
  } else {
    if (!("first_name" in req.body && "last_name" in req.body && "email" in req.body)) {
      res.status(400).send(`bad request, something is missing (attempt: ${registerCount})`);
      return;
    } else {
      res.send(`register succeeded (attempt: ${registerCount}), body: ${JSON.stringify(req.body)}`);
      return;
    }
  }
});

const resources = {
  1: {
    id: 1,
    user_id: 1,
    device_id: 1,
  },
  2: {
    id: 2,
    user_id: 2,
    device_id: 2,
  },
  3: {
    id: 3,
    user_id: 3,
    device_id: 3,
  },
};

const users = {
  1: {
    id: 1,
    name: "Jon",
  },
  2: {
    id: 2,
    name: "Max",
  },
  3: {
    id: 3,
    name: "Jane",
  },
};

const devices = {
  1: {
    id: 1,
    name: "Device 1",
  },
  2: {
    id: 2,
    name: "Device 1",
  },
  // device 3 is missing on purpose
};

app.get("/resources", (req, res) => {
  res.send(JSON.stringify(resources));
});

app.get("/resources/:resourceId", (req, res) => {
  const resourceId = req.params["resourceId"];
  if (resourceId in resources) {
    res.send(JSON.stringify(resources[resourceId]));
  } else {
    res.status(404).send("resource not found");
  }
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params["userId"];
  if (userId in users) {
    res.send(JSON.stringify(users[userId]));
  } else {
    res.status(404).send("user not found");
  }
});

app.get("/devices/:deviceId", (req, res) => {
  const deviceId = req.params["deviceId"];
  if (deviceId in devices) {
    setTimeout(() => {
      res.send(JSON.stringify(devices[deviceId]));
    }, 2000);
  } else {
    res.status(404).send("device not found");
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
