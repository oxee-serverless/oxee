const route = (event) => {
  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({
      message: 'Ok',
      time: Date.now()
    }, null, 2),
    event
  });
};

export default route;
