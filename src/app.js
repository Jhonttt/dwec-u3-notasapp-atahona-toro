// Traducciones para ES y EN
const TRAD = {
  es: {
    crear: "Nota creada",
    borrar: "¿Borrar la nota?",
    completada: "Completar",
    revertir: "Revertir",
    borrarBtn: "Borrar",
    titulo: "NotasApp — DWEC U3",
    nombreWeb: "NotasApp",
    hoy: "Hoy",
    semana: "Semana",
    todas: "Todas",
    titulo: "Titulo",
    texto: "Texto",
    fecha: "Fecha",
    prioridad: "Prioridad",
    baja: "Baja",
    media: "Media",
    alta: "Alta",
    aniadir: "Añadir",
    lista: "Notas",
    panel: "Abrir Panel Diario",
    editar: "Editar",
    confirmar: "Confirmar"
  },
  en: {
    crear: "Note created",
    borrar: "Delete the note?",
    completada: "Complete",
    revertir: "Undo",
    borrarBtn: "Delete",
    titulo: "NotesApp — DWEC U3",
    nombreWeb: "NotesApp",
    hoy: "Today",
    semana: "Week",
    todas: "All",
    titulo: "Title",
    texto: "Text",
    fecha: "Date",
    prioridad: "Priority",
    baja: "Low",
    media: "Medium",
    alta: "High",
    aniadir: "Add",
    lista: "Notes",
    panel: "Open Daily Panel",
    editar: "Edit",
    confirmar: "Confirm"
  }
};

//Obtenemos si el lenguaje es ingles (en) o español (es)
function getLang() {
  const lang = (navigator.language || "es").slice(0, 2);
  return TRAD[lang] ? lang : "es";
}

function t(key) {
  return TRAD[getLang()][key] || key;
}

// DWEC U3 — Plantilla mínima NotasApp

/** @typedef {{ id:string, texto:string, fecha:string, prioridad:number, completada?:boolean }} Nota */

const ESTADO = {
  notas: /** @type {Nota[]} */ ([]),
  filtro: obtenerFiltroDesdeHash()
};

// Crear plantilla reutilizable para notas
function crearNotaDOM(nota) {
  const TPL = document.getElementById("tplNota");
  const NODE = TPL.content.firstElementChild.cloneNode(true);
  NODE.dataset.id = nota.id;
  //Texto y fecha
  const TEXTO = NODE.querySelector(".texto");
  TEXTO.textContent = nota.texto;
  const TIME = NODE.querySelector(".fecha");
  TIME.textContent = formatearFecha(nota.fecha);
  TIME.setAttribute("datetime", nota.fecha);

  //Añadir el boton de añadir y revertir segun el estado del botón
  const BTN_C = document.createElement("button");
  BTN_C.dataset.acc = nota.completada ? "revertir" : "completar";
  BTN_C.dataset.id = nota.id;
  BTN_C.textContent = nota.completada ? t("revertir") : t("completada");
  NODE.appendChild(BTN_C);

  const BTN_B = NODE.querySelector("button[data-acc='borrar']");
  BTN_B.dataset.id = nota.id;
  // Poner los botones en linea
  BTN_B.before(BTN_C);

  if (nota.completada) NODE.classList.add("completada");

  // Añadir boton de editar
  if (nota.editable) {
    NODE.classList.add("edit");

    const BTN_E = document.createElement("button");
    // Define la acción del botón como "confirmar" para identificarla al hacer click
    BTN_E.dataset.acc = "confirmar";
    // Asocia el botón con el id de la nota correspondiente
    BTN_E.dataset.id = nota.id;
    BTN_E.textContent = t("confirmar");
    BTN_B.before(BTN_E);

    //Texto Editable
    TEXTO.classList.add("text-note");
    TEXTO.contentEditable = true;

    // Remplazar <time> por <input type="date">
    const INPUT_FECHA = document.createElement("input");
    INPUT_FECHA.type = "date";
    INPUT_FECHA.value = nota.fecha;
    TIME.replaceWith(INPUT_FECHA);

    //Auto focus y seleccionar texto
    setTimeout(() => {
      TEXTO.focus();
      // selecionar la palabra
      const range = document.createRange();
      range.selectNodeContents(TEXTO);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }, 0
    );
    TEXTO.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        BTN_E.click();
      }
    });
  } else if(!nota.editable){
    const BTN_E = document.createElement("button");
    // Define la acción del botón como "confirmar" para identificarla al hacer click
    BTN_E.dataset.acc = "editar";
    // Asocia el botón con el id de la nota correspondiente
    BTN_E.dataset.id = nota.id;
    BTN_E.textContent = t("editar");
    BTN_B.before(BTN_E);

  }
  return NODE;
}


