# AkshUlly InnOcent - Standalone Site

A completely standalone version that works on any web host without Zo dependencies.

## Structure

```
Zo-Site-Standalone/
├── index.html          # Main/home page
├── pages/
│   ├── music.html      # Music player page
│   └── files.html      # Case files viewer page
├── styles.css          # Shared styles
├── lib/
│   ├── music.js        # Music player functionality
│   └── files.js        # Document viewer functionality
├── assets/
│   ├── music/          # MP3 files (~200MB)
│   └── documents/      # PDF page images
│       └── Files-Imgs/ # Document folders 01-27 with page-*.jpg
└── server.py           # Optional Python server
```

## Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages, Apache, Nginx)
Simply upload all files. Ensure your server:
- Serves `.mp3` and `.jpg` files with correct MIME types
- Rewrites all non-file paths to `/index.html` (for SPA-like navigation)

### Python Server (for testing or simple hosting)
```bash
python3 server.py
# Or with custom port:
PORT=3000 python3 server.py
```

### Node.js Static Server
```bash
npx serve .
# Or install serve globally:
npm install -g serve && serve .
```

## What Was Removed

- Zo Space badge and branding
- `/api/llm` endpoint (Zo-specific)
- `/api/rag-proxy` endpoint (Zo-specific)
- All Node.js/React build dependencies
- Theme provider and complex state management
- Heavy unused packages (radix-ui, tailwind, vaul, etc.)

## Features Preserved

- Main page with hero, updates, and "From the Cell" sections
- Music page with 24 tracks and podcasts, audio player
- Case files page with document list and image viewer (lazy-loaded)
- Exact visual styling (fonts, colors, layout)
- Mobile-responsive design
- Right-click protection on documents

## Notes

- The document viewer uses pre-rendered JPG images instead of PDFs for browser compatibility
- Images are lazy-loaded for performance
- No server-side code required - all client-side JavaScript