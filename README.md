# RK Palanca · Prompts

Biblioteca interna de prompts de IA para RK Palanca Fontestad: Home Staging Digital (Nano Banana / Gemini), vídeo Reveal (Gemini Omni Flash) y transiciones (Kling AI).

Sustituye a https://marketingipf.github.io/creaprompts/

## Imágenes Hero (Estilos más utilizados)

Banner grande arriba del todo, con los 10 estilos de Salón como chips seleccionables. Al pulsar un estilo: cambia la imagen de fondo y dispara la búsqueda global de ese estilo en las 3 librerías (por ejemplo "Industrial Loft" encuentra tanto el de Salón como el de Despacho). Las imágenes viven en `public/hero/` con estos nombres:

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

Tamaño recomendado: 1600×1200px (4:3) o similar panorámico, JPG optimizado (~300-500KB).

## Funcionalidades

- **Navegación en cuadrícula** — las estancias se muestran como tarjetas en una cuadrícula (2 columnas en móvil); al entrar en una, se ve su lista de prompts con botón "← Estancias" para volver. Cada prompt se expande individualmente y el botón "Copiar" funciona sin expandir.
- **⭐ Favoritos** — marca cualquier prompt con la estrella y aparece en la pestaña "Favoritos", persistido en el navegador (localStorage), accesible desde cualquier librería.
- **🔎 Buscador global** — al escribir algo en el buscador, se busca automáticamente en las 3 librerías a la vez (no solo en la pestaña activa), mostrando de dónde viene cada resultado.
- **🔗 Enlace directo** — el botón de enlace en cada prompt copia una URL (`?p=...`) que abre la librería, la estancia y el prompt exactos, con un resaltado visual — ideal para compartir con el equipo por Slack/WhatsApp.

## Contenido

- **🖼️ Home Staging** (`src/data/nanoBanana.json`) — 188 prompts de imagen en 13 estancias (Salón, Dormitorio Principal, Invitados, Niño, Niña, Adolescente Chico, Adolescente Chica, Cocina, Baño, Terraza, Piscina, Despacho, Garaje), incluyendo 6 prompts de perfil de comprador en Salón y 4 estilos extra por estancia (Wabi-Sabi, Art Deco, Provenzal, Tropical, Montessori, Gamer, Home Gym... según la estancia).
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
