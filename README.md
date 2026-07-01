# RK Palanca · Prompts

Biblioteca interna de prompts de IA para RK Palanca Fontestad: Home Staging Digital (Nano Banana / Gemini), vídeo Reveal (Gemini Omni Flash) y transiciones (Kling AI).

Sustituye a https://marketingipf.github.io/creaprompts/

## Imágenes Hero (Estilos de Salón)

La cabecera muestra una galería de los 10 estilos de Salón. Mientras no subas las fotos reales, se ve un placeholder — en cuanto añadas los archivos en `public/hero/` con estos nombres exactos, aparecen automáticamente sin tocar código:

- `salon-mediterranean-valencia.jpg`
- `salon-scandinavian-minimalist.jpg`
- `salon-contemporary-luxury.jpg`
- `salon-japandi.jpg`
- `salon-industrial-loft.jpg`
- `salon-modern-minimalist.jpg`
- `salon-bohemian-chic.jpg`
- `salon-coastal-mediterranea.jpg`
- `salon-midcentury-modern.jpg`
- `salon-modern-rustic-farmhouse.jpg`

Tamaño recomendado: 1600×1200px (4:3), JPG optimizado (~300-500KB). Al pulsar una imagen, se abre directamente ese prompt en Home Staging.

## Funcionalidades

- **Acordeón de dos niveles** — cada estancia se despliega en una lista de títulos; cada prompt se expande individualmente al pulsarlo. El botón "Copiar" funciona sin necesidad de expandir la tarjeta.
- **⭐ Favoritos** — marca cualquier prompt con la estrella y aparece en la pestaña "Favoritos", persistido en el navegador (localStorage), accesible desde cualquier librería.
- **🔎 Buscador global** — al escribir algo en el buscador, se busca automáticamente en las 3 librerías a la vez (no solo en la pestaña activa), mostrando de dónde viene cada resultado.
- **🔗 Enlace directo** — el botón de enlace en cada prompt copia una URL (`?p=...`) que abre la librería, la estancia y el prompt exactos, con un resaltado visual — ideal para compartir con el equipo por Slack/WhatsApp.

## Contenido

- **🖼️ Home Staging** (`src/data/nanoBanana.json`) — 116 prompts de imagen por estancia (Salón, Dormitorio Principal, Invitados, Niño, Niña, Cocina, Baño, Terraza, Piscina, Despacho, Garaje) + 6 prompts de perfil de comprador en Salón.
- **🎬 Vídeo Reveal** (`src/data/omniFlash.json`) — prompts de 2 pasos (Transformación + Con personas) para Gemini Omni Flash: Salón, Cocina, Dormitorio, Baño, Terraza, Piscina, Despacho, Garaje y 4 variantes de Reformas Luxury (Cocina Gourmet, Baño Suite Spa, Vestidor, Fachada/Entrada).
- **🌀 Transiciones** (`src/data/kling.json`) — 11 prompts de transición antes/después para Kling AI.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview   # para comprobar el resultado en local
```

## Desplegar (tu flujo habitual: GitHub → Vercel)

1. Crea el repo (o reutiliza `marketingipf/creaprompts`) desde la web de GitHub, o sube estos archivos vía GitHub Codespaces.
2. Sube todo el contenido de esta carpeta **excepto** `node_modules` y `dist` (ya están en `.gitignore`).
3. En Vercel: **Add New → Project → Import** el repo. Vercel detecta automáticamente que es un proyecto Vite y usa:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Cada push a `main` se despliega automáticamente (igual que en tus otras PWAs: La Liga, Lilo Sleep, etc.).

## Añadir contenido nuevo

Todo el contenido vive en `src/data/*.json` — no hace falta tocar componentes para añadir una estancia o un prompt nuevo, solo añadir un objeto al array correspondiente siguiendo la misma estructura.
