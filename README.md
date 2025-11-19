# NotasApp — DWEC U3 (Plantilla mínima)

**Objetivo**: implementar los RF acordados (objetos nativos; `navigator.language`; filtros por `location.hash`; generación de HTML; viewport/scroll/pantalla completa cuando proceda; `window.open`+comunicación controlada; persistencia elegida y justificada; depuración/documentación).

## Instrucciones rápidas
1. Abrir `src/index.html` en un navegador moderno.
2. Completar la lógica según los RF (ver enunciado de la UD).
3. Añadir evidencias de depuración (capturas) en este README o en la carpeta que decidas.
![Depuración 1](debug/debug1.png)
![Depuración 2](debug/debug2.png)
![Depuración 3](debug/debug3.png)

## Justificación de persistencia (rellenar)
- Mecanismo elegido: Cookies ☐  /  Web Storage ✅
- Motivo: Hemos optado por usar un Web Storage porque requeriamos de un almacenamiento local significativo y persistente, además que un webstorage tiene una mayor capacidad de almacenamiento, además nos ha permitido tener una persistencia mucho más controlada de los datos, diferenciado entre el almacenamiento temporal de las cookies, que tienen ciertas limitaciones y una mayor complejidad. Entre las opciones del Web Storage optamos por un Local Storage, esto, debido a su capacidad de alamacenar los datos incluso depués de cerrar el navegador, a diferencia del SessionStorage, que eliminará los datos y preferencias del usuario al cerrar la sesión (cerrar el navegador), es por ello que el LocalStorage fue la mejor opción, permitiendonos gestionar más volúmenes de datos de forma más eficiente y segura.

## Matriz RA–CE (referenciar funciones/flujo)
- Objetos nativos → Se han empleado objetos como Date, Array y JSON
- Interacción navegador (`navigator`, `location.hash`) → En este caso hemos utilizado navigator.language para establecer el idioma y location.hash para un filtrado dinámico
- Ventanas y comunicación → Uso del `window.open`, para abrir el Panel diario medioan el postMensagge. 
- Persistencia → La información se ha mantenido utilizando el `localStorage.getItem()` y `localStorage.getItem()` para guardar notas, preferencia de temas, tamaño, entre otros.
- Depuración y documentación → Mensajes de error con `Try-Catch` y fomateo de datos para evitar inconsistencias, además de comentatios JSDoc.

## Decisiones Claves y ayuda
- Agregar más funcionalides al darle al boton completar para que se ponga el borde en verde.
- Cambiar el botón de completar a revertir, y si se vuelve a pulsar se pone normal.
- Hacer una función donde se traduzca la página detectando el idioma del navegador (solo funciona en inglés), sino por defecto está en español
- Agregar el botón de claro/oscuro que cambia entre un archivo css a otro, y también lo mismo con A3, A4 y A5, para aumentar el tamaño de letra del navegador.

- En el caso de la persistencia se ha creado una función para cargar las notas al localStorage, permitiendo que perista incluso cuando se recargue el navegador, es importante destacar que dicha funcionalidad tambien se ha dado a los temas, y al panel, se han implementado formas de sobreescribirlo y es importante hacer el llamado de la función antes del render.

- Nos hemos ayudado de la plataforma de documentación de MDN para comprender el uso de algunas funciones, formato y como utilizarlo, además, también hemos acudido a Chat GPT4, para consultar algunas cuestiones técnicas, o errores de lógica, para mejorar el funcionamiento del programa.

- Hemos realizado una plantilla para cada una de las notas con la etiqueta `<template>` para generar dinámicamente 
las notas, lo que nos permite crea una estructura de HTML más limpia y fácil de mantener, reduciendo errores y manteniendo la legibilidad, evitando la duplicación de código.

- Adicional a todo lo mencionado anteriormente, hemos optado por realizar una delegación de códigos para los botones en lugar de asignar listeners individuales a cada botón, esto mejora considerablemente el rendimiento y reduce el consumo de memoria, sobre todo en funciones como crear o modificar alguna nota.

- Para prevenir alguna acción equivoca, o de otro tipo, hemos definido un almacenimiento de versiones que va a permitir al ususario restaurar una versión pasada de la app, su funcionamiento se basa en limitar el número de versiones (Snapshoots) a 5, para luego sacar todas las que se hayan guardado, si es mayor o igual a 5 eliminamos la versión mas antigua, las ordenamos con `sort`, luego utilizamos un `removeItem(keys[0])` para eliminar la version más antigua, siendo keys todas las snapshoots guardadas además luego se añaden las nuevas versioens al principio de un `<select>` definido dentro de un contenedor `<div>` que contiene un `<label>` para nombrar snapshoots junto a un `<select>` que contiene opciones `<option>`.

- Para recuperar cada una de las snapshoot recogemos el valor `value` de dicha snapshoot y como trabajamos con keys, recuperamos dicha key, restaurando el estado la nota. Y actualizando el localStorage principal `<localStorage.setItem("notasApp:data, JSON.stringify(ESTADO.notas)")>`. 

© 2025-10-27 — DWEC
