import { NextFunction, Request, Response, Router } from "express";
import { getTopics } from "../controllers/topicsController";

const initRouter = (router: Router) => {
    router.route('/topics').get(getTopics)
}

export default initRouter;
