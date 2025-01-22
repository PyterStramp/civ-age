const mysql = require("mysql");

const getConnection = () => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "cv_age",
        insecureAuth : true,
    });
    con.connect((err) => {
        if (err) {
            console.error("Error al conectar a la base de datos:", err.message);
            throw err;
        }
        console.log("Conexión establecida con la base de datos.");
    });

    return con;
};

const executeConsult = (sql) => {
    return new Promise((resolve, reject) => {
        const con = getConnection();
        con.query(sql, (err, result) => {
            if (err) {
                con.end();
                return reject(err);
            }
            con.end();
            resolve(result);
        });
    });
};

module.exports = { getConnection, executeConsult };