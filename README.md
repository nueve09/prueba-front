
# Prueba Técnica - (Front End) - N09

- [https://preba-tecnica-n09-juan-toledo.web.app](https://preba-tecnica-n09-juan-toledo.web.app)

En la prueba técnica se realizó un análisis para del diseño para poder dividir la pantalla en componentes y así obtener un atomic design. Todo esto siempre con tecnologías libres.

También identifiqué que la app está diseñada para tablets por sus botones y la funcionalidad de calculadora que viene integrada.

En la prueba se indica utilizar el menor número de librerías, se integraron algunas que actualmente se utilizan para facilitar y agilizar el desarrollo de Front End, así mismo demostrar mis habilidades utilizándolas.


## Authors

- [Juan Alberto Toledo Tello](https://github.com/JuanToledo23)


## Ejecutar proyecto

Para ejecutar la app de manera local seguir los siguientes pasos:

- npm install
- npm run dev
## Tecnologías utilizadas

- [ReactJS](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Font Awesome](https://fontawesome.com/)
- [Material UI](https://mui.com/) (Solo para las alertas)

## Dependencias de desarrollo

- [Prettier](https://prettier.io/)
- [Tailwind CSS](https://tailwindcss.com/)


## Funcionamiento

Les comparto la lista de remesas que está en el archivo "data/remittances.ts". 
En este archivo podemos encontrar todas las remesas que están en la lista, solo se despliegan en la app las que tienen el status "COBRADO" y al ingresar una remesa con el status "NO_COBRADO" se agrega a al componente de visualización, mandándote mensajes de sí se agregó correctamente, si la remesa no existe y si ya está en la lista de visualización.

[
  {
    id: 29939301,
    company: "Western Union",
    amount: 12000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231210",
  },
  {
    id: 29939302,
    company: "Western Union",
    amount: 12000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231215",
  },
  {
    id: 29939303,
    company: "Western Union",
    amount: 19000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231204",
  },
  {
    id: 29939304,
    company: "Western Union",
    amount: 19000,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939305,
    company: "Western Union",
    amount: 12000,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939306,
    company: "Western Union",
    amount: 12000,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939307,
    company: "MoneyGram",
    amount: 20000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231210",
  },
  {
    id: 29939308,
    company: "MoneyGram",
    amount: 2000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231215",
  },
  {
    id: 29939309,
    company: "MoneyGram",
    amount: 3500,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231204",
  },
  {
    id: 29939310,
    company: "MoneyGram",
    amount: 20800,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939311,
    company: "MoneyGram",
    amount: 10000,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939312,
    company: "MoneyGram",
    amount: 11000,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939313,
    company: "Neteller",
    amount: 20000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231210",
  },
  {
    id: 29939314,
    company: "Neteller",
    amount: 2000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231215",
  },
  {
    id: 29939315,
    company: "Neteller",
    amount: 3500,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231204",
  },
  {
    id: 29939316,
    company: "Neteller",
    amount: 20800,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939317,
    company: "Neteller",
    amount: 10000,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939318,
    company: "Neteller",
    amount: 11000,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939319,
    company: "PayPal",
    amount: 20000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231210",
  },
  {
    id: 29939320,
    company: "PayPal",
    amount: 2000,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231215",
  },
  {
    id: 29939321,
    company: "PayPal",
    amount: 2300,
    status: "COBRADO",
    created_at: "20231203",
    charged_at: "20231204",
  },
  {
    id: 29939322,
    company: "PayPal",
    amount: 19300,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939323,
    company: "PayPal",
    amount: 5000,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
  {
    id: 29939324,
    company: "PayPal",
    amount: 8600,
    status: "NO_COBRADO",
    created_at: "20231203",
    charged_at: "",
  },
];

## Descripción del proyecto

Utilice el framework ReacJS con TypeScript, ya que desde mi punto de vista es muy flexible y nos permite crear una organizada a nuestra medida eso combinado con buenas prácticas de arquitectura dan como resultado un proyecto escalable y fácil de entender y adicional utilizando TypeScript [https://www.typescriptlang.org/] para tener definido todos los tipos de valores que se utilizan en la app.

Puede que se vean bastantes cosas, pero al momento de crear el build de la aplicación tan solo pesa 501KB.

Se utilizó (Vite)[https://es.vitejs.dev/] como servidor local y para la creación del proyecto.

Se utilizó una estructura atómica, manteniendo los componentes y recursos organizados, tratando de tener los átomos dentro de sus respectivas carpetas, solo teniendo una carpeta principal de "components" para los componentes universales.

Se utilizó Redux Toolkit que es la versión más reciente de Redux para poder tener toda la lógica del proyecto organizada y escalable utilizando los "slides" para dividir funcionalidad.

Prettier es solo para dar estructura a todos nuestros archivos y obtener una sintaxis fácil de leer.

Tailwind CSS es una de las dependencias de desarrollo que nos facilitan la escritura de código CSS, sin tener demasiados archivos CSS.

Se implementó Material UI solo para poder utilizar el componente de alert.




## Despliegue

Adicional a esta prueba técnica me tomé la libertad de desplegar la aplicación en (Firebase)[https://firebase.google.com/?hl=es] solo para que se pudiera consultar la aplicación de manera sencilla y demostrar un poco mis conocimiento sobre Firebase.

En la siguiente URL podemos consultar el proyecto desplegado:

- [https://preba-tecnica-n09-juan-toledo.web.app](https://preba-tecnica-n09-juan-toledo.web.app)
## Contacto

Sin más que agregar reciba un cordial saludo, quedo atento a la retrospectiva sobre esta prueba técnica que para mí fue muy enriquecedora.

Dejo mi teléfono y correo electrónico por cualquier situación:

- johntoledot@gmail.com
- 777 493 95 62