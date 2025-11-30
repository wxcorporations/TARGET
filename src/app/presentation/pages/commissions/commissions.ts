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
  selector: 'app-commissions',
  templateUrl: './commissions.html',
  styleUrl: './commissions.css',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, FormStockInclude, Filter],
})
export class Commissions {
  private _liveAnnouncer = inject(LiveAnnouncer);
  localStoreMoviments?: LocalStorageRepository

  displayedColumnsMove: string[] = ['vendedor', 'valor'];
  dataSourceMove = new MatTableDataSource();

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceMove.data = [];
    this.dataSourceMove.sort = this.sort;
    this.dataSourceMove.paginator = this.paginator;

    this.fetchCommissions().then((res: any) => {
      this.dataSourceMove.data = res.data;
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async fetchCommissions(): Promise<any[]> {
    const response = await fetch('http://localhost:3000/commissions');

    if (!response.ok) {
      throw new Error(`Erro ao buscar comissões: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json());
    return data;
  }

  formateDate(value: string): string {
    return value.replace(/(\d{4})-(\d{2})-(\d{2})(.*)/, '$1-$2-$3');
  }

}