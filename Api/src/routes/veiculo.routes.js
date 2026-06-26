import { Router } from 'express'
import { VeiculoController } from '../controllers/veiculo.controller.js'

const router = Router()

router.get('/', VeiculoController.getAll)
router.get('/:id', VeiculoController.getById)
router.post('/', VeiculoController.create)
router.put('/:id', VeiculoController.update)
router.delete('/:id', VeiculoController.delete)

export default router
