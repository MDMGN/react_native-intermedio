# Ejercicios de React Native: Animaciones, Navegación, Clean Architecture, Diseño de Layout y Fetch

1. **Pantalla `HomeScreen` y navegación**

   - Crea una pantalla llamada `HomeScreen`.
   - En `HomeScreen`, utiliza la API de `SuperHeroes` para obtener una lista de 5 héroes y renderízalos en un `FlatList`.
   - Cada elemento del listado debe mostrarse en una tarjeta (crea el componente `HeroCard` y su tipado) con los siguientes elementos:
     - El nombre del héroe como título.
     - La imagen del héroe.

2. **Carga de datos con `onEndReached` y `onEndReachedThreshold`**

   - Implementa el evento `onEndReached` en el `FlatList` para que llame a la API, cargue 5 héroes más y los agregue a la lista existente.
   - Establece el valor de `onEndReachedThreshold` en `0.7`.
   - Agrega un indicador de actividad (ActiveIndicator) en la propiedad `ListFooterComponent` del **FlatList**.

3. **Caja con opacidad dinámica**

   - En la pantalla `HomeScreen`, agrega una caja fija encima del `FlatList`.
   - Configura el evento `onScroll` en el `FlatList` para que la opacidad de la caja cambie dinámicamente entre 0.5 y 1, dependiendo de la posición de desplazamiento. Utiliza `Animated.event` para lograrlo.

4. **Navegación a `HeroeScreen`**

   - Haz que al presionar cualquier tarjeta en la pantalla `HomeScreen`, navegue a una nueva pantalla llamada `HeroeScreen`.
   - Pasa como parámetro a `HeroeScreen` la información del héroe seleccionado.
   - Crea el modelo correspondiente en la capa `domain`, dentro de la ruta `/src/domain/models/hero.d.ts`.
   - Implementa un **mapper** en `/src/domain/getMapHero.ts` para transformar los datos de la API al modelo creado.
   - Asegúrate de usar el modelo para tipar correctamente las props de `HeroeScreen`.

5. **Animación en `HeroeScreen`**

   - Muestra el nombre del héroe como título de la pantalla.
   - En la pantalla `HeroeScreen`, implementa una animación para que los textos y la imagen del héroe se muestren de manera secuencial al cargar la pantalla.
   - Asegúrate de que las animaciones sean suaves y visualmente atractivas.

6. **Pantalla de búsqueda: `SearchScreen`**

   - Crea una pantalla llamada `SearchScreen`.
   - Diseña un componente `SearchItem` para listar los resultados de búsqueda. Este componente debe mostrar:
     - La imagen del héroe.
     - El nombre del héroe.
     - El alias (si lo tiene).
   - Tipar adecuadamente el componente `SearchItem`.

   - Crea un componente `SearchInput` con las siguientes características:

     - Implementa la lógica necesaria para recibir un estado de búsqueda y permitir su modificación.
     - Agrega un botón que permita limpiar el texto del input.
     - Implementa un **debounce** para mejorar la experiencia de búsqueda y evitar demasiadas llamadas a la API.

   - En `src/presentation/navigation/BottomTabs.tsx` realiza las siguientes modificaciones en la propiedad `options` de `SEARCH`:

     - Inicializa la propiedad `headerTitle` con un string vacío.
     - Renderiza el componente `SearchInput` en la propiedad `headerRight`.

   - Usa el siguiente endpoint para obtener los datos desde `SearchScreen`:  
     `https://superheroapi.com/api.php/5951652661611246/search/{query}`.
   - Renderiza los resultados en un `FlatList` con `SearchItem`.

   - Agrega el evento `onPress` al componente `SearchItem` para navegar a `HeroeScreen` y pasa las props necesarias para mostrar los detalles del héroe.

Claro, aquí tienes una versión corregida y mejor redactada de las instrucciones:

---

### **7. Filtrar héroes en las `Top Tabs`**

- Crea 3 pantallas (`Top Tabs Screens`):

  - `MarvelScreen`
  - `DCScreen`
  - `OthersScreen`

- Agrega el tipado correspondiente y el enrutamiento necesario para estas pantallas.
- Cada pantalla debe filtrar y mostrar a los héroes según su propiedad `publisher`:

  - **`MarvelScreen`**: muestra solo héroes de Marvel.
  - **`DCScreen`**: muestra solo héroes de DC.
  - **`OthersHeroesScreen`**: muestra héroes cuyo `publisher` no sea ni Marvel ni DC.

- Implementa nuevos métodos en el repositorio para buscar dinámicamente héroes según su propiedad `publisher` en la API.

- Las pantallas deben hacer una llamada a la API para cargar y mostrar 5 héroes inicialmente, e ir cargando más héroes incrementales conforme el usuario se desplace en el `FlatList` de cada pantalla.

- Cada `item` del `FlatList` debe ser una tarjeta que muestre:
  - El **título** del héroe.
  - Una **imagen** del héroe.

### **8. Mis héroes en Drawer**

- Instala y configura el `Drawer navigation` desde [React Navigation](https://reactnavigation.org/docs/getting-started).
- Crea el componente `OptionsCard`:
  - Este componente debe estar superpuesto (con `position: absolute`) en cada tarjeta del `FlatList`.
  - Debe mostrar las siguientes opciones:
    - Ver detalles.
    - Guardar en Favoritos.
  - Este componente se mostrará cuando se mantenga pulsada la tarjeta (usa los eventos `PressIn` y `PressOut`), y desaparecerá cuando se deje de presionar.
  - La opción `Ver detalles` navegará a `HeroeScreen`.
  - La opción `Guardar en favoritos` añadirá al héroe a una lista de héroes favoritos (usa un contexto global). Los héroes deben guardarse en almacenamiento local y gestionarse mediante reducers.
- En el `Drawer`, agrega la opción `Mis héroes`.
- Crea el componente `MyHero`:
  - Mostrará la foto y el nombre del héroe.
  - Tendrá un botón "Ver" (que navegará a `HeroeScreen`) y un botón "Eliminar" (que lo eliminará de la lista).
- Al seleccionar la opción `Mis héroes` del `Drawer`, usa `FlatList` y `MyHero` para mostrar la lista de héroes favoritos almacenados en el contexto global.

### 9. **Casos de uso, StorageAdapter y FavoriteHeroRepository**

- Crea un adaptador `StorageAdapter` en su capa correspondiente y su respectiva implementación con AsyncStorage.
- Crea un repositorio `FavoriteHeroRepository` para obtener y almacenar los datos en AsyncStorage.
- Desarrolla los casos de uso para obtener (todos o por ID) y guardar los héroes favoritos a través de `FavoriteHeroRepository`.
- Modifica `FavoritesProvider` para implementar los casos de uso.

### 10. **Mis héroes**

- Crea una nueva pantalla llamada `MyHeroesScreen`.
- Agrega una nueva ruta en `DrawGroup` para `MyHeroesScreen`.
- Desarrolla un componente `MyHeroCard` que muestre el nombre, la imagen y los botones para ver detalles o eliminar al héroe de favoritos.
- El botón **"Ver detalles"** debe navegar a la pantalla `HeroScreen` para mostrar información sobre el héroe seleccionado.
- En `MyHeroesScreen`, renderiza todos los héroes favoritos almacenados localmente dentro de `MyHeroCard`.

### 11. **Soy el favorito**

- Modifica el componente `HeroCard` para mostrar un ícono de corazón si el héroe está en la lista de favoritos.
