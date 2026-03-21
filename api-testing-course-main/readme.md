# API Test Bug Report

## Summary of Bugs Discovered

### Bug 1: Auth Login returns 401 instead of 400 for missing credentials

**Affected Endpoints:**

- `Auth Login` — Missing Username
- `Auth Login` — Missing Password

**How to detect:**  
When a login request is submitted with a missing username or missing password, the API returns HTTP `401 UNAUTHORIZED` instead of the expected `400 BAD REQUEST`. Missing fields should return a `400` status, not a `401`.

### Bug 2: Post Orders — Incorrect totalPrice calculation

**Affected Endpoint:**

- `Post Orders` — Valid order

**How to detect:**  
When placing a valid order (eg. 2 items, price 50 for each), the API returns a `totalPrice` of 95 instead of the expected 100.

### Bug 3: Post Orders — Insufficient stock not handled correctly

**Affected Endpoint:**

- `Post Orders` — Invalid Quantity (Insufficient Stock)

**How to detect:**  
When an order is placed with a quantity that exceeds available stock, the API returns `200 OK` instead of an error status code. Also, the response body does not contain an error field with the error message.

---

### Bug 4: Post Orders — Missing item ID returns 404 instead of 400

**Affected Endpoint:**

- `Post Orders` — Missing Item ID

**How to detect:**  
When an order is submitted without an item ID, the API returns `404 NOT FOUND` instead of the expected `400 BAD REQUEST`. A missing required parameter should be treated as a bad request, not a not-found error.

---

### Bug 5: Post Orders — Missing quantity returns 500 instead of 400

**Affected Endpoint:**

- `Post Orders` — Missing Quantity

**How to detect:**  
When an order is submitted without a quantity, the API returns `500 INTERNAL SERVER ERROR` instead of the expected `400 BAD REQUEST`. A missing required parameter should be treated as a bad request.

---

### Bug 6: Post Orders — Zero and negative quantity not handled correctly

**Affected Endpoint:**

- `Post Orders` — Post Orders - Invalid Quantity (Non-cardinal)

**How to detect:**  
When an order is submitted with a non-cardinal number (eg. -2), the API returns `200 OK` and order is placed instead of the expected error status.

---

### Bug 7: Get Order — Invalid order ID returns 200 instead of error

**Affected Endpoint:**

- `Get Order` — Invalid Order ID

**How to detect:**  
When retrieving an order using an invalid (non-existent) order ID, the API returns `200 OK` instead of an error status (e.g., `404`).

---

### Bug 8: Get Order — Missing order ID returns 404 instead of 400

**Affected Endpoint:**

- `Get Order` — Missing Order ID

**How to detect:**  
When a request is made to retrieve an order without providing an order ID, the server returns `404 NOT FOUND` instead of `400 BAD REQUEST`. A missing required parameter should be treated as a bad request, not a not-found error.

---
---

# 🍜 API Testing Lab: Auntie Som’s Noodle Stall

> **Objective:** Prove that Nephew Lek’s "it works on my machine" attitude is a recipe for disaster.

---

## 📖 The Backstory

Auntie Som runs a **legendary noodle stall**. Her Tom Yum is world-class, her customers are loyal, and her business is booming.

Recently, her nephew **Lek** (who just finished a 2-week coding bootcamp) decided to "digitize" the business. He built a backend API to handle online orders. Auntie Som is thrilled, but the code… well, Lek says:

> _"It’s fine lah Auntie! I tested it once with my own phone. No need for professional testing!"_

**You are the Last Line of Defense.**  
Before Auntie Som launches this app to 1,000+ hungry customers, you must audit the system, find the logic flaws, and automate the validation using **Bruno**.

---

## 🎯 Learning Objectives

By the end of this lab, you should be able to:

- 🖋️ Write **Bruno test scripts** for automated validation.
- 📦 Extract values from API responses using **Post-response scripts**.
- 🔐 Manage and use **Environment Variables**.
- 🧠 Verify **Business Rules**, not just HTTP status codes.
- 🚀 Catch regressions automatically before they hit production.

---

## 🛠️ Setup Instructions

### 1️⃣ Prepare the Project

- **Fork this repository** to your own GitHub account.
- **Clone it** locally to your machine.

### 2️⃣ Start the API Server

The backend is a lightweight Flask application.

- **Requirements:** Python 3.10+ installed.
- **Navigate** to the `auntie-som-noodle-api` folder.
- **Install dependencies:**
  ```bash
  pip install flask
  ```
- **Run the server:**
  ```bash
  python app.py
  ```
- The server will run at: `http://localhost:5000`

### 3️⃣ Setup Bruno

- Download and install [Bruno](https://www.usebruno.com).
- Create a **New Collection** named `Auntie Som Lab`.
- Create an **Environment** (e.g., `local`) and set a variable `baseUrl` to `http://localhost:5000`.

---

## 📑 API Reference

### 🔐 Authentication

`POST /auth/login` - Get an access token.

- **Body (JSON):**
  ```json
  {
    "username": "student",
    "password": "hungry"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "accessToken": "uuid-token-string",
    "expiresIn": 3600
  }
  ```

---

### 🍜 Menu

`GET /menu` - View available items and stock levels.

- **Response (200 OK):**
  ```json
  [
    { "id": 1, "name": "Tom Yum Noodles", "price": 50, "stock": 2 },
    { "id": 2, "name": "Fried Rice", "price": 45, "stock": 1 }
  ]
  ```

---

### 🛒 Orders

`POST /orders` - Place a new order.

- **Headers:** `Authorization: Bearer <token>`
- **Body (JSON):**
  ```json
  {
    "itemId": 1,
    "quantity": 1
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "orderId": "ORD-abc123",
    "status": "created",
    "totalPrice": 45
  }
  ```

`GET /orders/<orderId>` - Retrieve order details.

- **Response (200 OK):**
  ```json
  {
    "orderId": "ORD-abc123",
    "status": "created",
    "totalPrice": 45
  }
  ```

---

## 🕵️ Your Mission: The Silent Auditor

Your task is to create a comprehensive Bruno collection that validates the entire workflow.

⚠️ **The Catch:** Nephew Lek left several **logic bugs** in the system. Some endpoints might return `200 OK` even when the business logic is completely broken.

**Your collection must include:**

1.  **Auth Flow**: Automatically store the `accessToken` from login and use it for subsequent requests.
2.  **Order Validation**: Ensure orders can only be placed with valid auth, valid items, and available stock.
3.  **Data Integrity**: Check that the `totalPrice` calculated by the API matches your expectations.
4.  **Edge Cases**: What happens if you order more than what's in stock? What happens if you request a non-existent order?

> [!TIP]
> **Clicking "Send" is not testing.** Your tests must contain scripts (Assertions or Javascript) that **FAIL** when the system behaves incorrectly.

---

## 🧠 Rules of the Lab

- ❌ **Do NOT** modify the `app.py` backend code.
- ❌ **Do NOT** rely on manual checking.
- ✅ **Use environment variables** for the Base URL and Tokens.
- ✅ **Use Scripts/Assertions** for all validations.

---

## 📦 What to Submit

1.  **Push your Bruno collection folder** to your GitHub repository.
2.  **Update your README.md** (the one in your fork) with:
    - A summary of the bugs you discovered.
    - How your tests detect these bugs.
3.  **Send the GitHub link** to your instructor via Discord.

---

_Good luck. Auntie Som is counting on you!_ 🍜🔥
