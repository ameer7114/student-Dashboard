# student-Dashboard


# Student Results Dashboard for Admin

## Project Overview

This project is a **Student Results Dashboard** designed for admin use. It is a full-stack web application built using **React** for the frontend, **Tornado (Python)** for the backend, and **MySQL** for the database. The application enables administrators to manage student result records via a simple and intuitive interface.


##Tech Stack

* **Frontend**: React.js

  * Minimum 3 pages with proper navigation
* **Backend**: Python with Tornado framework

  * RESTful APIs: `GET`, `POST`, `DELETE`
* **Database**: MySQL

  * Stores student result data in tabular format

---

## Features

* Add new student results (`POST`)
* View all student results (`GET`)
* Delete student records (`DELETE`)
* Responsive dashboard with navigation across at least 3 pages

---


1. **Dashboard Page** – Overview of student results
2. **Add Result Page** – Form to enter new results
3. **Manage/Delete Page** – Interface to delete or manage existing entries

---

## Backend API Routes

| Method | Route          | Description               |
| ------ | -------------- | ------------------------- |
| GET    | `/results`     | Fetch all student results |
| POST   | `/results`     | Add new student result    |
| DELETE | `/results/:id` | Delete a result by ID     |

---

## Database Schema (MySQL)

```sql
CREATE TABLE student_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  roll_number VARCHAR(20),
  subject VARCHAR(100),
  marks INT
);
```


