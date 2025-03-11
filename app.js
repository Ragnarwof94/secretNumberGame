let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let maxIntentos = 3;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `¡Felicidades! Adivinaste el número secreto en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (intentos >= maxIntentos) {
      asignarTextoElemento(
        "p",
        `¡Perdiste! El número secreto era ${numeroSecreto}`
      );
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
      if (numeroDeUsuario > numeroSecreto) {
        asignarTextoElemento("p", "El número secreto es menor");
      } else {
        asignarTextoElemento("p", "El número secreto es mayor");
      }
      intentos++;
      limpiarCampo();
      // El usuario no acertó.
      if (numeroDeUsuario > numeroSecreto) {
        asignarTextoElemento("p", "El número secreto es menor");
      } else {
        asignarTextoElemento("p", "El número secreto es mayor");
      }
      intentos++;
      limpiarCampo();
    }
    return;
  }
}

function limpiarCampo() {
  document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  console.log(numeroGenerado);
  console.log(listaNumerosSorteados);
  //Si ya sorteamos todos los números posibles
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento(
      "p",
      "Ya se sortearon todos los números posibles. Reinicia el juego para jugar de nuevo"
    );
  } else {
    // Si el número generado está incluido en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento(
    "p",
    `Adivina el número secreto que está entre 1 y ${numeroMaximo}`
  );
  numeroSecreto = generarNumeroSecreto();
  intentos = 0;
}

function reiniciarJuego() {
  // limpiar campo
  limpiarCampo();
  // Indicar mensaje de intervalo de números
  // Generar nuevo número secreto aleatorio
  // inicializar el número de intentos
  condicionesIniciales();
  // Desactivar botón de reiniciar juego
  document.querySelector("#reiniciar").setAttribute("disabled", true);
}

condicionesIniciales();
