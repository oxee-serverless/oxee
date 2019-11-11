const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;

export const authorize = (event) => {
  event.authorizer = {
    authorized: false
  };

  if (Object.keys(event.headers).includes('Authorization')) {
    if (event.headers['Authorization'] !== `Basic ${Buffer.from(`${AWS_ACCESS_KEY_ID}:${AWS_SECRET_ACCESS_KEY}`).toString('base64')}`) {
      event.authorizer.error = {
        statusCode: 401,
        message: 'Unauthorized Basic API access.'
      };
    } else {
      event.authorizer.authorized = true;
    }
  } else if (event.bodyObject !== null &&
    typeof (event.bodyObject.AWS_ACCESS_KEY_ID) !== 'undefined' &&
    event.httpMethod.toUpperCase() !== 'POST'
  ) {
    event.authorizer.error = {
      statusCode: 403,
      message: 'Only POST requests can be authorized using body.'
    };
  } else if (!(
    event.bodyObject.AWS_ACCESS_KEY_ID === AWS_ACCESS_KEY_ID && 
    event.bodyObject.AWS_SECRET_ACCESS_KEY === AWS_SECRET_ACCESS_KEY
  )) {
    event.authorizer.error = {
      statusCode: 401,
      message: 'Unauthorized API access.'
    };
  } else {
    event.authorizer.authorized = true;
  }

  return Promise.resolve(event);
};
