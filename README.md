
# 🎬 Sistema de Cine – React + Node.js

Aplicación web desarrollada con React (frontend) y Node.js con Express (backend), utilizando MySQL como base de datos. Permite a los usuarios explorar catálogos de películas, seleccionar asientos y realizar la compra de entradas con su respectivo comprobante.

## 🧩 Tecnologías utilizadas

- **Frontend**: React
- **Backend**: Node.js + Express
- **Base de datos**: MySQL
- **Comunicación cliente-servidor**: API REST
- **Lenguajes**: JavaScript, HTML, CSS

## 📁 Estructura del proyecto

```
Sistema-De-Cine-React-Node-Js-/
├── client/               # Aplicación React (frontend)
├── server/               # Servidor Node.js con Express (backend)
│   └── config/
│       └── db.js         # Configuración de conexión a MySQL
├── cine_db.sql           # Script para crear y poblar la base de datos
└── .gitignore
```

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Yair2332/Sistema-De-Cine-React-Node-Js-.git
cd Sistema-De-Cine-React-Node-Js-
```

### 2. Configurar la base de datos

- Asegúrate de tener MySQL instalado y en funcionamiento.
- Crea una base de datos nueva (por ejemplo, `cine_db`).
- Importa el archivo `cine_db.sql`:

```bash
mysql -u tu_usuario -p cine_db < cine_db.sql
```

- Luego edita el archivo `server/config/db.js` para colocar tus datos de conexión:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'TU_USUARIO',
  password: 'TU_CONTRASEÑA',
  database: 'cine_db'
});
```

### 3. Iniciar el backend

```bash
cd server
npm install
npm start
```

- El servidor se ejecutará en `http://localhost:3001`.

### 4. Iniciar el frontend

En una nueva terminal:

```bash
cd client
npm install
npm start
```

- La aplicación React se abrirá en `http://localhost:3000`.

## 🧪 Funcionalidades

- Visualización de catálogos de películas.
- Selección de asientos disponibles.
- Compra de entradas con generación de comprobante.
- Backend con Node.js y Express conectado a MySQL.
- Comunicación entre cliente y servidor vía API REST.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
