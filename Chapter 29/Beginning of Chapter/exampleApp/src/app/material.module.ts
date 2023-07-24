import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { BrowserAnimationsModule } 
    from "@angular/platform-browser/animations";
import { MatRippleModule } from "@angular/material/core";

const features = [MatButtonModule, MatTableModule, 
    MatPaginatorModule, MatSortModule, MatRippleModule];

@NgModule({
    imports: [features, BrowserAnimationsModule],
    exports: [features]
})
export class MaterialFeatures {}
