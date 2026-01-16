# Pulse – Marketing Automation MVP

Pulse is a minimal marketing automation and analytics platform inspired by entry-level SaaS tools like Mailchimp and HubSpot.  
It enables marketers to manage subscribers, create and send email campaigns, and visualize engagement analytics in a modern dashboard.  
This project demonstrates full-stack product thinking, relational data modeling, and clean API/frontend architecture.

---

## Table of Contents

- [Introduction](#introduction)
- [Dashboard Preview](#dashboard-preview)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Database Seeding](#database-seeding)
- [Technical Trade-off Report](#technical-trade-off-report)
- [Tech Stack](#tech-stack)
- [Architecture Decisions](#architecture-decisions)
- [Final Notes](#final-notes)

---

## Introduction

Pulse is a functional MVP built to showcase relational data modeling, ORM-based backend architecture, and a React dashboard.  
It supports subscriber management, campaign creation and sending, and real-time analytics, all using scalable and maintainable patterns.

---

## Dashboard Preview

![Dashboard Demo](frontend/public/dashboard-demo.png)

---

## Project Structure

The repository is organized into two main folders: `backend` and `frontend`, each following best practices for modularity and maintainability.

```
pulse/
│
├── backend/
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   ├── analytics.controller.js
│       │   ├── campaign.controller.js
│       │   └── subscriber.controller.js
│       ├── middlewares/
│       │   ├── errorHandler.js
│       │   └── validateRequest.js
│       ├── models/
│       │   ├── Analytics.js
│       │   ├── Campaign.js
│       │   ├── Subscriber.js
│       │   └── index.js
│       ├── routes/
│       │   ├── analytics.routes.js
│       │   ├── campaign.routes.js
│       │   ├── subscriber.routes.js
│       │   └── index.js
│       ├── services/
│       │   ├── analytics.service.js
│       │   ├── campaign.service.js
│       │   └── subscriber.service.js
│       └── validators/
│           └── subscriber.schema.js
│
└── frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── README.md
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── api/
        │   └── axios.js
        ├── components/
        │   ├── BulkSubscriberForm.jsx
        │   └── SingleSubscriberForm.jsx
        ├── layouts/
        │   └── AppLayout.jsx
        └── pages/
            ├── AddSubscriber.jsx
            ├── CampaignCreate.jsx
            ├── CampaignList.jsx
            ├── Dashboard.jsx
            └── SubscriberList.jsx
```

- **backend/**: Node.js/Express API, PostgreSQL with Sequelize ORM, business logic, validation, and database seed scripts.
- **frontend/**: React (Vite) single-page application, modular components, layouts, and pages for dashboard, campaigns, and subscribers.

This structure supports clear separation of concerns and scalability for future development.

## Setup Instructions

### Backend Setup

1. Navigate to the backend folder and install dependencies:

   ```sh
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory with the following content:

   ```
   PORT=3001
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=pulse_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   ```

3. Run database migrations and seed initial data:

   ```sh
   npx sequelize-cli db:migrate
   node seed.js
   ```

4. Start the backend server:
   ```sh
   npm run dev
   ```
   The backend will be available at [http://localhost:3001](http://localhost:3001).

---

### Frontend Setup

1. Navigate to the frontend folder and install dependencies:

   ```sh
   cd frontend
   npm install
   ```

2. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## Database Seeding

To ensure the dashboard displays meaningful data immediately, the backend includes a script to populate the database with dummy subscribers, sample campaigns, and analytics events.

**How to run:**

```sh
node backend/seed.js
```

This allows for instant testing of analytics, pagination, and filtering features.

---

## Technical Trade-off Report

**Trade-off:**  
Server-side pagination and filtering for subscribers and campaigns (using limit/offset) instead of client-side.

**Reasoning:**  
This approach is more scalable as data grows, avoids unnecessary memory usage on the client, and reflects real-world production systems.

**Trade-off:**  
Slightly increased backend complexity, but significantly better performance and scalability.

---

## Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Frontend   | React, Vite, Tailwind CSS |
| Backend    | Node.js, Express          |
| Database   | PostgreSQL                |
| ORM        | Sequelize                 |
| Charts     | Recharts                  |
| Validation | Zod                       |

---

## Architecture Decisions

- **Service Layer Pattern:**  
  Controllers are kept thin; business logic and Sequelize queries are handled in services for maintainability and testability.

- **Relational Modeling:**  
  Campaigns, Subscribers, and Analytics are modeled with proper associations to reflect real SaaS workflows.

- **Draft-First Campaign Flow:**  
  Campaigns can be edited multiple times before sending, matching real marketing tools.

- **Error Handling and Validation:**  
  Global error handling middleware and schema validation (Zod) ensure robust API behavior.

- **Separation of Concerns:**  
  The project is organized into clear modules (controllers, services, models, routes, validators) to support scalability and ease of maintenance.

---

## Final Notes

- The repository maintains a clean, step-by-step commit history, reflecting intentional development.
- The MVP demonstrates full-stack product thinking, ORM-based relational modeling, and production-ready frontend patterns.
- The architecture and codebase are designed for extensibility, making it easy to add new features or scale up for real-world use.

---
