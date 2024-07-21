import fs from 'fs';
import path from 'path';

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

const dataPath = path.join(__dirname, 'dbb.json');
const rawData = fs.readFileSync(dataPath, { encoding: 'utf-8' });
const data = JSON.parse(rawData);

const generateUser = (id: number): User => {
  return {
    id,
    organization: "ExampleOrg",
    username: `user${id}`,
    email: `user${id}@example.com`,
    phoneNumber: `080000000${id % 10}`,
    dateJoined: new Date().toISOString(),
    status: ["Active", "Inactive", "Pending", "Blacklisted"][Math.floor(Math.random() * 4)],
    fullName: `Full Name ${id}`,
    userId: `EX12345${id}`,
    rating: Math.floor(Math.random() * 5) + 1,
    accountBalance: `₦${Math.floor(Math.random() * 1000000)}.00`,
    bankDetails: `${Math.floor(Math.random() * 1000000000)}/Bank`,
    bvn: `${Math.floor(Math.random() * 10000000000)}`,
    gender: ["Male", "Female"][Math.floor(Math.random() * 2)],
    maritalStatus: ["Married", "Single", "Divorced"][Math.floor(Math.random() * 3)],
    children: ["None", "One", "Two", "Three"][Math.floor(Math.random() * 4)],
    typeOfResidence: ["Owned Home", "Rented Apartment"][Math.floor(Math.random() * 2)],
    levelOfEducation: ["BSc", "MSc", "PhD"][Math.floor(Math.random() * 3)],
    employmentStatus: ["Employed", "Unemployed", "Self-employed"][Math.floor(Math.random() * 3)],
    sectorOfEmployment: "Sector",
    durationOfEmployment: `${Math.floor(Math.random() * 10)} years`,
    officeEmail: `office${id}@example.com`,
    monthlyIncome: "₦500,000 - ₦700,000",
    loanRepayment: "₦150,000",
    twitter: `@User${id}`,
    facebook: `facebook.com/User${id}`,
    instagram: `@User${id}`,
    guarantor: {
      fullName: `Guarantor ${id}`,
      phoneNumber: `0801234567${id % 10}`,
      emailAddress: `guarantor${id}@example.com`,
      relationship: ["Brother", "Sister", "Friend"][Math.floor(Math.random() * 3)]
    }
  };
};

const currentCount = data.users.length;
const neededCount = 500 - currentCount;

for (let i = 1; i <= neededCount; i++) {
  data.users.push(generateUser(currentCount + i));
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('Users added successfully!');
