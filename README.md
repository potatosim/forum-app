# User credentials

**Try to login with example admin user (or any other user from db.json):**

### Admin

username: **emilys**
password: **emilyspass**

### User

username: **averyp**
password: **averyppass**

## Tech Stack

- React + TypeScript
- React Router Dom - to implement routing and secure routes.
- Eslint - to improve code quality.
- Material UI
- json-server

# Forum App

A forum-style application implemented with **React**. Json-server with local database is used as source of data (initial data is fetched from [https://dummyjson.com/](https://dummyjson.com/)). The app demonstrates users, posts, comments, per‑post routing, client‑side creation/deletion of posts and comments, likes/dislikes, favorites, a user profile (view/edit), and an optional admin area.

---

## Features

- **Users** list (from API) and per-user details (basic).
- **Posts** list (all posts) with pagination.
- **Filter posts by user** using a user selector.
- **Post details page** at a dedicated route (e.g., `/posts/:postId`).
- **Comments** under each post, ability to **add comments**.
- **Create/Delete posts** .
- **Like/Dislike** .
- **Favorites**: mark/unmark a post as favorite.
- **User Profile ("Account")**: view/edit personal information (name, email, address, avatar, birth date)
- **Admin Panel**: if the current user has role `admin`, show a link in the profile to `/admin/users` to view **all users** and inline‑edit their info.

---

## Getting Started

- clone this repository:
  **https://github.com/potatosim/forum-app.git**

```bash
git checkout main

npm install
```

## Start local json-server

```bash
npm run db

```

## Start the dev server

```bash
npm run dev

```

The app runs at 'http://localhost:5173'.
