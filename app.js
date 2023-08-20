import express from 'express';
const app = express();

app.use(express.json());


import router from './router/router.js';
app.use('/api',router);


app.listen(8080, () =>
console.log('Example app listening on port 3000!'),
);