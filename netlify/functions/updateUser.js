const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../../db.json');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  const updatedData = JSON.parse(event.body);
  
  try {
    const data = JSON.parse(fs.readFileSync(dataPath));
    const userIndex = data.users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" })
      };
    }

    data.users[userIndex] = {...data.users[userIndex], ...updatedData};

    fs.writeFileSync(dataPath, JSON.stringify(data));

    return {
      statusCode: 200,
      body: JSON.stringify(data.users[userIndex]),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Failed to update user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to update user status",
        error: error.message
      })
    };
  }
};
