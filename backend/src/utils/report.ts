import * as fs from 'fs';
import { Parser } from 'json2csv';

interface Page {
  url: string;
  count: number;
}

const createFilename = (typeOfLinks: string, trimmedURL: string): string => {
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

const createCsv = (sortedPages: Page[], typeOfLinks: string, trimmedURL: string): void => {
    const fields = ['url', 'count'];
    const pagesObj = sortedPages.map((page) => {
        return {
        url: page.url,
        count: page.count,
        };
    });
    const csv = new Parser({ fields });
    fs.writeFile(createFilename(typeOfLinks, trimmedURL), csv.parse(pagesObj), function (err) {
        if (err) throw err;
        console.log(`New ${typeOfLinks} links CSV file created and saved in reports directory!`);
    });
};

const sortPages = (pages: Map<string, number>): Array<Page> => {
    var pagesArr = new Array<Page>();
    
    for(let key of pages.keys()){
        pagesArr.push({ url: key, count: pages.get(key) as number})
    }

    pagesArr.sort((a, b) => {
        return b.count - a.count;
    });

    return pagesArr;
};

function printReport(pages: Map<string, number>, extPages: Map<string, number>, trimmedURL: string): void {
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
    } else {
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

export {
  sortPages,
  printReport
};
