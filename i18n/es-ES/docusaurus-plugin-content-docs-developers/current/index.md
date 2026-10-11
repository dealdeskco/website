---
slug: /
title: Deal Desk para desarrolladores
sidebar_label: Introducción e inicio rápido
description: Conecte sus agentes a Deal Desk con un servidor MCP remoto, una API REST y una herramienta de línea de comandos, y redacte propuestas y respuestas a RFP a partir de la biblioteca de su propia empresa.
---

# Deal Desk para desarrolladores

Su equipo ya redacta propuestas con Claude, Cursor y Copilot. Conéctelos a Deal Desk y redactarán a
partir de lo que su empresa realmente sabe, con citas, mientras su biblioteca se queda en Deal
Desk. Deal Desk se encarga de lo que tiene que estar bien: los precios, el documento y la firma.

Hay tres formas de entrar, todas con la misma clave de API:

| Forma de entrar | Qué es |
| --- | --- |
| [Servidor MCP remoto](./mcp.mdx) | `https://app.dealdesk.studio/mcp`, para Claude Code, Cursor, VS Code / GitHub Copilot, Claude Desktop y cualquier cliente MCP. |
| [API REST](./api.md) | `https://app.dealdesk.studio/api/v1`, descrita en un [documento OpenAPI](https://app.dealdesk.studio/api/v1/openapi.json). |
| [Herramienta de línea de comandos](./cli.md) | `dealdesk`, para su terminal y sus scripts. |

## Inicio rápido

1. **Cree una clave de API.** En Deal Desk, abra el menú de la cuenta, elija **Desarrolladores** y
   luego **Crear clave**. Necesita el rol de propietario o administrador de la cuenta y el plan
   Starter o uno superior. La clave se muestra una sola vez: cópiela en ese momento.
2. **Conecte su agente.** En Claude Code basta con un comando (los demás clientes están en
   [Servidor MCP](./mcp.mdx#connect-a-client)):

   ```bash
   claude mcp add --transport http dealdesk https://app.dealdesk.studio/mcp --header "Authorization: Bearer ddk_live_..."
   ```

3. **Pídale lo que necesite.** «Busque nuestras certificaciones ISO en la biblioteca de Deal
   Desk», «Redacte una propuesta a partir de estas notas de la llamada» o «Suba esta RFP a Deal
   Desk y redacte todas las respuestas».

¿Prefiere el terminal? `dealdesk login` inicia sesión en la
[herramienta de línea de comandos](./cli.md) a través de su navegador, sin pegar ninguna clave.

## Su primera llamada

La misma clave funciona por HTTPS. Esta llamada devuelve la cuenta, el plan y las funciones para
los que actúa la clave:

```bash
curl https://app.dealdesk.studio/api/v1/account -H "Authorization: Bearer $DEALDESK_API_KEY"
```

## Cuánto cuesta

El acceso para desarrolladores está incluido en **Starter, Pro y Team**. En el plan Gratis, la
sección Desarrolladores se ve, pero no se pueden crear claves, y las que ya existen responden `402`.

- **Redactar es gratis**, por la API exactamente igual que en la aplicación: redactar una
  propuesta, redactar respuestas y buscar en la biblioteca.
- **Los envíos se cobran** exactamente igual que en la aplicación: una propuesta enviada a firma
  cuenta como un negocio enviado de su plan, una sola vez, aunque se reenvíe varias veces.
- La biblioteca, los datos y las respuestas a RFP requieren el complemento **Respuesta a
  licitaciones**, igual que en la aplicación. Sin él, esas llamadas responden `402` con
  `"required_addon": "rfp"`.

Consulte [Precios](/pricing) para ver los planes, y [Deal Desk para su agente de IA](/agents) para
ver cómo se ve esto desde el lado del agente.
