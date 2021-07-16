import { NextFunction, Request, Response, Router } from "express";
import { getProducts, getProductsByDay } from "../controllers/productsController";

const initRouter = (router: Router) => {
    router.route('/products').get(getProducts)

    router.route('/products/:day').get(getProductsByDay)
}

export default initRouter;
