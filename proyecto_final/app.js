import express from "express";
import productsRouter from "./src/routes/products/products.js";
import cartsRouter from "./src/routes/carts/carts.js";
import usersRouter from "./src/routes/users/users.js";
import viewsProductsRouter from "./src/routes/views/viewsProducts.js";
import { __dirname, connectMongo } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import MessageModel from "./src/dao/models/messages.model.js";

const port = 8080;

const app = express();

connectMongo();

// Config de express-handlebars
app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/src/views");

app.set("view engine", "handlebars");

// Config de express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(__dirname + "/public"));

const httpServer = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  const messages = await MessageModel.find({});

  io.emit("all_messages", messages);
  socket.on("msg_front_to_back", async (msg) => {
    const newMessage = await MessageModel.create(msg);
    const messages = await MessageModel.find({});
    io.emit("all_messages", messages);
  });
});

// Socket
// io.on("connection", async (socket) => {
//   console.log(`Nuevo cliente conectado ${socket.id}`);

//   const products = await ProductManager.getProducts();

//   socket.emit("products_changed", { products });
// });

// Conecto el socket con app para accederlo del req
// y cuando se agrega/elimina un product, puedo emitir al socket
app.use((req, res, next) => {
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
// Users endpoints
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found",
    data: {},
  });
});
