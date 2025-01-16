### Debounce Pattern

La función `debounce` es un patrón muy común en programación, especialmente en JavaScript, para optimizar el rendimiento en eventos que se disparan con mucha frecuencia, como `scroll`, `resize`, o entradas en tiempo real (como un cuadro de búsqueda).

Vamos a explicarlo paso a paso:

---

### ¿Qué es `debounce`?

`debounce` asegura que una función solo se ejecute **una vez** después de un cierto tiempo de espera (`delay`), incluso si el evento que la dispara ocurre repetidamente en un corto período de tiempo.

Esto es útil para evitar que una función se ejecute demasiadas veces innecesariamente.

---

### Desglose del Código

```javascript
export const debounce = (func, delay) => {
  let timeoutId; // Aquí se guarda el identificador del temporizador
  return (...args) => {
    // Devuelve una nueva función "envuelta"
    clearTimeout(timeoutId); // Cancela cualquier temporizador previo
    timeoutId = setTimeout(() => {
      func.apply(null, args); // Ejecuta la función original después del "delay"
    }, delay); // Configura el nuevo temporizador
  };
};
```

---

### Componentes Clave

1. **Parámetros de Entrada:**

   ```javascript
   func, delay;
   ```

   - `func`: La función que quieres "debouncear" (la que se ejecutará después del retraso).
   - `delay`: El tiempo de espera (en milisegundos) antes de ejecutar la función.

2. **`timeoutId`:**

   - Una variable que almacena el identificador del temporizador (devuelto por `setTimeout`).
   - Nos permite cancelar el temporizador anterior con `clearTimeout` si el evento ocurre nuevamente antes de que el retraso (`delay`) termine.

3. **`clearTimeout`:**

   - Cancela cualquier temporizador activo previo antes de configurar uno nuevo. Esto asegura que la función original (`func`) no se ejecute múltiples veces innecesariamente.

4. **`setTimeout`:**

   - Configura un temporizador que ejecutará la función original (`func`) después del retraso (`delay`) especificado.

5. **`func.apply(null, args)`:**
   - Ejecuta la función `func` con los argumentos originales (`args`) que fueron pasados a la función retornada.
   - `apply` asegura que la función puede aceptar un número variable de argumentos.

---

### Ejemplo de Uso

Supongamos que tienes un campo de búsqueda y quieres enviar una solicitud al servidor solo cuando el usuario haya dejado de escribir durante 500ms:

```javascript
const search = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

document.querySelector("#searchInput").addEventListener("input", (event) => {
  search(event.target.value);
});
```

#### ¿Qué está pasando aquí?

- Cada vez que el usuario escribe algo en el campo de búsqueda (`input`), se llama a la función `search`.
- Si el usuario sigue escribiendo (antes de los 500ms), el temporizador previo se cancela y se configura uno nuevo.
- Solo cuando el usuario deja de escribir durante al menos 500ms, se ejecuta la función `console.log`.

---

### Ilustración con una Línea de Tiempo:

Supongamos un `debounce` con un `delay` de 1000ms y el usuario realiza 3 eventos (`input`) con estas marcas de tiempo:

1. **Evento 1:** 0ms
2. **Evento 2:** 500ms
3. **Evento 3:** 1500ms

#### Resultado:

- El **Evento 1** se cancela por el **Evento 2** (a los 500ms).
- El **Evento 2** se cancela por el **Evento 3** (a los 1500ms).
- La función solo se ejecuta para el **Evento 3**, **1000ms después de la última entrada (a los 2500ms)**.

---

### Ventajas de `debounce`

1. **Eficiencia:**

   - Evita múltiples ejecuciones innecesarias de una función.
   - Especialmente útil para eventos de alta frecuencia como `scroll`, `resize`, o `input`.

2. **Control:**
   - Puedes ajustar el retraso (`delay`) para controlar con precisión cuándo se ejecuta la función.

---

### Diferencia con `throttle`

Mientras que `debounce` asegura que la función se ejecute solo después de un período de inactividad, **`throttle`** asegura que la función se ejecute a intervalos regulares, sin importar la frecuencia de los eventos.

