import { Component, inject, input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeiculoService } from '../veiculo-service';
import { VeiculoInput } from '../veiculo';

@Component({
  selector: 'app-veiculo-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './veiculo-form.html',
  styleUrl: './veiculo-form.scss'
})
export class VeiculoForm implements OnInit {
  private readonly service = inject(VeiculoService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  // vem da rota /:id/editar — undefined quando é /novo
  readonly id = input<string>();

  // anos do mais novo (ano que vem) até 1900, pro select
  private readonly anoAtual = new Date().getFullYear();
  protected readonly anos: number[] = Array.from(
    { length: this.anoAtual - 1900 + 2 },
    (_, i) => this.anoAtual + 1 - i
  );

  protected readonly form = new FormGroup({
    placa: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i)]
    }),
    chassi: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Za-z0-9]{17}$/)]
    }),
    renavam: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{11}$/)]
    }),
    modelo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    marca: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ano: new FormControl<number | null>(null, {
      validators: [Validators.required]
    })
  });

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      this.service.buscarPorId(id).subscribe(veiculo => this.form.patchValue(veiculo));
    }
  }

  // Bloqueia tudo que não for dígito (usado em renavam e ano)
  protected somenteNumeros(event: KeyboardEvent): void {
    const teclasControle = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (teclasControle.includes(event.key) || event.ctrlKey || event.metaKey) {
      return;
    }
    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  protected salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Preencha os campos corretamente.', 'Fechar', { duration: 4000 });
      return;
    }

    const dados = this.form.getRawValue() as VeiculoInput;
    dados.placa = dados.placa.toUpperCase();
    dados.chassi = dados.chassi.toUpperCase();

    const id = this.id();
    const requisicao = id
      ? this.service.atualizar(id, dados)
      : this.service.criar(dados);

    requisicao.subscribe({
      next: () => {
        this.snackBar.open(
          id ? 'Veículo atualizado com sucesso!' : 'Veículo cadastrado com sucesso!',
          'Fechar',
          { duration: 3000 }
        );
        this.router.navigate(['/veiculos']);
      },
      error: () =>
        this.snackBar.open('Não foi possível salvar o veículo. Tente novamente.', 'Fechar', {
          duration: 5000
        })
    });
  }

  protected cancelar(): void {
    this.router.navigate(['/veiculos']);
  }
}