document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Aplicación iniciada. Filtro actual:", ESTADO.filtro); // RF3
  console.log("🌍 Idioma actual del navegador:", navigator.language); // RF2
  //Traducimos las palabras dependiendo del idioma seleccionado
  document.title = t("titulo");
  document.querySelector("h1").textContent = t("nombreWeb");
  document.querySelector("button[data-hash='#hoy']").textContent = t("hoy");
  document.querySelector("button[data-hash='#semana']").textContent = t("semana");
  document.querySelector("button[data-hash='#todas']").textContent = t("todas");
  document.querySelector("#formTitle").textContent = t("titulo");
  document.querySelector("label:first-child span").textContent = t("texto");
  document.querySelector("label:nth-child(2) span").textContent = t("fecha");
  document.querySelector("label:nth-child(3) span").textContent = t("prioridad");
  document.querySelector("option[value='1']").textContent = t("baja");
  document.querySelector("option[value='2']").textContent = t("media");
  document.querySelector("option[value='3']").textContent = t("alta");
  document.querySelector("button[type='submit']").textContent = t("aniadir");
  document.querySelector("h2#listTitle").textContent = t("lista");
  document.querySelector("#btnPanelDiario").textContent = t("panel");
  document.querySelectorAll("nav [data-hash]").forEach(btn => {
    btn.addEventListener("click", () => {
      location.hash = btn.getAttribute("data-hash");
      console.log("🔗 Hash cambiado a:", location.hash); // RF3
    });
  });
  document.getElementById("formNota").addEventListener("submit", onSubmitNota);
  document.getElementById("btnPanelDiario").addEventListener("click", abrirPanelDiario);
  // Delegación de eventos para todos los botones dentro de la lista de notas
  document.getElementById("listaNotas").addEventListener("click", onAccionNota);

  //Hacemos que persistan los temas
  //Obtenemos el tema del navegador
  const TEMA = localStorage.getItem("tema") || "claro";
  const ESTILO = document.querySelector("link");

  //Configuración del navegador en tema claro
  if (TEMA == "claro") {
    ESTILO.setAttribute("href", "styles2.css");
    document.getElementById("tema").textContent = "Claro";
  } else {
    //configuración del navegador en tema oscuro
    ESTILO.setAttribute("href", "styles.css");
    document.getElementById("tema").textContent = "Oscuro";
  }
  console.log("🎨 Tema cargado desde localStorage:", TEMA); // RF9

  cargarNotas();
  render();
});


// Actualiza el filtro de notas según el hash de la URL
window.addEventListener("hashchange", () => {
  ESTADO.filtro = obtenerFiltroDesdeHash();
  render();
});

// Creación de notas
function crearNota(texto, fecha, prioridad) {
  const T = String(texto).trim();
  const P = Math.max(1, Math.min(3, Number(prioridad) || 1)); // uso de Math y Number
  const F = new Date(fecha); // uso de Date
  console.log("📝 Intentando crear nota con:", { texto: T, fecha: F, prioridad: P }); // RF1
  if (!T || Number.isNaN(F.getTime())) throw new Error("Datos de nota inválidos");
  return {
    id: "n" + Math.random().toString(36).slice(2),
    texto: T,
    fecha: F.toISOString().slice(0, 10),
    prioridad: P,
    completada: false,
    editable:false
  };
}


