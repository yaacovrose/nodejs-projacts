import express from 'express';
import morgan from 'morgan';
const app = express();

app.use(express.json());
app.use(morgan('dev'))
// app.use(morgan('tiny'));


import productRouter from './router/router.products.js';
import usersRouter from './router/router.users.js';
app.use('/api/products', productRouter);
app.use('/api/users/', usersRouter)




app.listen(8080, () =>
console.log('Example app listening on port 8080!'),
);