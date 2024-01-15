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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawlPage = exports.getURLsFromHTML = exports.normalizeURL = void 0;
const jsdom_1 = require("jsdom");
const node_fetch_1 = __importDefault(require("node-fetch"));
const getURLsFromHTML = (htmlBody, baseURL, onlyPaperLinks) => {
    const dom = new jsdom_1.JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');
    if (onlyPaperLinks) {
        console.log("\n==============Cazul cu pagina de profil ==============\n");
        const paperDivs = dom.window.document.querySelectorAll('div[data-work-id]');
        const urls = [];
        console.log("Numar articole: " + paperDivs.length);
        for (const paperDiv of paperDivs) {
            const linkImage = paperDiv.querySelector('a');
            if (linkImage) {
                urls.push(linkImage.href || '');
            }
        }
        return urls;
    }
    else {
        const urls = Array.from(links)
            .map(link => link.href ? (link.href.startsWith('/') ? `${baseURL}${link.href}` : link.href) : null)
            .filter(link => link !== null)
            .filter(link => {
            try {
                const test = new URL(link ? link : "");
                return true;
            }
            catch (e) {
                console.log(`${e === null || e === void 0 ? void 0 : e.message}:  ${link}`);
                return false;
            }
        });
        return urls;
    }
};
exports.getURLsFromHTML = getURLsFromHTML;
const normalizeURL = (urlStr) => {
    const urlObj = new URL(urlStr);
    const { hostname, pathname } = urlObj;
    const pathNameLower = pathname.toLowerCase();
    const hostPath = `${hostname}${pathNameLower}`;
    if (hostPath.length > 0 && hostPath.endsWith('/')) {
        return hostPath.slice(0, -1);
    }
    return hostPath;
};
exports.normalizeURL = normalizeURL;
const crawlPage = (baseURL, currentURL, pages, extPages, papersLinks, userName) => __awaiter(void 0, void 0, void 0, function* () {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    const normalizedURL = normalizeURL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        if (extPages.has(normalizedURL)) {
            var currentValue = extPages.get(normalizedURL) + 1;
            extPages.set(normalizedURL, currentValue);
        }
        else if (!normalizedURL.includes("mailto:") && ~normalizedURL.includes("tel:") && !normalizedURL.includes("javascript:void(0)")) {
            extPages.set(normalizedURL, 1);
        }
        return [pages, extPages];
    }
    if (pages.has(normalizedURL)) {
        var currentValue = pages.get(normalizedURL) + 1;
        pages.set(normalizedURL, currentValue);
        return [pages, extPages];
    }
    else {
        pages.set(normalizedURL, 1);
    }
    console.log(`actively crawling ${currentURL}`);
    try {
        const response = yield (0, node_fetch_1.default)(currentURL);
        const htmlBody = yield response.text();
        if (response.status > 399) {
            console.log(`error in fetch with status code: ${response.status}, on page: ${currentURL}`);
            return [pages, extPages];
        }
        else if (htmlBody === null) {
            console.log(`no html body found on page: ${currentURL}`);
            return [pages, extPages];
        }
        else if (htmlBody.length === 0) {
            console.log(`empty html body found on page: ${currentURL}`);
            return [pages, extPages];
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`not an html page: ${currentURL}`);
            return [pages, extPages];
        }
        if (normalizedURL.includes(userName.toLowerCase())) {
            const urls = getURLsFromHTML(htmlBody, baseURL, true);
            for (const currentURL of urls) {
                const currentURLObj = new URL(currentURL);
                const normalizedURL = normalizeURL(currentURL);
                if (baseURLObj.hostname !== currentURLObj.hostname) {
                    if (extPages.has(normalizedURL)) {
                        var currentValue = extPages.get(normalizedURL) + 1;
                        extPages.set(normalizedURL, currentValue);
                    }
                    else if (!normalizedURL.includes("mailto:") && ~normalizedURL.includes("tel:") && !normalizedURL.includes("javascript:void(0)")) {
                        extPages.set(normalizedURL, 1);
                    }
                    //return [pages, extPages];
                }
                else {
                    if (pages.has(normalizedURL)) {
                        var currentValue = pages.get(normalizedURL) + 1;
                        pages.set(normalizedURL, currentValue);
                        //return [pages, extPages];
                    }
                    else {
                        pages.set(normalizedURL, 1);
                    }
                }
            }
            console.log(pages);
            return [pages, extPages];
        }
        else {
            const urls = getURLsFromHTML(htmlBody, baseURL, false);
            for (const url of urls) {
                [pages, extPages] = yield crawlPage(baseURL, url, pages, extPages, papersLinks, userName);
            }
        }
    }
    catch (e) {
        console.log(`error in fetch: ${e.message}, on page: ${currentURL}`);
    }
    return [pages, extPages];
});
exports.crawlPage = crawlPage;
//# sourceMappingURL=crawler.js.map