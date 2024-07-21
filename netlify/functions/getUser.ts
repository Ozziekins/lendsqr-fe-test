import { Handler } from '@netlify/functions';
import data from '../../db.json';

const handler: Handler = async (event) => {
  const id = event.queryStringParameters?.id;
  const user = data.users.find(user => user.id === parseInt(id || '0'));

  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "User not found" }),
      headers: {
        'Content-Type': 'application/json'
      }
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

export { handler };
