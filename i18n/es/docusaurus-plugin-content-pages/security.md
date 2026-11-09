---
title: Seguridad
description: Cómo protege Deal Desk Studio su cuenta y sus datos, y cómo informar una vulnerabilidad.
---

# Seguridad

_Esta traducción se ofrece para su comodidad; si difiere de la [versión en inglés](pathname:///security), prevalece la versión en inglés._

_Última actualización: 8 de noviembre de 2026._

Deal Desk guarda sus propuestas, sus precios y lo que sabe su empresa. Esta página explica cómo los
cuidamos, con claridad, y solo lo que es cierto hoy.

## Dónde están sus datos

La aplicación y su base de datos se ejecutan en **Amazon Web Services en los Estados Unidos, en la
región us-east-2 (Ohio)**. La redacción con IA se ejecuta en Amazon Bedrock en la misma región. La
lista completa de proveedores está en la página de [Subencargados](/legal/subprocessors).

Los datos se cifran en reposo: los discos del motor de búsqueda son volúmenes cifrados de AWS EBS, y las copias de seguridad se guardan en Amazon S3 con cifrado del lado del servidor.

## Cifrado en tránsito

- Toda conexión con la aplicación y con este sitio web usa **TLS (HTTPS)**.
- La aplicación verifica el certificado TLS de la base de datos en cada conexión.
- El correo electrónico se envía con **TLS obligatorio**: un mensaje no se entrega a un servidor de
  correo que no pueda recibirlo de forma segura.

## Separación entre clientes

- Los datos de Deal Desk se guardan en su **propio tenant** del motor de base de datos, al que no
  pueden acceder otros usuarios de ese motor.
- Dentro de él, cada registro está vinculado a la cuenta a la que pertenece, y cada solicitud se
  verifica contra la cuenta que inició sesión antes de leer o escribir nada. Una cuenta no puede
  abrir los negocios, los documentos ni la biblioteca de otra adivinando un identificador.
- Las solicitudes de soporte llevan la etiqueta de la cuenta que las creó y solo se muestran a esa
  cuenta.

## Controles de acceso

- **Las contraseñas** se almacenan con hash scrypt; nunca las guardamos ni las vemos en texto plano.
- **Las sesiones** son cookies firmadas con HMAC, verificadas en cada solicitud. Quitar a alguien de
  un equipo cierra su sesión de inmediato.
- **Roles.** Cada equipo tiene propietarios, administradores y miembros. La facturación, los
  integrantes del equipo, las unidades conectadas y las claves de API solo los gestionan
  propietarios y administradores.
- **Las claves de API** se muestran una sola vez al crearlas y solo se guarda su hash; cada una
  puede revocarse.
- **Unidades conectadas.** Los tokens de actualización de Google Drive y Microsoft 365 se cifran con
  AES-256-GCM. Al desconectar, revocamos nuestro acceso y eliminamos el token.
- Nuestro propio personal accede a los datos de clientes solo para prestar el soporte que usted
  pidió, por seguridad o cuando la ley lo exige.

## Documentos firmados

Los documentos sellados se firman con **Ed25519** y cualquiera puede verificarlos con nuestra clave
pública publicada, de modo que un contrato firmado puede comprobarse sin tener que confiar en
nosotros. El registro de auditoría indica cómo se identificó a cada firmante y no afirma nada más.

## La IA y su contenido

La redacción se ejecuta en Amazon Bedrock, que no usa su contenido para entrenar modelos. Deal Desk
tampoco entrena modelos con el contenido de sus clientes. Las respuestas a RFP redactadas se revisan
con reglas fijas, no con la propia IA, en busca de cifras, fechas y nombres que no estén en sus
fuentes.

## Lo que el Servicio no es

Deal Desk **no cuenta con autorización FedRAMP ni con certificación CMMC**. No cargue información
clasificada, Información No Clasificada Controlada (CUI) ni información controlada por ITAR o EAR.
Vea los [Términos del servicio](/legal/terms).

## Informar una vulnerabilidad

Si cree que encontró un problema de seguridad, escriba a **security@dealdesk.studio** con detalles
suficientes para que podamos reproducirlo. Acusaremos recibo de su informe, lo mantendremos al tanto
mientras lo corregimos y le daremos crédito si lo desea. No acceda a datos de otros clientes, no
interrumpa el Servicio y no haga público el problema antes de que lo hayamos corregido. No
emprenderemos acciones contra una investigación de buena fe que siga estas reglas.

## Preguntas

Cuestionarios de seguridad y condiciones de protección de datos: **security@dealdesk.studio**.
Nuestro [Anexo de tratamiento de datos](/legal/dpa) está disponible para todos los clientes.
