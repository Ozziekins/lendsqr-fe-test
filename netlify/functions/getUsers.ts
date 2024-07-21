import { Handler } from '@netlify/functions';
import data from '../../db.json';

interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
  fullName: string;
  userId: string;
  rating: number;
  accountBalance: string;
  bankDetails: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantor: Guarantor;
}

const handler: Handler = async (event) => {
  const _start = event.queryStringParameters?._start;
  const _limit = event.queryStringParameters?._limit;
  const start = parseInt(_start, 10) || 0;
  const limit = parseInt(_limit, 10) || 5;

  const paginatedData: User[] = data.users.slice(start, start + limit);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Total-Count': `${data.users.length}`
    },
    body: JSON.stringify(paginatedData)
  };
};

export { handler };
