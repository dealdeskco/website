---
title: La herramienta de línea de comandos dealdesk
sidebar_label: Línea de comandos
description: Inicie sesión desde el navegador y luego busque en la biblioteca, enseñe datos, redacte propuestas, responda RFP y configure clientes MCP desde la terminal.
---

# La herramienta de línea de comandos dealdesk

Un solo archivo, sin dependencias, para Node.js 18 o posterior. Instálela directamente desde Deal Desk:

```bash
npm install -g https://app.dealdesk.studio/cli/dealdesk-cli.tgz   # agrega `dealdesk` a su PATH
dealdesk --help
```

También se publicará en npm como `@dealdesk/cli`; el comando anterior seguirá funcionando.

## Inicio de sesión

```bash
dealdesk login
```

El comando muestra un código corto y abre `https://app.dealdesk.studio/cli`. Inicie sesión con el
rol de propietario o administrador de la cuenta, compruebe que el código coincida y apruebe. La
herramienta recibe una clave nueva propia (llamada “CLI on *nombre de su computadora*”) y la guarda
en `~/.config/dealdesk/credentials.json`, que solo usted puede leer. Ninguna clave aparece nunca en
una URL. `dealdesk logout` revoca esa clave.

Para CI y scripts, defina `DEALDESK_API_KEY` o guarde una clave con
`dealdesk login --key ddk_live_...`. `DEALDESK_API_KEY` en el entorno tiene prioridad sobre una
clave guardada. `dealdesk logout` olvida una clave guardada sin revocarla, salvo que agregue
`--revoke`.

## Comandos

```bash
dealdesk whoami
dealdesk library search "past performance with NGA"
dealdesk library add capabilities.pdf
dealdesk teach "We are ISO 9001 certified since 2021."
dealdesk facts list
dealdesk draft --notes call-notes.txt          # o bien: pbpaste | dealdesk draft --notes -
dealdesk proposals list
dealdesk proposals pdf DD-2026-0042 -o proposal.pdf
dealdesk rfp upload RFP-2026-14.docx --wait
dealdesk rfp draft <id> --all --wait
dealdesk rfp requirements <id> --needs-input
dealdesk rfp export <id>                       # el .docx original, ya completado
dealdesk mcp                                   # la configuración de cada cliente MCP, con su clave
dealdesk mcp install claude-code
```

La lista completa:

| Comando | Qué hace |
| --- | --- |
| `dealdesk whoami` | La cuenta, el plan y la clave en uso. |
| `dealdesk library list` | Los documentos de la biblioteca. |
| `dealdesk library search "<pregunta>"` | Los pasajes que responden una pregunta, con citas. |
| `dealdesk library add <archivo>` | Agrega un archivo .docx, .pdf o de texto a la biblioteca. |
| `dealdesk teach "<dato>"` | Le enseña a Deal Desk un dato sobre la empresa. |
| `dealdesk facts list` | Los datos enseñados hasta ahora. |
| `dealdesk facts remove <id>` | Elimina un dato. |
| `dealdesk draft --notes <archivo>` | Redacta una propuesta a partir de notas (`-` lee la entrada estándar). |
| `dealdesk proposals list` | Las propuestas, de la más reciente a la más antigua. |
| `dealdesk proposals get <número>` | Una propuesta. |
| `dealdesk proposals pdf <número> -o <archivo>` | Descarga una propuesta en PDF. |
| `dealdesk rfp upload <archivo> --wait` | Carga una RFP y espera a que se lea. |
| `dealdesk rfp status <id>` | El avance de la lectura y los recuentos de respuestas. |
| `dealdesk rfp requirements <id> --needs-input` | Los requisitos, opcionalmente solo los que esperan un dato. |
| `dealdesk rfp draft <id> --all --wait` | Redacta todas las respuestas abiertas; o `dealdesk rfp draft <id> <rid>` para una sola. |
| `dealdesk rfp export <id>` | El .docx o .xlsx original, completado; `--format csv` para la matriz de cumplimiento. |
| `dealdesk mcp` | La configuración MCP de cada cliente, con su clave ya incluida. |
| `dealdesk mcp install claude-code` | Ejecuta `claude mcp add` por usted (`--scope user`, `project` o `local`). |
| `dealdesk login` / `dealdesk logout` | Inicia sesión desde el navegador; cierra la sesión y revoca la clave. |

Todos los comandos aceptan `--json` para usarlos en scripts. Los errores van a la salida de error
estándar; el código de salida es 1 si falla una solicitud y 2 si hay un error de uso.

## Otros servidores

`--staging` se conecta a `https://app-staging.dealdesk.studio`; `--base-url <url>` (o
`DEALDESK_BASE_URL`), a cualquier otro. Las claves se guardan por servidor, y una clave solo se
envía por HTTPS (HTTP sin cifrar solo se permite para `localhost`, para ejecutar la aplicación de
forma local).

## Verificar un despliegue

Después de cada despliegue, ejecute la comprobación rápida desde una copia del repositorio contra
ese entorno. Usa la clave que `dealdesk login` guardó para ese servidor (o `DEALDESK_API_KEY`), así
que no hay que pegar ninguna clave, y nunca la muestra:

```bash
dealdesk login --staging                               # once, approved in the browser
node scripts/smoke-developer.mjs --staging             # read-only checks
node scripts/smoke-developer.mjs --staging --write     # also teach and remove a probe fact, draft a probe proposal
DEALDESK_API_KEY=... node scripts/smoke-developer.mjs --base-url https://app.dealdesk.studio
```

Comprueba el documento OpenAPI, la cuenta, la lista y la búsqueda de la biblioteca, los datos, las
listas de propuestas y de RFP, `initialize`, `tools/list` y `tools/call` de MCP,
`dealdesk whoami --json`, que una clave no válida reciba `401` con el formato de error, y la
solicitud previa de CORS en `/mcp`. Muestra una línea por comprobación con su tiempo y termina con
el código 1 si alguna falla. Las comprobaciones que el plan de la cuenta no incluye se omiten, no se
cuentan como fallos. Nunca se envía nada.
