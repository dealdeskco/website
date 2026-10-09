---
slug: why-we-built-this
title: El cuello de botella nunca fue decidir
authors: [dealdesk]
tags: [quoting]
---

Pregúntele a cualquier persona que cotiza trabajos para ganarse la vida en qué se le va el tiempo, y
no le dirá "en decidir el precio". El precio lo decidió de pie en el jardín del cliente, a los
veinte minutos de conversación. Conocía el alcance, sabía más o menos cuáles serían las objeciones y
sabía en cuánto iba a cerrar.

El tiempo se va en las dos horas siguientes. Abrir la propuesta del trimestre pasado, borrar el
nombre del cliente anterior, buscar las partidas, volver a escribir el alcance a partir de notas que
en su momento tenían sentido, recordar qué descuento se ofreció y dar formato a una tabla que no se
desarme al imprimirla.

{/* truncate */}

Para cuando todo eso está listo, ya es jueves. La propuesta sale el viernes. El cliente, que el
martes estaba listo para decir que sí, tuvo tres días para pensar si realmente lo necesita, y para
llamar a otra persona.

## Esa brecha es el producto

Todas las herramientas de cotización que revisamos parten de una plantilla en blanco y le piden que
la complete. Son las mismas dos horas con tipografías más bonitas. La versión útil parte de lo que
usted *ya tiene*: las notas, la transcripción, la nota de voz grabada de regreso en el auto.

Eso es lo que hace Deal Desk. Pegue el desorden, obtenga un borrador con precios, cambie lo que haya
que cambiar y tome la firma mientras la conversación sigue fresca.

## Lo que nos negamos a simplificar

Habría sido fácil convertir la firma en un nombre escrito en un recuadro y darlo por terminado. No
lo hicimos, porque una propuesta es un documento vinculante, y merece respaldarse con
evidencia como corresponde:

- Cada ceremonia de firma tiene un registro de auditoría al que solo se pueden agregar entradas:
  quién, cuándo, desde dónde y cómo se identificó.
- La firma captura la dinámica del trazo, no solo una imagen.
- El PDF final se sella con una firma Ed25519 que cualquier persona puede verificar con una clave
  publicada.

Y cuando la evidencia es más débil, el documento lo dice. Una firma tomada en su propio teléfono
demuestra la posesión de su sesión, y el certificado indica exactamente eso en lugar de dar a
entender algo más sólido. Preferimos ser la herramienta que le dice la verdad sobre lo que tiene
en sus manos.
