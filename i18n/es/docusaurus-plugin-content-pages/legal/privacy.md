---
title: Privacidad
description: Qué recopila Deal Desk Studio, para qué, y lo que nunca hacemos con ello.
---

# Privacidad

_Esta traducción se ofrece para su comodidad; si difiere de la [versión en inglés](pathname:///legal/privacy), prevalece la versión en inglés._

_Última actualización: 9 de octubre de 2026._

Deal Desk Studio es una herramienta que las empresas usan para redactar y enviar propuestas. Esta
página describe, en términos sencillos, qué datos conservamos y por qué.

## Qué conservamos

**Su cuenta.** Nombre, dirección de correo electrónico y perfil de la empresa (nombre, logotipo,
sitio web, firmante autorizado y la redacción de sus términos). Usted nos los proporciona; puede
cambiarlos o eliminarlos en cualquier momento desde el perfil de la empresa.

**Su preferencia de idioma.** El idioma que elige para la aplicación se guarda en su cuenta y en
una cookie llamada `dd_lang`, para que las páginas aparezcan en ese idioma.

**Sus negocios.** Las propuestas que redacta, sus partidas y precios, y su estado. Son suyos. No
los leemos para crear funciones, entrenar modelos ni compilar datos de mercado.

**Registros de firma.** Cuando se firma un documento, registramos quién firmó, cuándo, desde qué
dirección IP y navegador, cómo se estableció su identidad y la firma en sí. Esto existe para que
una firma pueda demostrarse más adelante, que es justamente su propósito. Se guarda en el
almacenamiento propio de su cuenta.

**Nada más.** Sin identificadores publicitarios, sin seguimiento entre sitios y sin analítica de
terceros en la aplicación.

## Quién más lo ve

- **Su tenant de Lucenia.** Sus negocios residen en un espacio de nombres de base de datos que es
  suyo. Las credenciales de otros clientes no pueden acceder a él.
- **Amazon Bedrock**, cuando usa la redacción con IA. Las notas que usted proporciona se envían
  para generar el borrador, junto con un código postal cuando solicita una estimación de impuestos.
  El proveedor del modelo no las conserva para entrenamiento.
- **Amazon SES y Resend**, para entregar el correo electrónico. Ven la dirección del destinatario y
  el mensaje.
- **Stripe**, para la facturación. Nunca vemos ni guardamos el número de su tarjeta.
- **DocuSign**, solo si usted envía un sobre.

No vendemos datos ni los compartimos con nadie que no figure en esta lista.

## Los datos de su contraparte

Cuando usted envía una propuesta, el nombre y la dirección de correo electrónico del destinatario
se procesan en su nombre. Usted es responsable de tener un motivo comercial legítimo para
contactarlo. Usamos esa dirección para ese documento y para nada más: ni listas, ni boletines, ni
marketing posterior.

## Eliminación

Si elimina un negocio, desaparece de su cuenta. Si nos pide cerrar su cuenta, eliminamos su cuenta,
sus negocios y sus registros de firma. Escriba a **privacy@dealdesk.studio**.

Una excepción, dicha con claridad: un documento **sellado** se conserva mientras su enlace de
verificación esté activo, porque eliminarlo impediría que una contraparte verifique un contrato que
tiene en su poder. Avísenos si necesita que se elimine un documento sellado en particular y lo
eliminaremos.

## Seguridad

Las credenciales se almacenan con hash scrypt. Las sesiones son cookies firmadas con HMAC. El correo
electrónico se envía con TLS obligatorio. Los documentos sellados se firman con Ed25519 y pueden
verificarse con una clave pública publicada.

## Contacto

**privacy@dealdesk.studio**
