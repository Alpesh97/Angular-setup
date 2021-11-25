import { Component, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreHelperService } from 'src/app/providers/core-helper/core-helper.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent {

  public mode = "indeterminate";
  public value = 50;
  public loader: Subject<boolean> = this.coreHelperService.isLoading;
  public isLoading: boolean = false;
  private counter: number = 0;
  constructor(
    private coreHelperService: CoreHelperService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.loader.subscribe((res: boolean) => {
      if (res) {
        this.counter++;
        this.isLoading = res;
      } else {
        this.counter--;
        if (this.counter === 0) {
          this.isLoading = res;
        }
      }
      this.changeDetectorRef.detectChanges();
    });
  }
}
