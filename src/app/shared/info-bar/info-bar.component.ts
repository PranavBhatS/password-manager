import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-bar',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngIf="showAlert" class="w-100 right-4 bottom-0 text-white  px-2 py-4 border-0 shadow-2xl rounded-xl fixed mb-4 bg-green-500">
  <span class="text-xl inline-block mr-5 align-middle">
    <i class="fas fa-bell"> </i>
  </span>
  <span class="inline-block align-middle mr-8">
    <b class="capitalize">
      <ng-content></ng-content>!
    </b>
  </span>
  <button
    class="absolute bg-transparent text-xl p-3 font-semibold leading-none -right-3 -top-3 mt-1 mr-1 outline rounded-full focus:outline-none bg-green-500"
    (click)="showAlert ='' ">
    <span>×</span>
  </button>
</div>`
})
export class InfoBarComponent implements OnChanges {
  @Input() showAlert!: string;
  ngOnChanges(): void {
    setTimeout(() => {
      this.showAlert = ""
    }, 5000);
  }
}
