import { Component, inject, input, signal, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VeiculoService } from '../veiculo-service';
import { VeiculoInput } from '../veiculo';

@Component({
  selector: 'app-veiculo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './veiculo-form.html',
  styleUrl: './veiculo-form.scss'
})
export class VeiculoForm implements OnInit {
  private readonly service = inject(VeiculoService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  protected readonly erro = signal<string | null>(null);

  protected readonly form = new FormGroup({
    placa: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i)]
    }),
    chassi: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    renavam: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{11}$/)]
    }),
    modelo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    marca: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ano: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1900), Validators.max(2100)]
    })
  });

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      this.service.buscarPorId(id).subscribe(veiculo => this.form.patchValue(veiculo));
    }
  }

  protected salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.erro.set(null);
    const dados = this.form.getRawValue() as VeiculoInput;
    const id = this.id();
    const requisicao = id
      ? this.service.atualizar(id, dados)
      : this.service.criar(dados);

    requisicao.subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.erro.set('Não foi possível salvar o veículo. Tente novamente.')
    });
  }
}
