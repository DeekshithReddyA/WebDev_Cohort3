import { Client } from "pg";

const pgClient = new Client("postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable");

// const pgClient2 = new Client({
//     user: "postgres",
//     password: "mysecretpassword",
//     port: 5432,
//     host: "localhost",
//     database: "postgres"
// });


const main = async () => {
    await pgClient.connect().then(() => console.log("pgClient connected"));
    // await pgClient2.connect().then(() => console.log("pgClient2 connected"));
    const r = await pgClient.query("SELECT * FROM users;");
    console.log(r.rows);
} 


main();

