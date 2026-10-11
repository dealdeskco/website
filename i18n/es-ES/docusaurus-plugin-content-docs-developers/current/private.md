---
title: Mantenga privado lo privado
sidebar_label: Seguridad y privacidad
description: Qué puede ver y cambiar un agente conectado a Deal Desk, y cómo mantener la información privada fuera de la biblioteca de la empresa.
---

# Mantenga privado lo privado

Un agente conectado a varios servidores MCP puede llevar información de uno a otro. Decida qué
puede escribir en Deal Desk.

- Con una clave de lectura y escritura, un agente podría copiar algo de otra herramienta, como una
  memoria privada, a la biblioteca de la empresa al enseñárselo a Deal Desk como un dato. A partir
  de ese momento, todas las personas de la cuenta lo verían.
- Para descartarlo, dele al agente una clave de solo lectura. Podrá seguir buscando en la
  biblioteca y leyendo propuestas y respuestas a RFP, pero no podrá cambiar nada.
- Clientes como Claude Code piden confirmación antes de cada llamada a una herramienta, salvo que
  usted haya permitido esa herramienta. Antes de aprobar una llamada a `teach_fact` o
  `add_library_document`, revise lo que va a enviar.
- Nunca ponga una clave en un repositorio compartido. Use una clave por agente o por ordenador,
  para poder revocar cualquiera de ellas sin detener las demás.

## Seguridad

- Su biblioteca se queda en Deal Desk. Los agentes reciben solo los pasajes que necesita cada
  pregunta, y cada llamada se limita a la cuenta de la propia clave, con los mismos controles que
  la aplicación.
- Las claves se guardan como hashes SHA-256, se comparan en tiempo constante, se muestran una sola
  vez y se pueden revocar al instante. Las solicitudes se registran con el id de la clave, nunca con
  la clave.
- Los códigos de inicio de sesión de la herramienta de línea de comandos duran diez minutos, sirven
  una sola vez y solo puede aprobarlos alguien que administre la cuenta y tenga la sesión iniciada.
  La página de aprobación muestra de dónde viene la solicitud: apruebe solo una solicitud que haya
  iniciado usted.
- La herramienta de línea de comandos solo envía una clave por HTTPS (por HTTP sin cifrar, solo a
  localhost) y la guarda con permisos 0600.
