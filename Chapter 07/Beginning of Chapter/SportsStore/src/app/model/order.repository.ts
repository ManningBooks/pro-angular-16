import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class OrderRepository {

    constructor(private dataSource: RestDataSource) {}

    saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }
}
