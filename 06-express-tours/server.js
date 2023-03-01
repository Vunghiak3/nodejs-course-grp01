const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

const app = require('./app');

const PORT = process.env.PORT; //hard code
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});