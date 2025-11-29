import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';

import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { FormStockInclude } from '../../feature/form-stock-include/form-stock-include';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.html',
  styleUrl: './stock.css',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, FormStockInclude],
})
export class Stock {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['codigo_produto', 'descricao_produto', 'estoque', 'unidade', 'actions'];
  dataSource = new MatTableDataSource(ESTOQUE);

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    actions: ['edit', 'delete']
  },

  {
    codigo_produto: 102,
    descricao_produto: "Caderno Universitário",
    estoque: 75,
    unidade: "UN:1|CX:10",
    actions: ['edit', 'delete']
  },
  {
    codigo_produto: 103,
    descricao_produto: "Borracha Branca",
    estoque: 200,
    unidade: "UN:1|DP:5|CX:20",
    actions: ['edit', 'delete']
  },
  {
    codigo_produto: 104,
    descricao_produto: "Lápis Preto HB",
    estoque: 320,
    unidade: "UN:1|DP:6|CX:24",
    actions: ['edit', 'delete']
  },
  {
    codigo_produto: 105,
    descricao_produto: "Marcador de Texto Amarelo",
    estoque: 90,
    unidade: "UN:1|CX:6",
    actions: ['edit', 'delete']
  },
  {
    codigo_produto: 101,
    descricao_produto: "Caneta Azul",
    estoque: 10,
    unidade: "UN:1|CX:12",
    actions: ['edit', 'delete']
  },
  {
    codigo_produto: 101,
    descricao_produto: "Caneta Azul",
    estoque: 250,
    unidade: "UN:1|CX:12",
    actions: ['edit', 'delete']
  },
]