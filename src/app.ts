import cors from 'cors';
import express, { Application, Request, Response,  } from 'express';
import { ProductRoute } from './app/modules/Products/products.route';
import { orderRoute } from './app/modules/Order/order.route';



// import { StudentRoutes } from './app/modules/Student/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoute);

app.use('/api/orders', orderRoute)


const getAController = (req: Request, res: Response) => {
  res.send('welcome our server');
};

app.get('/', getAController);
// Error handling middleware
app.use((req, res, ) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: any, res: any, ) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
});

export default app;
