import { Item } from 'src/app/shared/interface/item';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Item = {} as Item;
  @Output() removeItem = new EventEmitter<Item>();

  public loaded:boolean = false;
  public dummyImage = "https://picsum.photos/200/300?random=1"

  constructor() { }

  ngOnInit(): void {
  }

  onRemoveItem(item:Item) {
    this.removeItem.emit(item);
  }

}
