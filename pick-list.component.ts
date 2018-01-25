import {Component, EventEmitter, Input, Output} from '@angular/core';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-pick-list',
  templateUrl: './pick-list.component.html',
  styleUrls: ['./pick-list.component.css']
})
export class PickListComponent {
  @Input() textLabel: string;
  @Input() list: Array<any>;
  @Input() placeHolder: string;
  @Input() headerConfig: any;
  @Input() position:string;
  @Output() onTransaction = new EventEmitter<any>();


  items: Array<any>;

  header: Array<any>;

  filter:string;

  filterBy:string;

  iconsDirection: string;

  constructor(){
  }

  private dispatchTransaction = (notMove, toMove)=>{

    this.onTransaction.emit({
      notMove:notMove.map((i=>{
        let { isSelected, ...rest } = i;
        return rest;
      })),
      toMove:toMove.map((i=>{
        let { isSelected, ...rest } = i;
        return rest;
      }))
    })

  };
  ngOnInit(){
    this.iconsDirection = 'glyphicon glyphicon-arrow-'+this.position;
    this.items = [...this.list.map(it=>{return{...it, isSelected:false} })];
    this.header = [...this.headerConfig].filter(i=>!i.hidden || isNullOrUndefined(i.hidden));

    this.filterBy  = this.header[0].key;

  }
  ngOnChanges(objChange){
    if(objChange.list)
      this.items = [...objChange.list.currentValue];

    if(objChange.headerConfig)
      this.header = [...objChange.headerConfig.currentValue].filter(i=>!i.hidden || isNullOrUndefined(i.hidden));

    if(objChange.filterBy)
      this.filterBy  = objChange.filterBy.currentValue;
  }
  moveAll(){
    this.dispatchTransaction([], this.items);
  }
  moveJustSelected(){
    this.dispatchTransaction(this.items.filter(it=>!it.isSelected), this.items.filter(it=>it.isSelected));
  }
  setFilterBy(field){
    this.filterBy = field;
  }

  transact(){
    this.dispatchTransaction(this.items,[])
  }
}
