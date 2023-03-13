const app = require('./app');

const dotenv = require('dotenv');

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception Error');

    server.close(()=>{
        process.exit(1);
    });
})

//config
dotenv.config({path:"backend/config/config.env"});

// importing mongodb connection
const connectDb = require('./config/db');
connectDb();    // calling connect fx

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');

    server.close(()=>{
        process.exit(1);
    });
});