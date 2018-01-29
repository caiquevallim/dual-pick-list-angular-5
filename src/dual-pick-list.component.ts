import {Component, EventEmitter, Input, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Component({
    selector: 'app-dual-pick-list',
    templateUrl: './dual-pick-list.component.html',
    styleUrls: ['./dual-pick-list.component.css']
})
export class DualPickListComponent {
    @Input() textKeyLeftList: string;
    @Input() textKeyRightList: string;
    @Input() list: Array<any>;
    @Input() placeHolder: string;
    @Input() headerConfig: any;

    @Output() onTransaction = new EventEmitter<any>();


    itemsLeft: Array<any>;
    itemsRight: Array<any>;

    headerLeft: Array<any>;
    headerRight: Array<any>;

    filterLeftBy:string;
    filterRightBy:string;

    constructor(){
    }
    private dispatchTransaction = ()=>{
        let left = this.itemsLeft.map((i=>{
            let { left, right, isSelected, ...rest } = i;
            return rest;
        }));

        let right = this.itemsRight.map((i=>{
            let { left, right, isSelected, ...rest } = i;
            return rest;
        }));

        this.onTransaction.emit({
            leftList :left,
            rightList:right
        })

    };

    ngOnInit(){
        this.itemsLeft = [...this.list.filter(i=>i.left)].map(it=>{return{...it, isSelected:false} });
        this.itemsRight = [...this.list.filter(i=>i.right)].map(it=>{return{...it, isSelected:false} });
        this.headerLeft = [...this.headerConfig.left].filter(i=>!i.hidden || isNullOrUndefined(i.hidden));
        this.headerRight = [...this.headerConfig.right].filter(i=>!i.hidden || isNullOrUndefined(i.hidden));

        this.filterLeftBy  = this.headerLeft[0].key;
        this.filterRightBy = this.headerRight[0].key;

    }
    ngOnChanges(objChange){
        if(objChange.list){
            this.itemsLeft = [...objChange.list.currentValue.filter(i=>i.left)].map(it=>{return{...it, isSelected:false} });
            this.itemsRight = [...objChange.list.currentValue.filter(i=>i.right)].map(it=>{return{...it, isSelected:false} });
        }
        if(objChange.headerConfig){
            this.headerLeft = [...objChange.headerConfig.currentValue.left].filter(i=>!i.hidden || isNullOrUndefined(i.hidden));
            this.headerRight = [...objChange.headerConfig.currentValue.right].filter(i=>!i.hidden || isNullOrUndefined(i.hidden));
        }

    }
    getTransactionFromLeft(data){
        this.itemsRight = this.itemsRight.concat(data.toMove).map(i=>{return{...i, isSelected:false, left:false, right:true}});
        this.itemsLeft = data.notMove.map(it=>it);
        this.dispatchTransaction();
    }
    getTransactionFromRight(data){
        this.itemsLeft = this.itemsLeft.concat(data.toMove).map(i=>{return{...i, isSelected:false, left:true, right:false}});
        this.itemsRight = data.notMove.map(it=>it);
        this.dispatchTransaction();


    }
}
