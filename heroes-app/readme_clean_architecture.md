# Arquitectura limpia en desarrollo móvil

La arquitectura (Domain, Data, Presentation, Infrastructure) es una variación de **Clean Architecture** propuesta por Robert C. Martin (Uncle Bob). Clean Architecture busca separar responsabilidades en capas, promoviendo el desacoplamiento y la facilidad de prueba, mantenimiento y escalabilidad.

Vamos detallar cada capa, su propósito, y cómo implementarla en un proyecto **React Native**:

---

### **1. Domain Layer**

La capa **Domain** es el núcleo de la aplicación y contiene la lógica de negocio pura, independiente de detalles técnicos. Aquí defines **casos de uso (use cases)** y **entidades**.

#### Responsabilidades:

- Define **entidades** que representan los modelos de negocio centrales.
- Contiene **casos de uso** que implementan la lógica de negocio.
- No depende de frameworks o librerías externas (React Native, bases de datos, etc.).

#### Ejemplo de implementación:

Archivo: `src/domain/usecases/GetUserProfile.js`

```javascript
export class GetUserProfile {
  constructor(userRepository) {
    this.userRepository = userRepository; // Dependency Injection
  }

  execute(userId) {
    if (!userId) throw new Error("User ID is required");
    return this.userRepository.fetchUserProfile(userId);
  }
}
```

Archivo: `src/domain/entities/User.js`

```javascript
export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
```

---

### **2. Data Layer**

La capa **Data** implementa la lógica de acceso a los datos. Esta capa interactúa con fuentes de datos externas (APIs, bases de datos, almacenamiento local). Actúa como una interfaz entre la capa **Domain** y el mundo exterior.

#### Responsabilidades:

- Implementar **repositorios** que la capa **Domain** consume.
- Manejar la obtención, transformación y almacenamiento de datos.
- Asegurar que la capa **Domain** no conozca los detalles de los servicios o bases de datos.

#### Ejemplo de implementación:

Archivo: `src/data/repositories/UserRepositoryImpl.js`

```javascript
export class UserRepositoryImpl {
  constructor(apiService) {
    this.apiService = apiService; // Dependency Injection
  }

  async fetchUserProfile(userId) {
    const response = await this.apiService.get(`/users/${userId}`);
    const { id, name, email } = response.data;
    return { id, name, email }; // Transform data if needed
  }
}
```

Archivo: `src/data/api/ApiService.js`

```javascript
import axios from "axios";

export class ApiService {
  constructor(baseURL) {
    this.client = axios.create({ baseURL });
  }

  async get(endpoint) {
    return this.client.get(endpoint);
  }
}
```

---

### **3. Presentation Layer**

La capa **Presentation** maneja la interfaz de usuario y las interacciones del usuario. Contiene los **componentes**, **hooks**, y **view models** en el caso de patrones como MVVM.

#### Responsabilidades:

- Renderizar la UI en base al estado de la aplicación.
- Comunicarse con la capa **Domain** a través de casos de uso.
- Manejar el ciclo de vida de la vista.

#### Ejemplo de implementación:

Archivo: `src/presentation/screens/ProfileScreen.js`

```javascript
import React, { useEffect, useState } from "react";

export const ProfileScreen = ({ getUserProfile }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile.execute(1); // Example UserID
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [getUserProfile]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
};
```

Archivo: `src/presentation/App.js`

```javascript
import React from "react";
import { ProfileScreen } from "./screens/ProfileScreen";
import { GetUserProfile } from "../domain/usecases/GetUserProfile";
import { UserRepositoryImpl } from "../data/repositories/UserRepositoryImpl";
import { ApiService } from "../data/api/ApiService";

// Setup dependencies
const apiService = new ApiService("https://api.example.com");
const userRepository = new UserRepositoryImpl(apiService);
const getUserProfile = new GetUserProfile(userRepository);

export const App = () => <ProfileScreen getUserProfile={getUserProfile} />;
```

---

### **4. Infrastructure Layer**

La capa **Infrastructure** maneja los detalles técnicos como configuración de APIs, almacenamiento local, frameworks, y dependencias externas. Es responsable de integrar estas herramientas en el proyecto.

#### Responsabilidades:

- Configurar servicios (e.g., bases de datos, APIs, almacenamiento local).
- Implementar adaptadores para tecnologías específicas (e.g., AsyncStorage, Axios).
- Contener lógica específica de frameworks (como React Native).

#### Ejemplo de implementación:

Archivo: `src/infrastructure/storage/AsyncStorageAdapter.js`

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageAdapter {
  async get(key) {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  }

  async set(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key) {
    await AsyncStorage.removeItem(key);
  }
}
```

Archivo: `src/infrastructure/network/NetworkMonitor.js`

```javascript
import NetInfo from "@react-native-community/netinfo";

export class NetworkMonitor {
  static async isConnected() {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }
}
```

---

### **5. Additional Layers (Optional)**

Algunos proyectos grandes pueden requerir capas adicionales:

- **Application Layer**: Coordina flujos de trabajo de alto nivel. Define controladores o coordinadores para manejar la lógica entre vistas y casos de uso.
- **Shared Layer**: Contiene utilidades y funciones compartidas entre capas (e.g., validaciones, formateo de fechas).

---

### **Organización de Carpetas**

```plaintext
src/
├── domain/
│   ├── entities/
│   │   └── User.js
│   ├── usecases/
│       └── GetUserProfile.js
├── data/
│   ├── repositories/
│   │   └── UserRepositoryImpl.js
│   ├── api/
│       └── ApiService.js
├── infrastructure/
│   ├── network/
│   │   └── NetworkMonitor.js
│   ├── storage/
│       └── AsyncStorageAdapter.js
├── presentation/
│   ├── screens/
│   │   └── ProfileScreen.js
│   └── App.js
```

---

### **Ventajas de esta arquitectura:**

1. **Desacoplamiento:** Cada capa tiene su propia responsabilidad, lo que facilita pruebas y mantenimiento.
2. **Reutilización:** Las capas superiores (Domain y Data) son independientes del framework (React Native), facilitando su reutilización en otros proyectos.
3. **Escalabilidad:** Puedes agregar más capas o servicios sin afectar al resto del sistema.
