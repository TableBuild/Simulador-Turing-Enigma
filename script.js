// ===============================
// CONFIGURACIÓN GENERAL
// ===============================

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let tape = [];
let head = 0;
let state = 1;
let running = false;
let interval = null;

const reflector = {
  A:"Y", Y:"A", B:"R", R:"B", C:"U", U:"C",
  D:"H", H:"D", E:"Q", Q:"E", F:"S", S:"F",
  G:"L", L:"G", I:"P", P:"I", J:"X", X:"J",
  K:"N", N:"K", M:"O", O:"M", T:"Z", Z:"T",
  V:"W", W:"V"
};

// ===============================
// FUNCIONES DE CIFRADO
// ===============================

function shiftLetter(l, n){
  const i = alphabet.indexOf(l);
  return i === -1 ? l : alphabet[(i + n + 26) % 26];
}

// Desplazamiento dependiente del estado y la posición
function getShift(s, pos){
  const base = s === 1 ? 1 : s === 2 ? 3 : 5;
  return (base + pos) % 26;
}

function nextState(s){
  return s === 3 ? 1 : s + 1;
}

function processChar(char){
  if(char === "□") return null;

  if(char === " "){
    return {
      result: " ",
      log: `<span class="read">Espacio detectado (sin cifrado)</span>\n\n`,
      skip: true
    };
  }

  const s1 = state;
  const s2 = nextState(s1);
  const s3 = nextState(s2);

  let log = `<span class="read">Símbolo leído: ${char}</span>\n`;

  let c = shiftLetter(char, getShift(s1, head));
  log += `<span class="rotor">Rotor q${s1}: ${c}</span>\n`;

  c = shiftLetter(c, getShift(s2, head));
  log += `<span class="rotor">Rotor q${s2}: ${c}</span>\n`;

  c = shiftLetter(c, getShift(s3, head));
  log += `<span class="rotor">Rotor q${s3}: ${c}</span>\n`;

  c = reflector[c] || c;
  log += `<span class="reflector">Reflector: ${c}</span>\n`;

  c = shiftLetter(c, -getShift(s3, head));
  c = shiftLetter(c, -getShift(s2, head));
  c = shiftLetter(c, -getShift(s1, head));

  log += `<span class="write">Símbolo escrito: ${c}</span>\n`;
  log += `<span class="transition">Transición: q${state} → q${nextState(state)}</span>\n\n`;

  return { result: c, log };
}

// ===============================
// CONTROL DE EJECUCIÓN
// ===============================

function start(){
  stopAuto();

  const input = document.getElementById("input").value
    .toUpperCase()
    .replace(/[^A-Z ]/g,"");

  tape = input.split("");
  tape.push("□");

  head = 0;
  state = parseInt(document.getElementById("key").value);

  document.getElementById("explanation").innerHTML = "⏵ Máquina iniciada\n\n";
  document.getElementById("result-box").textContent = "—";

  render();
}

function step(){
  const out = processChar(tape[head]);
  if(!out){
    stopAuto();
    return;
  }

  tape[head] = out.result;
  document.getElementById("explanation").innerHTML += out.log;

  if(!out.skip) state = nextState(state);

  head++;
  render();
}

function toggleAuto(){
  if(running){
    stopAuto();
  } else {
    running = true;
    interval = setInterval(step, 600);
  }
}

function stopAuto(){
  running = false;
  clearInterval(interval);
}

function resetMachine(){
  stopAuto();
  tape = [];
  head = 0;
  state = 1;

  document.getElementById("explanation").innerHTML = "";
  document.getElementById("result-box").textContent = "—";

  render();
}

// ===============================
// RENDER
// ===============================

function render(){
  const tapeDiv = document.getElementById("tape");
  tapeDiv.innerHTML = "";

  tape.forEach((c, i) => {
    const cell = document.createElement("div");
    cell.className = "cell" + (i === head ? " head" : "");
    cell.textContent = c;
    tapeDiv.appendChild(cell);
  });

  tapeDiv.style.transform = `translateX(${-(head * 42) + 180}px)`;

  document.getElementById("state").textContent = "q" + state;
  document.getElementById("shift").textContent = getShift(state, head);

  document.getElementById("result-box").textContent =
    tape.filter(c => c !== "□").join("");
}

// ===============================
// PDF: IMPORTAR Y EXPORTAR
// ===============================

async function loadPDF(event){
  const file = event.target.files[0];
  if(!file) return;

  const reader = new FileReader();

  reader.onload = async function(){
    const typedArray = new Uint8Array(this.result);
    const pdf = await pdfjsLib.getDocument(typedArray).promise;

    let fullText = "";

    for(let i = 1; i <= pdf.numPages; i++){
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      fullText += strings.join(" ") + "\n";
    }

    document.getElementById("input").value = fullText
      .toUpperCase()
      .replace(/[^A-Z ]/g,"");
  };

  reader.readAsArrayBuffer(file);
}

function exportEncryptedPDF(){
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const original = document.getElementById("input").value || "-";
  const encrypted = document.getElementById("result-box").textContent || "-";
  const estado = document.getElementById("key").value;
  const fecha = new Date().toLocaleString();

  let y = 20;

  pdf.setFontSize(14);
  pdf.text("Resultado de Encriptación", 20, y);
  y += 15;

  pdf.setFontSize(11);
  pdf.text(`Fecha: ${fecha}`, 20, y);
  y += 8;

  pdf.text(`Estado inicial: q${estado}`, 20, y);
  y += 15;

  pdf.text("Texto original:", 20, y);
  y += 8;
  const origLines = pdf.splitTextToSize(original, 170);
  pdf.text(origLines, 20, y);
  y += origLines.length * 6 + 10;

  pdf.text("Texto encriptado:", 20, y);
  y += 8;
  const encLines = pdf.splitTextToSize(encrypted, 170);
  pdf.text(encLines, 20, y);

  pdf.save("resultado_encriptacion.pdf");
}
