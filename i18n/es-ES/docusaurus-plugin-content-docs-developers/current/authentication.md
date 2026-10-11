---
title: Claves de API y ámbitos
sidebar_label: Autenticación
description: Cada solicitud lleva una clave de API. Las claves tienen ámbitos read, write y send, se guardan como hash y se pueden revocar al instante.
---

# Claves de API y ámbitos

Cada solicitud lleva una clave en la cabecera `Authorization`. Las claves empiezan por
`ddk_live_` y siguen con 46 letras y dígitos.

```bash
curl https://app.dealdesk.studio/api/v1/account -H "Authorization: Bearer $DEALDESK_API_KEY"
```

## Cree una clave

En Deal Desk, abra el menú de la cuenta y elija **Desarrolladores**. Nombre la clave según dónde
se usará, elija **Lectura y escritura** o **Solo lectura**, marque **Permitir enviar a firma** solo
si la clave debe enviar propuestas para firma, y pulse **Crear clave**. Necesita el rol de
propietario o administrador de la cuenta y el plan Starter o uno superior. La clave se muestra una
sola vez: cópiela en ese momento.

![El panel Desarrolladores de Deal Desk, con una clave creada y la configuración de Claude Code](/img/agents/developer-panel-es-ES.png)

## Ámbitos (scopes)

Una clave actúa en nombre de su cuenta con los permisos de quien la creó, limitados por sus
ámbitos (scopes):

| Ámbito | Permite |
| --- | --- |
| `read` | Buscar en la biblioteca, listar datos y leer propuestas y respuestas a RFP. Todas las claves lo tienen. |
| `write` | Añadir documentos, enseñar datos, redactar propuestas y respuestas, y editar y aprobar respuestas. |
| `send` | Enviar una propuesta para firma electrónica. Se factura igual que un envío desde la aplicación. Solo se otorga si marca **Permitir enviar a firma**. |

Una llamada fuera de los ámbitos de la clave responde `403` con `insufficient_scope`, y
`required_scope` indica el ámbito que necesitaba. Por MCP, una clave de solo lectura solo ve las
herramientas de solo lectura.

## Una clave por agente o por ordenador

- Una cuenta puede tener hasta 20 claves. Use una por agente o por ordenador: así, si revoca una,
  las demás siguen funcionando.
- Nunca ponga una clave en una URL, en un repositorio ni en un documento compartido. Los escáneres
  de secretos reconocen las claves como secretos (tienen un prefijo fijo y una suma de
  verificación).

## Revocar una clave

- Pulse **Revocar** junto a la clave en **Desarrolladores**. Deja de funcionar de inmediato.
- `dealdesk logout` revoca la clave que recibió la herramienta de línea de comandos al iniciar
  sesión, mediante `POST /auth/revoke` (consulte [Cuenta](./api.md#account)).
- Deal Desk solo guarda un hash SHA-256 de cada clave, así que no puede volver a mostrarla. Si
  pierde una, revóquela y cree otra.
- Una clave también deja de funcionar cuando la persona que la creó deja de administrar la cuenta
  o cuando la cuenta pasa a un plan que no incluye el acceso para desarrolladores.
