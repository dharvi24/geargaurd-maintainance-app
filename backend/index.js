import dotenv from 'dotenv';
dotenv.config(); // Must be first
import express from 'express'
import cors from 'cors';

import connectMongoDB from './database/db.js'
import authRoutes from './routes/authRoute.js'
import teamRoutes from "./routes/teamRoutes.js";
import equipmentRoutes from "./routes/equipmentRout.js";
import userRoutes from './routes/userRoute.js'
import maintenanceRequestRoutes from "./routes/maintenanceRequestRoutes.js";




const app = express();


const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: '*'  // allows all frontends to access
}));
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))

//mongoDb connection
connectMongoDB();

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/maintenance-requests", maintenanceRequestRoutes);

// app.use('/api/v1/user',userRoute)
// app.use('/api/v1/product',productRoute)
// app.use('/api/v1/cart',cartRoute)


app.listen(PORT,'0.0.0.0',()=>{
    console.log('====================================');
    console.log("Server is running on port ",PORT);
    console.log('====================================');
})