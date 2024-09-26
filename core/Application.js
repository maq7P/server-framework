const http = require("http");
const { EventEmitter } = require("stream");
const parseBody = require("./middleware/parseBody");

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  start(port = 5050) {
    this.server.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  }

  addRouter(router) {
    const endpoints = router.endpoints;

    Object.keys(endpoints).forEach((path) => {
      const endpoint = endpoints[path];

      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];

        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          this.middlewares.forEach((middleware) => middleware(req, res));

          handler(req, res);
        });
      });
    });
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  _createServer() {
    return http.createServer((req, res) => {
      parseBody(req, res, () => {
        const emitted = emitter.emit(
          this._getRouteMask(req.url, req.method),
          req,
          res
        );

        if (!emitted) {
          res.end();
        }
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
};
