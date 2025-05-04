# Prueba Técnica - (Front-end) - N09

Esta evaluación se ha creado para analizar las habilidades de los candidatos que aspiran a la posición de desarrollador **Front-end**.

## INTRODUCCIÓN

En este repositorio, encontrarás un conjunto de criterios para un caso práctico diseñado para evaluar las habilidades técnicas de los candidatos en relación con las funciones y responsabilidades clave en el ámbito del Desarrollo de Tecnología. El objetivo es medir la capacidad del candidato para abordar los desafíos y tareas esenciales dentro de este campo específico.

#### ¿Qué se busca evaluar?

Principalmente los siguientes aspectos:

+ Creatividad para resolver los requerimientos,
+ Calidad del código entregado (estructura y buenas prácticas),
+ Sencilles y calidad,
+ Menor uso de dependencias o frameworks,
+ Ajuste de los componentes en diferentes dimensiones.

## IMPORTANTE
1. Asegúrate de tener `git` y tus herramientas de desarrollo instaladas.

2. Se solicita crear la aplicación utilizando tecnología vanilla (html + css + js) o usando la libería/framework de tu elección:

3. Se requiere de una **cuenta de GitHub** para realizar este ejercicio.

4.  **Antes de comenzar a programar:**

* Realizar un `Fork` de este repositorio (https://github.com/nueve09/prueba-front).
* Clonar el fork a su máquina local `git clone git@github.com:USERNAME/FORKED-PROJECT.git`
* Crear un `branch` en su cuenta de GitHub utilizando su nombre completo.

5.  **Al finalizar**:

* 1) Realizar un `Commit` de su proyecto, **enviar un `Pull Request` al branch con su NOMBRE**, y notificar a la siguiente dirección de correo electrónico rmartinez@nueve09.mx, CC: jaraurjo@nueve09.mx y ubasurto@nueve09.mx.


## EJERCICIO PRÁCTICO

**Objetivo:** Desarrollar una aplicación web, con base a maqueta.png.

 
#### Requerimientos generales

1. La aplicación debe cumplir con los siguientes **requisitos funcionales:**

- Crear una aplicación que incluya todos los componentes mostrados en la maqueta.

- Crear una lista de objetos que contenga información de más de 12 remesas. [{"id":"","company":"","amount":"12000","status":"", created_at:"20231203","charged_at":"20231203"}]

- Crear sección de busqueda por id, company o monto

- Paginación de las remesas 

- Mostrar los primeros 10 remesas por **charged_at** y que hayan sido cobradas; del resultado de la búsqueda, incluyendo id (`'remesa.id'`), la compañia (`'remesa.company'`) y monto (`'remesa.amount'`) de cada registro.

- La interfaz tipo calculadora debe ser funcional.
    1) validar datos de entrada
    2) validar formato de id, max(8)
    3) validar que el id de la remesa,no haya sido cobrada en la lista. Si, no agrega la fecha en que se cobro, actualiza el estatus de "NO_COBRADO" a "COBRADO" y muestrala en el listado de la interfaz.

- Qué la aplicación sea capaz de ajustarse de manera correcta a diversas dimensiones. 


- Incluir un componente para mostrar mensajes de Errores Generales en toda la aplicación.

2.  **CSS:** Utilizar CSS Grid y/o CSS Flexbox, para la maquetación del proyecto 

3.  **Iconos:** Utilizar una librería para el manejo de iconos donde lo considere necesario (_se recomienda el uso de [Font Awesome](http://fontawesome.io/) o [Glyphicons](http://glyphicons.com/)._)

## EJECUTAR APLICACIÓN

Usar versión de node mayor a la 20, se recomienda usar v20.15.1.

Para instalar la aplicación usar: npm install o yarn install

Para ejecutar la aplicación usar: npm start o yarn start