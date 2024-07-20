const data = require('../../db.json');

exports.handler = async (event) => {
  const { _start, _limit } = event.queryStringParameters;
  const start = parseInt(_start, 10) || 0;
  const limit = parseInt(_limit, 10) || 5;

  const paginatedData = data.users.slice(start, start + limit);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Total-Count': `${data.users.length}` 
    },
    body: JSON.stringify(paginatedData)
  };
};
