const { sign, verify } = require('jsonwebtoken');

const { adminSecret, userSecret, mailSecret, mediaSecret } = require('./signatures');

function signAdminToken(data) {
  return sign(data, adminSecret);
}
function verifyAdminToken(token) {
  return verify(token, adminSecret);
}

function signMailToken(data) {
  return sign(data, mailSecret);
}
function verifyMailToken(token) {
  return verify(token, mailSecret);
}

function signUserToken(data) {
  return sign(data, userSecret);
}
function verifyUserToken(token) {
  return verify(token, userSecret);
}

function signMediaToken(data) {
  return sign(data, mediaSecret);
}
function verifyMediaToken(token) {
  return verify(token, mediaSecret);
}

module.exports = {
  signAdminToken,
  signMailToken,
  signUserToken,
  signMediaToken,
  verifyAdminToken,
  verifyMailToken,
  verifyUserToken,
  verifyMediaToken,
};
