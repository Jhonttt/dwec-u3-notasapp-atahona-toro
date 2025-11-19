# ✅ Checklist de Verificación del Proyecto

## ✔️ Requisitos Técnicos Obligatorios

### 📌 Uso correcto de Objetos Nativos
- [✅] **Date** usado para:
  - Validar fechas al crear o editar notas.
  - Comparar fechas (hoy, semana).
  - Ordenar y filtrar notas.
- [✅] **Math** usado con propósito claro (ej.: limitar prioridad con `Math.min` / `Math.max`).
- [✅] **String** usado para:
  - Sanitizar texto.
  - Normalizar cadenas.
  - Comprobar longitud.
- [✅] **Number** usado para convertir valores numéricos (ej.: prioridad).


## ✔️ Manipulación dinámica del DOM

- [✅] Creo elementos HTML por código (`createElement`, plantillas, nodos dinámicos).
- [✅] Inserto y actualizo nodos en pantalla sin recargar.
- [✅] Elimino nodos cuando corresponde (borrar nota).
- [✅] Delegación de eventos implementada correctamente.

## ✔️ Navegación con Hash (`location.hash`)

- [✅] Filtros implementados:  
  - `#hoy`  
  - `#semana`  
  - `#todas`
- [✅] Uso `window.addEventListener("hashchange")` para volver a renderizar.


## ✔️ Uso correcto del Viewport / Ventanas

- [✅] Se abre el **Panel Diario** o ventana secundaria con `window.open`.
- [✅] Se valida el origen de los mensajes recibidos por `postMessage`.
- [✅] Se envía la información necesaria entre ventanas (nota diaria, confirmaciones, borrado…).


## ✔️ Persistencia de Datos (Cookies o Web Storage)

- [✅] Uso **localStorage** o **Cookies** (uno elegido y justificado).
- [✅] Recupero datos correctamente al cargar la página.
- [✅] Guardo los cambios inmediatamente al:
  - Crear nota
  - Editar nota
  - Completar / revertir
  - Borrar nota
- [✅] Formato guardado: JSON válido y estable.


## ✔️ Comunicación entre Ventanas

- [✅] `window.open` para abrir el panel.
- [✅] `window.postMessage` para enviar datos entre ventanas.
- [✅] `message` event listener implementado.
- [✅] Se actualiza el estado en la ventana principal al recibir cambios desde el panel.


### 📄 Guía de Usuario
- [✅] Incluye cómo crear, editar, completar, revertir, filtrar y borrar notas.
- [✅] Explica panel diario y filtros.


### 📘 README (obligatorio)
- [✅] Evidencias de depuración:  
  - capturas de consola, errores corregidos, pruebas realizadas.
- [✅] Justificación técnica de las elecciones del proyecto.
- [✅] Enlace al repositorio GitHub con código final.


## ✔️ Verificación Final
- [✅] Todas las funcionalidades probadas.
- [✅] No hay errores en consola.
- [✅] Todas las validaciones funcionan.
- [✅] La interfaz es usable en escritorio y móvil.
