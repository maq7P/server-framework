const Application = require("../core/Application");
const router = require("./user-router");
const parseJson = require("../core/middleware/parseJson");

const app = new Application();

app.use(parseJson);
app.addRouter(router);

app.start(3030);
