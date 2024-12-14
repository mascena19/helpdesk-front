import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [
     {
      id:                    1,
      dataAbertura:       '14/12/2024',
      dataFechamento:     '14/12/2024',
      prioridade:          'ALTA',
      status:              'FECHADO',
      titulo:              'Chamado 1',
      descricao:           'TESTE Chamado 1',
      tecnico:                  2,
      cliente:                  4,
      nomeCliente:         ' Rodrigo mascena',
      nomeTecnico:         ' Albert Einstein',
     }
  ]

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura','prioridade','status','acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
