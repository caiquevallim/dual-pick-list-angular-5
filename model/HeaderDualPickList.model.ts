import {HeaderTypeButtonDualPickListModel} from "./HeaderTypeButtonDualPickList.model";
import {HeaderTypeSelectDualPickListModel} from "./HeaderTypeSelectDualPickList.model";

export class HeaderDualPickListModel{

  text:string;
  key:string;
  custom:boolean;
  checkbox:boolean;
  button:HeaderTypeButtonDualPickListModel;
  select:HeaderTypeSelectDualPickListModel;

  constructor(text, key, custom = false, selectList = null, buttonFn = null, checkbox = null) {
    this.text = text;
    this.key = key;
    this.custom = custom;
    this.select = selectList? new HeaderTypeSelectDualPickListModel(selectList):null;
    this.button = buttonFn?new HeaderTypeButtonDualPickListModel(buttonFn):null;
    this.checkbox = checkbox;
  }


}
