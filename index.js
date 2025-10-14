import express from 'express';
import cors from 'cors';

import userRouter from './src/routes/userRouter.js';
import categoryRouter from './src/routes/toolCategoryRouter.js';
import materialCategoryRouter from './src/routes/materialCategoryRouter.js';
import toolRouter from './src/routes/toolRouter.js';
import materialRouter from './src/routes/materialRouter.js';
import authRouter from './src/routes/authRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); 

app.use('/users', userRouter);       
app.use('/toolCategories', categoryRouter);
app.use('/materialCategories', materialCategoryRouter);
app.use('/tools', toolRouter);
app.use('/materials', materialRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
