// Obtendo os elementos do formulario
const form = document.createElement('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')

// Manipulando o input amount para receber somente números.
amount.addEventListener('input', () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, '')
})

// Captando o evento de submit no formulário
form.onsubmit = (event) => {
    event.preventDefault()

    console.log(currency.value)

}