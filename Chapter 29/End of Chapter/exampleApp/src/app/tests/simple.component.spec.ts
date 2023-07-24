import { TestBed, ComponentFixture, waitForAsync} 
    from "@angular/core/testing";
import { SimpleComponent } from "../simple.component";
import { Product } from "..//model/product.model";
import { Model } from "../model/repository.model";
import { signal } from "@angular/core";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Component, ViewChild } from "@angular/core";

@Component({
    template: `<simple [pa-model]="model"></simple>`
})
class TestComponent {

    constructor(public model: Model) { }

    @ViewChild(SimpleComponent)
    SimpleComponent!: SimpleComponent;
}

describe("SimpleComponent", () => {

    let fixture: ComponentFixture<TestComponent>;
    let component: SimpleComponent;
    let debugElement: DebugElement;
    let divElement: HTMLDivElement;    

    let mockRepository = {
        Products: signal([
            new Product(1, "test1", "Soccer", 100),
            new Product(2, "test2", "Chess", 100),
            new Product(3, "test3", "Soccer", 100)
        ])
    }
    
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleComponent, TestComponent],
            providers: [
                { provide: Model, useValue: mockRepository }
            ]
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            component = fixture.componentInstance.SimpleComponent;
            debugElement = fixture.debugElement
                .query(By.directive(SimpleComponent));
        });
    }));

    // it("implements output property", () => {
    //     let highlighted: boolean = false;
    //     component.change.subscribe(value => highlighted = value);
    //     debugElement.triggerEventHandler("mouseenter", 
    //         new Event("mouseenter"));
    //     expect(highlighted).toBeTruthy();
    //     debugElement.triggerEventHandler("mouseleave", 
    //         new Event("mouseleave"));
    //     expect(highlighted).toBeFalsy();
    // });

    it("receives the model through an input property", () => {
        component.category = "Chess";
        fixture.detectChanges();
        let products = mockRepository.Products()
            .filter(p => p.category == component.category);
        let componentProducts = component.getProducts();
        for (let i = 0; i < componentProducts.length; i++) {
            expect(componentProducts[i]).toEqual(products[i]);
        }
        expect(debugElement.query(By.css("span")).nativeElement.textContent)
            .toContain(products.length);
    });
});
