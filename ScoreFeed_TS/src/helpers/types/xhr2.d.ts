declare module 'xhr2' {
  class XMLHttpRequest {
    open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
    send(data?: Document | BodyInit | null): void;
    setRequestHeader(name: string, value: string): void;
    getResponseHeader(name: string): string | null;
    getAllResponseHeaders(): string;
    abort(): void;
    
    readonly UNSENT: 0;
    readonly OPENED: 1;
    readonly HEADERS_RECEIVED: 2;
    readonly LOADING: 3;
    readonly DONE: 4;
    
    readyState: number;
    status: number;
    statusText: string;
    responseText: string;
    responseXML: Document | null;
    timeout: number;
    withCredentials: boolean;
    
    onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null;
    ontimeout: ((this: XMLHttpRequest, ev: Event) => any) | null;
    onerror: ((this: XMLHttpRequest, ev: Event) => any) | null;
    onload: ((this: XMLHttpRequest, ev: Event) => any) | null;
  }
  
  export = XMLHttpRequest;
}