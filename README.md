# README

## Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Setup Environment Variables**
   - Create a `.env` file.
   - Copy the content from `.env.example` and paste it into `.env`.
   - You will be filling in these values one by one.

### Obtain Environment Variables

#### Yapily API Credentials
1. Create a developer account on Yapily: [Yapily Docs](https://docs.yapily.com/pages/getting-started/get-started/)
2. Follow steps 1-3 to obtain the `YAPILY_APPLICATION_KEY` and `YAPILY_APPLICATION_SECRET`.
3. Paste these values in the `.env` file.

#### MongoDB Connection String
To generate the database URL using MongoDB's GUI:
1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Create a new project and cluster.
3. Navigate to **Database** > **Connect** > **Connect your application**.
4. Select **Driver** as `Node.js` and version `>= 4.0`.
5. Copy the connection string.
6. Replace `<username>`, `<password>`, and `<your-cluster-url>` with your database credentials.
7. Paste the connection string as `DATABASE_URL` in the `.env` file.

#### JWT Secret
- Set `JWT_SECRET` to any random secure value. It must remain the same for the database.

## Running the Server
Once all environment variables are set, start the server:
```sh
npm start
```

## API Endpoints

### **User Management**
#### Create a User
- **Endpoint:** `POST /api/v1/users`
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** Returns an access token for authentication.

### **Institutions**
#### Get Institutions
- **Endpoint:** `GET /api/v1/institutions`
- **Authorization:** Bearer Token (Use the access token from login response)
- **Description:** Retrieves all institutions in the application.

### **Linking an Account**
#### Link a User to an Institution
- **Endpoint:** `POST /api/v1/user/link-account`
- **Authorization:** Bearer Token (Use the access token from login response)
- **Body:**
  ```json
  {
    "institutionId": "your-institution-id"
  }
  ```
- **Response:** Returns `authorizationUrl`. Open it in a browser to access the Sandbox Bank.
- **Login Credentials for Sandbox Bank:**
  - **Username:** `mits`
  - **Password:** `mits`
- Once logged in, connect an account and wait for the "consent received" message.
- At this step, user accounts and transactions are stored in the database.

### **Accounts**
#### Get Linked Accounts
- **Endpoint:** `GET /api/v1/accounts`
- **Authorization:** Bearer Token (Use the access token from login response)

#### Get Specific Account Details
- **Endpoint:** `GET /api/v1/accounts/:id`
- **Authorization:** Bearer Token (Use the access token from login response)

### **Transactions**
#### Get Transactions for a Linked Account
- **Endpoint:** `GET /accounts/:accountId/transactions`
- **Authorization:** Bearer Token (Use the access token from login response)
- **Description:** Retrieves all transactions for the specified account.

---

## Notes
- Ensure all environment variables are correctly set.
- Always use the access token in the `Authorization` header for authenticated requests.
- The API follows RESTful principles for structured interaction.