"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printReport = exports.sortPages = void 0;
const fs = __importStar(require("fs"));
const json2csv_1 = require("json2csv");
const createFilename = (typeOfLinks, trimmedURL) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const trimmedURLArr = trimmedURL.replace('.', '-').split('/');
    return `./reports/${trimmedURLArr[2]}.csv`;
    //return `./reports/${trimmedURLArr[2]}_${typeOfLinks}_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.csv`;
};
const createCsv = (sortedPages, typeOfLinks, trimmedURL) => {
    const fields = ['url', 'count'];
    const pagesObj = sortedPages.map((page) => {
        return {
            url: page.url,
            count: page.count,
        };
    });
    const csv = new json2csv_1.Parser({ fields });
    fs.writeFile(createFilename(typeOfLinks, trimmedURL), csv.parse(pagesObj), function (err) {
        if (err)
            throw err;
        console.log(`New ${typeOfLinks} links CSV file created and saved in reports directory!`);
    });
};
const sortPages = (pages) => {
    var pagesArr = new Array();
    for (let key of pages.keys()) {
        pagesArr.push({ url: key, count: pages.get(key) });
    }
    pagesArr.sort((a, b) => {
        return b.count - a.count;
    });
    return pagesArr;
};
exports.sortPages = sortPages;
function printReport(pages, extPages, trimmedURL) {
    const sortedPages = sortPages(pages);
    const sortedExtPages = sortPages(extPages);
    console.log(`
            INTERNAL LINKS - CRAWL REPORT
        ====================================
        `);
    for (const page of sortedPages) {
        console.log(`Found ${page.count} links to: ${page.url}`);
    }
    console.log(`
            INTERNAL LINKS - END OF REPORT
        ====================================
            `);
    createCsv(sortedPages, 'internal', trimmedURL);
    if (sortedExtPages.length < 1) {
        console.log(`
            EXTERNAL LINKS - CRAWL REPORT
        ====================================
            `);
        console.log('No external links found!');
        console.log(`
            EXTERNAL LINKS - END OF REPORT
        ====================================
            `);
        console.log("No external links CSV file created since there aren't any links!");
        return;
    }
    else {
        console.log(`
            EXTERNAL LINKS - CRAWL REPORT
        ====================================
        `);
        for (const page of sortedExtPages) {
            console.log(`Found ${page.count} links to: ${page.url}`);
        }
        console.log(`
            EXTERNAL LINKS - END OF REPORT
        ====================================
            `);
        createCsv(sortedExtPages, 'external', trimmedURL);
    }
}
exports.printReport = printReport;
//# sourceMappingURL=report.js.map