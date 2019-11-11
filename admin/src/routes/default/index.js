const errorMessages = [
  "Nope, not found...",
  "Obi-Wan: This is not the API end-point you are looking for...",
  "The end-point you have requested could not be found...",
  "Nothing sexier than a random 404 message when the end-point you were looking for was not found ;)",
  "You have reached the event horizon of this API..."
];

export const route = (event) => {
  return Promise.resolve({
    statusCode: 404,
    body: errorMessages[Math.floor(Math.random()*errorMessages.length)],
    event
  });
};

export default route;