---

### ¿Qué es `throttle`?

El patrón de **`throttle`** asegura que una función solo se ejecute **una vez cada cierto intervalo de tiempo**, incluso si el evento que la dispara ocurre continuamente o muy frecuentemente.

Esto es útil para limitar la frecuencia de ejecución de funciones, como manejar eventos que ocurren en intervalos cortos (ej. `scroll`, `resize`, o `mousemove`).

---

### Desglose de un Ejemplo Típico de `throttle`

```javascript
export function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

---

### Componentes Clave

1. **`func` y `limit`:**

   - `func`: La función que quieres "throttlear".
   - `limit`: El intervalo de tiempo mínimo (en milisegundos) entre ejecuciones.

2. **`inThrottle`:**

- Es un flag (bandera) que ayuda a controlar si la función puede ejecutarse o si debe esperar.
  Si inThrottle es false, la función se ejecutará. Luego, se establece inThrottle en true y la ejecución se bloquea hasta que haya pasado el limit de tiempo.

3. **`setTimeout`:**

   Utilizamos `setTimeout` para restablecer `inThrottle` a `false` después de que haya transcurrido el tiempo especificado por `limit`. Esto permite la ejecución de `func` nuevamente.

4. **`apply`:**
   - Ejecuta la función `func` con los argumentos originales (`args`) que se pasaron al `throttle`.

---

### Ejemplo de Uso

Supongamos que quieres manejar un evento de desplazamiento (`scroll`) para actualizar algo en la pantalla, pero no quieres ejecutar la función más de una vez cada 100ms:

```javascript
const handleScroll = throttle(() => {
  console.log("Scrolled!");
}, 100);

window.addEventListener("scroll", handleScroll);
```

#### ¿Qué está pasando aquí?

- Cada vez que el usuario se desplaza, se dispara el evento `scroll`, pero `handleScroll` solo se ejecutará **una vez cada 100ms**.

---

### Ilustración con una Línea de Tiempo

Supongamos un `throttle` con un `limit` de 1000ms y el usuario genera 3 eventos con estas marcas de tiempo:

1. **Evento 1:** 0ms
2. **Evento 2:** 500ms
3. **Evento 3:** 1500ms

#### Resultado:

- **Evento 1:** Se ejecuta inmediatamente (0ms).
- **Evento 2:** Es ignorado, porque ocurrió dentro del intervalo de 1000ms desde el Evento 1.
- **Evento 3:** Se ejecuta, porque ocurrió después de 1000ms desde el Evento 1.

---

### Diferencias entre `throttle` y `debounce`

| **Característica**          | **Debounce**                                                     | **Throttle**                                     |
| --------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| **Propósito**               | Ejecuta la función **después de un período de inactividad**.     | Ejecuta la función **a intervalos regulares**.   |
| **Cuándo se usa**           | Eventos como búsqueda o validaciones en formularios.             | Eventos como `scroll`, `resize`, o `mousemove`.  |
| **Frecuencia de Ejecución** | Solo al finalizar el tiempo de espera tras la última invocación. | A intervalos regulares definidos por el `limit`. |

---

### Ejemplo Comparativo

#### Debounce

Si quieres realizar una búsqueda solo después de que el usuario deje de escribir:

```javascript
const search = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

document.querySelector("#searchInput").addEventListener("input", (e) => {
  search(e.target.value);
});
```

#### Throttle

Si quieres actualizar la posición de un elemento mientras el usuario se desplaza (pero no demasiado rápido):

```javascript
const updatePosition = throttle(() => {
  console.log("Updating position...");
}, 100);

window.addEventListener("scroll", updatePosition);
```

---

### Ventajas de `throttle`

1. **Rendimiento:**

   - Reduce la cantidad de veces que se ejecuta una función en eventos que ocurren muy frecuentemente.

2. **Control:**
   - Garantiza que la función se ejecute al menos una vez cada intervalo especificado (`limit`), lo que es útil para mantener actualizaciones constantes en tiempo real.

---
