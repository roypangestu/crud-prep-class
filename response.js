const response = (statusCode, datas, massage, res) => {
  res.json(statusCode, [
    {
      payload: datas,
      massage,
    },
    {
      metadata: {
        prev: "",
        next: "",
        current: "",
      },
    },
  ]);
};
module.exports = response;
