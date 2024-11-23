import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
     id:         '',
     nome:       '',
     cpf:        '',
     email:      '',
     senha:      '',
     perfis:     [],
     dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
     private service: TecnicoService,
     private toast: ToastrService,
     private router: Router,
  ) { }

  ngOnInit(): void {
  }
  
  create(): void {
    this.service.create(this.tecnico).subscribe(
      () => {
        this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['tecnicos'])
      },
      ex => {
        console.log(ex);
  
        if (ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toast.error(element.message);
          });
        } else {
          const errorMessage = ex.error.message;
          if (errorMessage.includes("interpolatedMessage")) {
            const interpolatedMessage = errorMessage.split("interpolatedMessage='")[1].split("',")[0];
            this.toast.error(interpolatedMessage);
          } else {
            this.toast.error(errorMessage);
          }
        }
      }
    );
  }
  

  addPerfil(perfil: any): void {
    
     if (this.tecnico.perfis.includes(perfil)) {
       this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
      } else {
      this.tecnico.perfis.push(perfil);
     }
  }
  
    validaCampos(): boolean {
      return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    }
}
