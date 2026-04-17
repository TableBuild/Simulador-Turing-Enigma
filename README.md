# Simulador de Máquina de Turing aplicada a un cifrado tipo Enigma

## Introducción

El presente proyecto tiene como finalidad aplicar los conceptos fundamentales de la **teoría de la computación**, específicamente el modelo formal de la **Máquina de Turing**, integrándolo con un proceso de **cifrado clásico inspirado en la máquina Enigma**.  
El desarrollo permite visualizar de manera interactiva cómo un modelo abstracto de computación puede utilizarse para describir procesos de transformación computable de cadenas de entrada, enfatizando el uso de estados, cinta, función de transición y evolución paso a paso.

El simulador está orientado a fines **académicos y didácticos**, facilitando la comprensión del funcionamiento interno de una Máquina de Turing determinista aplicada a la criptografía.

---

## Demo del proyecto

El proyecto puede ejecutarse directamente desde GitHub Pages en el siguiente enlace:

👉 **https://tablebuild.github.io/Simulador-Turing-Enigma/**

---

## Objetivo general

Diseñar e implementar un simulador interactivo de una **Máquina de Turing determinista** orientada a la **transformación criptográfica de cadenas**, utilizando un mecanismo inspirado en el cifrado Enigma.

---

## Objetivos específicos

- Representar los elementos fundamentales de una Máquina de Turing (cinta, cabezal y estados).
- Implementar una función de transición determinista basada en estados.
- Integrar un mecanismo de cifrado por sustitución y rotación.
- Permitir la ejecución paso a paso y automática del proceso.
- Visualizar el estado de la cinta y el resultado del cifrado en tiempo real.
- Facilitar la comprensión del proceso computacional mediante una bitácora de ejecución.

---

## Marco teórico

La **Máquina de Turing**, propuesta por Alan Turing en 1936, es un modelo matemático abstracto utilizado para formalizar el concepto de algoritmo y computabilidad. Se compone de una cinta teóricamente infinita, un cabezal lector-escritor y un conjunto finito de estados gobernados por una función de transición.

Por otra parte, la máquina **Enigma** fue un sistema de cifrado electromecánico basado en rotores y reflectores, utilizado para la transformación reversible de mensajes. Aunque su finalidad era criptográfica, su funcionamiento puede interpretarse como una función computable.

El presente proyecto combina ambos conceptos para modelar un sistema donde la **computación es entendida como transformación de cadenas**, más que como un problema de decisión.

---

## Metodología

El desarrollo del proyecto se realizó siguiendo la siguiente secuencia metodológica:

1. Análisis del modelo teórico de la Máquina de Turing.
2. Definición del conjunto de estados y del alfabeto de entrada.
3. Diseño de la función de transición aplicada al cifrado.
4. Implementación de la cinta y del cabezal de lectura/escritura.
5. Desarrollo de la ejecución paso a paso y automática.
6. Visualización del proceso mediante una bitácora explicativa.
7. Validación del funcionamiento mediante múltiples entradas.

---

## Desarrollo del proyecto

El simulador fue desarrollado utilizando tecnologías web (**HTML, CSS y JavaScript**).  
La cinta se representa mediante un arreglo dinámico y el cabezal mediante un índice que avanza de forma unidireccional.

La función de transición:
- Depende del estado actual
- Aplica desplazamientos alfabéticos (simulación de rotores)
- Utiliza un reflector para garantizar reversibilidad
- Actualiza el estado de forma cíclica

Además, se incluye una interfaz gráfica que permite observar:
- El contenido de la cinta
- El estado actual de la máquina
- El resultado parcial y final del cifrado
- El detalle de cada transición ejecutada

---

## Comparación con la Máquina de Turing real

### Coincidencias

- Conjunto finito de estados (q1, q2, q3)
- Estado inicial seleccionable
- Cinta con símbolo blanco (□)
- Cabezal lector-escritor
- Función de transición determinista
- Ejecución paso a paso

### Diferencias deliberadas

- Cinta finita en lugar de infinita
- Movimiento unidireccional del cabezal
- Ausencia de estados de aceptación y rechazo
- Enfoque en transformación de cadenas y no en decisión

Estas diferencias corresponden a **decisiones de diseño didácticas**, acordes con el objetivo académico del simulador.

---

## Resultados

El sistema permite ingresar una cadena de texto y observar en tiempo real:

- La transformación criptográfica de cada símbolo
- El cambio de estado de la máquina
- El desplazamiento del cabezal sobre la cinta
- El resultado cifrado final
- Una bitácora detallada del proceso computacional

Los resultados obtenidos son coherentes con el comportamiento esperado de una Máquina de Turing determinista orientada a la transformación.

---

## Conclusiones

El desarrollo del proyecto permitió evidenciar que un proceso criptográfico puede ser modelado como una **función computable** dentro del marco teórico de la Máquina de Turing.  
Asimismo, demuestra que los modelos formales de la computación pueden utilizarse como herramientas pedagógicas eficaces para representar procesos abstractos de manera visual e interactiva.

Este simulador no pretende ser una Máquina de Turing universal, sino una representación didáctica orientada a la comprensión de la computación como transformación de información.

---

## Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript  

---

## Instrucciones de uso


1. Acceder al proyecto mediante el enlace de **GitHub Pages** proporcionado en la sección *Demo del proyecto*  
   o abrir el archivo `index.html` directamente desde un navegador web.

2. Ingresar en el campo de texto la cadena que se desea cifrar.
   - El simulador admite letras mayúsculas y espacios.
   - Los caracteres no válidos son ignorados automáticamente.

3. Seleccionar el **estado inicial** de la máquina (q1, q2 o q3), el cual actúa como clave inicial del proceso.

4. Presionar el botón **Iniciar** para cargar la cadena en la cinta y preparar la máquina.

5. Seleccionar uno de los modos de ejecución:
   - **Paso**: ejecuta una transición por vez, permitiendo analizar el proceso detalladamente.
   - **Auto / Pausa**: ejecuta el cifrado de forma continua con animaciones.

6. Observar en pantalla:
   - El desplazamiento del cabezal sobre la cinta
   - El estado actual de la máquina
   - La transformación de cada símbolo
   - La bitácora de ejecución con el detalle de cada transición

7. Consultar el panel **Resultado final**, donde se muestra la cadena cifrada una vez finalizado el proceso.

8. Para reiniciar completamente el simulador, presionar el botón **Reset**.

---

## Autor

Proyecto académico universitario  
Ingeniería de Software  
Bogotá, Colombia — 2026