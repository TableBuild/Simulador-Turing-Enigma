
# 🧠 Simulador de Máquina de Turing aplicada a un cifrado tipo Enigma

## Introducción

El presente proyecto tiene como finalidad aplicar los conceptos fundamentales de la **teoría de la computación**, específicamente el modelo formal de la **Máquina de Turing**, integrándolo con un proceso de cifrado clásico inspirado en la máquina **Enigma**.

El desarrollo permite visualizar de manera interactiva cómo un modelo abstracto de computación puede utilizarse para describir procesos de **transformación computable de cadenas de entrada**, enfatizando el uso de estados, cinta, función de transición y evolución paso a paso.

El simulador está orientado a fines **académicos y didácticos**, facilitando la comprensión del funcionamiento interno de una **Máquina de Turing determinista** aplicada a la criptografía.

---

## Demo del proyecto

El proyecto puede ejecutarse directamente desde **GitHub Pages** en el siguiente enlace:

👉 https://tablebuild.github.io/Simulador-Turing-Enigma/

---

## Objetivo general

Diseñar e implementar un simulador interactivo de una **Máquina de Turing determinista**, orientada a la **transformación criptográfica de cadenas**, utilizando un mecanismo inspirado en el cifrado Enigma.

---

## Objetivos específicos

- Representar los elementos fundamentales de una Máquina de Turing (cinta, cabezal y estados).
- Implementar una función de transición determinista basada en estados.
- Integrar un mecanismo de cifrado mediante sustitución, rotación y reflexión.
- Introducir un cifrado **polialfabético dependiente de la posición del cabezal**.
- Permitir la ejecución paso a paso y automática del proceso.
- Visualizar el estado de la cinta y el resultado del cifrado en tiempo real.
- Facilitar la comprensión del proceso computacional mediante una bitácora de ejecución.
- Importar texto desde archivos PDF.
- Generar un archivo PDF con el resultado de la encriptación.

---

## Marco teórico

La **Máquina de Turing**, propuesta por Alan Turing en 1936, es un modelo matemático abstracto utilizado para formalizar el concepto de algoritmo y computabilidad. Se compone de una cinta teóricamente infinita, un cabezal lector-escritor y un conjunto finito de estados gobernados por una función de transición.

Por otra parte, la máquina **Enigma** fue un sistema de cifrado electromecánico basado en rotores y reflectores, utilizado para la transformación reversible de mensajes. Aunque su finalidad era criptográfica, su funcionamiento puede interpretarse como una **función computable determinista**.

El presente proyecto combina ambos conceptos para modelar un sistema donde la **computación es entendida como transformación de cadenas**, más que como un problema de decisión.

---

## Metodología

El desarrollo del proyecto se realizó siguiendo la siguiente secuencia metodológica:

- Análisis del modelo teórico de la Máquina de Turing.
- Definición del conjunto de estados y del alfabeto de entrada.
- Diseño de la función de transición aplicada al cifrado.
- Implementación de la cinta y del cabezal de lectura/escritura.
- Desarrollo de la ejecución paso a paso y automática.
- Incorporación de un desplazamiento dependiente de la posición.
- Visualización del proceso mediante una bitácora explicativa.
- Validación del funcionamiento mediante múltiples entradas, incluyendo archivos PDF.

---

## Desarrollo del proyecto

El simulador fue desarrollado utilizando **HTML, CSS y JavaScript**.  
La cinta se representa mediante un arreglo dinámico y el cabezal mediante un índice que avanza de manera unidireccional.

La función de transición del sistema:

- Depende del **estado actual** de la máquina.
- Aplica **desplazamientos alfabéticos** (simulación de rotores).
- Utiliza un **reflector** que garantiza la reversibilidad del cifrado.
- Incorpora un **desplazamiento adicional basado en la posición del cabezal**, evitando sustituciones fijas.
- Actualiza el estado de forma **cíclica y determinista**.

La interfaz gráfica permite observar:

- El contenido de la cinta.
- El estado actual de la máquina.
- El resultado parcial y final del cifrado.
- El detalle de cada transición ejecutada.

---

## Modelo de cifrado implementado

El cifrado implementado es **polialfabético, determinista y reversible**.  
A diferencia de una sustitución simple, el desplazamiento aplicado a cada símbolo se calcula como la suma entre el desplazamiento base del estado actual y la posición del cabezal sobre la cinta.

Gracias a esta mejora, una misma letra **no siempre se cifra de la misma forma**, reduciendo patrones repetitivos y aumentando la complejidad del cifrado, sin abandonar el marco teórico de la Máquina de Turing.

---

## Comparación con la Máquina de Turing real

### Coincidencias

- Conjunto finito de estados (q1, q2, q3)
- Estado inicial seleccionable por el usuario
- Cinta con símbolo blanco (□)
- Cabezal lector-escritor
- Función de transición determinista
- Ejecución paso a paso

### Diferencias deliberadas

- Cinta finita en lugar de infinita
- Movimiento unidireccional del cabezal
- Ausencia de estados de aceptación y rechazo
- Enfoque en transformación de cadenas y no en problemas de decisión

Estas diferencias corresponden a **decisiones de diseño didácticas**, acordes con el objetivo académico del simulador.

---

## Entrada y salida mediante PDF

El sistema permite:

- Importar un archivo **PDF**, extraer su contenido textual y utilizarlo como entrada.
- Procesar dicho texto utilizando la Máquina de Turing.
- Generar un nuevo **archivo PDF** que contiene el resultado de la encriptación.

Este flujo completa el modelo **entrada → transformación → salida**, proporcionando evidencia externa del proceso computable.

---

## Resultados

El sistema permite ingresar una cadena de texto y observar en tiempo real:

- La transformación criptográfica de cada símbolo.
- El cambio de estado de la máquina.
- El desplazamiento del cabezal sobre la cinta.
- El resultado cifrado final.
- Una bitácora detallada del proceso computacional.
- Un documento PDF con el resultado del cifrado.

Los resultados obtenidos son coherentes con el comportamiento esperado de una **Máquina de Turing determinista orientada a la transformación**.

---

## Conclusiones

El desarrollo del proyecto permitió evidenciar que un proceso criptográfico puede ser modelado como una **función computable** dentro del marco teórico de la Máquina de Turing.

Asimismo, demuestra que los modelos formales de la computación pueden utilizarse como **herramientas pedagógicas eficaces** para representar procesos abstractos de manera visual e interactiva.

Este simulador **no pretende ser una Máquina de Turing universal**, ni un sistema criptográficamente seguro, sino una representación didáctica orientada a la comprensión de la **computación como transformación de información**.

---

## Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript  
- PDF.js  
- jsPDF  

---

## Instrucciones de uso

1. Acceder al proyecto mediante el enlace de GitHub Pages o abrir el archivo `index.html`.
2. Ingresar manualmente el texto a cifrar o importar un archivo PDF.
3. Seleccionar el estado inicial de la máquina (q1, q2 o q3).
4. Presionar el botón **Iniciar**.
5. Ejecutar el simulador en modo **Paso** o **Auto / Pausa**.
6. Observar la cinta, la bitácora de ejecución y el resultado final.
7. Exportar el resultado en formato PDF si se desea.
8. Para reiniciar el sistema, presionar **Reset**.

---

## Autor

Proyecto académico universitario  
Ingeniería de Software  
Bogotá, Colombia — 2026
