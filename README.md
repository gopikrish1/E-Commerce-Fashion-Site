# 🛍️ E-Commerce Fashion App


A full-featured **MERN Stack** fashion e-commerce platform built with performance, scalability, and modern user experience in mind. The app includes a **responsive customer-facing storefront**, a **secure admin panel**, robust backend APIs, and **dual payment gateway integration** (Stripe & Razorpay).

## ✅ Live Demo

### 👤 User Site  
🔗 [Click Here to Explore](https://e-commerce-fashion-site-frontend.onrender.com)

> 🔐 **Test User Credentials**  
> • Email: `test@gmail.com`  
> • Password: `Bugfree@7`

---

### 🛠️ Admin Panel  
🔗 [Click Here to Explore](https://e-commerce-fashion-site-admin.onrender.com)

> ⚠️ **Note:** Admin credentials are available upon request.  
> Contact me via [LinkedIn](https://www.linkedin.com/in/gopikrish01) or [Email](mailto:gopi22029.it@rmkec.ac.in).


---

## 🌟 Features

### 👤 User Features

* 🛍️ Browse fashion products by category, search, and filters
* 🛒 Cart, wishlist, and order management
* 💬 Product reviews with ratings
* 🔐 Secure user authentication (JWT)
* 📦 View order history and track statuses
* 💳 Choose between **Stripe** or **Razorpay** during checkout

### 🛠️ Admin Features

* 🧑‍💼 Admin dashboard with analytics and summaries
* 📦 Full product CRUD with image upload (via Cloudinary)
* 👥 Manage users, roles, and permissions
* 📑 View and update all user orders
* 📝 Review moderation

---

## ⚙️ Tech Stack

| Layer        | Technologies Used                                |
| ------------ | ------------------------------------------------ |
| Frontend     | React, Redux Toolkit, React Router, Tailwind CSS |
| Backend      | Node.js, Express.js, MongoDB, Mongoose           |
| Auth & API   | JWT, bcrypt, Axios                               |
| File Uploads | Cloudinary                                       |
| Payments     | **Stripe** (global), **Razorpay** (India)        |
| Testing      | Postman, Thunder Client                          |
| Deployment   | Render (Frontend & Backend)                      |

---

## 🧪 Backend Reliability & Payment Integration

### 🔍 API Testing

All REST APIs were extensively tested using:

* ✅ **Postman** — for environment-based testing, full collection management
* ⚡ **Thunder Client** — for fast in-editor API requests during development

#### Key APIs Tested:

* **Auth:** Register, login, refresh, logout
* **User:** Profile update, address book
* **Products:** CRUD, search, filtering
* **Cart/Wishlist:** Add, update, delete
* **Orders:** Place orders, update status, order history
* **Payments:** Stripe & Razorpay integration endpoints

Each route was tested for:

* Correct status codes
* Role-based access
* Input validation and error handling
* JWT authorization

---

### 💳 Dual Payment Gateway Support

To ensure payment flexibility, the app integrates **both Stripe and Razorpay**:

#### 🔐 Stripe

* Card-based secure payments
* Tokenized transactions with `@stripe/stripe-js`
* Server-side session handling and error feedback

#### 🇮🇳 Razorpay

* UPI, NetBanking, card, and wallet options
* Order generation and signature verification
* Webhook-ready backend for future scaling

> Payments are handled securely through backend validation. Sensitive keys are stored via environment variables.

---

## 🧠 What I Learned

* Designing RESTful APIs with strong security and clarity
* Managing complex state with Redux Toolkit
* Handling file uploads with Cloudinary and form validation
* Implementing robust payment flows with Stripe and Razorpay
* Ensuring responsive, mobile-friendly design
* Role-based access control (RBAC) between users and admins

---

## 📌 Future Improvements

* ✅ Add email confirmations and order alerts
* 💳 Stripe checkout session (full redirect flow)
* 🌐 Multi-language and currency support
* 📈 Product recommendation engine using ML

---

## 🗂 Project Structure

```bash
e-commerce-fashion-app/
├── admin/                     # Admin Panel (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Admin assets (images, logos, etc.)
│   │   ├── components/        # Reusable admin UI components
│   │   ├── pages/             # Admin-facing pages (dashboard, product management, etc.)
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── vite.config.js         # Vite bundler config
│   ├── .env                   # Admin env variables
│   └── README.md

├── frontend/                  # User Storefront (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Frontend assets
│   │   ├── components/        # Shared components (Navbar, Footer, etc.)
│   │   ├── context/           # Global state (Context API or Redux)
│   │   ├── pages/             # User-facing pages (Home, Product, Cart, etc.)
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .env
│   └── README.md

├── backend/                   # Express.js + MongoDB Backend API
│   ├── config/                # DB config and payment gateway setup (Stripe, Razorpay)
│   ├── controllers/           # Route logic and API handlers
│   ├── middleware/            # Auth, error handling, and request validation
│   ├── models/                # Mongoose models (User, Product, Order, etc.)
│   ├── routes/                # Express route definitions
│   ├── server.js              # Entry point of the backend
│   ├── vercel.json            # Vercel deployment config (optional)
│   ├── .env                   # Backend environment variables
│   └── package.json

└── README.md                  # Project overview and documentation

```

---

## 📫 Contact

Interested in learning more or collaborating?

* 🔗 [LinkedIn – GopiKrish01](https://www.linkedin.com/in/gopikrish01)
* 📧 [gopi22029.it@rmkec.ac.in](mailto:gopi22029.it@rmkec.ac.in)

---

## 🏁 Final Thoughts

This project showcases a complete e-commerce experience with a professional tech stack and developer best practices. If you're looking for someone who can build performant full-stack applications, pay attention to details, and deliver high-quality work — this is a strong example of what I bring to the table.

---


