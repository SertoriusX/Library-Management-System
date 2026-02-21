# 📚 Library Management System

## 📖 Overview

The Library Management System is a full-stack web application designed to help a library owner manage books and borrowing operations efficiently.

The system replaces manual record-keeping with a digital solution, making library management faster, more accurate, and well organized.

It allows the library owner to register books, manage borrower information, and track book lending and return dates while ensuring that books cannot be borrowed if they are already unavailable.

---

## 🚀 Features

### 📚 Book Management
- Add new books to the system
- Store book details (title, author, etc.)
- Track book availability status

### 👤 Borrower Management
- Register new borrowers
- Store personal information (name, contact details)

### 🔄 Borrowing System
- Assign a book to a registered borrower
- Record borrow date
- Record return deadline
- Automatically mark books as unavailable when borrowed

### ✅ Return Process
- Mark books as returned
- Automatically update book availability

---

## 🏗️ System Architecture

This project follows a **full-stack architecture**:

- **Frontend:** React  
- **Backend:** Flask (Python)  
- **Database:** SQLite  

### 🔗 Entity Relationships

The system is based on three main entities:

- **Book**
- **Borrower**
- **Borrow (Transaction)**

Relationships:
- One borrower can borrow multiple books.
- One book can only be borrowed by one person at a time.
- Each borrowing action is stored as a transaction.

---

## 🛠️ Technologies Used

- **Frontend:** React  
- **Backend:** Flask (Python)  
- **Database:** SQLite  
- **API Testing:** Postman  
- **Version Control:** Git & GitHub  

---

## 📡 API Endpoints

### 📚 Books
- `GET /books` → Get all books  
- `POST /books` → Add a new book  
- `PUT /books/<id>` → Update book information  
- `DELETE /books/<id>` → Delete a book  

### 👤 Borrowers
- `GET /borrowers` → Get all borrowers  
- `POST /borrowers` → Register a new borrower  
- `PUT /borrowers/<id>` → Update borrower information  
- `DELETE /borrowers/<id>` → Delete a borrower  

### 🔄 Borrow Transactions
- `GET /borrows` → Get all borrowing records  
- `POST /borrows` → Borrow a book  
- `PUT /borrows/<id>/return` → Mark book as returned  

---

## 🧠 What I Learned

- Building a full-stack application with Flask and React  
- Designing and connecting relational database models  
- Creating and consuming REST APIs  
- Managing state in React  
- Implementing business logic (book availability control)  
- Connecting frontend and backend with HTTP requests  

---

## 🔮 Future Improvements

- Add authentication (Admin login system)  
- Add search and filtering functionality  
- Add pagination for large book lists  
- Add email notifications for due dates  
- Improve UI/UX design  
- Deploy the project online  

---

## ▶️ How to Run the Project

### 1️⃣ Frontend (React with Vite)
1. Start a React project:
```bash
cd frontend
cd my-app
npm install
npm run dev


## ▶️ How to Run the Project
### 2️⃣ Backend (Flask with Python)
2.  Start a Flask project:
```bash
cd backend
cd flask_app
python -m venv venv
venv\Scripts\activate
pip install Flask Flask-WTF Flask-Login Flask-SQLAlchemy Flask-Migrate  Pillow flask-cors flask_bcrypt  flask_jwt_extended 
flask --app core db init
flask --app core db migrate -m "Initial migration"
flask --app core db upgrade



