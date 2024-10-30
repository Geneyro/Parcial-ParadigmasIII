// Array de palabras y pistas
const palabras = [
    ["atlantico", "Un océano"],
    ["ordenador", "Una máquina"],
    ["laurel", "Un árbol"],
    ["plaza", "Espacio público"],
    ["rueda", "Gran invento"],
    ["cereza", "Una fruta"],
    ["petanca", "Un juego"],
    ["higuera", "Un árbol"],
    ["everest", "Un monte"],
    ["relampago", "Antecede al trueno"],
    ["jirafa", "Un animal"],
    ["luxemburgo", "Un país"],
    ["uruguay", "Un país"],
    ["ilustracion", "Representación gráfica"],
    ["excursion", "Actividad en la naturaleza"],
    ["empanadilla", "De la panadería"],
    ["pastel", "De la pastelería"],
    ["colegio", "Lugar para estudiar"],
    ["carrera", "Competición"],
    ["mermelada", "Confitura"]
  ];
  
  let palabra = "";
  let oculta = [];
  let cont = 6;
  let rand;
  
  // Elementos del DOM
  const hueco = document.getElementById("palabra");
  const msgFinal = document.getElementById("msg-final");
  const acierto = document.getElementById("acierto");
  const intentos = document.getElementById("intentos");
  const abcdario = document.getElementById("abcdario");
  
  // Escoger palabra al azar
  function generaPalabra() {
    rand = Math.floor(Math.random() * palabras.length);
    palabra = palabras[rand][0].toUpperCase();
  }
  
  // Pintar guiones de la palabra
  function pintarGuiones(num) {
    oculta = Array(num).fill("_");
    hueco.innerHTML = oculta.join(" ");
  }
  
  // Generar abecedario
  function generaABC(a, z) {
    abcdario.innerHTML = "";
    for (let i = a.charCodeAt(0); i <= z.charCodeAt(0); i++) {
      const letra = String.fromCharCode(i).toUpperCase();
      abcdario.innerHTML += `<button value="${letra}" onclick="intento('${letra}')" class="letra" id="${letra}">${letra}</button>`;
    }
    abcdario.innerHTML += `<button value='Ñ' onclick='intento("Ñ")' class='letra' id='Ñ'>Ñ</button>`;
  }
  
  // Comprobar intento
  function intento(letra) {
    document.getElementById(letra).disabled = true;
    if (palabra.includes(letra)) {
      palabra.split("").forEach((char, i) => {
        if (char === letra) oculta[i] = letra;
      });
      hueco.innerHTML = oculta.join(" ");
      acierto.textContent = "¡Bien!";
      acierto.classList.add("verde", "acierto");
    } else {
      cont--;
      intentos.textContent = cont;
      acierto.textContent = "¡Fallo!";
      acierto.classList.add("rojo", "acierto");
      document.getElementById(`image${cont}`).classList.add("fade-in");
    }
    setTimeout(() => acierto.classList.remove("acierto"), 800);
    compruebaFin();
  }
  
  // Obtener pista
  function pista() {
    document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
  }
  
  // Comprobar si el juego ha terminado
  function compruebaFin() {
    if (!oculta.includes("_")) {
      msgFinal.textContent = "¡Felicidades!";
      msgFinal.classList.add("zoom-in");
      hueco.classList.add("encuadre");
      deshabilitarBotones();
    } else if (cont === 0) {
      msgFinal.textContent = "Game Over";
      msgFinal.classList.add("zoom-in");
      deshabilitarBotones();
    }
  }
  
  // Deshabilitar botones
  function deshabilitarBotones() {
    Array.from(document.getElementsByClassName("letra")).forEach(btn => btn.disabled = true);
  }
  
  // Inicializar el juego
  function inicio() {
    cont = 6;
    generaPalabra();
    pintarGuiones(palabra.length);
    generaABC("A", "Z");
    intentos.textContent = cont;
    msgFinal.textContent = "";
    msgFinal.classList.remove("zoom-in");
    hueco.classList.remove("encuadre");
    document.getElementById("hueco-pista").innerHTML = "";
  
    // Restablecer las imágenes de ahorcado
    for (let i = 0; i <= 6; i++) {
      const image = document.getElementById(`image${i}`);
      if (image) {
        image.classList.remove("fade-in");
      }
    }
  }
  
  // Iniciar juego automáticamente al cargar la página
  window.onload = inicio;
  