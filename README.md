# Arlecchino Birthday Website 🎂

Este es el repositorio oficial para la web de cumpleaños de Naoh.

## 🚀 Despliegue en Vercel (Recomendado)

La forma más fácil y robusta de desplegar este proyecto es usando **Vercel**, ya que está optimizado para Next.js.

### Pasos para desplegar:

1.  Ve a [Vercel Dashboard](https://vercel.com/dashboard).
2.  Haz clic en **"Add New..."** -> **"Project"**.
3.  Selecciona **"Import"** junto al repositorio `Naoh-birthday`.
4.  En la configuración del proyecto:
    *   **Framework Preset:** Next.js (se detecta automáticamente).
    *   **Root Directory:** `./` (déjalo como está).
    *   **Build Command:** `next build` (automático).
    *   **Output Directory:** `.next` (automático).
5.  Haz clic en **"Deploy"**.

¡Listo! Vercel te dará una URL (ej. `naoh-birthday.vercel.app`) donde la web estará funcionando al 100%.

---

## ⚠️ Solución de Errores Comunes

### Error: "Get Pages site failed" en GitHub Actions
Si ves un error en la pestaña **Actions** de GitHub que dice `Error: Get Pages site failed`, es porque se activó accidentalmente un flujo de trabajo para **GitHub Pages** que no está configurado.

**Solución:**
1.  Ve a tu repositorio en GitHub.
2.  Entra en la pestaña **Settings** -> **Pages**.
3.  Asegúrate de que **Source** esté en "Deploy from a branch" (si quieres usar Pages) o simplemente ignora este error si vas a usar Vercel.
4.  **Para eliminar el error:** Ve a la pestaña **Code**, busca la carpeta `.github/workflows` (si existe) y elimina el archivo `nextjs.yml`. O simplemente ignora el error, ya que **no afecta al despliegue en Vercel**.

### Error 404 en Vercel
Si al abrir el link de Vercel ves un 404:
1.  Asegúrate de que el despliegue haya terminado exitosamente (debe salir "Ready" con un punto verde en el dashboard de Vercel).
2.  Verifica que no haya errores en la sección "Logs" del despliegue en Vercel.

## 🛠️ Comandos Locales

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```
