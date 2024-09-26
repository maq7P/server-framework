const Router = require("../core/Router");

const router = new Router();

const users = [
  { id: 1, name: "admin" },
  { id: 2, name: "Max" },
];
const posts = [
  { id: 1, title: "title", description: "description" },
  { id: 2, title: "title", description: "description" },
];

router.get("/users", (req, res) => {
  res.send(users);
});

router.post("/users", (req, res) => {
  const user = req.body;
  console.log(user);
  users.push(user);

  res.send(users);
});

router.get("/posts", (req, res) => {
  res.send(posts);
});

module.exports = router;
