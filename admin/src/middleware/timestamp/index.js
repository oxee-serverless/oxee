const appendTimestampToEvent = (event) => {
  event.timestamp = Date.now();

  return Promise.resolve(event);
};

export default appendTimestampToEvent;
