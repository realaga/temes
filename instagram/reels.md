# Reels de solo45segundos

Cómo se publican y qué queda pendiente. Lo lee Claude cuando el usuario pide publicar.

## Cómo publicar

1. Los reels pendientes están en Google Drive, en la carpeta **"Claude videos"** de una de las dos cuentas de Google conectadas en Composio (la que no es la predeterminada). Ya están recortados a 45 s o menos. Busca la carpeta en las dos cuentas con `GOOGLEDRIVE_FIND_FILE`.
2. En el espacio de trabajo de Composio: `GOOGLEDRIVE_DOWNLOAD_FILE` (con esa cuenta) → descargar el archivo → comprobar con `ffprobe` que dura 45 s o menos → `upload_local_file` para obtener el `s3key`.
3. `INSTAGRAM_POST_IG_USER_MEDIA` con el `user_id` que devuelve `INSTAGRAM_GET_USER_INFO` (`me`), `media_type` `REELS`, `share_to_feed` `true`, `video_file` con el `s3key` y el texto de abajo.
4. Esperar a que el contenedor pase a `FINISHED` (`INSTAGRAM_GET_POST_STATUS`; tarda entre 30 s y 2 min) y publicar con `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH`. Las llamadas de Composio se cortan a los 60 s: esperar en bucles cortos.
5. Comprobar el texto y el enlace con `INSTAGRAM_GET_IG_MEDIA`, y marcar aquí el reel como publicado.

Notas:
- Los textos se publican **sin hashtags**: la herramienta no deja claro cómo trata el símbolo `#`. El usuario los añade editando la publicación en la app. Lo mismo vale para `%`: escribe "80 por ciento".
- Uno al día, en el orden de la lista.
- Instagram no deja a ninguna aplicación cambiar el nombre ni la biografía del perfil, ni escribir primero por mensaje privado.

## Publicados

- **Célula** (44,0 s), 2026-10-23: https://www.instagram.com/reel/De0tNwaGHN6/
- **Manta** (`manta.mp4`, 44,0 s), 2026-10-23: https://www.instagram.com/reel/De2sM6oGxvR/ — falta YouTube Shorts: la subida por Composio falló por la cuota diaria de vídeos (error 429).

## Pendientes

### 2-sueno-45s.mp4 (43,1 s)

```
Envíaselo a ese amigo que se duerme a las 3 de la mañana.

Qué pasa en tu cerebro cuando duermes: no se apaga, hace limpieza.

En el sueño profundo, el líquido cefalorraquídeo entra en oleadas y se lleva las proteínas de desecho, como la beta-amiloide. Además, tu cerebro guarda en la memoria lo importante del día.

Si duermes poco, la basura se acumula y al día siguiente piensas más lento.

Ciencia explicada en 45 segundos.
```

Hashtags para añadir a mano: `#sueño #cerebro #neurociencia #ciencia`

### 3-herida-45s.mp4 (43,9 s)

```
Envíaselo a ese amigo que siempre se arranca las costras.

Una cicatriz nunca recupera toda su fuerza: como mucho llega al 80 por ciento.

Cómo cicatriza una herida, paso a paso: los vasos se cierran, las plaquetas tapan el agujero y la fibrina forma el coágulo, que al secarse es la costra. Después la piel fabrica células nuevas y colágeno, y la cicatriz se sigue reforzando durante meses.

Ciencia explicada en 45 segundos.
```

Hashtags para añadir a mano: `#cicatrizacion #cuerpohumano #biologia #ciencia`
