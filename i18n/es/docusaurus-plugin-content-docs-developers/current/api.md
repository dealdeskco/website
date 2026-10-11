---
title: Referencia de la API REST
sidebar_label: Referencia de la API REST
description: Todos los endpoints de /api/v1 con su método, ruta, ámbito, parámetros, un ejemplo y la respuesta, además de los errores y los límites.
toc_max_heading_level: 2
---

# Referencia de la API REST

URL base: `https://app.dealdesk.studio/api/v1`. Recibe y devuelve JSON
(`Content-Type: application/json`), salvo en las descargas de archivos. La descripción para
máquinas está en [`/api/v1/openapi.json`](https://app.dealdesk.studio/api/v1/openapi.json)
(OpenAPI 3.1).

- Cada solicitud lleva una clave de API: `Authorization: Bearer ddk_live_...`. Consulte
  [Claves de API y ámbitos](./authentication.md).
- Los archivos se cargan dentro del JSON:
  `{"name": "rfp.pdf", "data": "<base64>", "content_type": "application/pdf"}`, o
  `{"name": "notes.txt", "text": "..."}`. Hasta unos 12 MB por archivo.
- CORS está abierto a cualquier origen, sin credenciales: la API no lee cookies, así que una página
  web solo puede llamarla con una clave que ya tenga.
- El trabajo largo (leer un documento, redactar todas las respuestas) se ejecuta en segundo plano.
  La llamada responde de inmediato con un id que puede consultar.

## Endpoints

| Método | Ruta | Ámbito | Qué hace |
| --- | --- | --- | --- |
| `GET` | [`/account`](#get-account) | `read` | La cuenta, el plan y las funciones para los que actúa esta clave |
| `GET` | [`/facts`](#get-facts) | `read` | Los datos que la empresa le dio a Deal Desk |
| `POST` | [`/facts`](#post-facts) | `write` | Enseñe datos con palabras sencillas, o pregunte qué sabe |
| `DELETE` | [`/facts/{id}`](#delete-factsid) | `write` | Elimina un dato |
| `GET` | [`/facts/gaps`](#get-factsgaps) | `read` | Los datos que todavía necesitan las respuestas a RFP abiertas |
| `POST` | [`/library/search`](#post-librarysearch) | `read` | Busca en la biblioteca; los pasajes llegan numerados para citarlos |
| `GET` | [`/library/sources`](#get-librarysources) | `read` | Los documentos de la biblioteca |
| `POST` | [`/library/sources`](#post-librarysources) | `write` | Agrega un documento o un texto a la biblioteca |
| `DELETE` | [`/library/sources/{id}`](#delete-librarysourcesid) | `write` | Quita un documento de la biblioteca |
| `GET` | [`/library/sources/{id}`](#get-librarysourcesid) | `read` | Un documento de la biblioteca y su estado de indexación |
| `GET` | [`/proposals`](#get-proposals) | `read` | Propuestas, pedidos y contratos, del más reciente al más antiguo |
| `POST` | [`/proposals`](#post-proposals) | `write` | Redacta una propuesta a partir de notas y la guarda como borrador |
| `GET` | [`/proposals/{number}`](#get-proposalsnumber) | `read` | Una propuesta: sus campos, partidas y totales |
| `PATCH` | [`/proposals/{number}`](#patch-proposalsnumber) | `write` | Cambia los campos, las partidas o los descuentos de una propuesta |
| `GET` | [`/proposals/{number}/pdf`](#get-proposalsnumberpdf) | `read` | La propuesta en PDF |
| `POST` | [`/proposals/{number}/send`](#post-proposalsnumbersend) | `send` | La envía a firma electrónica; se factura como un negocio enviado |
| `GET` | [`/rfps`](#get-rfps) | `read` | Los documentos que se están respondiendo |
| `POST` | [`/rfps`](#post-rfps) | `write` | Carga un documento para responderlo |
| `DELETE` | [`/rfps/{id}`](#delete-rfpsid) | `write` | Elimina una respuesta |
| `GET` | [`/rfps/{id}`](#get-rfpsid) | `read` | El estado y el avance de una respuesta |
| `POST` | [`/rfps/{id}/draft-all`](#post-rfpsiddraft-all) | `write` | Redacta en segundo plano todos los requisitos abiertos |
| `GET` | [`/rfps/{id}/export`](#get-rfpsidexport) | `read` | El original completado, o la matriz de cumplimiento en CSV |
| `GET` | [`/rfps/{id}/requirements`](#get-rfpsidrequirements) | `read` | Los requisitos con sus respuestas redactadas y sus citas |
| `PATCH` | [`/rfps/{id}/requirements/{rid}`](#patch-rfpsidrequirementsrid) | `write` | Edita una respuesta o la marca como respondida |
| `POST` | [`/rfps/{id}/requirements/{rid}/draft`](#post-rfpsidrequirementsriddraft) | `write` | Redacta o vuelve a redactar una respuesta a partir de la biblioteca |
| `POST` | [`/rfps/{id}/requirements/{rid}/fact`](#post-rfpsidrequirementsridfact) | `write` | Aporta el dato que le falta a un requisito |

## Errores

Todos los errores tienen la misma forma:

```json
{ "error": { "code": "payment_required", "message": "The knowledge library is part of the RFP responder add-on.", "billing_required": true, "required_addon": "rfp" } }
```

El objeto `error` lleva `code` y `message`, y cuando corresponde `billing_required`,
`required_addon`, `feature`, `required_scope`, `retry_after` y `needs_force`.

| Estado | code | Significado |
| --- | --- | --- |
| 400 | `invalid_request` | Falta algo en la solicitud o algo es incorrecto; el mensaje indica qué. |
| 401 | `unauthenticated` | No hay clave, la clave no es válida o fue revocada, o quien la creó ya no administra la cuenta. |
| 402 | `payment_required` | El plan no lo incluye: el acceso para desarrolladores empieza en Starter; la biblioteca y las RFP requieren Respuesta a licitaciones; o se superó el límite de envíos del plan Gratis. |
| 403 | `insufficient_scope` | A la clave le falta el ámbito necesario (`required_scope` indica cuál). Otros rechazos responden `forbidden`. |
| 404 | `not_found` | No existe en esta cuenta. Los ids de otra cuenta no se distinguen de los que no existen. |
| 405 | `method_not_allowed` | Ese método no está disponible en esa ruta. |
| 409 | `conflict` | Cambió desde que lo leyó, ya está en curso o se alcanzó un límite. |
| 410 | `gone` | Existió y se eliminó. |
| 413 / 415 / 422 | `payload_too_large` / `unsupported_media_type` / `unprocessable` | El archivo es demasiado grande, es de un tipo que Deal Desk no puede leer o no tiene texto legible (por ejemplo, un PDF escaneado). |
| 429 | `rate_limited` | Demasiadas solicitudes; espere los segundos que indica `Retry-After`. |
| 5xx | `internal_error` / `upstream_error` / `unavailable` | Es un problema de nuestro lado. Vuelva a intentarlo con espera exponencial. |

## Límites

| Qué | Límite |
| --- | --- |
| Solicitudes por clave | 120 por minuto (incluidas las llamadas MCP) |
| PDF generados por clave | 10 por minuto |
| Cuerpo de la solicitud | 16 MB (unos 12 MB de archivo, codificado en base64) |
| Claves por cuenta | 20 |
| Biblioteca | 200 documentos, de unas 100 páginas cada uno |
| Redacción, lectura y enseñanza | Los mismos límites por cuenta que en la aplicación |

## Cuenta {/* #account */}

### `GET /account`

Ámbito `read`. La cuenta para la que actúa esta clave, con su plan y sus funciones, y la propia
clave (nunca su secreto). `features` incluye `documents` cuando la biblioteca y las respuestas a
RFP están disponibles.

```bash
curl https://app.dealdesk.studio/api/v1/account -H "Authorization: Bearer $DEALDESK_API_KEY"
```

```js
// 200
{ "account": { "id": "7f3a9c2e1b4d", "name": "Acme Federal", "plan": "pro", "features": ["documents", "developer"], "can_send": true },
  "key": { "id": "key_4be0c2a19f7d3e61", "name": "Claude Code", "prefix": "ddk_live_Q7xm", "last4": "pA2k", "scopes": ["read", "write"], ... },
  "acting_as": "owner@acme.example" }
```

### `POST /auth/revoke`

Cualquier ámbito. Revoca la clave que hace la solicitud. Es lo que usa `dealdesk logout`.

## Biblioteca

La biblioteca, **Lo que sabemos** en la aplicación, requiere el complemento Respuesta a
licitaciones.

### `POST /library/search`

Ámbito `read`. Cuerpo: `query` (obligatorio). Los pasajes que mejor responden una pregunta
(búsqueda por palabras clave y semántica, combinadas), numerados para citarlos.

```bash
curl https://app.dealdesk.studio/api/v1/library/search -H "Authorization: Bearer $DEALDESK_API_KEY" \
  -H "Content-Type: application/json" -d '{"query": "ISO 27001 certification"}'
```

```js
// 200
{ "query": "ISO 27001 certification",
  "results": [ { "citation": 1, "source_id": "9b2...", "source_name": "Security overview 2026.docx", "heading": "Certifications",
                 "text": "Acme Federal has been ISO/IEC 27001 certified since 2023 ..." } ] }
```

### `GET /library/sources`

Ámbito `read`. Los documentos de la biblioteca, del más reciente al más antiguo, con su `status`
(`indexing`, `ready`, `failed`) y su número de pasajes. Devuelve `{"sources": [...]}`.

```bash
curl https://app.dealdesk.studio/api/v1/library/sources -H "Authorization: Bearer $DEALDESK_API_KEY"
```

### `POST /library/sources`

Ámbito `write`. Cuerpo: `name` (obligatorio), y `text`, o `data` (base64) con `content_type`.
Agrega a la biblioteca un documento .docx, .pdf o de texto.

```bash
curl https://app.dealdesk.studio/api/v1/library/sources -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d "{\"name\": \"capabilities.pdf\", \"content_type\": \"application/pdf\", \"data\": \"$(base64 < capabilities.pdf | tr -d '\n')\"}"
```

Responde `200` con `{"source": {"id": ..., "status": "indexing"}}`; consulte el siguiente endpoint
hasta que el estado sea `ready`.

### `GET /library/sources/{id}`

Ámbito `read`. Un documento de la biblioteca y su estado de indexación, como `{"source": {...}}`.

### `DELETE /library/sources/{id}`

Ámbito `write`. Quita un documento de la biblioteca.

## Datos

Los datos son lo que las personas le dijeron a Deal Desk sobre la empresa. Requieren el complemento
Respuesta a licitaciones.

### `POST /facts`

Ámbito `write`. Cuerpo: `message` (obligatorio). Enséñele a Deal Desk con palabras sencillas. Solo
se guarda lo que afirma el mensaje, con un dato por tema (un dato posterior sobre el mismo tema
reemplaza al anterior). Una pregunta recibe una respuesta de la biblioteca, con sus fuentes.

```bash
curl https://app.dealdesk.studio/api/v1/facts -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d '{"message": "We have 18 employees, 12 of them with TS/SCI clearances."}'
```

```js
// 200
{ "reply": "I will remember that Acme Federal has 18 employees, 12 with TS/SCI clearances.",
  "saved": [ { "topic": "Employee count", "text": "Acme Federal has 18 employees." },
             { "topic": "Cleared staff", "text": "12 Acme Federal employees hold TS/SCI clearances." } ],
  "not_saved": 0, "sources": [] }
```

### `GET /facts`

Ámbito `read`. Los datos enseñados hasta ahora, como
`{"facts": [{"id", "topic", "text", "created_at"}]}`.

### `DELETE /facts/{id}`

Ámbito `write`. Elimina un dato erróneo o desactualizado. Para corregirlo, también puede enseñar el
dato correcto sobre el mismo tema.

### `GET /facts/gaps`

Ámbito `read`. Los datos que todavía necesitan sus respuestas a RFP abiertas, como
`{"gaps": [...]}`: buenas preguntas para hacerle a la persona, y luego guardar las respuestas con
`POST /facts`.

## Propuestas

### `POST /proposals`

Ámbito `write`. Cuerpo: `notes` (obligatorio), `lang` (opcional). Redacta una propuesta a partir de
notas y la guarda como borrador. `lang` puede ser `en` (predeterminado), `es-419` o `es-ES`. Gratis.

```bash
curl https://app.dealdesk.studio/api/v1/proposals -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d '{"notes": "Call with Maya Torres at Northwind. Annual platform license $24,000, onboarding $3,500 one-time, 10% off year one. Start Jan 5."}'
```

```js
// 200
{ "proposal": { "number": "DD-2026-0042", "status": "draft", "version": 1,
    "fields": { "docType": "proposal", "custName": "Northwind", "custSigner": "Maya Torres", "startDate": "2027-01-05", "currency": "USD", ... },
    "lineItems": [ { "desc": "Annual platform license", "y1": 24000, "y2": 24000 }, { "desc": "Onboarding", "y1": 3500, "y2": 0 } ],
    "discounts": [ { "label": "Year-one discount", "kind": "pct", "value": 10, "y1": true, "y2": false } ],
    "totals": { "y1": { "subtotal": 27500, "net": 24750, "tax": 0, "total": 24750, ... }, "y2": { ... } }, ... } }
```

### `GET /proposals`

Ámbito `read`. Propuestas, pedidos y contratos, del más reciente al más antiguo, como
`{"proposals": [...]}`: cada uno con `number`, `doc_type`, `customer`, `status` (draft, sent,
signed, lost), `y1_total`, `y2_total`, `version` y sus fechas.

```bash
curl https://app.dealdesk.studio/api/v1/proposals -H "Authorization: Bearer $DEALDESK_API_KEY"
```

### `GET /proposals/{number}`

Ámbito `read`. Una propuesta por su número, por ejemplo `DD-2026-0042`: todos los campos, las
partidas, los descuentos y los totales por año, con la misma forma que el borrador de arriba, más
`signing`: una entrada por parte (`cust` para el cliente, `luc` para su firmante) con `method`,
`signer_name`, `email`, `completed_at` y `authenticated`.

### `PATCH /proposals/{number}`

Ámbito `write`. Asigne valores a los `fields` por nombre, o reemplace `lineItems` / `discounts`
completos. Envíe la `version` que leyó para que el cambio se rechace (`409`) si alguien modificó la
propuesta desde entonces. Campos: `docType` (proposal, order, agreement), `docLang`, `custName`,
`custSigner`, `custTitle`, `custEmail`, `deployDesc`, `edition`, `region`, `scale`, `currency`,
`billing` (Annual, Quarterly, Monthly, One-time), `term`, `startDate`, `validUntil` (YYYY-MM-DD),
`sla`, `support`, `lucSigner`, `lucTitle`, `lucEmail`, `governingLaw`, `sow`, `taxLabel`,
`taxRate`, `termsAssumptions`, `termsConditions`. Nunca cambia el estado: el envío es aparte.

```bash
curl -X PATCH https://app.dealdesk.studio/api/v1/proposals/DD-2026-0042 -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d '{"version": 1, "fields": {"term": "12 months", "validUntil": "2026-12-31"}}'
```

### `GET /proposals/{number}/pdf`

Ámbito `read`. El PDF, generado exactamente igual que con Exportar PDF en la aplicación.

```bash
curl -o DD-2026-0042.pdf https://app.dealdesk.studio/api/v1/proposals/DD-2026-0042/pdf -H "Authorization: Bearer $DEALDESK_API_KEY"
```

### `POST /proposals/{number}/send`

Ámbito `send`. Envía al cliente un enlace para revisar y firmar la propuesta con la firma
electrónica propia de Deal Desk, junto con un código de un solo uso cuando el correo está
disponible. **Se factura como un negocio enviado**, por el mismo camino que Enviar en la
aplicación: si el plan ya agotó sus envíos, la llamada se rechaza (`402`) antes de enviar ningún
correo. Cuerpo: `customer_email` (obligatorio), `customer_name` y `customer_title` (opcionales).
Una propuesta ya firmada devuelve `409`. Envíe solo cuando la persona lo haya indicado.

La respuesta incluye el `link` de firma y `mail_status`, para que usted pueda compartir el enlace si
el correo no se pudo entregar. `mail_status` es `sent`, `failed` o `not_configured`:

```js
// 200
{ "status": "sent",
  "signing": { "emailed": true, "mail_status": "sent", "one_time_code": true, "expires_in_hours": 72,
               "link": "https://app.dealdesk.studio/sign/..." } }
```

## Respuestas a RFP

Las respuestas a RFP requieren el complemento Respuesta a licitaciones.

### `POST /rfps`

Ámbito `write`. Cargue el documento que va a responder: `.pdf`, `.docx` (se puede completar con las
respuestas), una matriz de capacidades `.xlsx` o texto. Cuerpo: `name` (obligatorio), `text` o
`data` con `content_type`, y el campo opcional `deal_number`, que basa las respuestas en esa
propuesta. La lectura se ejecuta en segundo plano.

```bash
curl https://app.dealdesk.studio/api/v1/rfps -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d "{\"name\": \"RFP-2026-14.docx\", \"data\": \"$(base64 < RFP-2026-14.docx | tr -d '\n')\"}"
```

Devuelve `{"rfp": {"id": ..., "status": "reading", ...}}`. Consulte `GET /rfps/{id}` hasta que esté
listo.

### `GET /rfps`

Ámbito `read`. Los documentos que se están respondiendo, del más reciente al más antiguo, como
`{"rfps": [...]}`, cada uno con su estado y su número de requisitos.

### `GET /rfps/{id}`

Ámbito `read`. El estado (`reading`, `ready`, `failed`), los recuentos por estado de respuesta,
cuántos requisitos todavía necesitan un dato y el avance de la redacción.

### `GET /rfps/{id}/requirements`

Ámbito `read`. En el orden del documento. Parámetros de consulta: `status`, `needs_input=true`,
`offset`, `limit` (predeterminado: 50; máximo: 200).

```js
// 200
{ "total": 214, "offset": 0, "limit": 50, "rfp": { ... },
  "requirements": [ { "id": "r12", "ref": "L.3.2", "section": "Key personnel", "text": "Describe the qualifications of the program manager.",
    "status": "drafted", "response": "Our program manager holds a PMP and led the NGA Maven pilot [1].",
    "answer": "Our program manager holds a PMP and led the NGA Maven pilot.", "needs_input": null,
    "sources": [ { "citation": 1, "source_name": "Resumes 2026.docx", "heading": "Program manager" } ], "unverified_claims": [] } ] }
```

### `POST /rfps/{id}/requirements/{rid}/draft`

Ámbito `write`. Redacta o vuelve a redactar una respuesta. Cuando la biblioteca no tiene con qué
sustentarla, `needs_input` indica el dato que falta. Devuelve `{"requirement": {...}}`.

### `POST /rfps/{id}/draft-all`

Ámbito `write`. Redacta en segundo plano todos los requisitos abiertos; nunca sobrescribe las
respuestas que editó una persona. `{"cancel": true}` lo detiene.

### `PATCH /rfps/{id}/requirements/{rid}`

Ámbito `write`. `response` y/o `status` (`open`, `drafted`, `answered`, `na`). Una respuesta marcada
como `answered` se incorpora a la biblioteca como redacción aprobada.

### `POST /rfps/{id}/requirements/{rid}/fact`

Ámbito `write`. `{"answer": "..."}`: el dato que le faltaba al requisito. Se guarda para todos los
documentos futuros y esta respuesta se vuelve a redactar.

### `GET /rfps/{id}/export`

Ámbito `read`. Parámetro de consulta: `format=filled` (predeterminado), el .docx o .xlsx original
con sus respuestas ya escritas, o `format=csv`, la matriz de cumplimiento.

```bash
curl -OJ "https://app.dealdesk.studio/api/v1/rfps/$RFP_ID/export?format=filled" -H "Authorization: Bearer $DEALDESK_API_KEY"
```

### `DELETE /rfps/{id}`

Ámbito `write`. Elimina una respuesta.
