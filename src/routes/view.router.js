import { Router } from "express";
import Messages from "../dao/dbManager/messages.js";




const router = Router();
const messagesManager = new Messages();

router.get('/' , async (req,res) => {
    let messages = await messagesManager.getAll();
    res.send({status:"success" , payload:messages})
})





export default router;


// import { Router } from "express";
// const route = Router();


// route.get('/' , (req , res) => {
//     try{
//         res.render('home');
//     }
//     catch(err){
//         res.send({status:"error", message:"error en realtimeproducts"}, err.message)
//     }
// })

// route.get('/realtimeproducts' , (req , res) => {
//     try{
//         res.render('realTimeProducts');
//     }
//     catch(err){
//         res.send({status:"error", message:"error en realtimeproducts"}, err.message)
//     }
// })

// export default route;