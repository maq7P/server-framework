module.exports = (req, res, onEnd) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    if (body) {
      req.body = JSON.parse(body);
    }

    onEnd();
  });
};
