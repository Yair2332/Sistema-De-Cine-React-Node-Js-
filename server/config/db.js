import mysql from "mysql";

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"cine_db",
    port:"3306"
})

db.connect((err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("Conexion exitosa");
    }
})

export default db;