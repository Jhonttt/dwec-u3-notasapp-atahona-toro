document.getElementById("listaNotas").addEventListener("click", onAccionNota);
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
}

function crearNotaDOM(nota) {
  const TPL = document.getElementById("tplNota");
  //Crea una copia del primer hijo que es <article class="nota">
  const NODE = TPL.content.firstElementChild.cloneNode(true);
  NODE.dataset.id = nota.id;

  // ----------------------------
  // Texto y fecha
  // ----------------------------
  const TEXTO = NODE.querySelector(".texto");
  TEXTO.textContent = nota.texto;

  const TIME = NODE.querySelector(".fecha");
  TIME.textContent = formatearFecha(nota.fecha);
  TIME.setAttribute("datetime", nota.fecha);

  // ----------------------------
  // Botón completar/revertir (dinámico)
  // ----------------------------
  const BTN_COMP = document.createElement("button");
  BTN_COMP.dataset.acc = nota.completada ? "revertir" : "completar";
  BTN_COMP.dataset.id = nota.id;
  BTN_COMP.textContent = nota.completada ? t("revertir") : t("completada");

  // Insertamos antes del botón borrar que sí existe en plantilla
  const BTN_BORRAR = NODE.querySelector("button[data-acc='borrar']");
  BTN_BORRAR.before(BTN_COMP);

  // Añadir clase si ya está completada
  if (nota.completada) NODE.classList.add("completada");

  // ----------------------------
  // Modo edición (editable)
  // ----------------------------
  if (nota.editable) {
    NODE.classList.add("edit");

    // Botón confirmar
    const BTN_EDIT = document.createElement("button");
    BTN_EDIT.dataset.acc = "confirmar";
    BTN_EDIT.dataset.id = nota.id;
    BTN_EDIT.textContent = t("confirmar");

    BTN_BORRAR.before(BTN_EDIT); // Insertamos antes de borrar

    // Texto editable
    TEXTO.classList.add("text-note");
    TEXTO.contentEditable = true;

    // Reemplazar <time> por <input type="date">
    const INPUT_FECHA = document.createElement("input");
    INPUT_FECHA.type = "date";
    INPUT_FECHA.value = nota.fecha;
    TIME.replaceWith(INPUT_FECHA);

    // Auto-focus y seleccionar texto
    setTimeout(() => {
      TEXTO.focus();
      const range = document.createRange();
      range.selectNodeContents(TEXTO);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }, 0);

    // Confirmar con Enter
    TEXTO.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        BTN_EDIT.click();
      }
    });
  }

  return NODE;
}

