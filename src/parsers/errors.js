const { PathError, InvalidTypeError } = require('../errors');

const parseError = (error) => {
  const errorDisplay = error?._attributes?.display;
  const errorReason = error?._attributes?.is;
  const errorHref = error?._attributes?.href;
  if (errorDisplay || errorReason) {
    if (errorReason == 'obix:BadUriErr' || errorDisplay.includes('Path depth') || errorDisplay.includes('Invalid name in path'))
      throw new PathError(errorDisplay, errorReason, errorHref);
    else if (errorDisplay?.includes('Invalid')) throw new InvalidTypeError();
    else throw new Error(errorReason || errorDisplay);
  }
};

module.exports = { parseError };
