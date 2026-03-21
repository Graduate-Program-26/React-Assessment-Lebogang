# GitView: GitHub Personal Dashboard

A high-performance dashboard built with **Next.js** that allows users to authenticate with GitHub to view their personal statistics, or explore any public profile via a dedicated demo mode.

## Features

* **Secure GitHub OAuth:** Integrated via Auth.js for seamless, passwordless authentication.
* **Protected Dashboard:** Middleware-guarded `/dashboard` route displaying authenticated user data.
* **Dynamic Data Fetching:** Real-time retrieval of top repositories, star counts, and recent activity (commits, PRs, Issues).
* **Public Demo Mode:** Shareable `/demo/[username]` routes that fetch public data without requiring a login.
* **Contribution Visualization:** Zero-config embedding of the GitHub contribution calendar.
* **Modern UI/UX:** Fully responsive design with **Tailwind CSS** and a system-aware **Dark Mode**.

---

## Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js|
| **Authentication** | Auth.js|
| **Styling** | Tailwind CSS + Shadcn |
| **API** | GitHub REST API |


---

## Architecture & Implementation

### 1. The OAuth Flow
The application uses the **Authorization Code Grant** flow. Upon clicking "Login," the user is redirected to GitHub to authorize the `read:user` scope. Auth.js handles the callback, exchanges the temporary code for an `access_token`, and encrypts the session into a secure, HTTP-only cookie.

### 2. Route Protection
We utilize Next.js Middleware to verify sessions at the edge:


### 3. Data Fetching Strategy
* **Authenticated:** Fetches are performed on the server-side using the user's OAuth token to benefit from higher rate limits.
* **Demo Mode:** Public routes fetch data using a single server-side Personal Access Token (PAT) to prevent `403 Forbidden` errors from unauthenticated rate-limiting.


