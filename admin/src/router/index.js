import pathToRegexp from 'path-to-regexp';

export default class Router {
  constructor(options) {
    this.middleware = options.middleware || [];
    this.routes = options.routes || [];
    this.defaultRoute = options.defaultRoute;
  }

  route = async (event) => {
    const processedEvent = await this.middleware.reduce((p, m) => p.then(m), Promise.resolve(event));

    const route = this.routes.find(route => this.checkRoute(route, event)) || [null, null, this.defaultRoute];

    return await (Array.isArray(route[2]) ? route[2] : [route[2]]).reduce((p, r) => p.then(r), Promise.resolve(event));
  }

  checkRoute = (route, event) => {
    // match method and path
    const methodMatches = route[0].toUpperCase() === 'ANY' ||
      ((event.httpMethod || '').toUpperCase() === route[0].toUpperCase());

    if (methodMatches) {
      const keys = [];
      const re = pathToRegexp(route[1], keys);
      const results = re.exec(event.path);

      if (results) {
        // add parsed path results to event.pathParameters to make it easy to interchange with apigateway routing
        event.pathParameters = event.pathParameters || {};

        keys.forEach(function (key, index) {
          event.pathParameters[key.name] = results[index + 1];
        });

        return true;
      }
    }

    return false;
  }
}
