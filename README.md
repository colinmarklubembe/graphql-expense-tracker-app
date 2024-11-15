# Expense Tracker Application

This is a full-stack expense tracker application built with a Node.js backend and a React frontend. The application allows users to track their expenses, categorize them, and view statistics.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, login, logout)
- Add, edit, and delete transactions
- Categorize transactions (saving, expense, investment)
- View transaction history
- View statistics of expenses

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- GraphQL
- Passport.js for authentication

### Frontend

- React
- TypeScript
- Apollo Client
- Tailwind CSS
- Chart.js for data visualization

## Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies for both backend and frontend:

```sh
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

- Create a `.env` file in the `backend` directory and add the following:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

- Create a `.env` file in the `frontend` directory if needed.

## Usage

1. Start the backend server:

```sh
cd backend
npm start
```

2. Start the frontend development server:

```sh
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Folder Structure

```json
.env
.gitignore
.vscode/
backend/
  db/
    connectDB.js
  dummyData/
    data.js
  index.js
  models/
    transaction.model.js
    user.model.js
  passport/
    passport.config.js
  resolvers/
    index.js
    transaction.resolver.js
    user.resolver.js
  typeDefs/
    index.js
frontend/
  .env
  .gitignore
  eslint.config.js
  index.html
  package.json
  postcss.config.js
  public/
    assets/
  README.md
  src/
    components/
      Cards.tsx
      TransactionForm.tsx
    pages/
      Home.tsx
      Transaction.tsx
    graphql/
      queries/
        transaction.query.ts
        user.query.ts
      mutations/
        transaction.mutation.ts
        user.mutation.ts
  tailwind.config.js
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
package.json
```
