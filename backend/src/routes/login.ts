import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import Token from "../database/model/token";
import User from "../database/model/user";
import encryptService from "../database/service/encrypt";
import { printReport } from "../utils/report.js";
import { crawlPage } from '../utils/crawler'



const loginRouter = Router()

loginRouter.post("/", async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email }})
    var pages : Map<string, number>;
    var extPages : Map<string, number>;

    // [pages, extPages] = await crawlPage("https://pub.academia.edu/CiprianDobre/", "https://pub.academia.edu/CiprianDobre/", new Map<string, number>(), new Map<string, number>(), [], "CiprianDobre");

    // console.log("AM ajuns aici " + JSON.stringify(pages));
    
    // printReport(pages, extPages, "https://pub.academia.edu/CiprianDobre/");

    if (!user) {
        res.status(StatusCodes.NOT_FOUND).send();
        return;
    }

    const passwordMatches = await encryptService.checkPassword(req.body, user);
    if (!passwordMatches) {
        res.status(StatusCodes.UNAUTHORIZED).send();
        return;
    }

    const token = await Token.create();
    user.setToken(token);

    res.json({
        token: token.token,
        expiresAt: token.expiresAt,
        user: user
    });
})

export default loginRouter;