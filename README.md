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
