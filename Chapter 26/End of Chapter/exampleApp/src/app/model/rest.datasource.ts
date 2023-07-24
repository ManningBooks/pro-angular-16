import { Injectable, Signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable, catchError, delay } from "rxjs";

export const REST_URL = `http://${location.hostname}:3500/products`;

@Injectable()
export class RestDataSource {

    constructor(private http: HttpClient) { }

    getData(): Observable<Product[]> {
        return this.sendRequest<Product[]>("GET", REST_URL)
            .pipe(delay(5000));
    }

    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>("POST", REST_URL, product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>("PUT", 
            `${REST_URL}/${product.id}`, product);

    }

    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest<Product>("DELETE", `${REST_URL}/${id}`);
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
