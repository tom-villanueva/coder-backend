import express from "express";
import productsRouter from "./src/api/products/products.js";
import cartsRouter from "./src/api/carts/carts.js";
import viewsProductsRouter from "./src/api/views/viewsProducts.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsChatsRouter from "./src/api/views/viewsChat.js";
import { Server } from "socket.io";
import ProductManager from "./src/lib/product/ProductManager.js"

const port = 8080;

const app = express();

// Config de express-handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');

// Config de express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

const httpServer = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = new Server(httpServer);

// Socket
io.on('connection', async socket => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  const products = await ProductManager.getProducts();

  socket.emit('products_changed', {products});
});

// Conecto el socket con app para accederlo del req
// y cuando se agrega/elimina un product, puedo emitir al socket
app.use((req,res,next) => {
  req.io = io;
  next();
});

// Views endpoints
app.use("/", viewsProductsRouter);
// app.use("/chat", viewsChatsRouter);
// Product endpoints
app.use("/products", productsRouter);
// Carts enpoints
app.use("/carts", cartsRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found",
    data: {},
  });
});