# Desplegar Bukasovii a internet (Vercel + Turso)

La app funciona en dos modos sin cambiar código:

| | Local (tu PC) | Producción |
|---|---|---|
| Base de datos | archivo `data/menu.db` | Turso (`TURSO_DATABASE_URL`) |
| Fotos de platos | carpeta `public/uploads` | Vercel Blob (`BLOB_READ_WRITE_TOKEN`) |

Costo total: **$0/mes** en los planes gratuitos.

## 1. Subir el código a GitHub

El repositorio git local ya está creado con su primer commit. En [github.com/new](https://github.com/new) crea un repositorio (puede ser privado) llamado por ejemplo `bukasovii`, **sin** README ni .gitignore inicial, y luego:

```bash
git remote add origin https://github.com/TU_USUARIO/bukasovii.git
git branch -M main
git push -u origin main
```

## 2. Crear la base de datos en Turso

1. Crea cuenta en [turso.tech](https://turso.tech) (con tu GitHub).
2. En el dashboard: **Create Database** → nombre `bukasovii` → región más cercana (`bog` no existe; usa `gru` São Paulo, la más cercana a Colombia).
3. Copia dos datos:
   - **Database URL** (empieza con `libsql://`)
   - **Token**: botón *Create Token* (permisos read & write, sin expiración)

Las tablas y los platos iniciales se crean solos la primera vez que la app arranca.

## 3. Crear el proyecto en Vercel

1. Crea cuenta en [vercel.com](https://vercel.com) (con tu GitHub).
2. **Add New → Project** → importa el repositorio `bukasovii`. No cambies nada de la configuración de build.
3. Antes de darle Deploy, abre **Environment Variables** y agrega:

   | Nombre | Valor |
   |---|---|
   | `ADMIN_PASSWORD` | la contraseña que quieras para el panel |
   | `TURSO_DATABASE_URL` | la URL `libsql://...` del paso 2 |
   | `TURSO_AUTH_TOKEN` | el token del paso 2 |

4. **Deploy**. En un par de minutos tendrás `https://bukasovii.vercel.app`.

## 4. Activar las fotos (Vercel Blob)

1. En el proyecto de Vercel: pestaña **Storage → Create Database → Blob** → nombre `fotos`.
2. Al conectarlo al proyecto, Vercel agrega sola la variable `BLOB_READ_WRITE_TOKEN`.
3. **Redeploy** (Deployments → ⋯ → Redeploy) para que la tome.

## 5. Probar

- Carta: `https://TU-PROYECTO.vercel.app/carta`
- Panel: `https://TU-PROYECTO.vercel.app/admin` (con tu `ADMIN_PASSWORD`)
- QR para imprimir: `https://TU-PROYECTO.vercel.app/qr` — se genera solo con la URL de producción

## Notas

- **Los datos locales no se copian solos**: los platos/fotos que agregaste en tu PC viven en `data/menu.db`. Producción arranca con la carta inicial de ejemplo; carga los platos y fotos reales desde el panel `/admin` de la página ya publicada.
- **Actualizaciones**: cada `git push` a `main` redespliega automáticamente.
- **Dominio propio** (opcional, ~$12 USD/año): se compra en Vercel (Settings → Domains) o en cualquier registrador y se apunta al proyecto.
