import { Handler } from '@netlify/functions';
import data from '../../db.json';

export const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Total-Count': `${data.users.length}`
    },
    body: JSON.stringify(data.users)
  };
};
