import { randomUUID } from 'crypto'
import { readDb, writeDb } from '../database/db.js'

export const VeiculoModel = {
  findAll: () => readDb(),

  findById: (id) => readDb().find(v => v.id === id),

  create: (data) => {
    const veiculos = readDb()
    const novoVeiculo = { id: randomUUID(), ...data }
    writeDb([...veiculos, novoVeiculo])
    return novoVeiculo
  },

  update: (id, data) => {
    const veiculos = readDb()
    const index = veiculos.findIndex(v => v.id === id)
    if (index === -1) return null
    veiculos[index] = { ...veiculos[index], ...data, id }
    writeDb(veiculos)
    return veiculos[index]
  },

  delete: (id) => {
    const veiculos = readDb()
    const index = veiculos.findIndex(v => v.id === id)
    if (index === -1) return false
    veiculos.splice(index, 1)
    writeDb(veiculos)
    return true
  }
}
