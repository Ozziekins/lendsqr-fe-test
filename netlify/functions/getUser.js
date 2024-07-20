const data = require('../../db.json');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  const user = data.users.find(user => user.id === parseInt(id));
  
  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "User not found" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
