# Promesas múltiples.

## **1. `Promise.all`**

- **Qué hace:**
  `Promise.all` toma un array de promesas y devuelve una única promesa que:

  - **Se resuelve:** Cuando **todas las promesas** del array se resuelven con éxito.
  - **Se rechaza:** Si **alguna promesa** del array se rechaza (y la promesa rechazada será la causa del rechazo).

- **Usos comunes:**
  Se utiliza cuando necesitas ejecutar varias tareas en paralelo y todas deben completarse antes de continuar.

- **Ejemplo:**

  ```javascript
  const promise1 = Promise.resolve(10);
  const promise2 = Promise.resolve(20);
  const promise3 = Promise.resolve(30);

  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      console.log(results); // [10, 20, 30]
    })
    .catch((error) => {
      console.error(error); // Si alguna promesa falla, este bloque se ejecuta
    });
  ```

  **Caso de error:**

  ```javascript
  const promise1 = Promise.resolve(10);
  const promise2 = Promise.reject("Error en la promesa");
  const promise3 = Promise.resolve(30);

  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      console.log(results); // No se ejecutará
    })
    .catch((error) => {
      console.error(error); // "Error en la promesa"
    });
  ```

- **Conclusión:**
  `Promise.all` asegura que todas las promesas deben completarse con éxito. Si una falla, toda la operación falla.

---

## **2. `Promise.race`**

- **Qué hace:**
  `Promise.race` toma un array de promesas y devuelve una única promesa que:

  - **Se resuelve/rechaza:** Tan pronto como la **primera promesa** en el array se resuelve o se rechaza, sin importar las demás.

- **Usos comunes:**
  Se utiliza cuando necesitas obtener el resultado de la primera promesa que se complete, sin importar si se resolvió o se rechazó.

- **Ejemplo:**

  ```javascript
  const promise1 = new Promise((resolve) =>
    setTimeout(() => resolve("Promesa 1"), 500)
  );
  const promise2 = new Promise((resolve) =>
    setTimeout(() => resolve("Promesa 2"), 300)
  );

  Promise.race([promise1, promise2])
    .then((result) => {
      console.log(result); // "Promesa 2" (se resuelve primero)
    })
    .catch((error) => {
      console.error(error); // Si la primera promesa rechaza
    });
  ```

  **Caso con error:**

  ```javascript
  const promise1 = new Promise((resolve, reject) =>
    setTimeout(() => reject("Error en Promesa 1"), 500)
  );
  const promise2 = new Promise((resolve) =>
    setTimeout(() => resolve("Promesa 2"), 700)
  );

  Promise.race([promise1, promise2])
    .then((result) => {
      console.log(result); // No se ejecutará
    })
    .catch((error) => {
      console.error(error); // "Error en Promesa 1" (porque fue la primera en completarse)
    });
  ```

- **Conclusión:**
  `Promise.race` devuelve el resultado de la primera promesa que se completa (ya sea resuelta o rechazada).

---

#### **`Promise.allSettled`**:

- Este método espera a que todas las promesas terminen (resueltas o rechazadas).
- Devuelve un array con objetos que indican si cada promesa se resolvió o se rechazó.

#### **Ejemplo:**

```javascript
const promise1 = Promise.resolve("Éxito 1");
const promise2 = Promise.reject("Error en 2");
const promise3 = Promise.resolve("Éxito 3");

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 'Éxito 1' },
  //   { status: 'rejected', reason: 'Error en 2' },
  //   { status: 'fulfilled', value: 'Éxito 3' }
  // ]
});
```

- Cada resultado incluye:
  - **`status`**: Puede ser `'fulfilled'` (resuelto) o `'rejected'` (rechazado).
  - **`value`**: El valor cuando la promesa fue resuelta.
  - **`reason`**: La razón del error cuando fue rechazada.

Este método asegura que no importa si alguna promesa falla; obtendrás el estado de todas.

```js
new Promise((resolve) => setTimeout(() => resolve("Éxito 3"), 2000));

Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log("Primera promesa completada:", result);
  })
  .catch((error) => {
    console.error("Primera promesa rechazada:", error); // "Error en 2"
  });
```

### **Resumen de métodos según el caso:**

| Necesidad                                        | Método                        | Descripción                                                                   |
| ------------------------------------------------ | ----------------------------- | ----------------------------------------------------------------------------- |
| Obtener el estado de todas las promesas          | `Promise.allSettled`          | Devuelve el estado de todas las promesas, ya sea que se resuelvan o rechacen. |
| Obtener el primer resultado o error              | `Promise.race`                | Resuelve/rechaza con la primera promesa que termine, ignorando el resto.      |
| Ignorar errores y obtener solo resultados buenos | `Promise.allSettled` + filtro | Filtra solo las promesas exitosas tras el uso de `Promise.allSettled`.        |