function obtenerFiltroDesdeHash() {
  const H = (location.hash || "#todas").toLowerCase();
  return ["#hoy", "#semana", "#todas"].includes(H) ? H : "#todas";
}

//Filtrar por dia, semana o todo
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

//Ordenar las notas por prioridad de manera descendente
function ordenarNotas(notas) {
  return [...notas].sort((a, b) =>
    b.prioridad - a.prioridad ||
    new Date(a.fecha) - new Date(b.fecha) ||
    a.texto.localeCompare(b.texto)
  );
}

// Dibuja en pantalla todas las notas filtradas y ordenadas,
//  mostrando botones para completar, revertir o borrar cada nota
function render() {
  const CONT = document.getElementById("listaNotas");
  CONT.innerHTML = "";
  const VISIBLES = ordenarNotas(filtrarNotas(ESTADO.notas));
  console.log("🧱 Renderizando", VISIBLES.length, "notas visibles."); // RF4

  // Crear una constante FRAGMEN con llamada al la función crearNotaDOM(), para poder utilizar la plantilla
  const FRAGMENT = document.createDocumentFragment();
  ESTADO.notas.forEach(nota => FRAGMENT.appendChild(crearNotaDOM(nota)));
  document.getElementById("listaNotas").appendChild(FRAGMENT);

  /*
  * En esta linea se agregaban un listener para cada una es decir 2 en total 
  * CONT.querySelectorAll("button[data-acc]").forEach(btn => btn.addEventListener("click", onAccionNota));
  * Hemos creado un solo listener para ambos botones modificando el método onActionNota()
  */

  for (const N of VISIBLES) {
    const CARD = document.createElement("article");
    CARD.className = "nota";
    CARD.innerHTML = `
      <header>
        <strong>[P${N.prioridad}] <span class="text-note">${escapeHtml(N.texto)}</span></strong>
        <time datetime="${N.fecha}">${formatearFecha(N.fecha)}</time>
      </header>
      <footer>
        <button data-acc="completar" data-id="${N.id}">${t("completada")}</button>
        <button data-acc="editar" data-id="${N.id}">${t("editar")}</button>
        <button data-acc="borrar" data-id="${N.id}">${t("borrarBtn")}</button>
      </footer>
    `;

    if (N.completada) {
      CARD.classList.add("completada");
      const REVERTIR = CARD.querySelector("footer button[data-acc='completar']");
      REVERTIR.setAttribute("data-acc", "revertir");
      REVERTIR.textContent = t("revertir");
    }
    
    if (N.editable) {
      CARD.classList.add("edit");
      const CONFIRMAR = CARD.querySelector("footer button[data-acc='editar']");
      CONFIRMAR.setAttribute("data-acc", "confirmar");
      CONFIRMAR.textContent = t("confirmar");

      const TEXTO = CARD.querySelector(".text-note");
      TEXTO.contentEditable = true;

      const TIME = CARD.querySelector("time");
      const INPUT_FECHA = document.createElement("input");
      INPUT_FECHA.type = "date";
      INPUT_FECHA.value = N.fecha;
      TIME.replaceWith(INPUT_FECHA);

      setTimeout(() => {
        TEXTO.focus();

        // selecionar la palabra
        const range = document.createRange();
        range.selectNodeContents(TEXTO);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }, 0);

      TEXTO.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          CONFIRMAR.click();
        }
      });
    }

    CONT.appendChild(CARD);
  }
  CONT.querySelectorAll("button[data-acc]").forEach(btn => btn.addEventListener("click", onAccionNota));
}

//Formatea la fecha dependiendo del idioma
function formatearFecha(ymd) {
  const D = new Date(ymd);
  return new Intl.DateTimeFormat(navigator.language || "es-ES", { dateStyle: "medium" }).format(D);
}

