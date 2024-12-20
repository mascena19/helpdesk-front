import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
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
     private service: ClienteService,
     private toast: ToastrService,
     private router: Router,
  ) { }

  ngOnInit(): void {
  }
  
  create(): void {
    this.service.create(this.cliente).subscribe(
      () => {
        this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['clientes'])
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
    
     if (this.cliente.perfis.includes(perfil)) {
       this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
      } else {
      this.cliente.perfis.push(perfil);
     }
  }
  
    validaCampos(): boolean {
      return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    }
}
