import { Client } from "pg";

const pgClient = new Client("postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable");

// const pgClient2 = new Client({
//     user: "postgres",
//     password: "mysecretpassword",
//     port: 5432,
//     host: "localhost",
//     database: "postgres"
// });


// const main = async () => {
//     await pgClient.connect().then(() => console.log("pgClient connected"));
//     // await pgClient2.connect().then(() => console.log("pgClient2 connected"));
//     const response = await pgClient.query("CREATE TABLE users (id SERIAL PRIMARY KEY,username VARCHAR(50) UNIQUE NOT NULL,email VARCHAR(255) UNIQUE NOT NULL,password VARCHAR(255) NOT NULL,created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);");
//     console.log(response);
//     const res = await pgClient.query("INSERT INTO users(username , email , password) VALUES('deekshith' , 'deekshith@gmail.com' , 'deeks');")
//     console.log(res);
//     const r = await pgClient.query("SELECT * FROM users;");
//     console.log(r);
// } 


const main = async() => {

    const username = "deeks";
    const email = "deeks";
    const password = "deeks";

    const city = "hyderabad";
    const country = "India";
    const street = "6";
    const pincode = 500068


    await pgClient.connect().then(() => console.log("pgClient connected"));

//     CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE addresses (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER NOT NULL,
//     city VARCHAR(100) NOT NULL,
//     country VARCHAR(100) NOT NULL,
//     street VARCHAR(255) NOT NULL,
//     pincode VARCHAR(20),
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// );

    const insertQuery = `INSERT INTO users (username, email ,password) VALUES($1 , $2 , $3 , $4) RETURNING id;`

    const addressInsertQuery = `INSERT INTO adressed(city , country , street, pincode, user_id) VALUES($1 , $2, $3 , $4 , $5);`
    const insertValues = [username , email , password];



    await pgClient.query("BEGIN;") //transaction 

    const response = await pgClient.query(insertQuery , insertValues);
    const userId = response.rows[0].id;
    const addressInsertResponse = await pgClient.query(addressInsertQuery , [city , country , street , pincode , userId]);

    await pgClient.query("COMMIT;") // transaction ends
}


main();

