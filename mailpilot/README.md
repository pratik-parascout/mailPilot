# 📬 MailPilot – A Mini Brevo Clone

**MailPilot** is a full-stack bulk email campaign platform inspired by [Brevo](https://www.brevo.com/), built using **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**. It allows users to manage contacts, create email campaigns using a drag-and-drop builder, and send emails via their own SMTP.

🔗 **Live Project**: [https://mailpilot-y903.onrender.com](https://mailpilot-y903.onrender.com)

---

## 🚀 Features

### 👤 User Authentication

- User registration & login with JWT
- Passwords hashed using bcrypt

### 📇 Contact Management

- Add, update, delete individual contacts
- Import contacts in bulk using CSV
- Tag contacts (e.g., Leads, Customers)

### 📨 Campaign Creation

- Compose and send email campaigns
- Use **Unlayer drag-and-drop HTML editor** for email body
- Select tagged audiences
- Real-time feedback on campaign status

### 📊 Campaign Logs & History

- View past campaigns with:
  - Subject
  - Recipients
  - Status (Sent, Failed)
  - Timestamp

### 🔐 Custom SMTP Integration

- Users can save their **own SMTP credentials**
- Emails sent via user's own SMTP (avoids provider rate limits)
- Credentials are securely encrypted (AES-256-CBC)

### 🖱️ Drag & Drop Email Builder

- Built-in **Unlayer Editor** for visual email design
- Perfect for users who don't know HTML

---

## 🛠 Tech Stack

| Layer       | Stack                        |
| ----------- | ---------------------------- |
| Backend     | Node.js, Express.js          |
| Database    | MongoDB + Mongoose           |
| Auth        | JWT, Bcrypt                  |
| Email       | Nodemailer                   |
| Frontend    | EJS + Tailwind CSS + Unlayer |
| File Upload | Multer (for CSV)             |
| Hosting     | Render                       |

---

## 📁 Project Structure

```
mailpilot/
├── src/
│   ├── config/                # Database configuration
│   │   └── db.js              # MongoDB connection setup
│   │
│   ├── controllers/           # Route logic
│   │   ├── authController.js  # Authentication logic
│   │   ├── campaignController.js
│   │   ├── contactController.js
│   │   ├── smtpController.js
│   │   ├── templateController.js
│   │   └── viewController.js  # Render views
│   │
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── uploadCSV.js       # Multer config for CSV uploads
│   │
│   ├── models/                # Mongoose schemas
│   │   ├── Campaign.js
│   │   ├── Contact.js
│   │   ├── smtpConfig.js
│   │   ├── Template.js
│   │   └── User.js
│   │
│   ├── public/                # Static assets
│   │
│   ├── routes/                # Express routes
│   │   ├── authRoutes.js
│   │   ├── campaignRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── smtpRoutes.js
│   │   ├── templateRoutes.js
│   │   └── viewRoutes.js
│   │
│   ├── services/              # Business logic
│   │   └── mailService.js     # Email sending functionality
│   │
│   ├── utils/                 # Helper functions
│   │   └── crypto.js          # Encryption for SMTP credentials
│   │
│   ├── views/                 # EJS templates
│   │   ├── campaigns/
│   │   │   └── new.ejs
│   │   ├── layouts/
│   │   │   ├── footer.ejs
│   │   │   └── header.ejs
│   │   ├── templates/
│   │   │   ├── builder.ejs
│   │   │   ├── edit.ejs
│   │   │   └── new.ejs
│   │   ├── campaigns.ejs
│   │   ├── contacts.ejs
│   │   ├── dashboard.ejs
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   ├── smtp-settings.ejs
│   │   ├── templates.ejs
│   │   └── upload.ejs
│   │
│   └── index.js               # Application entry point
│
├── uploads/                   # Uploaded CSV files
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

---

## 🧪 Getting Started Locally

### ⚙️ Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

### 🔐 .env Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost/mailpilot

JWT_SECRET=your_jwt_secret
CRYPTO_SECRET=your_64char_hex_key
SMTP_SECRET_IV=your_32char_hex_iv

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

Use tools like [CyberChef](https://gchq.github.io/CyberChef/) to generate secure hex values for `CRYPTO_SECRET` (32 bytes) and `SMTP_SECRET_IV` (16 bytes).

---

### 📦 Install dependencies

```bash
npm install
```

### 🛠 Build assets

```bash
npm run build:css
```

### 🚀 Start development server

```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

---

## 🌐 Live Demo

👉 [https://mailpilot-y903.onrender.com](https://mailpilot-y903.onrender.com)

---

## 💡 Future Enhancements

- Schedule campaigns using `node-cron`
- SMS campaign integration (Twilio)
- Analytics dashboard (open rates, bounce rates)
- Role-based admin dashboard
- Save and reuse email templates

---

## 🙋 SMTP Help Button (Suggestion)

> ✅ We plan to implement a **"Need Help Setting SMTP?"** button on the SMTP form that:
>
> - Shows Gmail, Outlook, and Brevo setup steps
> - Links to guides for generating App Passwords
> - Explains each SMTP field clearly

---

## 🎥 Demo Video

Watch the demo here:  
🔗 [Click to view MailPilot demo video](https://drive.google.com/file/d/1QsX9GJ45P3UKlUuXa9o8dOEtYRYz2S--/view?usp=sharing)

---

## 👨‍💻 Author

**Pratik Kumar**
🎓 Sharpener Tech Capstone Project
🌐 [LinkedIn](https://www.linkedin.com/)
💻 [GitHub](https://github.com/)

---
