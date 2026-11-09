---
title: Privacidad
description: Qué recopila Deal Desk Studio, para qué, quién más lo ve, cuánto tiempo lo conservamos y cuáles son sus derechos.
---

# Privacidad

_Esta traducción se ofrece para su comodidad; si difiere de la [versión en inglés](pathname:///legal/privacy), prevalece la versión en inglés._

_Última actualización: 8 de noviembre de 2026._

Deal Desk Studio es una herramienta que las empresas usan para redactar y enviar propuestas y para
responder RFP. Esta página describe, en términos sencillos, qué datos conservamos y por qué. Cubre
la aplicación en app.dealdesk.studio y este sitio web.

Si su empresa usa Deal Desk, nuestro [Anexo de tratamiento de datos](/legal/dpa) también se aplica a
los datos personales contenidos en lo que usted incorpora al Servicio.

## Qué conservamos

**Su cuenta.** Nombre, dirección de correo electrónico y perfil de la empresa (nombre, logotipo,
sitio web, firmante autorizado y la redacción de sus términos). Usted nos los proporciona; puede
cambiarlos o eliminarlos en cualquier momento desde el perfil de la empresa. Cuando crea una cuenta,
también registramos cuándo aceptó los Términos del servicio y qué versión aceptó.

**Su preferencia de idioma.** El idioma que elige para la aplicación se guarda en su cuenta y en
una cookie llamada `dd_lang`, para que las páginas aparezcan en ese idioma.

**Sus negocios.** Las propuestas que redacta, sus partidas y precios, y su estado. Son suyos. No
los leemos para crear funciones, entrenar modelos ni compilar datos de mercado.

**La biblioteca de su empresa y sus respuestas a RFP.** Los documentos que usted sube o añade desde
una unidad conectada, las RFP y los formularios que responde, las respuestas que escribe o aprueba y
los datos que le cuenta a Deal Desk sobre su empresa. Se usan para redactar sus documentos, y para
nada más.

**Registros de firma.** Cuando se firma un documento, registramos quién firmó, cuándo, desde qué
dirección IP y navegador, cómo se estableció su identidad y la firma en sí. Esto existe para que
una firma pueda demostrarse más adelante, que es justamente su propósito. Se guarda en el
almacenamiento propio de su cuenta.

**Solicitudes de soporte.** Lo que envía desde Ayuda y comentarios: su nombre, su dirección de
correo electrónico, el mensaje, los archivos adjuntos, y la página en la que estaba y la versión de
la aplicación.

**Nada más.** Sin identificadores publicitarios, sin seguimiento entre sitios y sin analítica de
terceros en la aplicación.

## Qué se envía al proveedor del modelo de IA

Deal Desk redacta con modelos de IA (Amazon Nova y Anthropic Claude) que se ejecutan en **Amazon
Bedrock**, en la región Este de EE. UU. (Ohio) de AWS. Para redactar, enviamos a Bedrock aquello a
partir de lo cual se escribe el borrador: las notas, transcripciones y documentos que usted le da,
la RFP o el formulario que está respondiendo, los pasajes pertinentes de la biblioteca de su
empresa, el perfil de su empresa, y las respuestas y los datos que usted ha proporcionado. Cuando
solicita una estimación de impuestos, enviamos el código postal y una descripción de lo que se
vende.

Amazon Bedrock no usa las instrucciones que recibe ni el texto que devuelve para entrenar modelos,
y no los comparte con las empresas que crean los modelos. Deal Desk no entrena modelos de IA con el
contenido de sus clientes.

## Quién más lo ve

Usamos un número reducido de proveedores de servicios (subencargados) para operar el Servicio. Cada
uno ve solo lo que necesita para su tarea. La lista completa, con lo que ve cada uno y dónde, está
en la página de [Subencargados](/legal/subprocessors). En resumen:

- **Amazon Web Services**: alojamiento en los Estados Unidos (us-east-2), los modelos de IA
  (Bedrock) y el correo electrónico (SES).
- **Lucenia**: el motor de base de datos y de búsqueda donde se guardan los datos de su cuenta, que
  se ejecuta en AWS en la misma región. Los datos de Deal Desk se guardan allí en su propio tenant,
  y cada registro está vinculado a la cuenta a la que pertenece, de modo que una cuenta no puede
  acceder a los de otra.
- **Stripe**, para la facturación. Nunca vemos ni guardamos el número de su tarjeta.
- **Resend**, para entregar el correo electrónico cuando SES no puede. Ve la dirección del
  destinatario y el mensaje.
- **Cloudflare**, que transporta el tráfico hacia la aplicación y este sitio web.
- **Google**: el conector de Google Drive, si un administrador lo conecta; Google Fonts, que cargan
  las páginas de la aplicación (Google ve su dirección IP y su navegador); y, si usted dicta notas en
  Google Chrome, el reconocimiento de voz de Chrome, que envía el audio a Google para convertirlo en
  texto.
- **Microsoft**, si un administrador conecta SharePoint u OneDrive.
- **Auth0**, si su cuenta inicia sesión a través de ese servicio.
- **DocuSign**, si envía un documento para firma a través de DocuSign.
- **GitHub**, que guarda las solicitudes de soporte en un repositorio privado: su nombre, su
  dirección de correo electrónico, el mensaje y los archivos adjuntos.

No vendemos datos ni los compartimos con nadie que no figure en esa página, salvo cuando la ley lo
exige.

## Unidades conectadas (Google Drive, OneDrive, SharePoint)

Un administrador de la cuenta, en los planes que lo incluyen, puede conectar Google Drive o
Microsoft 365 para que se puedan añadir archivos y carpetas desde ahí y para que los documentos
firmados se archiven en la carpeta que elija. Esta sección describe lo que esa conexión nos permite
hacer y lo que conservamos.

**Elegir archivos de Google Drive.** De forma predeterminada solicitamos únicamente el permiso
`drive.file`: podemos abrir los archivos que alguien elige en el propio selector de archivos de
Google, y los archivos que Deal Desk guarda allí. Con ese permiso, por sí solo, no podemos ver,
listar ni buscar el resto de la unidad.

**Añadir una carpeta de Google Drive requiere más.** `drive.file` llega a una carpeta elegida,
pero no a los archivos que contiene. Por eso, la primera vez que alguien añade una **carpeta**,
Google le pide que conceda acceso de solo lectura a su Drive (`drive.readonly`). Ese permiso es más
amplio: permitiría a Deal Desk leer cualquier archivo que la persona conectada pueda abrir. Lo
usamos únicamente para leer las carpetas que se añaden, y nada más de la unidad. Si prefiere no
concederlo, elija archivos en lugar de carpetas.

**Microsoft 365.** Actuamos con los permisos de la persona que conectó la cuenta, nunca más de lo
que esa persona ya puede abrir (`Files.ReadWrite.All`, y `Sites.Read.All` para SharePoint en
cuentas de trabajo). Solo leemos lo que alguien añade, y solo escribimos en la carpeta elegida
para los documentos firmados.

En ambos casos también recibimos la dirección de correo electrónico de la cuenta conectada, para
mostrar qué cuenta está conectada.

**Qué conservamos.** El token de actualización de la conexión, cifrado (AES-256-GCM); la dirección
de correo electrónico de la cuenta conectada; y la carpeta elegida para los documentos firmados. Un
archivo solo se lee cuando alguien lo añade. Después sigue el mismo camino que un archivo que usted
sube por su cuenta y pasa a formar parte de la biblioteca de la empresa o de la respuesta a la que
lo añadió.

**Cómo se usa.** Únicamente para prestar las funciones que usted utiliza: crear la biblioteca de la
empresa, redactar sus respuestas y archivar sus documentos firmados. El texto de un archivo
añadido puede enviarse a Amazon Bedrock para redactar a partir de él, como se describe más arriba.
No usamos los datos de su unidad para publicidad, no los vendemos, no los usamos para entrenar
modelos de IA y ninguna persona los lee, salvo que usted nos lo pida, por motivos de soporte o
seguridad, o cuando la ley lo exija.

**Desconexión.** Un administrador puede desconectar la unidad en cualquier momento en **Unidades
conectadas**. Entonces revocamos nuestro acceso ante Google (en el caso de Microsoft, quite Deal
Desk en Mis aplicaciones) y eliminamos el token guardado. También puede retirar nuestro acceso
desde su cuenta de Google, en Aplicaciones y servicios de terceros. Los archivos que ya se
añadieron a su biblioteca permanecen allí hasta que usted los elimine.

**Datos de las API de Google.** El uso que hace Deal Desk Studio de la información recibida de las
API de Google, y su transferencia a cualquier otra aplicación, se ajustará a la
[Política de datos de usuario de los servicios de las API de Google](https://developers.google.com/terms/api-services-user-data-policy),
incluidos los requisitos de uso limitado.

## Los datos de su contraparte

Cuando usted envía una propuesta, el nombre y la dirección de correo electrónico del destinatario
se procesan en su nombre. Usted es responsable de tener un motivo comercial legítimo para
ponerse en contacto con esa persona. Usamos esa dirección para ese documento y para nada más: ni listas, ni boletines, ni
marketing posterior.

## Cuánto tiempo lo conservamos

- **Mientras su cuenta esté abierta**, conservamos los datos de su cuenta para que el Servicio
  funcione.
- **Si elimina un negocio**, se quita de su cuenta; las copias firmadas y sus registros de
  verificación se conservan como registros legales.
- **Si cierra su cuenta**, eliminamos los datos de su cuenta en un plazo de 30 días. Lo que quede en
  nuestras copias de seguridad se elimina en un plazo de 35 días.
- **Los registros de firma** —un documento sellado, su certificado de finalización y su registro de
  verificación— se conservan como registros legales después de eliminar un negocio o una cuenta,
  porque eliminarlos impediría que una contraparte verifique un contrato que tiene en su poder.
  Avísenos si necesita que se elimine un registro firmado en particular y lo evaluaremos, conforme a
  la ley.
- **Las solicitudes de soporte** se conservan mientras su cuenta esté abierta y se eliminan con
  ella.

Para cerrar su cuenta, escriba a **privacy@dealdesk.studio** desde la dirección del titular de la
cuenta.

## Sus derechos

Según dónde viva, puede tener derecho a pedirnos una copia de sus datos personales, a corregirlos,
a eliminarlos, a limitar u oponerse a la forma en que los usamos, a recibirlos en un formato
portable y a retirar un consentimiento que haya dado. Escriba a **privacy@dealdesk.studio**.
Confirmaremos su identidad antes de actuar y responderemos en un plazo de 30 días. Si usted es una
contraparte o integrante del equipo de un cliente, podemos trasladar su solicitud a ese cliente,
porque es quien decide qué ocurre con sus documentos.

También puede presentar una reclamación ante su autoridad de protección de datos.

## Bases jurídicas (UE, EEE y Reino Unido)

Cuando se aplica el RGPD o el RGPD del Reino Unido, tratamos datos personales:

- **para ejecutar nuestro contrato con usted**: operar su cuenta, redactar, enviar y firmar
  documentos, facturar y prestar soporte;
- **por nuestro interés legítimo**: mantener la seguridad del Servicio, prevenir abusos y conservar
  los registros que una firma necesita para poder demostrarse más adelante;
- **con su consentimiento**: conectar una unidad y dictar notas en su navegador. Puede retirarlo
  desconectando la unidad o dejando de usar el dictado;
- **para cumplir obligaciones legales**: registros fiscales y contables, y solicitudes legítimas
  de las autoridades.

En cuanto a los datos personales contenidos en los documentos que usted incorpora al Servicio, su
empresa es la responsable del tratamiento y nosotros los tratamos por cuenta de ella, como se
describe en el [Anexo de tratamiento de datos](/legal/dpa).

## Transferencias internacionales

Deal Desk se opera desde los Estados Unidos, y sus datos se guardan y se tratan en los Estados
Unidos. Cuando transferimos datos personales desde el EEE, el Reino Unido o Suiza, nos basamos en
las Cláusulas Contractuales Tipo de la Comisión Europea (con el Anexo del Reino Unido cuando
corresponde), tanto con nuestros subencargados como con usted.

## Seguridad

Las credenciales se almacenan con hash scrypt. Las sesiones son cookies firmadas con HMAC. El
tráfico se cifra con TLS y el correo electrónico se envía con TLS obligatorio. Los documentos
sellados se firman con Ed25519 y pueden verificarse con una clave pública publicada. Más
información en la página de [Seguridad](/security).

## Cambios

Si cambiamos esta política de forma relevante, actualizaremos la fecha de arriba y avisaremos por
correo electrónico a los titulares de las cuentas antes de que el cambio entre en vigor.

## Contacto

**privacy@dealdesk.studio**
