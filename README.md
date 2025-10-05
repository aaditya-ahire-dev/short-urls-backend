# Shortify 🔗

Shortify is a powerful and efficient URL shortener service built with Node.js, Express, and MongoDB. It allows users to shorten long URLs, track the number of clicks, and manage their links. The application also features a separate admin panel for system-wide URL management and monitoring.

## ✨ Features

* **Custom Short Links**: Generate a unique, short ID for any long URL.
* **Click Tracking**: Monitor the number of times a shortened link has been visited.
* **User Authentication**: Secure user registration and login system using JWT (JSON Web Tokens).
* **User Dashboard**: Logged-in users can view, manage, and delete all the URLs they have created.
* **Admin Panel**: A separate, secure interface for administrators.
* **Role-Based Access Control**: Admins have special privileges to view all URLs in the system and access detailed analytics.
* **RESTful API**: A well-structured and documented API for all functionalities.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose)
* **Authentication**: JSON Web Tokens (JWT)
* **Password Hashing**: bcrypt

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:
* [Node.js](https://nodejs.org/en/) (v16 or higher)
* [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) or a MongoDB Atlas account.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/aaditya-ahire-dev/short-urls-backend.git](https://github.com/aaditya-ahire-dev/short-urls-backend.git)
    cd shortify
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables. **Do not share your actual values publicly.**

    ```env
    NODE_ENV=development
    PORT=8000
    MONGO_DB=your_mongodb_connection_string_here
    SECRET=your_super_strong_jwt_secret_key
    CLIENT_URL=http://localhost:3000
    ```

4.  **Start the development server:**
    ```sh
    npm start
    ```
    The server should now be running on `http://localhost:8000` (or the port you specified).

## 📋 API Endpoints

Here is a list of the available API endpoints.

### Authentication Routes

| Method | Endpoint             | Description                               |
| :----- | :------------------- | :---------------------------------------- |
| `POST` | `/user/signup`       | Registers a new user.                     |
| `POST` | `/user/login`        | Logs in an existing user.                 |
| `POST` | `/admin/signup`      | Registers a new administrator (protected).|
| `POST` | `/admin/login`       | Logs in an administrator.                 |

### URL Management Routes

*These routes require a valid JWT token in the `Authorization` header for logged-in users.*

| Method   | Endpoint                  | Description                                                              |
| :------- | :------------------------ | :----------------------------------------------------------------------- |
| `POST`   | `/url/geturl`             | Creates a new short URL. Expects `{ "url": "your-long-url" }` in the body.|
| `GET`    | `/url/getallurls`         | Retrieves all URLs created by the currently logged-in user.              |
| `GET`    | `/:shortId`               | **Public**: Redirects to the original long URL.                          |
| `GET`    | `/url/analysis/:shortId`  | Gets click analytics for a specific short URL.                           |
| `DELETE` | `/url/delete/:shortId`    | Deletes a short URL created by the user.                                 |

### Admin Routes

*These routes are protected and require administrator-level privileges.*

| Method | Endpoint             | Description                                                              |
| :----- | :------------------- | :----------------------------------------------------------------------- |
| `GET`  | `/admin/getallurls`  | Retrieves a list of **all** URLs present in the database.                |
| `POST` | `/admin/urlDetails`  | Gets detailed information about a specific URL (body may require `shortId` or `_id`). |

## ⚙️ Environment Variables

Here is a detailed explanation of the environment variables used in this project.

| Variable     | Description                                                                                                   | Example                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------ |
| `NODE_ENV`   | The environment mode. Set to `development` for local development or `production` for deployment.              | `development`                                           |
| `PORT`       | The port on which the Express server will run.                                                                | `8000`                                                  |
| `MONGO_DB`   | The connection string for your MongoDB database. This can be a local instance or a cloud instance like Atlas. | `mongodb+srv://user:pass@cluster.mongodb.net/shortify`  |
| `SECRET`     | A secret key used for signing JSON Web Tokens (JWTs). Make this a long, random, and strong string.             | `this-is-a-very-secure-and-random-secret-key`           |
| `CLIENT_URL` | The URL of the frontend application. Used for CORS (Cross-Origin Resource Sharing) configuration.             | `http://localhost:3000`                                 |

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request if you have a way to improve this project.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.