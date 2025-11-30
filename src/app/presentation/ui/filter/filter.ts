import { ChangeDetectionStrategy, Component, signal, Output, EventEmitter } from '@angular/core';
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

const DESCRIPTIONS = {
  MIN_CHAR: 6,
  MAX_CHAR: 100
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrl: './filter.css',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
})
export class Filter {
  @Output() filter = new EventEmitter<any>();

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  localStoreMoviments: any;
  products?: any;

  ngAfterViewInit() {
    this.localStoreMoviments = new LocalStorageRepository('products')
    this.products = this.localStoreMoviments.getAll()
  }

  readonly idmove?: string;
  readonly description?: string;
  readonly product?: number | string;

  selectedProductId = 0;

  emitFilter() {
    console.log({
      id: this.idmove,
      description: this.description,
      product_id: this.selectedProductId,
      date: this.range.value
    })
    this.filter.emit('---------------- filtro ----------------')
  }
  // por intervalo de tempo

  // por id

  // descricao

  // por id do produto

  // datepicker
}
