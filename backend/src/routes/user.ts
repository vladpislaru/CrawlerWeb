import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import Token from "../database/model/token";
import User from "../database/model/user";
import encryptService from "../database/service/encrypt";

const userRoute = Router();

userRoute.delete("/", async (req, res) => {
    console.log("Result from delete is : " + req);

    var result = await User.destroy({
        where: { 
            id: req.body.id
        }
    });

})

userRoute.post("/", async (req, res) => {
    const current_user = {
        id: req.user?.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        
    }

    const result = await User.update(
        current_user,
        {
            where: {
                id: req.user?.id
            }
        }
    );

    res.json({user: current_user});
    res.status(StatusCodes.CREATED).send();
})

export default userRoute;