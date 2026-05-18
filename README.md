# Planly

Planly es una aplicación para ayudar a parejas a decidir planes juntos de forma sencilla y divertida.

La idea principal es que cada persona pueda indicar su estado de ánimo, presupuesto y preferencias, y después deslizar propuestas de planes. Cuando ambas personas coinciden en un mismo plan, se genera un match.

---

## Estado del proyecto

Proyecto en fase inicial / MVP.

Actualmente la aplicación permite definir un flujo básico de decisión:

1. Inicio de sesión en modo desarrollo.
2. Creación o acceso a una pareja.
3. Selección de estado de ánimo, presupuesto y preferencia de ubicación.
4. Swipe de planes.
5. Detección de coincidencias entre ambos usuarios.

---

## Funcionalidades principales

- Flujo tipo swipe para aceptar o descartar planes.
- Selección de mood:
  - Cansado
  - Con energía
  - Romántico
  - Normal
- Filtro por presupuesto.
- Preferencia de ubicación.
- Sistema de match cuando ambas personas aceptan el mismo plan.
- Interfaz sencilla pensada para uso móvil.
- Preparación inicial para internacionalización con `next-intl`.

---

## Stack tecnológico

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- next-intl

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/KariGoStudio/planly.git
cd planly
