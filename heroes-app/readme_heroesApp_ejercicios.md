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
