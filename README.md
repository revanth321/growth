# Assignment Submission Portal

A backend system for handling assignment submissions, where users (students) can upload assignments and admins (teachers) can review, accept, or reject them. This system is built with Node.js and MongoDB, utilizing JWT for authentication.


## Features

- **User Roles**: Supports both users (students) and admins (teachers).
- **Authentication**: Secure user and admin login with JWT.
- **Assignment Submission**: Users can upload tasks, and admins can accept or reject them.
- **Role-Based Access**: Specific functionalities are available only for admins or users.

## Tech Stack

- **Node.js** with **Express.js** for the backend.
- **MongoDB** for data storage.
- **JWT (JSON Web Tokens)** for authentication.
- **Mongoose** for interacting with MongoDB.

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- MongoDB (local or remote instance)

### Installation and Steps to run

1. Clone the repository:

   ```bash
   git clone https://github.com/revanth321/growthx.git
   cd assignment-submission-portal
   ```
2. Install the required dependencies

   ```bash
   npm install
   ```
3. Run the server

    ```bash
    npm run start
    ```