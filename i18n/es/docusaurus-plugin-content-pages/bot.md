---
title: DealDeskBot
description: El rastreador que lee el sitio web de una empresa cuando esa empresa le pide a Deal Desk que aprenda de él.
---

# DealDeskBot

Si vio `DealDeskBot/1.0 (+https://dealdesk.studio/bot)` en sus registros, un cliente de Deal Desk
le pidió que leyera el sitio web de **su propia** empresa. Deal Desk redacta sus propuestas y
respuestas a licitaciones a partir de lo que el sitio dice sobre sus servicios y su experiencia.

## Lo que hace

- Lee solo el sitio que escribió el cliente. Eso incluye el mismo dominio con o sin `www.`, pero
  nunca otros sitios a los que enlace.
- Respeta `robots.txt`. Sigue las reglas para `DealDeskBot` si las hay; si no, las de `*`.
- Lee como máximo 30 páginas. Empieza por su mapa del sitio y las páginas que describen a la
  empresa, y deja para el final los archivos del blog y las páginas legales.
- Hace una solicitud a la vez, con una pausa entre ellas. Solo se ejecuta cuando el cliente añade o
  actualiza el sitio.
- Lee solo páginas públicas. Nunca inicia sesión, ni rellena formularios, ni ejecuta scripts.

## Cómo detenerlo

Para que DealDeskBot no lea su sitio, añada esto a su `robots.txt`:

```
User-agent: DealDeskBot
Disallow: /
```

Preguntas: **info@dealdesk.studio**.
