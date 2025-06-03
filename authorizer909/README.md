# Desafío de Código: Autorizador

## Descripción General
Este proyecto implementa la aplicación Autorizador, una herramienta de línea de comandos que procesa operaciones en formato JSON para la creación de cuentas y la autorización de transacciones, siguiendo un conjunto de reglas de negocio predefinidas. La aplicación lee líneas JSON desde `stdin`, aplica la lógica de negocio y genera resultados en `stdout`. Está diseñada para ser simple y extensible, con un enfoque en la separación clara de responsabilidades y pruebas robustas.

## Decisiones Técnicas y Arquitectónicas
La aplicación Autorizador se desarrolló con los siguientes principios de diseño y elecciones técnicas:

- **Lenguaje de Programación: Java**
  - Se eligió Java por solicitud dentro de la entevista con el equipo de `nueve09` ademas de su independencia de plataforma, tipado fuerte y amplia biblioteca estándar, lo que garantiza compatibilidad con sistemas operativos Unix y Mac, como se requiere.
  - Sus características orientadas a objetos facilitan un diseño modular y mantenible.

- **Estructura Modular**
  - El código está organizado en paquetes para una clara separación de responsabilidades:
    - `com.nueve09.authorizer.model`: Contiene las clases POJO `Account` y `Transaction` para la representación de datos.
    - `com.nueve09.authorizer.rule`: Encapsula las reglas de negocio individuales (por ejemplo, `AccountAlreadyInitializedRule`, `InsufficientLimitRule`) en clases separadas, cada una manejando una lógica de validación específica.
    - `com.nueve09.authorizer.service`: Incluye `AccountService` y `TransactionService` para procesar operaciones de creación de cuentas y autorización de transacciones, respectivamente.
    - `com.nueve09.authorizer.util`: Proporciona `JsonUtil` para utilidades compartidas de procesamiento JSON.
    - `com.nueve09.authorizer`: Contiene la clase principal `AuthorizerApp` para manejar la entrada/salida y coordinar los servicios.
  - Esta estructura mejora la legibilidad, mantenibilidad y extensibilidad, permitiendo agregar nuevas reglas o funcionalidades con cambios mínimos.

- **Gestión del Estado en Memoria**
  - La aplicación utiliza campos estáticos en `AuthorizerApp` (`account` y `transactionHistory`) para mantener el estado en memoria, como se requiere.
  - El estado se reinicia al inicio de la aplicación para garantizar un estado limpio en cada ejecución.
  - Las operaciones con violaciones no modifican el estado, cumpliendo con los requisitos.

- **Implementación de Reglas de Negocio**
  - Cada regla de negocio se implementa como un método estático en una clase dedicada, promoviendo la responsabilidad única y facilitando las pruebas.
  - Las reglas se aplican secuencialmente en `TransactionService`, recopilando todas las violaciones antes de decidir si se actualiza el estado, lo que soporta el requisito de reportar múltiples violaciones.
  - Se incluyó una interfaz `Rule` para permitir la carga dinámica de reglas en el futuro, aunque los métodos estáticos son suficientes para el alcance actual.

- **Manejo de Errores**
  - La aplicación asume que no habrá errores de parseo de entrada, según los requisitos, pero incluye bloques try-catch para robustez.
  - Las violaciones se tratan como resultados esperados, se incluyen en el JSON de salida y no interrumpen la ejecución del programa.

- **Estrategia de Pruebas**
  - Las pruebas unitarias cubren la lógica de cada regla, las pruebas de integración validan el comportamiento de los servicios, y las pruebas de extremo a extremo verifican el escenario de ejemplo de los requisitos.
  - Se utiliza JUnit por sus características modernas, como soporte para pruebas parametrizadas y sintaxis clara de aserciones.

## Uso de Frameworks y Bibliotecas
El proyecto utiliza dependencias externas mínimas para evitar complejidad innecesaria, como se recomienda:

