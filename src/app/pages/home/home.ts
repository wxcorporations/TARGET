import { LiveAnnouncer } from  '@angular/cdk/a11y' ;
import { AfterViewInit , Component , ViewChild , inject} from  '@angular/core' ;
import { MatSort , Sort , MatSortModule } from  '@angular/material/sort' ;
import { MatTableDataSource , MatTableModule } from  '@angular/material/table' ;

@Component({
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
  imports: [MatTableModule, MatSortModule],
})
export class Home {
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  displayedColumns: string[] = ['codigo_produto', 'descricao_produto', 'estoque', 'unidade'];
  dataSource = new MatTableDataSource(ESTOQUE);

  @ViewChild(MatSort) sort?: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}


export interface IProductForTemplate {
  codigo_produto: number,
  descricao_produto: string,
  estoque: number,
  unidade: string,
}


const ESTOQUE = [
{
codigo_produto: 101,
descricao_produto: "Caneta Azul",
estoque: 150,
unidade: "UN:1|CX:12"
},
{
codigo_produto: 102,
descricao_produto: "Caderno Universitário",
estoque: 75,
unidade: "UN:1|CX:10"
},
{
codigo_produto: 103,
descricao_produto: "Borracha Branca",
estoque: 200,
unidade: "UN:1|DP:5|CX:20"
},
{
codigo_produto: 104,
descricao_produto: "Lápis Preto HB",
estoque: 320,
unidade: "UN:1|DP:6|CX:24"
},
{
codigo_produto: 105,
descricao_produto: "Marcador de Texto Amarelo",
estoque: 90,
unidade: "UN:1|CX:6"
}
]
