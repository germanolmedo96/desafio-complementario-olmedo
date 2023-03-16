import express from 'express';
import __dirname from '../src/utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/view.router.js';
import { Server } from 'socket.io';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import mongoose from "mongoose";
import Messages from "./dao/dbManager/messages.js";
import messagesRouter from "./routes/messages.router.js";


//INICIALIZAMOS EXPRESS
const app = express(); //TRAEMOS EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer =  app.listen(8080,async () =>  await mongoose.connect('mongodb+srv://germanolmedo96:159coderhouse@cluster0.ovef7zu.mongodb.net/?retryWrites=true&w=majority'), console.log("Server activado")) //levantamos el servido

const conection = mongoose.connect('mongodb+srv://germanolmedo96:159coderhouse@cluster0.ovef7zu.mongodb.net/?retryWrites=true&w=majority')

const socketServer = new Server(httpServer); //creamos un servidor con websocket 
app.engine('handlebars', handlebars.engine()); //agregamos handlebars a express
app.set('views', __dirname + '/views'); //seteamos las views
app.set('view engine', 'handlebars'); //seteamos las vistas con handlebars

app.use(express.static(__dirname + '/public')); //usamos la carpeta estatica para el servidor
app.use('/', viewRouter); //usamos la ruta de  viewRouter
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messagesRouter)

const messagesManager = new Messages();


//on = escuchar / recibir 
//emit = hablar / enviar



socketServer.on('connection', socket => {
    console.log("Tenemos un cliente conectado");
    

    socket.on('authenticated', data => {
        console.log(`Nombre de usuario ${data} recibido`);
        socket.broadcast.emit('newUserConnected', data);
    })

    socket.on("message", async (data) => {
        console.log(data);
        await messagesManager.saveMessage({ user: data.user, message: data.message })
        const logs = await messagesManager.getAll();
        io.emit("log", { logs });
    });


}) //hacemos que el socket escuche cuando el cliente  se conecte y mande un mensaje de que se conecto


