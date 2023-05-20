import express from "express";

const viewsChatsRouter = express.Router();

viewsChatsRouter.get("/", (req, res) => {
  res.render('chat', {});
});

export default viewsChatsRouter;