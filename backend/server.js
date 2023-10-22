const app = require('./app');
const env = require('dotenv');
const connectDatabse = require('./config/database')

// Handling uncaught error 
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`)
    process.exit(1);
});

//  config

env.config({path:`backend/config/.env`})



// connect to database

connectDatabse()



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on http://localhost:${process.env.PORT}`);
})

// unhandled promise rejection

process.on("unhandledRejection",err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`)

    server.close(() => {
        process.exit(1);
    });

});