const data = require('../../db.json');

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Total-Count': `${data.users.length}`
    },
    body: JSON.stringify(data.users)
  };
};