// Gestiona la creación de una nueva nota, la guarda en localStorage y actualiza la lista en pantalla
function onSubmitNota(e) {
  e.preventDefault();
  const TEXTO = document.getElementById("txtTexto").value;
  const FECHA = document.getElementById("txtFecha").value;
  if (new Date(FECHA) <= new Date(new Date().setHours(0, 0, 0, 0))) return alert("La fecha tiene que ser posterior a hoy");
  const PRIORIDAD = document.getElementById("selPrioridad").value;
  try {
    const NOTA = crearNota(TEXTO, FECHA, PRIORIDAD);
    ESTADO.notas.push(NOTA);
    // Guardamos las notas en un JSON
    localStorage.setItem("notas", JSON.stringify(ESTADO.notas));
    guardarSnapshot();

    alert("Nota creada");
    render();
  } catch (err) { alert(err.message); }
}

// Crear metodo para cargar todas las notas en el localStorage
function cargarNotas() {
  //Obtenemos el valor de las notas
  const DATOS = localStorage.getItem("notas");

  //No existen notas guardadas
  if (!DATOS) return;

  const NOTASGUARDADAS = JSON.parse(DATOS);

  //Recorremos todas las notas para asegurarnos que pasen por Crear Nota
  for (const N of NOTASGUARDADAS) {
    ESTADO.notas.push({
      id: N.id,
      texto: N.texto,
      fecha: N.fecha,
      prioridad: N.prioridad,
      completada: N.completada || false
    }
    );
  }
}

//Gestiona las opciones del boton, borrar, completar y actualiza el LocalStorage
function onAccionNota(e) {
  //Detecta cual fue el boton clickeado con data-acc para manejar la acciones de la nota (Delegación de Eventos)
  const BTN = e.target.closest("button[data-acc]");
  const ID = BTN.getAttribute("data-id");
  const ACC = BTN.getAttribute("data-acc");
  const IDX = ESTADO.notas.findIndex(n => n.id === ID);
  if (IDX < 0) return;
  // Para borrar, completar y revertir
  console.log("⚙️ Acción de nota:", ACC, "ID:", ID); // RF8
  if (ACC === "borrar" && confirm(t("borrar"))) {
    ESTADO.notas.splice(IDX, 1);
    //alertar que la nota se ha eliminado
    alert("Nota borrada correctamente.")
  }
  if (ACC === "completar") ESTADO.notas[IDX].completada = true;
  if (ACC === "revertir") ESTADO.notas[IDX].completada = false;
  if (ACC === "editar") ESTADO.notas[IDX].editable = true;
  if (ACC === "confirmar") {
    const CARD = BTN.closest("article");
    const TEXT = CARD.querySelector(".text-note");
    const DATE = CARD.querySelector("input[type='date']");
    
    if (!TEXT.textContent) return alert("El texto no puede estar vacío.");
    if (TEXT.textContent.length > 200) return alert("El texto no puede contener más de 200 caracteres.");

    if (!(DATE.value)) return alert("La fecha no puede estar vacía.");
    if (new Date(DATE.value) <= new Date(new Date().setHours(0, 0, 0, 0))) return alert("La fecha debe ser posterior a hoy.");

    ESTADO.notas[IDX].editable = false;
    ESTADO.notas[IDX].texto = TEXT.textContent;
    ESTADO.notas[IDX].fecha = DATE.value;
  }
  //Actualizar el local storage
  localStorage.setItem("notas", JSON.stringify(ESTADO.notas));
  guardarSnapshot();
  // Actualizar el contador de notas semanales completadas
  document.getElementById("notas").textContent = contarNotasSemanalesCompletadas();
  render();
}

