# Examen Final - Proyecto Calculadora de Remesas

Este proyecto corresponde al examen final basado en la maqueta entregada como imagen de referencia. La implementación incluye una calculadora interactiva conectada a una lista de remesas, una tabla dinámica con funciones de búsqueda, filtrado y paginación, y un sistema de alertas integradas mediante modales.

## 🧰 Tecnologías Utilizadas

- **React** para la estructura del proyecto.
- **Bootstrap 5** para estilos, componentes visuales y layout responsivo.
- **CSS personalizado** para ajustes adicionales.
- **JavaScript** (ES6+) para la lógica de interacción.

## 🧮 Funcionalidades de la Calculadora

La calculadora permite ingresar un ID de remesa manualmente y cuenta con validaciones clave:

- ✅ Valida que el número ingresado tenga un **máximo de 8 dígitos**.
- ✅ Solo permite **un punto decimal**.
- ✅ Al presionar el botón de **confirmación (✓)**:
  - Busca el ID dentro del archivo `data/data_remittances.js`.
  - Si encuentra un ID con `status: NO_COBRADO`, lo cambia a `COBRADO`.
  - Actualiza la tabla principal para reflejar el cambio.

> ⚠️ Nota: No se especificó claramente el uso completo de la calculadora, por lo que se asumió una funcionalidad de **validación y activación de remesas por ID**.

## 📋 Tabla de Remesas

- Ordenada por fecha de **`charged_at`** (cuando ha sido cobrado).
- Solo muestra remesas con status **"COBRADO"**.
- Paginación incluida de **10 en 10**.
- Soporte de **búsqueda por ID, compañía o monto**.
- Las filas nuevas agregadas por la calculadora se destacan visualmente.

## 🔔 Sistema de Alertas

Se implementó un sistema de alertas generales utilizando **modales de Bootstrap** que permiten notificar:

- Errores de validación.
- ID no encontrado.
- Confirmaciones visuales de cambios exitosos.

## 📁 Estructura Base del Proyecto

- `src/components/Calculator.js` – Lógica de la calculadora.
- `src/components/TableInformation.js` – Lógica de la tabla con paginación.
- `src/data/data_remittances.js` – Fuente de datos original.
- `src/components/AlertModal.js` – Componente para mostrar mensajes de error o éxito.

## 📝 Consideraciones

- El layout fue diseñado para adaptarse a pantallas móviles y de escritorio.
- Se mantuvo la fidelidad visual con la maqueta base usando Bootstrap.
- Las funciones y diseño pueden ampliarse fácilmente según nuevos requerimientos.

---

Desarrollado como entrega final para evaluación técnica.
