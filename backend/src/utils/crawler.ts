import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const getURLsFromHTML = (htmlBody: string, baseURL: string, onlyPaperLinks: boolean): string[] => {
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll('a');

  if (onlyPaperLinks) {
    console.log("\n==============Cazul cu pagina de profil ==============\n");
    const paperDivs = dom.window.document.querySelectorAll('div[data-work-id]');
    const urls: string[] = [];
    console.log("Numar articole: " + paperDivs.length);

    for (const paperDiv of paperDivs) {
      const linkImage = paperDiv.querySelector('a');
      if (linkImage) {
        urls.push(linkImage.href || '');
      }
    }

    return urls;
  } else {
    const urls = Array.from(links)
      .map(link => link.href ? (link.href.startsWith('/') ? `${baseURL}${link.href}` : link.href) : null)
      .filter(link => link !== null)
      .filter(link => {
        try {
          const test = new URL(link ? link : "");
          return true;
        } catch (e: any) {
          console.log(`${e?.message}:  ${link}`);
          return false;
        }
      }) as string[];

    return urls;
  }
};

const normalizeURL = (urlStr: string): string => {
  const urlObj = new URL(urlStr);
  const { hostname, pathname } = urlObj;
  const pathNameLower = pathname.toLowerCase();
  const hostPath = `${hostname}${pathNameLower}`;

  if (hostPath.length > 0 && hostPath.endsWith('/')) {
    return hostPath.slice(0, -1);
  }
  return hostPath;
};

const crawlPage = async (
  baseURL: string,
  currentURL: string,
  pages: Map<string, number>,
  extPages: Map<string, number>,
  papersLinks: string[],
  userName: string
): Promise<[Map<string, number>, Map<string, number>]> => {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  const normalizedURL: string = normalizeURL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {

    if (extPages.has(normalizedURL)) {
        var currentValue: number  = extPages.get(normalizedURL) as number + 1;
        extPages.set(normalizedURL, currentValue);

    } else if (  !normalizedURL.includes("mailto:") && ~normalizedURL.includes("tel:") && !normalizedURL.includes("javascript:void(0)")) 
    {
        extPages.set(normalizedURL, 1);

    }
    return [pages, extPages];
  }

  if (pages.has(normalizedURL)) {

    var currentValue: number  = pages.get(normalizedURL) as number + 1;
    pages.set(normalizedURL, currentValue);

    return [pages, extPages];
  } else {
    pages.set(normalizedURL, 1);
  }

  console.log(`actively crawling ${currentURL}`);

  try {
    const response = await fetch(currentURL);
    const htmlBody = await response.text();

    if (response.status > 399) {
      console.log(`error in fetch with status code: ${response.status}, on page: ${currentURL}`);
      return [pages, extPages];
    } else if (htmlBody === null) {
      console.log(`no html body found on page: ${currentURL}`);
      return [pages, extPages];
    } else if (htmlBody.length === 0) {
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
                var currentValue: number  = extPages.get(normalizedURL) as number + 1;
                extPages.set(normalizedURL, currentValue);
        
            } else if (  !normalizedURL.includes("mailto:") && ~normalizedURL.includes("tel:") && !normalizedURL.includes("javascript:void(0)")) 
            {
                extPages.set(normalizedURL, 1);
        
            }
            //return [pages, extPages];
          }else{
            if (pages.has(normalizedURL)) {
        
                var currentValue: number  = pages.get(normalizedURL) as number + 1;
                pages.set(normalizedURL, currentValue);
            
                //return [pages, extPages];
              } else {
                pages.set(normalizedURL, 1);
              }
          }
        
          
      }
      console.log(pages);
      return [pages, extPages];
    } else {
      const urls = getURLsFromHTML(htmlBody, baseURL, false);

      for (const url of urls) {
        [pages, extPages] = await crawlPage(baseURL, url, pages, extPages, papersLinks, userName);
      }
    }
  } catch (e: any) {
    console.log(`error in fetch: ${e.message}, on page: ${currentURL}`);
  }
  return [pages, extPages];
};

export {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};
