import parseJson from 'json-parse-better-errors';
import qs from 'qs';

const parseBodyAsObject = (event) => {
  if (typeof event.body !== 'string') {
    event.bodyObject = event.body;
    return Promise.resolve(event);
  }

  try {
    event.bodyObject = parseJson(event.body);
  } catch (jsonErr) {
    try {
      event.bodyObject = qs.parse(event.body);
    } catch (qsErr) {
      event.errors.push({
        message: "Unable to parse body string!"
      })
    }
  }

  return Promise.resolve(event);
};

export default parseBodyAsObject;
