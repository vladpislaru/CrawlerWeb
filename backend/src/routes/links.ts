import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../database/model/user";
import Link from "../database/model/links";
import { crawlPage } from '../utils/crawler'
import { printReport } from "../utils/report.js";

const linkRoute = Router();

linkRoute.get("/", async (req, res) => {

    const links = await req.user?.getLinks() ?? []

    res.json({links});
})

linkRoute.post("/crawl", async (req, res) => {

    var pages : Map<string, number>;
    var extPages : Map<string, number>;
    var webSite = req.body.webSite;
    console.log(webSite)

    var links: Array<Link> = new Array<Link>();

    [pages, extPages] = await crawlPage(webSite, webSite, new Map<string, number>(), new Map<string, number>(), [], "CiprianDobre");

    console.log("Am ajuns aici " + JSON.stringify(pages));
    
    printReport(pages, extPages, webSite);

    for (const page of extPages.keys()) {
        var articleTitle = page.slice(page.lastIndexOf('/') + 1 , page.length-1); 
        const paperLink = await req.user?.createLink(
            {
                name: articleTitle,
                link: page,
                count: extPages.get(page) as number
            }
        );

        links.push(paperLink as Link);
    }

    //const links = await req.user?.getLinks() ?? []

    res.json({links});
})

export default linkRoute;
