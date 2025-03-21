# Proyecto Tauri 🚀

Este proyecto utiliza [Tauri](https://tauri.app/) para construir aplicaciones de escritorio ligeras con tecnologías web como HTML, CSS y JavaScript.

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes dependencias:

### 🔧 Instalación de Rust
Tauri requiere **Rust** para compilar la aplicación. Instálalo con:

Descarga el exe desde la pagina de rust o
```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Luego, agrega los componentes necesarios:

```sh
rustup update stable
rustup target add wasm32-unknown-unknown
```

### 🏗️ Instalación de Node.js y npm
Asegúrate de tener **Node.js** instalado. Se recomienda la versión LTS.

Puedes verificar tu instalación con:

```sh
node -v
npm -v
```

Si no lo tienes instalado, descárgalo desde [nodejs.org](https://nodejs.org/).

## 🚀 Instalación del Proyecto

1. **Clonar el repositorio**:

   ```sh
   git clone https://github.com/Marco-Centeno/gear-management.git
   cd gear-management
   ```

2. **Instalar dependencias**:

   ```sh
   npm install
   ```

3. **Ejecutar el entorno de desarrollo**:

   ```sh
   npm run tauri dev
   ```

   Esto iniciará la aplicación en modo desarrollo.

4. **Compilar la aplicación para producción**:

   ```sh
   npm run tauri build
   ```

   Esto generará los archivos ejecutables para el sistema operativo correspondiente.

## 📂 Estructura del Proyecto

```
📦 tu-proyecto
 ┣ 📂 src              # Código fuente de la app
 ┣ 📂 src-tauri        # Configuración y backend de Tauri
 ┣ 📄 package.json     # Dependencias del proyecto
 ┣ 📄 tauri.conf.json  # Configuración de Tauri
 ┗ 📄 README.md        # Este archivo
```
