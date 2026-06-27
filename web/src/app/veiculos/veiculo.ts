export interface Veiculo {
  id: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

// sem ID
export type VeiculoInput = Omit<Veiculo, 'id'>;
