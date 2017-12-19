module.exports = {
  hello: (req, res, next) => {
    res.json(
      {
        message: 'Hello User',
        error: false
      }
    );
  }
};
