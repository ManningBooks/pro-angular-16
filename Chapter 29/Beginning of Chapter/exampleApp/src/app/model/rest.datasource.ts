import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable, catchError } from "rxjs";
import { PlatformService } from "../platform.service";

//export const REST_URL = `http://${location.hostname}:3500/products`;

@Injectable()
export class RestDataSource {
    private REST_URL: string;

    constructor(private http: HttpClient, ps: PlatformService) { 
        this.REST_URL = ps.isServer ? 
            "http://localhost:3500/products"
            : `http://${location.hostname}:3500/products`;
    }

    getData(): Observable<Product[]> {
        return this.sendRequest<Product[]>("GET", this.REST_URL);
    }

    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>("POST", this.REST_URL, product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>("PUT", 
            `${this.REST_URL}/${product.id}`, product);

    }

    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest<Product>("DELETE", 
            `${this.REST_URL}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: Product)
           : Observable<T> {
        return this.http.request<T>(verb, url, {
            body: body, 
            headers: new HttpHeaders({
                "Access-Key": "<secret>",
                "Application-Name": "exampleApp"
            })
        }).pipe(catchError((error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        })); 
    }
}
