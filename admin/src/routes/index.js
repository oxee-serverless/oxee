import Router from '../router';
import timestampMiddleware from '../middleware/timestamp';
import bodyObjectMiddleware from '../middleware/body-object';
import {authorize} from '../authorizer';

import rootRoute from './root';
import defaultRoute from './default';

const routes = new Router({
  middleware: [
  	timestampMiddleware,
  	bodyObjectMiddleware
  ],
  routes: [
  	[ 'GET', '/', [ rootRoute ] ],
  	[ 'POST', '/', [ authorize, rootRoute ] ],
  	[ 'PUT', '/', [ authorize, rootRoute ] ]
  ],
  defaultRoute
});

export default routes;
