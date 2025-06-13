# Gestión de Remesas

Aplicación web para la gestión y cobro de remesas, construida con **React**, **Vite**, **TypeScript**, **Zustand** y **TailwindCSS**. Incluye:

- **Lista de remesas** (status, filtros, búsqueda, paginación).
- **Calculadora** para cobrar remesas por ID.
- **Responsive design**: drawer en móvil y panel lateral en escritorio.
- **Impresión** de lista y filtros avanzados.

---

## 📂 Estructura del proyecto

```
├── src/
│   ├── assets/            # Imágenes (logo, avatar, etc.)
│   ├── components/        # Componentes React reutilizables
│   │   ├── Sidebar.tsx
│   │   ├── RemittanceHeader.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Calculator.tsx
│   │   ├── RemittanceList.tsx
│   │   ├── Pagination.tsx
│   │   └── ErrorMessage.tsx
│   ├── data/
│   │   └── remittances.ts     # Remesas de ejemplo (>=100 registros)
│   ├── store/
│   │   └── useRemittanceStore.ts # Zustand store (estado, acciones)
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Instalación y puesta en marcha

1. Clona el repositorio:

   ```bash
   git clone https://github.com/XxJohnWickxX/prueba-front.git
   cd prueba-front && cd remittances-app
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Levanta el servidor de desarrollo:

   ```bash
   pnpm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

---

## 📦 Scripts disponibles

- `npm run dev` - Inicia Vite en modo desarrollo.
- `npm run build` - Genera el build de producción en `dist/`.
- `npm run preview` - Sirve el build localmente.

---

## 🛠️ Tecnologías utilizadas

- **React** 19
- **Vite** 6
- **TypeScript**
- **Zustand** (estado global)
- **TailwindCSS** (estilos utilities-first)
- **FontAwesome** (iconos)

---

## 🎨 Responsive Design

- **Escritorio**: sidebar fijo y panel lateral para calculadora.
- **Tablet**: similar a escritorio con ajuste de paddings.
- **Móvil**: drawer lateral y **bottom sheet** para calculadora.

Clases clave:

```css
hidden md:flex        /* sidebar oculto en móvil */
fixed inset-y-0 left-0 /* drawer mobile */
fixed inset-x-0 bottom-0 /* bottom sheet mobile */
md:absolute           /* panel lateral desktop */
flex-col md:flex-row   /* layout principal */
```

---

## 🔍 Funcionalidades

1. **Listado de remesas**: busca por ID, compañía o monto, paginación dinámica.
2. **Cobro de remesas**: entra ID en calculadora, valida formato (máx 8 dígitos), actualiza estado.
3. **Filtros**: monto mayor/menor, fecha más antigua/reciente.
4. **Impresión**: botón para imprimir la lista mostrada.
5. **Responsive**: menú lateral, drawer, bottom sheet.
