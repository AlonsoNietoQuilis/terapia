# Alonso Nieto Quilis — Psicología

Sitio web de una sola página, en HTML/CSS/JS puro (sin build ni dependencias),
listo para subir a un repositorio de GitHub y publicar con GitHub Pages, Netlify
o Vercel.

## Estructura

```
alonso-nieto-web/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/
│       ├── hero.svg        ← sustituir por foto principal
│       ├── perfil.svg      ← sustituir por foto de Alonso
│       └── consulta.svg    ← sustituir por foto de la consulta
```

## Sustituir las imágenes

Las tres imágenes de `assets/images/` son marcadores de posición (SVG con
el texto "Sustituir por..."). Para poner tus fotos reales:

1. Añade tus archivos (por ejemplo `hero.jpg`, `perfil.jpg`, `consulta.jpg`)
   dentro de `assets/images/`.
2. En `index.html`, cambia cada `src="assets/images/*.svg"` por la ruta de
   tu imagen nueva (por ejemplo `src="assets/images/perfil.jpg"`).
3. Puedes borrar los `.svg` de ejemplo una vez sustituidos.

## Enlaces ya configurados

- **WhatsApp**: `https://wa.me/34630770864` con un mensaje precargado.
- **Instagram**: enlace directo a `@psi.alonso`.
- **Email**: `mailto:psi.alonsonieto@gmail.com`.

Si cambias el número de WhatsApp o el correo, búscalos con "buscar y
reemplazar" en `index.html` (aparecen dos veces cada uno: en la cabecera/hero
y en la sección de contacto).

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio de GitHub (puede ser
   la raíz del repo, o una carpeta `/docs`).
2. En el repositorio: **Settings → Pages → Build and deployment**.
3. Elige la rama y carpeta donde está `index.html` (por ejemplo `main` / `/root`).
4. GitHub te dará una URL del tipo `https://tuusuario.github.io/tu-repo/`.

No hace falta `npm install` ni ningún paso de compilación: es HTML plano.

## Personalización rápida

- **Colores**: están definidos como variables al principio de
  `assets/css/styles.css` (`--bg`, `--accent`, `--blue-light`, `--blue-deep`…).
- **Tipografías**: Fraunces (títulos) e Inter (texto), cargadas desde Google
  Fonts en la primera línea del CSS.
- **Dirección de Bilbao**: en la sección de precios pone "dirección a
  confirmar" — sustitúyelo por la dirección real cuando la tengas.
