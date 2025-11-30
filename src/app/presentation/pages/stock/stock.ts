import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';

import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { FormStockInclude } from '../../ui/form-stock-include/form-stock-include';
import { LocalStorageRepository } from '../../../infrastructure/repositories/local-storage-repository';
import { Filter } from '../../ui/filter/filter';
import { Movement } from '../../../domain/moviment';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.html',
  styleUrl: './stock.css',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, FormStockInclude, Filter],
})

export class Stock {
  private _liveAnnouncer = inject(LiveAnnouncer);
  localStoreMoviments?: LocalStorageRepository

  displayedColumnsMove: string[] = ['id', 'create_at', 'description', 'cod_product', 'qtd', 'actions'];
  dataSourceMove = new MatTableDataSource();

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private toastr: ToastrService) { }

  ngAfterViewInit() {
    this.localStoreMoviments = new LocalStorageRepository('moviments')
    this.dataSourceMove.data = this.localStoreMoviments.getAll()

    this.dataSourceMove.sort = this.sort;
    this.dataSourceMove.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  doubleClick(data: string) {
    console.log(data)
  }

  formateDate(value: string): string {
    return value.replace(/(\d{4})-(\d{2})-(\d{2})(.*)/, '$1-$2-$3')
  }

  save(data: any): void {
    const _data = {
      id: data.id,
      create_at: new Date().toISOString(),
      description: data.decription,
      cod_product: data.product_id,
      qtd: data.qtd,
    };

    this.localStoreMoviments?.add(_data)
    this.dataSourceMove.data = this.localStoreMoviments?.getAll() || []

    this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
  }

  remove(id: string): void {
    const resp = window.confirm('Você confirma a remoção?')

    if (resp) {
      this.localStoreMoviments?.remove(id)
      this.dataSourceMove.data = this.localStoreMoviments?.getAll() || []

      this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
    }
  }

  filterMoviment(data: any): void {
    if (
      !data.id &&
      !data.description &&
      !data.product_id &&
      !data.date.start &&
      !data.date.end
    ) {

      this.dataSourceMove.data = this.localStoreMoviments?.getAll() || []
      this.toastr.success('Operação realizada com sucesso!', 'Sucesso');

    } else {
      const movi = new Movement(this.dataSourceMove.data)
      this.dataSourceMove.data = movi.filter(data)
      this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
    }
  }
}