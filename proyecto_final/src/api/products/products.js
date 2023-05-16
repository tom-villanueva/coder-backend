import express from "express";
import filePaths from "../../resources/resourcesPaths.js";
import ProductManager from "../../lib/product/ProductManager.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
	let products = [];

	if(req.query?.limit) {
		try {
			products = await ProductManager.getProducts(req.query.limit);
		} catch (error) {
			return res.status(error.statusCode).json({
				status: "error",
				msg: error.message,
				data: {},
			});
		}
	} else {
		products = await ProductManager.getProducts();
	}

	return res.status(200).json({
		status: "success",
		msg: "Products list",
		data: products,
	});
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const product = await ProductManager.getProductById(Number(req.params.pid));
    return res.status(200).json({
      status: "success",
      msg: "Product found",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

productsRouter.post("/", async (req, res) => {
	try {
		const product = await ProductManager.addProduct(req.body);

    return res.status(201).json({
      status: "success",
      msg: "Product created",
      data: product,
    });
	} catch (error) {
		return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
	}
});

productsRouter.put("/:pid", async (req, res) => {
	try {
		const product = await ProductManager.updateProduct(Number(req.params.pid), req.body);

    return res.status(201).json({
      status: "success",
      msg: "Product updated",
      data: product,
    });
	} catch (error) {
		return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
	}
});

productsRouter.delete("/:pid", async (req, res) => {
	try {
		const product = await ProductManager.deleteProduct(Number(req.params.pid));

    return res.status(201).json({
      status: "success",
      msg: "Product deleted",
      data: product,
    });
	} catch (error) {
		return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
	}
});

export default productsRouter;