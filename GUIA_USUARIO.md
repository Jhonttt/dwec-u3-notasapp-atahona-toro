# Guía de usuario (esquemática)

## Propósito
La aplicación permite **gestionar notas** de manera rápida y organizada, con la posibilidad de **filtrarlas por Hoy, Semana o Todas** además de poder **completar**, **borrar** y **editar** cada nota que haya sido creada.

---

## Requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari).  
- Permitir **ventanas emergentes** para el Panel de notas.  
- Habilitar **almacenamiento local** en el navegador.

---

## Tareas esenciales

1. **Añadir nota**  
   - Hacer clic en “Añadir nota” o el botón correspondiente.  
   - Escribir el contenido y guardar.

2. **Aplicar filtros**  
   - Seleccionar entre: **Hoy**, **Semana** o **Todas**.  
   - La lista se actualiza automáticamente mostrando solo las notas que cumplen el criterio.

3. **Abrir Panel**  
   - Hacer clic en “Abrir Panel” para acceder a las notas diarias, desde el panel también se pueden eliminar las notas.  
   - Si no se abre, revisar que las ventanas emergentes no estén bloqueadas.

4. **Completar nota**  
   - Marcar la nota como completada para diferenciarla de las pendientes.

5. **Revertir nota**
   - Hacer clic en el botón de revertir en caso de querer desmarcar la nota.

6. **Borrar nota**  
   - Hacer clic en el icono de borrar para eliminar una nota, y confirmar la decisión.

7. **Editar nota**
   - Hacer clic en el icono de editar para modificar una nota, cambiar el título(si procede), y cambiar la fecha (si procede), que debe ser mayor a la fecha actual y confirmar.

8. **Contador de notas semanales completadas**
   - Al completar una o más notas semanalmente, el contador irá incrementando a la par del comportamiento de la nota, es decir si se completa incrementa, si se revierte vuelve a su estado original.

9. **Recuperar Versiones Anteriores**
   - Hacer clic en la lista desplegable para recuperar una versión anterior a la que se posee actualmente (limitada a 5 versiones);
---

## Preferencias
- Cambiar **tema** (claro/oscuro), hacer click en el botón de Oscuro/Claro.  
- Ajustar **tamaño** de la interfaz o de las notas (A5, A4, A3).

---

## Persistencia
- **Mecanismo elegido:** `localStorage` del navegador.  
- **Implicaciones:**  
  - Los datos permanecen aunque cierres o recargues la página a diferencia del     Session.  
  - Limitado al navegador y dispositivo donde se creó la nota.  
  - No se sincroniza automáticamente entre distintos dispositivos.
  - Tiene buen soporte en todos los navegadores modernos

---

## Problemas comunes y soluciones
- **Panel no se abre:** pop-ups bloqueados → permitir ventanas emergentes en el navegador.  
- **Notas desaparecen:** almacenamiento deshabilitado → habilitar `localStorage` / cookies.  
- **Idioma incorrecto:** configuración del navegador → cambiar idioma del navegador o de la app.