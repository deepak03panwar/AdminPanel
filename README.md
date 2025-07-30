#  Admin Panel with Backend (MERN Stack)

This project is a full-featured admin panel built using the MERN stack. It supports admin authentication, employee and task management, and a dashboard with useful stats.


##  How to Run the Project Locally

Follow the steps below to set up the project on your local machine.

###  1. Clone the Repository

git clone https://github.com/your-username/your-repo-name.git
cd "Machine Test"
⚙ 2. Setup Backend (server folder)
cd server
npm install

Create a .env file inside server/ with the following content:

PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key

Start the backend server:

npm start
Backend will run at: http://localhost:5000

 3. Setup Frontend (adminpanel folder)

cd ../adminpanel
npm install
npm start
Frontend will run at: http://localhost:3000

Admin Login
Admin credentials are stored in MongoDB.

You can manually insert an admin user via MongoDB or build a seed script.

Features
Admin Login with JWT Auth

Forgot Password flow (email/token-based logic)

Dashboard showing total tasks and employees

Employee CRUD (Create, Read, Update, Delete)

Task CRUD + Task Assignment

Responsive, clean UI using React



 Git Ignore
Make sure the following files/folders are excluded from the repo via .gitignore:

# Common
node_modules/
.env

📌 Notes
Use MongoDB Atlas or local MongoDB instance

Ensure ports 3000 (frontend) and 5000 (backend) are free

Customize .env values as needed

📃 License
This project is for learning/demo purposes.

You can now **save this as `README.md`** in your root project folder and **commit + push** it to GitHub:

git add README.md
git commit -m "Add project README"
git push origin main
