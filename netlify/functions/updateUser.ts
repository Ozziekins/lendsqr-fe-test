import * as fs from 'fs';
import * as path from 'path';
import { Handler } from '@netlify/functions';

interface User {
  id: number;
  status: string;
}

const dataPath = path.join(__dirname, '../../db.json');

const handler: Handler = async (event) => {
  const { id, status } = event.queryStringParameters;
  
  try {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
    const userIndex = data.users.findIndex((user: User) => user.id === parseInt(id));

    if (userIndex === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" })
      };
    }

    data.users[userIndex].status = status;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

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

export { handler };
