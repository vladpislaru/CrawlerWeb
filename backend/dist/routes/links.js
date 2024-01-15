"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawler_1 = require("../utils/crawler");
const report_js_1 = require("../utils/report.js");
const linkRoute = (0, express_1.Router)();
linkRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const links = (_b = yield ((_a = req.user) === null || _a === void 0 ? void 0 : _a.getLinks())) !== null && _b !== void 0 ? _b : [];
    res.json({ links });
}));
linkRoute.post("/crawl", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    var pages;
    var extPages;
    var webSite = req.body.webSite;
    console.log(webSite);
    var links = new Array();
    [pages, extPages] = yield (0, crawler_1.crawlPage)(webSite, webSite, new Map(), new Map(), [], "CiprianDobre");
    console.log("Am ajuns aici " + JSON.stringify(pages));
    (0, report_js_1.printReport)(pages, extPages, webSite);
    for (const page of extPages.keys()) {
        var articleTitle = page.slice(page.lastIndexOf('/') + 1, page.length - 1);
        const paperLink = yield ((_c = req.user) === null || _c === void 0 ? void 0 : _c.createLink({
            name: articleTitle,
            link: page,
            count: extPages.get(page)
        }));
        links.push(paperLink);
    }
    //const links = await req.user?.getLinks() ?? []
    res.json({ links });
}));
exports.default = linkRoute;
//# sourceMappingURL=links.js.map