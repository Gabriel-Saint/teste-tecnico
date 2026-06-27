const CAMPOS_TEXTO = ['placa', 'chassi', 'renavam', 'modelo', 'marca']

// Placa: padrão antigo (ABC-1234 / ABC1234) ou Mercosul (ABC1D23)
const REGEX_PLACA = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/
// Renavam: 11 dígitos
const REGEX_RENAVAM = /^\d{11}$/

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

  if (typeof data.placa === 'string' && !REGEX_PLACA.test(data.placa.trim().toUpperCase())) {
    erros.push('O campo "placa" deve estar no formato ABC-1234 ou ABC1D23 (Mercosul).')
  }

  if (typeof data.renavam === 'string' && !REGEX_RENAVAM.test(data.renavam.trim())) {
    erros.push('O campo "renavam" deve conter exatamente 11 dígitos.')
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
