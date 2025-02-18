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


