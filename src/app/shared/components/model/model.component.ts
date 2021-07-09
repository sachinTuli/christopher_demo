import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../interface/item';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  @Input() item: Item = {} as Item;

  public form:FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      width: new FormControl(0, [Validators.required, Validators.min(1)]),
      height: new FormControl(0, [Validators.required, Validators.min(1)])
    })
  }

  ngOnInit(): void {
    this.form.patchValue(this.item);
  }

  save() {
    if(!this.form.valid) {
      return
    }
    this.item = {...this.item, ...this.form.value};
    this.activeModal.close(this.item);
  }

}
