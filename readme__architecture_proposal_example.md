### **Estructura propuesta**

```plaintext
src/
├── config/                # Configuración global (helpers, constantes, API URLs)
├── data/                  # Repositorios para manejar datos (API, cache, etc.)
├── domain/                # Lógica de negocio, mapeadores y contratos
├── infrastructure/        # Implementaciones técnicas (adapters, interfaces, etc.)
├── presentation/          # Componentes de UI (pantallas, hooks personalizados, etc.)
└── App.tsx                # Punto de entrada de la app
```

### **1. Capa de Configuración (`config`)**

Define tus constantes globales, helpers y configuración de la API aquí.

**Archivo `config/api/superHeroesApi.ts`**:

```typescript
const BASE_URL = "https://superheroapi.com/api";
const API_TOKEN = "your_api_token_here";

export default `${BASE_URL}/${API_TOKEN}`;
```

**Archivo `config/helpers/ajax.ts`**:

```typescript
export const ajax = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};
```

---

### **2. Capa de Dominio (`domain`)**

Aquí defines las interfaces y mapeadores de datos. Esto asegura que cualquier cambio en la estructura de la API no afecte directamente a la UI.

**Archivo `domain/interfaces/hero.ts`**:

```typescript
export interface Hero {
  id: string;
  name: string;
  image: string;
  publisher: string;
}
```

**Archivo `domain/mappers/getMapHero.ts`**:

```typescript
import { Hero } from "../interfaces/hero";
import { HeroResponseAPI } from "../../infrastructure/interfaces/heroResponseApi";

export const getMapHero = (data: HeroResponseAPI): Hero => ({
  id: data.id,
  name: data.name,
  image: data.image.url,
  publisher: data.biography.publisher || "Unknown",
});
```

---

### **3. Capa de Infraestructura (`infrastructure`)**

Aquí colocas las implementaciones técnicas, como adapters y las interfaces de las respuestas de la API.

**Archivo `infrastructure/interfaces/heroResponseApi.ts`**:

```typescript
export interface HeroResponseAPI {
  id: string;
  name: string;
  image: { url: string };
  biography: { publisher: string };
}
```

**Archivo `infrastructure/adapters/http.adapter.ts`**:

```typescript
import { ajax } from "../../config/helpers/ajax";

export class HttpAdapter {
  static async get<T>(url: string): Promise<T> {
    return ajax<T>(url);
  }
}
```

---

### **4. Capa de Datos (`data`)**

Aquí creas repositorios que encapsulan el acceso a los datos. Esto te permite centralizar la lógica de cómo obtener los datos (desde APIs, bases de datos, o caché).

**Archivo `data/repositories/HeroRepository.ts`**:

```typescript
import apiURL from "../../config/api/superHeroesApi";
import { HttpAdapter } from "../../infrastructure/adapters/http.adapter";
import { HeroResponseAPI } from "../../infrastructure/interfaces/heroResponseApi";

export class HeroRepository {
  private static HERO_LIMIT = 5;
  private static MAX_HERO_ID = 732;

  private lastHeroID = 1;

  public async fetchHeroes(): Promise<HeroResponseAPI[]> {
    if (this.lastHeroID >= HeroRepository.MAX_HERO_ID) return [];

    const heroIDs = Array.from({ length: HeroRepository.HERO_LIMIT }, () =>
      this.lastHeroID < HeroRepository.MAX_HERO_ID ? this.lastHeroID++ : null
    ).filter((id) => id !== null);

    const heroes = await Promise.all(
      heroIDs.map((id) => HttpAdapter.get<HeroResponseAPI>(`${apiURL}/${id}`))
    );

    return heroes;
  }
}
```

---

### **5. Capa de Presentación (`presentation`)**

Aquí defines los componentes de la UI y los hooks personalizados para interactuar con la lógica de negocio.

**Hook personalizado `useHeroes.ts`**:

```typescript
import { useState, useEffect } from "react";
import { Hero } from "../../domain/interfaces/hero";
import { HeroRepository } from "../../data/repositories/HeroRepository";
import { getMapHero } from "../../domain/mappers/getMapHero";

export const useHeroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(false);

  const repository = new HeroRepository();

  const fetchMoreHeroes = async () => {
    setLoading(true);
    try {
      const newHeroes = await repository.fetchHeroes();
      setHeroes((prev) => [...prev, ...newHeroes.map(getMapHero)]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreHeroes();
  }, []);

  return { heroes, loading, fetchMoreHeroes };
};
```

**Pantalla `HomeScreen.tsx`**:

```typescript
import { View, FlatList, ActivityIndicator, Pressable } from "react-native";
import React from "react";
import { globalStyles } from "../themes/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/StackGroup";
import { StackNavigationProp } from "@react-navigation/stack";
import { useHeroes } from "../hooks/useHeroes";
import { HeroCard } from "../components/shared/HeroCard";

export default function HomeScreen() {
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();
  const { heroes, loading, fetchMoreHeroes } = useHeroes();

  return (
    <View style={globalStyles.container}>
      <FlatList
        onEndReached={fetchMoreHeroes}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size={"large"} /> : null
        }
        data={heroes}
        keyExtractor={(hero) => hero.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate("HERO", item)}>
            <HeroCard image={item.image} title={item.name} />
          </Pressable>
        )}
      />
    </View>
  );
}
```

---

### **Ventajas de esta estructura**

1. **Separación de responsabilidades**: Cada capa tiene un propósito claro y evita mezclar lógica de UI, datos y negocio.
2. **Facilidad de pruebas**: Puedes testear cada capa de manera aislada.
3. **Reutilización**: Los hooks y repositorios pueden reutilizarse en diferentes pantallas.
4. **Escalabilidad**: Añadir nuevos módulos o lógica es más sencillo.
