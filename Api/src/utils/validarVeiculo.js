const CAMPOS_TEXTO = ['placa', 'chassi', 'renavam', 'modelo', 'marca']

//validar dados do veiculo
export function validarVeiculo(data, modo = 'completo') {
  const erros = []

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return ['O corpo da requisição deve ser um objeto JSON.']
  }

  for (const campo of CAMPOS_TEXTO) {
    const valor = data[campo]
    const enviado = valor !== undefined

    if (modo === 'completo' && !enviado) {
      erros.push(`O campo "${campo}" é obrigatório.`)
      continue
    }
    if (enviado && (typeof valor !== 'string' || valor.trim() === '')) {
      erros.push(`O campo "${campo}" deve ser um texto não vazio.`)
    }
  }

  const anoEnviado = data.ano !== undefined
  if (modo === 'completo' && !anoEnviado) {
    erros.push('O campo "ano" é obrigatório.')
  } else if (anoEnviado) {
    if (!Number.isInteger(data.ano) || data.ano < 1900 || data.ano > 2100) {
      erros.push('O campo "ano" deve ser um número inteiro entre 1900 e 2100.')
    }
  }

  return erros
}
