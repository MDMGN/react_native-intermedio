# **El patrón Flux y Reducers en React**

### **¿Qué es el patrón Flux?**

Flux es un **patrón de arquitectura** para gestionar el flujo de datos unidireccional en aplicaciones JavaScript. Fue creado por **Facebook** y está diseñado para resolver los problemas derivados de la complejidad de las aplicaciones con múltiples estados que interactúan entre sí.

#### **¿Cómo funciona Flux?**

El flujo de datos en Flux sigue una **estructura unidireccional**, lo que facilita la comprensión y la gestión de los cambios de estado.

Flux se basa en cuatro componentes principales:

1. **Actions (Acciones)**: Son eventos o solicitudes que describen algo que ha sucedido en la aplicación (por ejemplo, hacer clic en un botón, recibir datos de una API, etc.). Las acciones contienen un **type** y cualquier dato relevante para el cambio de estado.

2. **Dispatcher**: Es el **orquestador** de las acciones. Se asegura de que todas las "stores" reciban las acciones. Se podría pensar en él como un centro de distribución de eventos.

3. **Stores (Almacenes)**: Son los **contenedores de estado**. Cada store maneja un pedazo específico del estado de la aplicación. Los stores se **suscriben al dispatcher** para recibir acciones y actualizar su estado en consecuencia.

4. **Views/Screen (Vistas o Panatallas)**: Son los componentes de la interfaz de usuario. Cuando el estado de un store cambia, las vistas se actualizan para reflejar esos cambios.

---

### **¿Qué es un Reducer?**

## Los **reducers** son **funciones puras** que toman el **estado anterior** y una **acción** para **devolver un nuevo estado**. En otras palabras, son los encargados de modificar el estado de la aplicación de acuerdo con la acción recibida. Los reducers no deben modificar el estado original, sino que deben devolver una nueva versión del estado.

### **¿Qué es `useReducer`?**

`useReducer` es un **hook** en React que permite gestionar el estado de una aplicación de manera más avanzada que con `useState`, y es especialmente útil cuando el estado es complejo o cuando dependemos de la lógica de actualización más estructurada (como los reducers en Flux o Redux).

`useReducer` sigue el mismo patrón que los reducers de Flux, donde una **acción** se despacha y un **reducer** calcula el nuevo estado en función de esa acción.

---

### **Pasos para Implementar el Patrón Flux con `useReducer`**

#### **1. Definir el Estado y las Acciones**

Primero, definimos las **acciones** y el **estado** de nuestra aplicación. En este ejemplo, manejaremos un contador.

```typescript
// types.ts
export interface AppState {
  count: number;
}

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

// Tipos de las acciones
interface IncrementAction {
  type: typeof INCREMENT;
}

interface DecrementAction {
  type: typeof DECREMENT;
}

export type AppActions = IncrementAction | DecrementAction;
```

#### **2. Crear el Reducer**

El **reducer** es la función que toma el estado anterior y una acción, y devuelve el nuevo estado.

```typescript
// reducer.ts
import { AppState, AppActions, INCREMENT, DECREMENT } from "./types";

const initialState: AppState = {
  count: 0,
};

export const appReducer = (
  state: AppState = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};
```

#### **3. Usar `useReducer` en un Componente**

Ahora, vamos a utilizar `useReducer` en un componente de React Native. Este hook tomará el `reducer` y el estado inicial, y devolverá el estado y una función `dispatch` para enviar acciones.

```typescript
// App.tsx
import React, { useReducer } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { appReducer } from "./reducer";
import { AppState, INCREMENT, DECREMENT } from "./types";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, { count: 0 });

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Contador: {state.count}</Text>
      <Button
        title="Incrementar"
        onPress={() => dispatch({ type: INCREMENT })}
      />
      <Button
        title="Decrementar"
        onPress={() => dispatch({ type: DECREMENT })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
```

---

### **¿Cómo Funciona?**

1. **Reducer**: La función `appReducer` toma el estado actual y una acción, y en función de la acción (`INCREMENT` o `DECREMENT`), devuelve un nuevo estado con el valor actualizado del contador.

2. **useReducer**: El hook `useReducer` se utiliza en el componente principal (`App`). Devuelve dos cosas:

   - El estado actual (`state`), que en este caso es un objeto con una propiedad `count`.
   - La función `dispatch`, que se utiliza para enviar las acciones (`INCREMENT` y `DECREMENT`) al reducer.

3. **Acciones**: Los botones de la interfaz llaman a `dispatch`, enviando una acción de tipo `INCREMENT` o `DECREMENT` al reducer.

---

### **Ventajas de Usar `useReducer` con TypeScript**

1. **Manejo explícito del estado**: El uso de `useReducer` nos da un control explícito sobre cómo se modifica el estado, y el **tipado** de TypeScript ayuda a garantizar que solo se despachen acciones válidas.

2. **Escalabilidad**: A medida que la aplicación crece y se agregan más acciones y lógica para manejar el estado, `useReducer` permite manejar de manera más eficiente estados complejos sin perder claridad.

3. **Comodidad de TypeScript**: El sistema de tipos de TypeScript nos asegura que solo se pasen acciones válidas al reducer, evitando errores de ejecución y mejorando la robustez de la aplicación.

---

### **Conclusión**

Usar el patrón Flux con `useReducer` en **React Native** y **TypeScript** es una excelente forma de gestionar el estado de manera escalable y predecible. Con este enfoque, tu aplicación será fácil de mantener y menos propensa a errores, ya que la lógica de estado es clara, tipada y modular.
