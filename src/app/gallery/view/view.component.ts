import { ModelComponent } from './../../shared/components/model/model.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ItemStateAction } from 'src/app/shared/constant/ItemStateAction';
import { Item } from 'src/app/shared/interface/item';
import { AddItem } from 'src/app/store/action';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  private START_INDEX = 1;
  private INITIAL_WIDTH = 200;
  private INITIAL_HEIGHT = 300;
  private BASE_URL = "https://picsum.photos/id";
  private items: Item[] = [];

  public controlForm: FormGroup;
  public url:string = "";
  public isLoading:boolean = false;
  public loaded:boolean = false;
  public dummyImage = "https://picsum.photos/200/300?random=1"

  constructor(
    private _fb:FormBuilder,
    private _store: Store,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.controlForm = this._fb.group({
      id: new FormControl(this.START_INDEX, [Validators.min(1)]),
      width: new FormControl(this.INITIAL_WIDTH, [Validators.min(1)]),
      height: new FormControl(this.INITIAL_HEIGHT, [Validators.min(1)])
    })
  }

  ngOnInit(): void {
    this._store.select((state:any) => state["items"]).subscribe(items => {
      this.items = items.items;
    })
    this.getURL();
  }

  getURL() {
    if(!this.controlForm.valid) {
      return;
    }
    const formData = this.controlForm.value;
    this.url = `${this.BASE_URL}/${formData.id}/${formData.width}/${formData.height}`
  }

  next() {
    this.isLoading = true;
    this.loaded = false;
    setTimeout(() => {
      let currunt_id = this.controlForm.get('id')?.value;
      currunt_id++;
      this.controlForm.get('id')?.patchValue(currunt_id);
      this.getURL();
      this.isLoading = false;
    }, 200);
  }

  prev() {
    this.isLoading = true;
    this.loaded = false;
    setTimeout(() => {
      let currunt_id = this.controlForm.get('id')?.value;
      currunt_id--;
      this.controlForm.get('id')?.patchValue(currunt_id);
      this.getURL();
      this.isLoading = false;
    }, 200);
  }

  save() {
    let f = this.controlForm.controls;
    let obj:Item = {
      id: f.id.value,
      height: f.height.value,
      width: f.width.value,
      url: this.url
    }
    let i = this.items.find(item => item.id === obj.id);
    if(i) {
      this.toastr.warning("Item already added into the list.")
      return
    }
    this.openModal(obj);

  }

  openModal(item:Item) {
    const modalRef = this.modalService.open(ModelComponent);
    modalRef.componentInstance.item = item;

    modalRef.result.then(i => {
      if(i) {
        i.url = `${this.BASE_URL}/${i.id}/${i.width}/${i.height}`
        this._store.dispatch({ type: ItemStateAction.Add, payload: i });
        this.toastr.success("Item store successfully.")
      }
    })
  }

}
