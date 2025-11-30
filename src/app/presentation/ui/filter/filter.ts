import { ChangeDetectionStrategy, Component, signal, Output, EventEmitter, effect, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { v7 as uuid } from 'uuid'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LocalStorageRepository } from '../../../infrastructure/repositories/local-storage-repository';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';


const DESCRIPTIONS = {
  MIN_CHAR: 6,
  MAX_CHAR: 100
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatExpansionModule
  ],
})
export class Filter {
  @Output() onfilter = new EventEmitter<any>();
  readonly panelOpenState = signal(false);

  // dados de controle de interface
  // --------------------------------------------------------


  // dados da local store
  // --------------------------------------------------------
  localStoreMoviments: any;
  products?: any;

  // dados formularios
  // --------------------------------------------------------
  idmove = signal('');
  description = signal('');
  product = signal('');
  selectedProductId = signal(0);

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngAfterViewInit() {
    this.localStoreMoviments = new LocalStorageRepository('products')
    this.products = this.localStoreMoviments.getAll()
  }

  emitFilter() {
    this.onfilter.emit({
      id: this.idmove(),
      description: this.description(),
      product_id: this.selectedProductId(),
      date: this.range.value
    })

    this.resetForm()
  }

  resetForm() {
    this.idmove.set('')
    this.description.set('')
    this.selectedProductId.set(0)
    this.range.reset()
  }

}
