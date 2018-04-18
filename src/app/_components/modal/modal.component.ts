import { Component, Input, OnInit, OnDestroy  } from '@angular/core';

import { ModalService } from '../../_services/index';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId: string;

  public visible = false;
  private visibleAnimate = false;

  constructor ( private modalService: ModalService ) { }

  ngOnInit() {
    this.modalService.add(this);
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.modalId);
  }

}
