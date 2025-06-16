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
├── public/
├── src/
│   ├── config/         # DB & express config
│   ├── controllers/    # Route logic
│   ├── models/         # Mongoose models
│   ├── routes/         # App routes
│   ├── services/       # Mail logic & user logic
│   ├── utils/          # Crypto, CSV parser
│   ├── views/          # EJS templates (Tailwind-based)
├── .env
├── package.json
└── README.md

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

## 📹 Demo Video (Optional)

> Record a 2–3 minute walkthrough of the app using Loom or OBS and add the link here to showcase your capstone.

---

## 👨‍💻 Author

**Pratik Kumar**
🎓 Sharpener Tech Capstone Project
🌐 [LinkedIn](https://www.linkedin.com/)
💻 [GitHub](https://github.com/)

---
