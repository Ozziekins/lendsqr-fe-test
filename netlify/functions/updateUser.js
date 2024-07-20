const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../../db.json');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  const inputBody = JSON.parse(event.body);
  
  const rawData = fs.readFileSync(dataPath);
  const data = JSON.parse(rawData);
  const userIndex = data.users.findIndex(user => user.id === parseInt(id));

  if (userIndex === -1) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "User not found" })
    };
  }

  data.users[userIndex] = {...data.users[userIndex], ...inputBody};
  fs.writeFileSync(dataPath, JSON.stringify(data));

  return {
    statusCode: 200,
    body: JSON.stringify(data.users[userIndex]),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};
