import { VeiculoModel } from '../models/veiculo.model.js'

export const VeiculoController = {
  getAll: (req, res) => {
    const veiculos = VeiculoModel.findAll()
    res.json(veiculos)
  },

  getById: (req, res) => {
    const veiculo = VeiculoModel.findById(req.params.id)
    if (!veiculo) return res.status(404).json({ message: 'Veículo não encontrado' })
    res.json(veiculo)
  },

  create: (req, res) => {
    try {
      const veiculo = VeiculoModel.create(req.body)
      res.status(201).json(veiculo)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  update: (req, res) => {
    try {
      const veiculo = VeiculoModel.update(req.params.id, req.body)
      if (!veiculo) return res.status(404).json({ message: 'Veículo não encontrado' })
      res.json(veiculo)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  delete: (req, res) => {
    const deleted = VeiculoModel.delete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Veículo não encontrado' })
    res.status(204).send()
  }
}