function abrirPanelDiario() {
  console.log("🪟 Abriendo Panel Diario..."); // RF7
  const REF = window.open("panel.html", "PanelDiario", "width=420,height=560");
  if (!REF) { alert("Pop-up bloqueado. Permita ventanas emergentes."); return; }
  const SNAPSHOT = { tipo: "SNAPSHOT", notas: filtrarNotas(ESTADO.notas) };
  console.log("📤 Enviando snapshot al panel:", SNAPSHOT); // RF10
  //Nos aseguramos que los datos que se muestren sean los actualizados
  localStorage.setItem("notas", JSON.stringify(ESTADO.notas));
  guardarSnapshot();
  setTimeout(() => { try { REF.postMessage(SNAPSHOT, "*"); } catch { } }, 400);
}

// Escucha mensajes de ventanas externas y, si indica BORRADO, elimina la nota correspondiente y actualiza la interfaz
window.addEventListener("message", (ev) => {
  if (!ev.data || typeof ev.data !== "object") return;
  if (ev.data.tipo === "BORRADO") {
    const ID = ev.data.id;
    ESTADO.notas = ESTADO.notas.filter(n => n.id !== ID);
    //Es nesario actualizar el local storage
    localStorage.setItem("notas", JSON.stringify(ESTADO.notas));
    guardarSnapshot();
    render();
  }
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}


// Cambiar el tema de color
document.getElementById("tema").addEventListener("click", function (event) {
  event.preventDefault();
  let estilos = document.querySelector("link");
  let enlace = estilos.getAttribute("href");
  if (enlace == "styles.css") {
    estilos.setAttribute("href", "styles2.css");
    document.getElementById("tema").textContent = "Claro";
    //almacenamos los temas
    localStorage.setItem("tema", "claro");
  } else {
    estilos.setAttribute("href", "styles.css");
    document.getElementById("tema").textContent = "Oscuro";
    //almacenamos los temas
    localStorage.setItem("tema", "oscuro");
  }
});

// Cambiar el tamaño de la página
document.querySelectorAll(".tamanio").forEach(tamanio => {
  tamanio.addEventListener("click", function (event) {
    event.preventDefault();
    switch (tamanio.getAttribute("id")) {
      case "a3":
        document.querySelector("*").style.fontSize = "1.6em";
        break;
      case "a4":
        document.querySelector("*").style.fontSize = "1.25em";
        break;
      case "a5":
        document.querySelector("*").style.fontSize = "1em";
        break;
      default:
        document.querySelector("*").style.fontSize = "1em";
        break;
    }
  });
});

// Contador de notas semanales completadas
function contarNotasSemanalesCompletadas() {
  const datos = localStorage.getItem("notas");
  const notas = JSON.parse(datos);

  const hoy = new Date();
  const finSemana = new Date(hoy);
  finSemana.setDate(hoy.getDate() + 7);
  let contador = 0;
  notas.forEach(nota => {
    const fechaNota = new Date(nota.fecha);
    if (nota.completada === true && fechaNota >= hoy && fechaNota <= finSemana) {
      contador++;
    }
  });
  console.log("📆 Notas completadas esta semana:", contador); // RF1 RF5
  return contador;
}

// Mostrar el contador en el elemento con id "notas"
document.getElementById("notas").textContent = contarNotasSemanalesCompletadas();

// Snapshots
function guardarSnapshot() {
  const maxSnapshots = 5;
  const prefix = "notasApp:hist:";

  // Obtener todas las claves que son snapshots
  const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));

  // Si hay 5 o más snapshots, eliminar la más antigua
  if (keys.length >= maxSnapshots) {
    // Ordenar las claves por fecha (timestamp)
    keys.sort();

    localStorage.removeItem(keys[0]);
  }

  const fechaActual = new Date().toISOString();
  localStorage.setItem(prefix + fechaActual, JSON.stringify(ESTADO.notas));

  let anterior = document.querySelector("#formNota label:nth-child(3)");
  const SNAP = document.createElement("label");
  SNAP.innerHTML = ''
  INPUT_FECHA.type = "date";
  INPUT_FECHA.value = N.fecha;
  TIME.replaceWith(INPUT_FECHA);

  console.log("Snapshot guardada. Total snapshots:", Object.keys(localStorage).filter(k => k.startsWith(prefix)).length);
}

console.log(prueba);






