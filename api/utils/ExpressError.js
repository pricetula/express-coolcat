function ExpressError (
  message,
  status
) {
  this.message = message;
  this.status = status;
}

ExpressError.prototype = new Error();

module.exports = ExpressError;
