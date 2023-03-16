import { Router } from "express";
import Carts from "../dao/dbManager/carts.js";

const router = Router();
const cartsManager = new Carts();

router.get('/' , async (req,res) => {
    let carts = await cartsManager.getAll();
    res.send({status:"success" , payload:carts})
})

router.post('/' , async (req,res) => {
    const result = await cartsManager.saveCart();
    res.send({status:"success" , payload:result});
})

router.delete('/:cid' , async (req,res) => {
    let id = req.params.cid;
    const result = await cartsManager.deleteCart(id);
    res.send({status:"success" , payload:result});
})

router.post('/:cid/product/:pid' , async (req,res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    let result = await cartsManager.addProductToCart(cid,pid);
    res.send({status:"success" , payload:result});
})

export default router;


// import cartManager from "../cart.manager.js";
// import { Router } from "express";
// const productos = new productManager("products.json");
// const carritos = new cartManager("carts.json");
// import productManager from "../product.manager.js";


// const router = Router();

// //crear carrito
// router.post('/', async (req, res) => {
//     try{
//         await carritos.addCart()
//         const cart = await carritos.getCarts();

//         res.send({status: 'ok', message: 'carrito creado con exito', idcarrito: cart.id})
//     }
//     catch(err) {
//         res.status(404).send({status: 'error', message: 'error al crear carrito', err: err.message});
//     }
// })


// //traer carrito por id
// router.get('/:cid', async(req, res) => {
//     try{

//         const cartId = Number(req.params.cid);
    
//         const arrcarr = await carritos.getCarts();
    
//         const carrito = arrcarr.find(cart=>cart.id === cartId)
//         carrito?res.send(carrito.products):res.status(404).send({status:"error", message:"el carrito no existe", error:err.message})
//     }
//     catch(err){
//         res.status(404).send({status:"error", message:"error en el get id de carrito"}, err.message)
//     }
// })

// //traer todos los carritos
// router.get("/", async (req, res) => {
//     const carritos_ = await carritos.getCarts();
//     res.json({ carritos_ });
// });


// //agregar productos a carrito seleccionados por id
// router.post('/:cid/product/:pid', async(req, res) => {
//     try{
//         const arrCarts = await carritos.getCarts();
//         // console.log(arrCarts,"carrito");
//         const arrProd = await productos.getProducts();
//         let cartIndex = arrCarts.findIndex(cart => cart.id == req.params.cid);
//         // console.log(cartIndex, "index");
//         let prodIndex = arrProd.findIndex(prod => prod.id == req.params.pid);
    
//         if (cartIndex == -1){
//             res.status(400).send({status:"error",error:"el carrito no existe"});
//             return
//          } 
//         if(prodIndex == -1){
//             res.status(400).send({status:"error",error:"el producto no existe"})
//          return   
//         }
//         await carritos.addProductToCart(Number(req.params.cid),Number(req.params.pid))
//         res.status(200).send({status:"Ok", message:"Producto agregado"})
//     }
//     catch(err){
//         res.status(404).send({status:"Error", message:"error en post de agregar producto al carrito"}, err.message);
//     }

// })

// export default router