import { ItemStateAction } from 'src/app/shared/constant/ItemStateAction';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/shared/interface/item';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {

  public items: Item[] = [];

  constructor(
    private _store: Store
  ) {
    this._store.select((state:any) => state["items"]).subscribe(items => {
      this.items = items.items;
      console.log(this.items);
    })
  }

  ngOnInit(): void {
  }

  remove(item:Item) {
    this._store.dispatch({ type: ItemStateAction.Remove, payload: item})
  }

}