- **Jackson **
  - Elegido para el parseo y serialización de JSON debido a su robustez, amplia adopción y soporte para estructuras JSON complejas.
  - Utilizado en `AuthorizerApp`, `AccountService` y `TransactionService` para leer JSON de entrada y construir JSON de salida.
  - La clase `JsonUtil` proporciona una instancia singleton de `ObjectMapper` para garantizar consistencia y reducir sobrecarga.

- **JUnit **
  - Seleccionado para pruebas unitarias y de integración por sus características modernas, incluyendo soporte para pruebas parametrizadas y organización clara de pruebas.
  - Las pruebas están limitadas al ámbito `test` en Maven, asegurando que no afecten el código de producción.

No se introdujeron frameworks adicionales ni código boilerplate, alineándose con el requisito de mantener la solución simple y enfocada.

## Prerrequisitos
- **Java**: JDK 8 o superior (probado con JDK 8).
- **Maven**: Versión 3.6 o superior para la gestión de dependencias y automatización de compilación.
- **Sistema Operativo**: Unix o Mac (Windows también es compatible, pero no se requiere explícitamente).

## Cómo Compilar y Ejecutar
### Usando Maven
1. **Clonar o Extraer el Proyecto**:
   Asegúrese de que el directorio del proyecto contenga el archivo `pom.xml` y el código fuente en `src/main/java`.

2. **Instalar Dependencias**:
   ```bash
   mvn clean install
   ```
   Esto descarga las dependencias requeridas (Jackson, JUnit) y compila el proyecto.

3. **Ejecutar la Aplicación**:
   Redirija un archivo de operaciones JSON (por ejemplo, `operations`) a la aplicación:
   ```bash
   java -jar target/authorizer909.jar < operations
   ```
   Alternativamente, ejecute directamente con Maven:
   ```bash
   mvn exec:java -Dexec.mainClass="com.nueve09.authorizer.AuthorizerApp" < operations
   ```

4. **Ejecutar Pruebas**:
   Ejecute las pruebas unitarias y de integración:
   ```bash
   mvn test
   ```

### Ejemplo de Uso
Dado un archivo `operations`:
```json
{"account": {"active-card": true, "available-limit": 100}}
{"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z"}}
{"transaction": {"merchant": "Mabbib's", "amount": 90, "time": "2019-02-13T11:00:00.000Z"}}
{"transaction": {"merchant": "McDonald's", "amount": 30, "time": "2019-02-13T12:00:00.000Z"}}
```

Ejecute:
```bash
cat operations | java -jar target/authorizer909.jar
```

Salida esperada:
```json
{"account": {"active-card": true, "available-limit": 100}, "violations": []}
{"account": {"active-card": true, "available-limit": 80}, "violations": []}
{"account": {"active-card": true, "available-limit": 80}, "violations": ["insufficient-limit"]}
{"account": {"active-card": true, "available-limit": 50}, "violations": []}
```

## Notas Adicionales
- **Extensibilidad**: El diseño modular permite agregar nuevas reglas creando nuevas clases de reglas e integrándolas en `TransactionService`. La interfaz `Rule` proporciona una base para la carga dinámica de reglas si es necesario en el futuro.
- **Robustez**: El código maneja casos límite, como múltiples violaciones en una sola transacción, y asegura la consistencia del estado al actualizarlo solo para operaciones válidas.
- **Pruebas**: El conjunto de pruebas (`AuthorizerAppTest.java`) cubre todas las reglas de negocio, escenarios de integración y el caso de ejemplo de los requisitos. Se pueden agregar casos límite adicionales (por ejemplo, transacciones con monto cero) según sea necesario.
- **Suposiciones**: El código asume que las transacciones llegan en orden cronológico, como se especifica. Las comparaciones de tiempo en las reglas utilizan duraciones absolutas para manejar casos límite, aunque no es estrictamente necesario dado el requisito.
- **Empaquetado**: Para enviar la solución, use:
  ```bash
  git archive --format=zip --output=authorizer.zip HEAD
  ```
  Esto crea un archivo zip limpio sin binarios compilados ni información personal.

