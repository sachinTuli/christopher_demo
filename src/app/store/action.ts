import { Action } from '@ngrx/store';
import { ItemStateAction } from '../shared/constant/ItemStateAction';
import { Item } from '../shared/interface/item';

export class AddItem implements Action {
  readonly type = ItemStateAction.Add;

  constructor(public payload:Item) {

  }
}

export class RemoveItem implements Action {
  readonly type = ItemStateAction.Remove;

  constructor(public payload:Item) {

  }
}

export type ActionUnion = AddItem | RemoveItem;
