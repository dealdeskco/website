---
sidebar_position: 2
title: Firmas y sellado
description: Cómo se captura, se respalda con evidencia y se sella una firma, y qué demuestra y qué no.
---

# Firmas y sellado

Un trazo dibujado, por sí solo, demuestra muy poco. Deal Desk registra tres cosas distintas a su
alrededor, y conviene saber qué hace cada una.

## El registro de auditoría

Cada ceremonia de firma se registra como una lista de eventos a la que solo se pueden agregar
entradas: cuándo se abrió el documento, cuándo se aceptó el consentimiento, cuándo se adoptó la
firma, desde qué dirección IP y navegador. El registro también guarda la declaración escrita del
firmante y la **dinámica del trazo** de la firma: presión, inclinación y tiempo entre puntos.

Esto último importa: copiar la imagen de una firma es trivial, pero no lo es copiar la forma en que
realmente se movió una mano.

Retirar una firma se registra como un evento, nunca como una eliminación. Un registro de auditoría
que se puede borrar no es un registro de auditoría.

## Identidad

Qué tan sólidamente se vincula una firma con una persona depende de cómo se tomó, y el certificado
indica cuál método se usó en lugar de dar a entender el más sólido:

| Método | Lo que realmente demuestra |
| --- | --- |
| **En persona** | La posesión de *su* sesión. El firmante estaba frente a usted; no se afirma nada más. |
| **Enlace remoto** | La posesión de un enlace de un solo uso enviado a la dirección de correo electrónico del propio firmante. |
| **Enlace remoto + código** | Lo anterior, más un código de un solo uso enviado a esa misma dirección. |

## El sello

Cuando usted sella un documento, el servidor genera el PDF final y firma exactamente esos bytes con
una clave **Ed25519**. La firma, el hash SHA-256 y la clave pública se publican.

Para verificar una copia sin tener que confiar en nosotros en absoluto:

```bash
curl -sO https://app.dealdesk.studio/api/verify/<id>/document
curl -s https://app.dealdesk.studio/api/verify/pubkey > dealdesk.pub
curl -s https://app.dealdesk.studio/api/verify/<id> \
  | sed -n 's/.*"signature":"\([^"]*\)".*/\1/p' | base64 -d > doc.sig
openssl pkeyutl -verify -pubin -inkey dealdesk.pub -rawin -in <doc>.pdf -sigfile doc.sig
```

Si cambia un solo byte del PDF, la verificación falla.

## Lo que esto no es

El peso de un servicio de firma electrónica de terceros en una disputa proviene en gran medida de
ser un **tercero neutral** que presentará registros y declarará. Un registro de auditoría escrito por el proveedor cuyo cliente
cobra cuando se cierra el negocio es una evidencia más débil, por buena que sea la criptografía.

Por eso: la firma en persona es lo adecuado cuando *"el cliente está frente a mí, hay que cerrarlo
ahora"*. Para un contrato de alto valor o que probablemente se impugne, considere en su lugar un
servicio de firma electrónica de un tercero neutral. Deal Desk no incluye uno.
