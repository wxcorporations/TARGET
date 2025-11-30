import { ChangeDetectionStrategy, Component, signal, Output, EventEmitter } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { v7 as uuid } from 'uuid'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { LocalStorageRepository } from '../../../infrastructure/repositories/local-storage-repository';
import { ToastrService } from 'ngx-toastr';

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
  @Output() save = new EventEmitter<any>();

  readonly panelOpenState = signal(false);
  readonly create_at = new Date().toISOString()

  idmove = uuid()
  products: any;
  selectedProductId = 0;
  localStoreMoviments: any;

  description = new FormControl('', [
    Validators.required,
    Validators.minLength(DESCRIPTIONS.MIN_CHAR),
    Validators.maxLength(DESCRIPTIONS.MAX_CHAR)
  ]);
  qtd = new FormControl(0, [Validators.required]);
  product = new FormControl({}, [Validators.required]);

  errorMessageQtd = signal('');
  errorMessageProduct = signal('');
  errorMessageDescription = signal('');

  constructor(private toastr: ToastrService) {
    merge(this.description.statusChanges, this.description.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


  ngAfterViewInit() {
    this.localStoreMoviments = new LocalStorageRepository('products')
    this.products = this.localStoreMoviments.getAll()
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

  hasErro() {
    this.updateErrorMessage()
    return Boolean(this.description.errors) || Boolean(this.qtd.errors) || this.selectedProductId === 0
  }

  emitSave() {
    if (!this.hasErro()) {
      this.save.emit({
        id: this.idmove,
        decription: this.description.value,
        product_id: this.selectedProductId,
        qtd: this.qtd.value

      })
      this.resetForm()
    } else {
      this.toastr.error('Preenchar todos os campos!', 'Campos vazios');
    }
  }

  private resetForm() {
    this.idmove = uuid()
    this.description.setValue('')
    this.selectedProductId = 0
    this.qtd.setValue(0)
  }
}