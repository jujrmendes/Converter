// Definindo as taxas de câmbio fixas
const exchangeRates = {
    USD: 5.30, // Taxa do Dólar Americano
    EUR: 5.75, // Taxa do Euro
    GBP: 6.50, // Taxa da Libra Esterlina
};

// Obtendo os elementos do formulário
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const footer = document.querySelector('footer');
const description = document.getElementById('description');
const result = document.getElementById('result');

// Manipulando o input amount para receber somente números
amount.addEventListener('input', () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, '');
});

// Captando o evento de submit no formulário
form.onsubmit = (event) => {
  event.preventDefault();

  if (!amount.value || !currency.value) {
    alert("Por favor, insira um valor e selecione uma moeda.");
    return;
  }

  // Verifica a taxa de câmbio para a moeda selecionada
  const rate = exchangeRates[currency.value];

  if (!rate) {
    alert("Não foi possível obter a taxa de câmbio para a moeda selecionada.");
    return;
  }

  // Realiza a conversão e atualiza a interface
  convertCurrency(amount.value, rate, currency.value, "R$", rate.toFixed(2));
};

// Função para converter a moeda
function convertCurrency(amount, rate, currency, symbol, price) {
  // Realiza a conversão
  const convertedAmount = (amount * rate);

  // Atualiza os elementos na interface
  try {
    description.textContent = `${symbol} 1 ${currency} = ${price}`;

    // Agora, calculamos o valor total convertido corretamente
    let total = convertedAmount; // Aqui deve ser o valor convertido, não a multiplicação com price

    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para realizar a conversão");
    }

    // Formata o valor para o padrão BRL e substitui o ponto por vírgula
    total = formatCurrencyBRL(total).replace(".", ",");

    // Exibe o valor total convertido
    result.textContent = total;

    // Aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result");
  } catch (error) {
    // Remove a classe do footer ocultando ele
    footer.classList.remove("show-result");
    console.log("Erro ao salvar os dados:", error);
    alert("Não foi possível converter. Tente novamente mais tarde.");
  }
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value) {
  // Converte para número e utiliza o toLocaleString para formatar no padrão BRL
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
