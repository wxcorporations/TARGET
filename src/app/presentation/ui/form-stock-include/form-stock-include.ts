import { ChangeDetectionStrategy, Component, signal, Output, EventEmitter } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { v7 as uuid } from 'uuid'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

const DESCRIPTIONS = {
  MIN_CHAR: 6,
  MAX_CHAR: 100
}

@Component({
  selector: 'app-form-stock-include',
  templateUrl: './form-stock-include.html',
  styleUrl: './form-stock-include.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStockInclude {
  readonly panelOpenState = signal(false);

  @Output() save = new EventEmitter<any>();

  products = DATA_PRODUCT

  readonly idmove = uuid()
  readonly create_at = new Date().toISOString()

  readonly description = new FormControl('', [
    Validators.required,
    Validators.minLength(DESCRIPTIONS.MIN_CHAR),
    Validators.maxLength(DESCRIPTIONS.MAX_CHAR)
  ]);
  readonly qtd = new FormControl(0, [Validators.required]);
  readonly product = new FormControl({}, [Validators.required]);
  selectedProductId = 0;

  errorMessageQtd = signal('');
  errorMessageProduct = signal('');
  errorMessageDescription = signal('');

  constructor() {
    merge(this.description.statusChanges, this.description.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {

    if (this.qtd.hasError('required')) {
      this.errorMessageQtd.set('Campo obrigatório!')
    }

    if (this.product.hasError('required')) {
      this.errorMessageProduct.set('Campo obrigatório!')
    }


    if (this.description.hasError('required')) {
      this.errorMessageDescription.set('Campo obrigatório!')
    }

    if (this.product.hasError('minLength')) {
      this.errorMessageProduct.set(`Quantidade minima de caracteres ${DESCRIPTIONS.MIN_CHAR}`)
    }

    if (this.product.hasError('maxLength')) {
      this.errorMessageProduct.set(`Quantidade maxima de caracteres ${DESCRIPTIONS.MAX_CHAR}`)
    }

  }

  emitSave() {
    const data = {
      id: this.idmove,
      decription: this.description.value,
      id_product: this.selectedProductId,
      qtd: this.qtd.value

    }
    this.save.emit(data)
  }
}

// LISTA DE PRODUTOS
const DATA_PRODUCT = [
  {
    id: 101,
    name: "Caneta Azul",
  },
  {
    id: 102,
    name: "Caderno Universitário",
  },
  {
    id: 103,
    name: "Borracha Branca",
  },
  {
    id: 104,
    name: "Lápis Preto HB",
  },
  {
    id: 105,
    name: "Marcador de Texto Amarelo",
  }
]