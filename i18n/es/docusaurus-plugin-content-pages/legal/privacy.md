---
title: Privacidad
description: Qué recopila Deal Desk Studio, para qué, y lo que nunca hacemos con ello.
---

# Privacidad

_Esta traducción se ofrece para su comodidad; si difiere de la [versión en inglés](pathname:///legal/privacy), prevalece la versión en inglés._

_Última actualización: 26 de octubre de 2026._

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
- **Google y Microsoft**, solo si un administrador conecta una unidad (vea más abajo).

No vendemos datos ni los compartimos con nadie que no figure en esta lista.

## Unidades conectadas (Google Drive, OneDrive, SharePoint)

Un administrador de la cuenta, en los planes que lo incluyen, puede conectar Google Drive o Microsoft 365 para que se
puedan agregar archivos desde ahí y para que los documentos firmados se archiven en la carpeta que
elija. Esta sección describe lo que esa conexión nos permite hacer y lo que conservamos.

**A qué podemos acceder.** Para Google Drive solicitamos únicamente el permiso `drive.file`:
podemos abrir los archivos y carpetas que alguien elige en el propio selector de archivos de Google,
y los archivos que Deal Desk guarda allí. No podemos ver, listar ni buscar el resto de la unidad.
Para Microsoft actuamos con los permisos de la persona que conectó la cuenta, nunca más de lo que
esa persona ya puede abrir, y solo escribimos en la carpeta elegida para los documentos firmados.
También recibimos la dirección de correo electrónico de la cuenta conectada, para mostrar qué cuenta
está conectada.

**Qué conservamos.** El token de actualización de la conexión, cifrado (AES-256-GCM); la dirección
de correo electrónico de la cuenta conectada; y la carpeta elegida para los documentos firmados. Un
archivo solo se lee cuando alguien lo elige. Después sigue el mismo camino que un archivo que usted
sube por su cuenta y pasa a formar parte de la biblioteca de la empresa o de la respuesta a la que
lo agregó.

**Cómo se usa.** Únicamente para prestar las funciones que usted utiliza: crear la biblioteca de la
empresa, redactar sus respuestas y archivar sus documentos firmados. El texto de un archivo elegido
puede enviarse a Amazon Bedrock para redactar a partir de él, como se describe más arriba. No usamos
los datos de su unidad para publicidad, no los vendemos, no los usamos para entrenar modelos de IA
de uso general y ninguna persona los lee, salvo que usted nos lo pida, por motivos de soporte o
seguridad, o cuando la ley lo exija.

**Desconexión.** Un administrador puede desconectar la unidad en cualquier momento en **Unidades
conectadas**. Entonces revocamos nuestro acceso ante Google (en el caso de Microsoft, quite Deal
Desk en Mis aplicaciones) y eliminamos el token guardado. También puede retirar nuestro acceso
desde su cuenta de Google, en Aplicaciones y servicios de terceros. Los archivos que ya se
agregaron a su biblioteca permanecen allí hasta que usted los elimine.

**Datos de las API de Google.** El uso que hace Deal Desk Studio de la información recibida de las
API de Google, y su transferencia a cualquier otra aplicación, se ajustará a la
[Política de datos de usuario de los servicios de las API de Google](https://developers.google.com/terms/api-services-user-data-policy),
incluidos los requisitos de uso limitado.

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
