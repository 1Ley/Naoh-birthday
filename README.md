# Naoh Birthday

Aplicación web interactiva construida con Next.js. Desarrollada por Ley.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP y Framer Motion para animación
- Three.js / React Three Fiber
- Zustand para el estado

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

```bash
npm install
```

## Comandos

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run start   # servidor de producción
npm run lint    # análisis estático
```

El servidor de desarrollo queda disponible en `http://localhost:3000`.

## Estructura

```
app/           rutas y páginas (App Router)
components/    componentes de UI, layout y escenas
lib/           constantes y utilidades
store/         estado global
public/        recursos estáticos
```

## Rutas

| Ruta                | Descripción              |
| ------------------- | ------------------------ |
| `/`                 | pantalla inicial         |
| `/game-guess`       | minijuego de adivinanzas |
| `/game-memory`      | minijuego de memoria     |
| `/game-runner`      | minijuego de carrera     |
| `/cinematic-runner` | secuencia cinemática     |
| `/cart-birthday`    | pantalla final           |

## Despliegue

El proyecto está preparado para Vercel. Importa el repositorio desde el panel de Vercel; la configuración de Next.js se detecta automáticamente y no requiere ajustes adicionales.

Para cualquier otro entorno, ejecuta `npm run build` y sirve la aplicación con `npm run start`.

## Créditos

Desarrollado por Ley.

SVGs generados con Gemini 2.5 Pro.

El código de movimiento y tiempo se apoya en librerías de terceros, con el crédito correspondiente a sus creadores:

- GSAP — GreenSock
- Framer Motion — Framer
- Three.js — Ricardo Cabello (mrdoob)
- React Three Fiber y Drei — Poimandres
- Zustand — Poimandres
