// scripts/create-post.js
// Uso: node scripts/create-post.js "Título de mi entrada"

const fs = require('fs');
const path = require('path');

// 1. Recoger el título desde la línea de comandos
const titulo = process.argv[2];

if (!titulo) {
  console.error('❌ Tienes que darle un título. Ejemplo:');
  console.error('   node scripts/create-post.js "Mi segunda entrada"');
  process.exit(1);
}

// 2. Convertir el título en un "slug" para el nombre de archivo
// "Mi Segunda Entrada" -> "mi-segunda-entrada"
function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const slug = slugify(titulo);
const fecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// 3. Plantilla del archivo de la entrada
const plantillaPost = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${titulo}</title>
  <link rel="stylesheet" href="../estilos.css">
</head>
<body>

  <a href="../index.html">← Volver al inicio</a>

  <h1>${titulo}</h1>
  <p><em>${fecha}</em></p>

  <p>Escribe aquí el contenido de tu entrada.</p>

</body>
</html>
`;

// 4. Crear el archivo de la entrada
const rutaPost = path.join(__dirname, '..', 'posts', `${slug}.html`);

if (fs.existsSync(rutaPost)) {
  console.error(`❌ Ya existe una entrada con ese nombre: ${slug}.html`);
  process.exit(1);
}

fs.writeFileSync(rutaPost, plantillaPost);
console.log(`✅ Creado: posts/${slug}.html`);

// 5. Insertar el enlace en index.html, justo después del marcador
const rutaIndex = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(rutaIndex, 'utf-8');

const nuevoEnlace = `  <li><a href="posts/${slug}.html">${titulo}</a></li>`;

if (!indexContent.includes('<!-- POSTS -->')) {
  console.error('❌ No encuentro el marcador <!-- POSTS --> en index.html');
  process.exit(1);
}

indexContent = indexContent.replace(
  '<!-- POSTS -->',
  `<!-- POSTS -->\n${nuevoEnlace}`
);

fs.writeFileSync(rutaIndex, indexContent);
console.log('✅ Enlace añadido en index.html');
console.log('\n🎉 Listo. Ahora haz commit y push de los cambios.');