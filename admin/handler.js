import routes from './src/routes';

export const handle = async (event, context) => {
  event._context = context

  const result = await routes.route(event);

  if (typeof (event.authorizer) !== 'undefined' && !event.authorizer.authorized) {
    const {
      statusCode,
      message
    } = event.authorizer.error;

    console.error(message);

    return {
      statusCode,
      body: message
    };
  }

  return result;
};
