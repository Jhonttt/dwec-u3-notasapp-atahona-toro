# Guía de usuario (esquemática)

## Propósito
La aplicación permite **gestionar notas** de manera rápida y organizada, con la posibilidad de **filtrarlas por Hoy, Semana o Todas**.

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
   - Hacer clic en “Abrir Panel” para acceder a funciones adicionales.  
   - Si no se abre, revisar que las ventanas emergentes no estén bloqueadas.

4. **Completar nota**  
   - Marcar la nota como completada para diferenciarla de las pendientes.

5. **Borrar nota**  
   - Hacer clic en el icono de borrar para eliminar una nota.

---

## Preferencias
- Cambiar **tema** (claro/oscuro).  
- Ajustar **tamaño** de la interfaz o de las notas (según opciones disponibles).

---

## Persistencia
- **Mecanismo elegido:** `localStorage` del navegador.  
- **Implicaciones:**  
  - Los datos permanecen aunque cierres o recargues la página.  
  - Limitado al navegador y dispositivo donde se creó la nota.  
  - No se sincroniza automáticamente entre distintos dispositivos.

---

## Problemas comunes y soluciones
- **Panel no se abre:** pop-ups bloqueados → permitir ventanas emergentes en el navegador.  
- **Notas desaparecen:** almacenamiento deshabilitado → habilitar `localStorage` / cookies.  
- **Idioma incorrecto:** configuración del navegador → cambiar idioma del navegador o de la app.