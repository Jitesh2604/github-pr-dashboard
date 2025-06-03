# GitHub PR Dashboard

A Node.js application that uses GitHub OAuth to authenticate users and display their **open**, **merged**, and **closed (unmerged)** pull requests across all their public repositories.

---

## 🚀 Features

- GitHub OAuth login using Passport.js
- Fetches all public repositories of the authenticated user
- Displays:
  - 🔓 Open Pull Requests
  - ✅ Merged Pull Requests
  - ❌ Closed (Not Merged) Pull Requests
- Uses Express and EJS for server-side rendering
- Logout functionality

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Passport.js (GitHub OAuth Strategy)
- EJS (Templating)
- Axios (API Calls)
- Session Management

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/github-pr-dashboard.git
cd github-pr-dashboard

2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root directory and add the following:

env
Copy
Edit
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_random_session_secret
PORT=8080
🔐 You can get GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET by creating an OAuth App on GitHub: https://github.com/settings/developers

4. Run the App
bash
Copy
Edit
node server.js
Go to http://localhost:8080 and login with GitHub.

📸 Demo

✨ License
MIT © [Your Name]

python
Copy
Edit

---

Let me know if you'd like:
- A demo image
- A license added
- This deployed to GitHub Pages / Vercel
- Or an API version (instead of EJS)

I'll generate a full README with your actual GitHub username if you give it to me.