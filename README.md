# mern-ecommerce
MERN-based eCommerce platform with authentication, cart, and admin panel.

# 🛍️ MERN eCommerce App

A full-stack eCommerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). It features user authentication, product listings, cart functionality, and admin product management.

---

## 🚀 Features

- User registration & login with JWT
- Add/remove products to/from cart
- Browse product listings
- Product details page
- Admin dashboard (CRUD operations)
- RESTful API with Express
- MongoDB database with Mongoose
- Responsive design with React

---

## 🛠 Tech Stack

**Frontend:**  
- React.js  
- React Router  
- Axios  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT + Bcrypt  

---

## 📁 Folder Structure

mern-ecommerce/
- client/ # React Frontend
- server/ # Express Backend
- .gitignore
- README.md
- package.json


---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/rishabJuyal/mern-ecommerce.git
cd mern-ecommerce

cd server
npm install

### Create a .env file inside /server with:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

Run server:

npm run dev


cd ../client
npm install
npm start
Frontend will run on http://localhost:5173
Backend will run on http://localhost:5000