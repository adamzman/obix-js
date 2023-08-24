const { UnknownTypeError } = require('../errors');
const { makeArray } = require('../helpers');
const { parseError } = require('./errors');

const parseValueType = ({ enum: enu, bool, str, real }) => {
  let value, action, path;
  const getAction = (attributes) => (attributes.displayName == 'Out' ? 'read' : 'write');

  // enum is a reserved keyword in js; must cast it to different variable name
  if (enu) {
    path = getPath(enu._attributes);
    value = enu._attributes.val;
    action = getAction(enu._attributes);
  } else if (bool) {
    path = getPath(bool._attributes);
    value = bool._attributes.val == 'true';
    action = getAction(bool._attributes);
  } else if (str) {
    path = getPath(str._attributes);
    value = str._attributes.val;
    action = getAction(str._attributes);
  } else if (real) {
    path = getPath(real._attributes);
    value = Number(real._attributes.val);
    action = getAction(real._attributes);
  } else {
    throw new UnknownTypeError();
  }
  return { path, value, action };
};

const buildOutputList = (data) => {
  data = data.obj || data;
  return [...buildErrorList(data), ...buildValuesList(data)];
};

const buildValuesList = (data) => {
  const realArray = makeArray(data.list.real).map((real) => ({ real }));
  const boolArray = makeArray(data.list.bool).map((bool) => ({ bool }));
  const strArray = makeArray(data.list.str).map((str) => ({ str }));
  const enumArray = makeArray(data.list.enum).map((enu) => ({ enum: enu }));
  return [...realArray, ...boolArray, ...strArray, ...enumArray].map((objType) => parseValueType(objType));
};

const buildErrorList = (data) => {
  const errorList = [];
  const errorArray = makeArray(data.list.err);
  errorArray.forEach((e) => {
    try {
      parseError(e);
    } catch (error) {
      errorList.push({ path: getPath(e._attributes), reason: error.message, error: true });
    }
  });
  return errorList;
};

const getPath = (attributes) => {
  const pathAttribute = attributes.href || attributes.range;
  return pathAttribute?.match('(?<=/obix/config/).+?(?=/out/|/set/)')?.[0] || pathAttribute?.match('(?<=/obix/config/).*(?=/)')?.[0];
};

module.exports = { parseValueType, buildOutputList };
