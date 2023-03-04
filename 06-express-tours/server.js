const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});
const app = require('./app');
const sql = require('mssql');
const dbConfig = require('./database/dbconfig');
//https://www.npmjs.com/package/mssql#asyncawait => Global Pool Single Instance
const appPool = new sql.ConnectionPool(dbConfig.sqlConfig);
appPool.connect()
    .then((pool)=>{
        console.log('SQL Connected!');
        dbConfig.db.pool = pool;
    }).catch((e) => {
        console.error(e );
    });


const PORT = process.env.PORT; //hard code
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});