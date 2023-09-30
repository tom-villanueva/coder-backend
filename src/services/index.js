import Carts from "../dao/mongo/cart.mongo.js";
import Products from "../dao/mongo/products.mongo.js";
import Users from "../dao/mongo/users.mongo.js";
import Tickets from "../dao/mongo/tickets.mongo.js";
import Tokens from "../dao/mongo/tokens.mongo.js";

import CartsService from "./carts.service.js";
import ProductsService from "./products.service.js";
import UsersService from "./users.service.js";
import TicketsService from "./tickets.service.js";
import TokensService from "./token.service.js";

export const CartService = new CartsService(new Carts());
export const ProductService = new ProductsService(new Products());
export const UserService = new UsersService(new Users());
export const TicketService = new TicketsService(new Tickets());
export const TokenService = new TokensService(new Tokens());
