---
title: Subencargados
description: Los proveedores de servicios que Deal Desk Studio usa para operar el Servicio, qué ve cada uno y dónde.
---

# Subencargados

_Esta traducción se ofrece para su comodidad; si difiere de la [versión en inglés](pathname:///legal/subprocessors), prevalece la versión en inglés._

_Última actualización: 8 de noviembre de 2026._

Estas son las empresas que tratan datos de clientes por cuenta nuestra para que Deal Desk Studio
funcione. Cada una ve solo lo que necesita para su tarea. Algunas solo se usan cuando usted activa la
función a la que sirven; la tabla lo indica.

| Subencargado | Para qué | Qué ve | Dónde |
| --- | --- | --- | --- |
| **Amazon Web Services** | Alojamiento de la aplicación; redacción con IA (Amazon Bedrock); envío y recepción de correo electrónico (Amazon SES) | Todo lo que se guarda en el Servicio; aquello a partir de lo cual se redacta (notas, documentos, RFP, pasajes de la biblioteca, perfil de la empresa, respuestas); destinatarios y mensajes de correo | Estados Unidos (us-east-2, Ohio) |
| **Lucenia** | El motor de base de datos y de búsqueda donde se guardan los datos de su cuenta | Todo lo que se guarda en el Servicio, en el tenant propio de Deal Desk, con cada registro vinculado a su cuenta | Estados Unidos (en AWS, us-east-2) |
| **Stripe** | Facturación y pagos | Contacto de facturación, nombre de la empresa, plan y uso; los datos de la tarjeta van directamente a Stripe y nunca a nosotros | Estados Unidos |
| **Resend** | Entrega de correo electrónico cuando Amazon SES no puede | Dirección del destinatario y el mensaje | Estados Unidos |
| **Cloudflare** | DNS y entrega por red de la aplicación y del sitio web | El tráfico que pasa por su red, incluidas las direcciones IP | Red global |
| **Google** | Conector de Google Drive, cuando un administrador lo conecta; Google Fonts en las páginas de la aplicación; reconocimiento de voz cuando usted dicta notas en Google Chrome | Archivos y carpetas agregados desde Drive y el correo de la cuenta conectada; su dirección IP y su navegador (fuentes); el audio que dicta (Chrome) | Estados Unidos |
| **Microsoft** | Conector de SharePoint y OneDrive, cuando un administrador lo conecta | Archivos y carpetas agregados desde la unidad, el correo de la cuenta conectada y los documentos firmados que se archivan allí | Estados Unidos |
| **Auth0 (Okta)** | Inicio de sesión, cuando su cuenta inicia sesión a través de Auth0 | Nombre, dirección de correo electrónico y eventos de inicio de sesión | Estados Unidos |
| **DocuSign** | Firma, cuando usted envía un documento a través de DocuSign | El documento, y los nombres y correos de los firmantes | Estados Unidos |
| **GitHub** | Solicitudes de soporte de Ayuda y comentarios, guardadas en un repositorio privado | Su nombre, su correo electrónico, el mensaje y los adjuntos, y la página y la versión de la aplicación | Estados Unidos |

## Cambios

Avisamos a los clientes con al menos 30 días de antelación, por correo electrónico a los titulares
de las cuentas, antes de agregar o sustituir un subencargado. Si usted se opone por motivos
razonables de protección de datos, avísenos en **privacy@dealdesk.studio**; si no podemos
resolverlo, puede dar por terminado el servicio afectado y le reembolsaremos los cargos pagados por
adelantado por él. El [Anexo de tratamiento de datos](/legal/dpa) lo establece.

Vea también la [Política de privacidad](/legal/privacy) y [Seguridad](/security).
