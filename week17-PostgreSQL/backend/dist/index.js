"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pgClient = new pg_1.Client("postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable");
// const pgClient2 = new Client({
//     user: "postgres",
//     password: "mysecretpassword",
//     port: 5432,
//     host: "localhost",
//     database: "postgres"
// });
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield pgClient.connect().then(() => console.log("pgClient connected"));
    // await pgClient2.connect().then(() => console.log("pgClient2 connected"));
    const r = yield pgClient.query("SELECT * FROM users;");
    console.log(r.rows);
});
main();
