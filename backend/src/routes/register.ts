import { Router } from "express";
import User from "../database/model/user";
import { StatusCodes } from "http-status-codes";

const registerRouter = Router()

registerRouter.post("/", async (req, res) => {
    const result = await User.create(req.body);
    res.json(result);
    res.status(StatusCodes.CREATED).send();
})

export default registerRouter;