import { Component, Input, Signal, ViewChild, computed, effect } 
    from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { PlatformService } from "../platform.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: "paTable",
    templateUrl: "table.component.html"
})
export class TableComponent {
        
    constructor(private model: Model, private ps: PlatformService) { 
        this.DataSource = new MatTableDataSource<Product>();
        effect(() => {
            this.DataSource.data = this.model.Products()
        })
    }

    DataSource: MatTableDataSource<Product>;

    @Input()
    category?: string

    // getProduct(key: number): Product | undefined {
    //     return this.model.getProduct(key);
    // }

    // get Products(): Signal<Product[]> {
    //     return computed(() => {
    //         return this.model.Products().filter(p => 
    //             this.category == null || p.category == this.category);
    //     });
    // }

    // get Categories(): Signal<string[]> {
    //     return computed(() => {
    //         return this.model.Products()
    //             .map(p => p.category)
    //             .filter((c, index, arr) => c != undefined 
    //                 && arr.indexOf(c) == index) as string[];
    //     })
    // }

    deleteProduct(key?: number) {
        if (key != undefined) {
            this.model.deleteProduct(key);
        }
    }

    get isServer() { return this.ps.isServer }

    colsAndRows: string[] = ['id', 'name', 'category', 'price', 'buttons'];    

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit() {
        this.DataSource.paginator = this.paginator;
        this.DataSource.sort = this.sort;
    }        
}
