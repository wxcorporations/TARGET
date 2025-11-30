import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';

import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { FormStockInclude } from '../../ui/form-stock-include/form-stock-include';
import { LocalStorageRepository } from '../../../infrastructure/repositories/local-storage-repository';
import { Filter } from '../../ui/filter/filter';

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
      cod_product: data.id_product,
      qtd: data.qtd,
    };

    this.localStoreMoviments?.add(_data)
    this.dataSourceMove.data = this.localStoreMoviments?.getAll() || []
  }

  remove(id: string): void {
    alert('voce tem certeza')
    this.localStoreMoviments?.remove(id)

    this.dataSourceMove.data = this.localStoreMoviments?.getAll() || []
  }
}

export interface IProductForTemplate {
  codigo_produto: number,
  descricao_produto: string,
  estoque: number,
  unidade: string,
  actions: string[]
}

const ESTOQUE = [
  {
    codigo_produto: 101,
    descricao_produto: "Caneta Azul",
    estoque: 150,
    unidade: "UN:1|CX:12",

  },

  {
    codigo_produto: 102,
    descricao_produto: "Caderno Universitário",
    estoque: 75,
    unidade: "UN:1|CX:10",

  },
  {
    codigo_produto: 103,
    descricao_produto: "Borracha Branca",
    estoque: 200,
    unidade: "UN:1|DP:5|CX:20",

  },
  {
    codigo_produto: 104,
    descricao_produto: "Lápis Preto HB",
    estoque: 320,
    unidade: "UN:1|DP:6|CX:24",

  },
  {
    codigo_produto: 105,
    descricao_produto: "Marcador de Texto Amarelo",
    estoque: 90,
    unidade: "UN:1|CX:6",

  },
  {
    codigo_produto: 101,
    descricao_produto: "Caneta Azul",
    estoque: 10,
    unidade: "UN:1|CX:12",

  },
  {
    codigo_produto: 101,
    descricao_produto: "Caneta Azul",
    estoque: 250,
    unidade: "UN:1|CX:12",

  },
]
