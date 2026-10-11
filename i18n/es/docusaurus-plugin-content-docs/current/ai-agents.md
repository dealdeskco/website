---
sidebar_position: 4
title: Use Deal Desk con su agente de IA
description: Conecte Claude Code, Cursor, VS Code, Claude Desktop o su propio agente a Deal Desk, para que redacte con los datos reales de su empresa y con citas.
---

# Use Deal Desk con su agente de IA

Si ya redacta propuestas en una herramienta de IA como **Claude Code**, **Cursor**, **VS Code con
GitHub Copilot** o **Claude Desktop**, puede conectarla a Deal Desk. El agente sigue redactando;
Deal Desk le da los datos reales de su empresa, con citas, y se encarga de los precios, del
documento y de la firma.

![Claude Code conectado a Deal Desk redacta una propuesta para Lakeside Dental, y la propuesta sale con un total de $6,300 para el año 1](/img/agents/agent-session-es.gif)

El acceso para desarrolladores está incluido en **Starter, Pro y Team**. La biblioteca, los datos
que usted le enseñe y las herramientas de RFP también requieren el complemento **Respuesta a
licitaciones**, igual que en la aplicación.

## 1. Cree una clave en Desarrolladores

Necesita permisos de administración de la cuenta.

1. En Deal Desk, abra el menú de la cuenta y elija **Desarrolladores**.
2. Nombre la clave según dónde se usará, por ejemplo "Claude Code en mi portátil".
3. Elija **Lectura y escritura**, o **Solo lectura** para un agente que solo deba consultar.
4. Marque **Permitir enviar a firma** solo si el agente debe poder enviar propuestas. Cada envío se
   factura como un negocio enviado, igual que cuando envía desde la aplicación.
5. Presione **Crear clave** y copie la clave. Se muestra una sola vez.

![El panel Desarrolladores con una clave nueva y la configuración de Claude Code](/img/agents/developer-panel-es.png)

:::caution
Trate la clave como una contraseña. Nunca la ponga en un documento compartido, un correo o un
repositorio de código. Si queda expuesta, presione **Revocar** junto a ella y cree otra.
:::

## 2. Conecte su agente

En **Conecte un agente**, Desarrolladores muestra la configuración de cada cliente con su nueva
clave ya incluida. Presione **Copiar** y úsela así:

| Cliente | Qué hacer |
| --- | --- |
| **Claude Code** | Ejecute el comando en una terminal. |
| **Cursor** | Agregue las líneas a `~/.cursor/mcp.json`. |
| **VS Code / GitHub Copilot** | Agregue las líneas a `.vscode/mcp.json` y use Copilot Chat en modo agente. |
| **Claude Desktop** | Agregue las líneas a `claude_desktop_config.json` (Settings, Developer, Edit Config). |
| **Su propio agente** | Use la [API REST](/docs/developers/api) o el [servidor MCP](/docs/developers/mcp). |

Para Claude Code, el comando se ve así, con su clave al final:

```bash
claude mcp add --transport http dealdesk https://app.dealdesk.studio/mcp --header "Authorization: Bearer ddk_live_..."
```

La aplicación de ChatGPT y las pantallas de **Connectors** de claude.ai y Claude Desktop inician
sesión con OAuth, que Deal Desk todavía no ofrece. Estarán disponibles próximamente.

## 3. Pídaselo a su agente

Pídalo con palabras sencillas. Por ejemplo:

- "Redacte una propuesta para Lakeside Dental: 12 meses de mantenimiento del sitio web a $400 al
  mes más un rediseño de $1,500, a partir del 1 de noviembre."
- "¿Qué sabemos sobre nuestro historial de seguridad?"
- "Tenemos la certificación ISO 9001 desde 2021. Recuérdelo."
- "Cargue esta RFP en Deal Desk y redacte todas las respuestas."

El agente busca en su biblioteca con **search_library** y cita lo que usa. Cuando usted le dice un
dato sobre su empresa, lo guarda con **teach_fact**. Una propuesta que redacta con
**draft_proposal** se guarda en Deal Desk como borrador, donde usted la revisa, le pone su marca y
la envía. Redactar nunca cuenta como un envío.

:::tip
Si la biblioteca no respalda una afirmación, el agente tiene la indicación de preguntarle a usted
en lugar de adivinar. Cuanto más agregue a **Lo que sabemos**, menos tendrá que preguntar.
:::

## Claves y seguridad

- Deal Desk guarda solo un hash de cada clave. No puede volver a mostrarla: si pierde una,
  revóquela y cree otra.
- Una clave deja de funcionar de inmediato cuando se revoca, cuando la persona que la creó deja de
  ser administradora o cuando la cuenta deja los planes que incluyen Desarrolladores.
- Cree una clave por agente o por computadora, para que revocar una no detenga las demás.
- Su biblioteca se queda en Deal Desk. El agente recibe solo los pasajes que una pregunta necesita,
  como respuestas con citas.
- Puede usar Deal Desk junto con una herramienta de memoria privada como Gnarl. El agente usa ambas,
  y cada almacén se mantiene por separado.

## La herramienta de línea de comandos

La herramienta de línea de comandos `dealdesk` hace lo mismo desde una terminal. `dealdesk login`
inicia sesión a través de su navegador, sin pegar una clave, y `dealdesk mcp install claude-code`
conecta Claude Code por usted. Consulte [la herramienta de línea de comandos](/docs/developers/cli) para configurarla.

## Documentación para desarrolladores

La lista completa de herramientas, la API REST, el documento OpenAPI y los límites están en la
[documentación para desarrolladores](/docs/developers).

![La documentación para desarrolladores de Deal Desk](/img/agents/developers-docs-es.png)
