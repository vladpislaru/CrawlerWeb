"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationsRouter = (0, express_1.Router)();
// locationsRouter.get("/", async (req, res) => {
//     const locations = await req.user?.getLocations() ?? []
//     var locationsFamily = new Array();
//     const familyUsers = await User.findAll({
//         where: { familyId: req.user?.familyId },
//     });
//      for(var i = 0 ; i < familyUsers.length; i++) {
//         if(familyUsers[i].id != req.user?.id){
//             var userFamilySharedLocations = await familyUsers[i].getLocations() ?? []
//             console.log("\nUser name : " + familyUsers[i].name + "\n" + JSON.stringify(userFamilySharedLocations) +  " \n===========================")
//             locationsFamily = locationsFamily.concat(userFamilySharedLocations);
//         }
//     }
//     res.json({ locations, locationsFamily })
// })
// locationsRouter.post("/", async (req, res) => {
//     const location = await req.user?.createLocation(req.body);
//     res.json({ location });
// })
// locationsRouter.delete("/", async (req, res) => {
//     console.log("Result from delete is : " + req);
//     var result = await Location.destroy({
//         where: { 
//             id: req.body.id
//         }
//     });
//     res.status(StatusCodes.NO_CONTENT).send();
// })
// locationsRouter.put("/:locationID", async (req, res) => {
//     await Location.update(req.body, {
//         where: {
//             id: req.params.locationID
//         }
//     });
//     res.status(StatusCodes.NO_CONTENT).send();
// })
exports.default = locationsRouter;
//# sourceMappingURL=locations.js.map