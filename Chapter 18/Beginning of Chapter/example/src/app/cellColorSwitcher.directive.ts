import { Directive, Input, SimpleChanges, ContentChildren, QueryList, 
    ChangeDetectorRef } from "@angular/core";
import { PaCellColor } from "./cellColor.directive";

@Directive({
    selector: "table"
})
export class PaCellColorSwitcher {

    constructor(private changeRef: ChangeDetectorRef) {}

    @Input("paCellDarkColor")
    modelProperty: Boolean | undefined;

    @ContentChildren(PaCellColor, {descendants: true})    
    contentChildren: QueryList<PaCellColor> | undefined;

    ngOnChanges(changes: SimpleChanges) {
        this.updateContentChildren(changes["modelProperty"].currentValue);
    }

    ngAfterContentInit() {
        if (this.modelProperty != undefined) {
            this.contentChildren?.changes.subscribe(() => {
                this.updateContentChildren(this.modelProperty as Boolean); 
            });
        }
    }

    private updateContentChildren(dark: Boolean) {
        if (this.contentChildren != null && dark != undefined) {
            this.contentChildren.forEach((child, index) => {
                if (dark) {
                    child.setColor(index % 2 ? dark : !dark);
                } else {
                    child.setColor(false);
                }
            });
            this.changeRef.detectChanges();
        }
    }
}
