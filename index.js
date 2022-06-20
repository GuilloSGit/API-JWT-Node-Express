import express from 'express';
import 'dotenv/config'; // lets us use environment variables in the whole app
import './database/connectdb.js'; // connects to the database
import routerAuth from './routes/auth.route.js'; // imports the auth routes

const app = express(); // creates an express app

app.use(express.json()); // allows us to use json in our requests
app.use('/api/v1', routerAuth); // uses the auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀🐥\n`,
        `Visit http://localhost:${PORT}`);
});