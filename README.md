# Bitespeed Identity API

A RESTful API built using **Node.js**, **Express.js**, and **PostgreSQL**. The API manages customer identity tracking, providing services for identifying and linking customer contact details such as email and phone number. It uses Sequelize ORM for database interaction and stores the information securely in a PostgreSQL database.

## Features

- **Identity Linking**: Links a customer's phone number and email to a primary contact.
- **Primary and Secondary Contacts**: Identifies the primary contact and associates secondary contacts with it.
- **Database Synchronization**: Automatically syncs the database tables with Sequelize.
- **Flexible Data Storage**: Stores contact details in the database and allows retrieval.

## API Endpoints

### POST `/identify`
This endpoint allows the creation of a new contact or the identification of an existing one by providing an email or phone number.

#### Request Body

```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```

- **email**: (Optional) The customer's email address.
- **phoneNumber**: (Optional) The customer's phone number.

**Note**: At least one of email or phoneNumber must be provided.
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": [
      "user@example.com"
    ],
    "phoneNumbers": [
      "1234567890"
    ],
    "secondaryContactIds": []
  }
}
```

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** (Node Package Manager)

## PostgreSQL Setup

Ensure PostgreSQL is installed and running on your machine. 

Create a new database for the project:

```bash
createdb bitespeed_identity
```

Set up the database connection details in your .env file (explained below).

## Installation
Follow the steps below to get the project up and running on your local machine:

#### Step 1: Clone the Repository
Clone the project repository to your local machine:

```bash
git clone https://github.com/your-username/bitespeed-identity.git
cd bitespeed-identity
```

#### Step 2: Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install
```


#### Step 3: Configure Environment Variables
Create a .env file in the root of the project directory and add the following content:

```bash
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=bitespeed_identity
DB_PORT=5432
```

Replace your_db_user and your_db_password with your PostgreSQL credentials. DB_NAME should match the name of the database you created earlier.

#### Step 4: Start the Server
Run the following command to start the application:

```bash
npm start
```


#### Step 5: Test the API
Use Postman or cURL to test the API endpoints.

#### Example cURL Command:

```bash
curl -X POST http://localhost:3000/identify \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "phoneNumber": "1234567890"}'

```
### Response
A successful response will return the primary contact details along with any linked secondary contacts.

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": [
      "user@example.com"
    ],
    "phoneNumbers": [
      "1234567890"
    ],
    "secondaryContactIds": [2, 3]
  }
}


```
