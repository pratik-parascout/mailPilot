# MailPilot

MailPilot is a mini email marketing platform inspired by Brevo (Sendinblue). It allows users to manage contacts, upload contacts via CSV, create and send email campaigns, and view campaign history—all with a modern dark-themed UI.

## Features

- **User Authentication**
  - Register and login with JWT-based authentication (stored in HTTP-only cookies)
- **Contacts Management**
  - Add contacts manually via a form
  - Bulk upload contacts via CSV file
  - Tag contacts for segmentation
  - Edit contacts inline
  - View all contacts in a table
- **Campaigns**
  - Create and send email campaigns to contacts filtered by tags
  - Compose campaign with subject, HTML body, and tags
  - View campaign history with status, recipients, and sent time
- **Dashboard**
  - Overview of total contacts and campaigns
- **Modern UI**
  - Fully responsive and dark-themed interface using Tailwind CSS
  - Flash messages for user feedback

## Tech Stack

**Backend**

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Multer for file uploads
- Nodemailer for sending emails
- csv-parser for CSV processing

**Frontend**

- EJS templating engine
- Tailwind CSS for styling

**Other**

- dotenv for environment variables
- connect-flash and express-session for flash messages
- cookie-parser for JWT cookies

## Getting Started

1. **Clone the repository**

   ```
   git clone <your-repo-url>
   cd mailpilot
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mailpilot
   JWT_SECRET=your_jwt_secret
   MAIL_USER=your_gmail@gmail.com
   MAIL_PASS=your_app_password
   ```

4. **Start MongoDB**

   Make sure MongoDB is running locally on your machine.

5. **Run the app**

   ```
   npm run dev
   ```

6. **Access the app**

   Open [http://localhost:5000](http://localhost:5000) in your browser.

## Folder Structure

```
src/
  controllers/
  middleware/
  models/
  routes/
  services/
  views/
  index.js
uploads/
public/
.env
```

## Usage

- Register a new user and log in.
- Add contacts manually or upload a CSV file.
- Create and send campaigns to your contacts.
- View your dashboard for a quick overview.

## Notes

- For sending emails, you must use a valid Gmail account and an [App Password](https://support.google.com/accounts/answer/185833?hl=en).
- All features are protected and require authentication.
