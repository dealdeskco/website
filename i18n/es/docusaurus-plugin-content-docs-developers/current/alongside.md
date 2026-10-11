---
title: Deal Desk junto a otros servidores MCP
sidebar_label: Junto a otros servidores MCP
description: Deal Desk responde por su empresa y deja todo lo demás a los otros servidores. Un ejemplo con Gnarl, un servidor de memoria privada.
---

# Deal Desk junto a otros servidores MCP

Un agente como Claude Code puede usar varios servidores MCP a la vez, y Deal Desk está pensado para
ser uno de ellos: responde por su empresa y deja todo lo demás a los otros servidores. Una
combinación habitual es un servidor de memoria privada que se ejecuta en su propia computadora. El
ejemplo siguiente usa [Gnarl](https://gnarl.dev), pero cualquier servidor de memoria encaja de la
misma forma.

```bash
# Deal Desk: la biblioteca, los datos y las propuestas de la empresa
claude mcp add --transport http dealdesk https://app.dealdesk.studio/mcp --header "Authorization: Bearer ddk_live_..."
# Gnarl: memoria privada, en esta computadora
gnarl mcp install --port 43300 --no-tls
```

- El agente ve los dos conjuntos de herramientas y usa el que necesita cada pregunta.
- Las memorias privadas se quedan en su computadora. La biblioteca, los datos y las propuestas de
  la empresa se quedan en Deal Desk.
- Los dos almacenes nunca se mezclan. El agente solo los combina en su conversación con usted, y
  las respuestas de Deal Desk llevan citas, así que siempre se puede saber de dónde salió cada
  afirmación.

Antes de darle a un agente así una clave que pueda escribir, lea
[Mantenga privado lo privado](./private.md).
