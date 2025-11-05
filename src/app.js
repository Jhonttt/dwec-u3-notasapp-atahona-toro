// DWEC U3 — Plantilla mínima NotasApp

/** @typedef {{ id:string, texto:string, fecha:string, prioridad:number, completada?:boolean }} Nota */

const ESTADO = {
  notas: /** @type {Nota[]} */ ([]),
  filtro: obtenerFiltroDesdeHash()
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("nav [data-hash]").forEach(btn => {
    btn.addEventListener("click", () => { location.hash = btn.getAttribute("data-hash"); });
  });
  document.getElementById("formNota").addEventListener("submit", onSubmitNota);
  document.getElementById("btnPanelDiario").addEventListener("click", abrirPanelDiario);
  cargarNotas();
  render();
});

window.addEventListener("hashchange", () => {
  ESTADO.filtro = obtenerFiltroDesdeHash();
  render();
});

function crearNota(texto, fecha, prioridad) {
  const T = String(texto).trim();
  const P = Math.max(1, Math.min(3, Number(prioridad) || 1));
  const F = new Date(fecha);
  if (!T || Number.isNaN(F.getTime())) throw new Error("Datos de nota inválidos");
  return {
    id: "n" + Math.random().toString(36).slice(2),
    texto: T,
    fecha: F.toISOString().slice(0, 10),
    prioridad: P
  };
}

function obtenerFiltroDesdeHash() {
  const H = (location.hash || "#todas").toLowerCase();
  return ["#hoy", "#semana", "#todas"].includes(H) ? H : "#todas";
}

function filtrarNotas(notas) {
  const HOY = new Date();
  const YMD = HOY.toISOString().slice(0, 10);
  if (ESTADO.filtro === "#hoy") return notas.filter(n => n.fecha === YMD);
  if (ESTADO.filtro === "#semana") {
    const FIN = new Date(HOY);
    FIN.setDate(HOY.getDate() + 7);
    return notas.filter(n => new Date(n.fecha) >= HOY && new Date(n.fecha) <= FIN);
  }
  return notas;
}

function ordenarNotas(notas) {
  return [...notas].sort((a, b) =>
    b.prioridad - a.prioridad ||
    new Date(a.fecha) - new Date(b.fecha) ||
    a.texto.localeCompare(b.texto)
  );
}

function render() {
  const CONT = document.getElementById("listaNotas");
  CONT.innerHTML = "";
  const VISIBLES = ordenarNotas(filtrarNotas(ESTADO.notas));
  for (const N of VISIBLES) {
    const CARD = document.createElement("article");
    CARD.className = "nota";
    if (N.completada) {
      CARD.classList.add("completada");
      CARD.innerHTML = `
      <header>
        <strong>[P${N.prioridad}] ${escapeHtml(N.texto)}</strong>
        <time datetime="${N.fecha}">${formatearFecha(N.fecha)}</time>
      </header>
      <footer>
        <button data-acc="revertir" data-id="${N.id}">Revertir</button>
        <button data-acc="borrar" data-id="${N.id}">Borrar</button>
      </footer>`;
    } else {
      CARD.innerHTML = `
      <header>
        <strong>[P${N.prioridad}] ${escapeHtml(N.texto)}</strong>
        <time datetime="${N.fecha}">${formatearFecha(N.fecha)}</time>
      </header>
      <footer>
        <button data-acc="completar" data-id="${N.id}">Completar</button>
        <button data-acc="borrar" data-id="${N.id}">Borrar</button>
      </footer>
    `;
    }
    CONT.appendChild(CARD);
  }
  CONT.querySelectorAll("button[data-acc]").forEach(btn => btn.addEventListener("click", onAccionNota));
}

function formatearFecha(ymd) {
  const D = new Date(ymd);
  return new Intl.DateTimeFormat(navigator.language || "es-ES", { dateStyle: "medium" }).format(D);
}

function onSubmitNota(e) {
  e.preventDefault();
  const TEXTO = document.getElementById("txtTexto").value;
  const FECHA = document.getElementById("txtFecha").value;
  const PRIORIDAD = document.getElementById("selPrioridad").value;
  try {
    const NOTA = crearNota(TEXTO, FECHA, PRIORIDAD);
    ESTADO.notas.push(NOTA);
    // Guardamos las notas en un JSON
    localStorage.setItem("notas",JSON.stringify(ESTADO.notas));
    alert("Nota creada");
    render();
  } catch (err) { alert(err.message); }
}

// Crear metodo para cargar todas las notas en el localStorage
function cargarNotas() {
  //Obtenemos el valor de las notas
  const DATOS =localStorage.getItem("notas");

  //No existen notas guardadas
  if(!DATOS) return ;

  const NOTASGUARDADAS=JSON.parse(DATOS);

  //Recorremos todas las notas para asegurarnos que pasen por Crear Nota
  for (const N of NOTASGUARDADAS) {
   ESTADO.notas.push(crearNota(N.texto,N.fecha,N.prioridad));
  }
}

function onAccionNota(e) {
  const BTN = e.currentTarget;
  const ID = BTN.getAttribute("data-id");
  const ACC = BTN.getAttribute("data-acc");
  const IDX = ESTADO.notas.findIndex(n => n.id === ID);
  if (IDX < 0) return;
  
  if (ACC === "borrar" && confirm("¿Borrar la nota?")) ESTADO.notas.splice(IDX, 1);

  if (ACC === "completar") ESTADO.notas[IDX].completada = true;
  if (ACC === "revertir") ESTADO.notas[IDX].completada = false;
  render();
}

function abrirPanelDiario() {
  const REF = window.open("panel.html", "PanelDiario", "width=420,height=560");
  if (!REF) { alert("Pop-up bloqueado. Permita ventanas emergentes."); return; }
  const SNAPSHOT = { tipo: "SNAPSHOT", notas: filtrarNotas(ESTADO.notas) };
  setTimeout(() => { try { REF.postMessage(SNAPSHOT, "*"); } catch { } }, 400);
}

window.addEventListener("message", (ev) => {
  if (!ev.data || typeof ev.data !== "object") return;
  if (ev.data.tipo === "BORRADO") {
    const ID = ev.data.id;
    ESTADO.notas = ESTADO.notas.filter(n => n.id !== ID);
    render();
  }
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}