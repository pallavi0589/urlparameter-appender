// This is a utility class that likely contains helper methods related  
// to the manipulation and construction of URLs.

export class UrlHelper {
    // below is the logic to form the new URL.
    static appendParameters(url: string, parameters: string): string {
    const urlObj = new URL(url);
    let baseUrl = urlObj.origin + urlObj.pathname;
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    const finalUrl = baseUrl + parameters;
    return finalUrl;

    // Below is the code with using search property of URL, for future modifications.
     /* urlObj.search += (urlObj.search ? '&' : '') + parameters;
      return urlObj.toString(); */
    }
  }
  