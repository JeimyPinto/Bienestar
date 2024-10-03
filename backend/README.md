# Express Sequelize App

This project is a simple Express application that uses Sequelize as an ORM for database management. It includes setup for migrations, seeders, and schemas.

## Project Structure

```
express-sequelize-app
├── src
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   └── index.js
│   ├── migrations
│   │   └── [timestamp]-create-users.js
│   ├── models
│   │   └── index.js
│   ├── seeders
│   │   └── [timestamp]-seed-users.js
│   ├── routes
│   │   └── index.js
│   ├── app.js
│   └── types
│       └── index.d.ts
├── .sequelizerc
├── package.json
├── README.md
└── config.json
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd express-sequelize-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

Update the database configuration in `src/config/database.js` and `config.json` with your database details.

## Running Migrations

To create the database tables, run:
```
npx sequelize-cli db:migrate
```

## Seeding the Database

To populate the database with initial data, run:
```
npx sequelize-cli db:seed:all
```

## Running the Application

Start the application with:
```
npm start
```

The application will be running on `http://localhost:3000`.

## API Endpoints

- **GET /users**: Retrieve all users.
- **POST /users**: Create a new user.

## License

This project is licensed under the MIT License.