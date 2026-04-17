// Alfabeto usado para el cifrado
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Cinta de la máquina (similar a una máquina de Turing)
let tape = [];

// Posición actual del cabezal en la cinta
let head = 0;

// Estado actual (q1, q2 o q3)
let state = 1;

// Indica si la máquina está corriendo automáticamente
let running = false;

// Intervalo para la ejecución automática
let interval = null;

// Reflector: intercambia letras por pares (ida y vuelta)
// Ejemplo: A ↔ Y, B ↔ R, etc.
const reflector = {
  A:"Y", Y:"A", B:"R", R:"B", C:"U", U:"C",
  D:"H", H:"D", E:"Q", Q:"E", F:"S", S:"F",
  G:"L", L:"G", I:"P", P:"I", J:"X", X:"J",
  K:"N", N:"K", M:"O", O:"M", T:"Z", Z:"T",
  V:"W", W:"V"
};

// Desplaza una letra n posiciones en el alfabeto (cifrado César)
// Si la letra no está en el alfabeto, se retorna igual
function shiftLetter(l, n){
  const i = alphabet.indexOf(l);
  return i === -1 ? l : alphabet[(i + n + 26) % 26];
}

// Define el desplazamiento de cada estado (rotor)
function getShift(s){
  return s === 1 ? 1 : s === 2 ? 3 : 5;
}

// Pasa al siguiente estado (q1 → q2 → q3 → q1)
function nextState(s){
  return s === 3 ? 1 : s + 1;
}

// Procesa un solo carácter de la cinta
function processChar(char){

  // Si encuentra el final de la cinta, se detiene
  if(char === "□") return null;

  // Si es un espacio, no se cifra
  if(char === " "){
    return {
      result: " ",
      log: `<span class="read">Espacio detectado (sin cifrado)</span>\n\n`,
      skip: true // evita cambiar el estado
    };
  }

  // Se determinan los tres estados (rotor actual y los siguientes)
  const s1 = state;
  const s2 = nextState(s1);
  const s3 = nextState(s2);

  let log = `<span class="read">Símbolo leído: ${char}</span>\n`;

  // Paso por el primer rotor
  let c = shiftLetter(char, getShift(s1));
  log += `<span class="rotor">Rotor q${s1}: ${c}</span>\n`;

  // Paso por el segundo rotor
  c = shiftLetter(c, getShift(s2));
  log += `<span class="rotor">Rotor q${s2}: ${c}</span>\n`;

  // Paso por el tercer rotor
  c = shiftLetter(c, getShift(s3));
  log += `<span class="rotor">Rotor q${s3}: ${c}</span>\n`;

  // Paso por el reflector
  c = reflector[c] || c;
  log += `<span class="reflector">Reflector: ${c}</span>\n`;

  // Regreso inverso por los rotores
  c = shiftLetter(c, -getShift(s3));
  c = shiftLetter(c, -getShift(s2));
  c = shiftLetter(c, -getShift(s1));

  log += `<span class="write">Símbolo escrito: ${c}</span>\n`;
  log += `<span class="transition">Transición: q${state} → q${nextState(state)}</span>\n\n`;

  // Devuelve el resultado cifrado y el log
  return { result: c, log };
}

// Inicializa la máquina
function start(){
  stopAuto();

  // Lee el texto de entrada, lo pasa a mayúsculas
  // y elimina caracteres inválidos
  const input = document.getElementById("input").value
    .toUpperCase()
    .replace(/[^A-Z ]/g,"");

  // Carga la cinta
  tape = input.split("");
  tape.push("□"); // símbolo de fin

  // Reinicia cabezal y estado
  head = 0;
  state = parseInt(document.getElementById("key").value);

  // Limpia la explicación y resultado
  document.getElementById("explanation").innerHTML =
    "⏵ Máquina iniciada\n\n";
  document.getElementById("result-box").textContent = "—";

  render();
}

// Ejecuta un solo paso de la máquina
function step(){
  const out = processChar(tape[head]);

  // Si se llegó al final, se detiene
  if(!out){
    stopAuto();
    return;
  }

  // Escribe el resultado en la cinta
  tape[head] = out.result;

  // Muestra el proceso en pantalla
  document.getElementById("explanation").innerHTML += out.log;

  // Cambia de estado si no es espacio
  if(!out.skip) state = nextState(state);

  // Avanza el cabezal
  head++;
  render();
}

// Activa o desactiva la ejecución automática
function toggleAuto(){
  if(running){
    stopAuto();
  } else {
    running = true;
    interval = setInterval(step, 600);
  }
}

// Detiene la ejecución automática
function stopAuto(){
  running = false;
  clearInterval(interval);
}

// Reinicia completamente la máquina
function resetMachine(){
  stopAuto();
  tape = [];
  head = 0;
  state = 1;

  document.getElementById("explanation").innerHTML = "";
  document.getElementById("result-box").textContent = "—";

  render();
}

// Dibuja la cinta, el estado y el resultado en pantalla
function render(){
  const tapeDiv = document.getElementById("tape");
  tapeDiv.innerHTML = "";

  // Dibuja cada celda de la cinta
  tape.forEach((c,i)=>{
    const cell = document.createElement("div");
    cell.className = "cell" + (i === head ? " head" : "");
    cell.textContent = c;
    tapeDiv.appendChild(cell);
  });

  // Centra visualmente el cabezal
  tapeDiv.style.transform = `translateX(${-(head * 42) + 180}px)`;

  // Muestra estado y desplazamiento actuales
  document.getElementById("state").textContent = "q" + state;
  document.getElementById("shift").textContent = getShift(state);

  // Muestra el texto cifrado hasta ahora
  document.getElementById("result-box").textContent =
    tape.filter(c => c !== "□").join("");
}