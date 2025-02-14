# Keep Project - Complete Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git (optional)

## Step 1: Project Setup

1. Create the project structure:
```bash
mkdir google-keep
mkdir server 
```

2. Set up the backend:
```bash
cd server
npm init -y
npm install express cors dotenv
npm install nodemon --save-dev
```

3. Set up the frontend:
```bash
cd ../google-keep
npx create-react-app 
npm install
```

## Step 2: Configure Environment Variables

1. Create backend `.env` file (in server directory):
```bash
cd ../server
echo "PORT=5000" > .env
```

2. Create frontend `.env` file (in client directory):
```bash
cd ../client
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

## Step 3: Copy Code Files

1. Create all necessary files according to the project structure:
```
KEEP-PROJECT/
├── google-keep/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Note.js
│   │   │   ├── NoteForm.js
│   │   │   └── NoteGrid.js
│   │   ├── App.js
│   │   └── App.css
│   └── .env
└── server/
    ├── server.js
    └── .env
```

2. Copy all the provided code into their respective files.

## Step 4: Update Package Files

1. Update server's package.json:
```bash
cd server
```
Edit package.json to include:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

2. Update client's package.json:
```bash
cd ../google-keep
```
Add the proxy configuration:
```json
{
  "proxy": "http://localhost:5000"
}
```

## Step 5: Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. In a new terminal, start the frontend:
```bash
cd client
npm start
```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Screenshots of the User Interface :
![image](https://github.com/user-attachments/assets/28d37890-97f8-45da-837a-5a7c10e2bc72)
![image](https://github.com/user-attachments/assets/01ec2836-1a01-4370-9b9e-6fac5e491b89)



## Step 6: Verify the Setup

1. Open http://localhost:3000 in your browser
2. Test the following features:
   - Create a new note
   - Edit an existing note
   - Delete a note
   - Verify that notes persist after page refresh
   - Check network requests in browser's Developer Tools

## Common Issues and Solutions

1. CORS Errors:
   - Verify the backend CORS configuration matches frontend URL
   - Check that frontend .env file has correct API URL

2. Connection Refused:
   - Ensure both servers are running
   - Verify the ports are correct (3000 for frontend, 5000 for backend)
   - Check for any error messages in the terminal

3. Notes Not Saving:
   - Check browser console for API errors
   - Verify localStorage in browser's Developer Tools
   - Ensure backend server is running

## Development Tips

1. Use `npm run dev` instead of `npm start` in the server directory for development to enable auto-reload

2. Monitor the browser's console and network tab while testing

3. Clear localStorage if you encounter persistent issues:
```javascript
localStorage.clear()
```

4. To stop the servers:
   - Press Ctrl+C in each terminal window
   - Or close the terminal windows

The application now provides a solid foundation for a Google Keep clone with both frontend and backend integration, plus local storage fallback for offline functionality.
