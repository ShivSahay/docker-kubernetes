
const sendResponse = (res, { data, message, code, status = true }) => {
  res.status(code || 200).send({
    message,
    status,
    statusCode: code || 200,
    data,
  });
};

const sendUpdateResponse = (
  res,
  { data, message, code, status = true, updateAvailable = false }
) => {
  res.status(code || 200).send({
    message,
    status,
    statusCode: code || 200,
    data,
    updateAvailable,
  });
};

const sendAccessTokenResponse = (
  res,
  { data, message, accessToken, code, status = true }
) => {
  res.status(code || 200).send({
    data,
    status,
    message,
    accessToken,
    statusCode: code || 200,
  });
};

const sendMessageResponse = async (res, { message, code, status = true }) => {
  res.status(code || 200).send({
    statusCode: code || 200,
    status,
    message,
  });
};

module.exports = {
  sendResponse,
  sendUpdateResponse,
  sendAccessTokenResponse,
  sendMessageResponse,
};
