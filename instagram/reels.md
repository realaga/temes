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
- **Reloj** (`reloj.mp4`, 43,7 s), 2026-10-24: Instagram, versión oscura con la voz limpia (`reloj-oscuro-limpio.mp4`): https://www.instagram.com/reel/De3Ot5AAauD/ · YouTube Shorts, versión clara: https://youtube.com/shorts/Q432BklPS0w

## Pendientes

### Programados para el 2026-10-24 (hora de Newark)

Copia de los tres en Drive, carpeta "Claude videos". Ya están cargados en Instagram (contenedores listos) y se publican solos a su hora.

Voz de los tres: Mateo (ElevenLabs, `WMpAKHr8NOKA29XOHZkk`, modelo `eleven_v4`). Estilo copiado del reel de referencia https://www.instagram.com/reel/DevKFZvxbb5/ (fondo oscuro, líneas de neón, etiquetas en letra de máquina).

#### gps.mp4, 6:30

```
Envíaselo a ese amigo que cree que el GPS lo está vigilando.

Los satélites GPS no saben dónde estás: lo calcula tu teléfono.

Cada satélite emite sin parar su posición y la hora de su reloj atómico. Tu teléfono mide cuánto tarda la señal en llegar (unas siete centésimas de segundo) y con eso calcula la distancia a cada satélite. Con tres, solo hay un punto donde coinciden: tú. Un cuarto corrige el reloj del teléfono, porque una millonésima de segundo de error son 300 metros.

Ciencia explicada en 45 segundos.
```

Hashtags para añadir a mano: `#gps #satelites #tecnologia #ciencia`

#### mensaje.mp4, 8:00

```
Envíaselo a ese amigo que vive lejos y te contesta al instante.

Tu mensaje no viaja por el espacio: cruza el fondo del mar.

Tu teléfono convierte el texto en ceros y unos y los envía por radio a la antena más cercana. Desde ahí viajan como pulsos de luz por fibra óptica y cruzan el océano por cables submarinos del grosor de una manguera. Por ellos pasa casi todo internet entre continentes, no por satélites. Un servidor recibe el mensaje y se lo entrega a tu amigo por su antena.

Ciencia explicada en 45 segundos.
```

Hashtags para añadir a mano: `#internet #fibraoptica #tecnologia #ciencia`

#### pantalla.mp4, 9:30

```
Envíaselo a ese amigo que no se quita los guantes para usar el teléfono.

Tu pantalla no funciona con guantes, pero sí con una salchicha. Y tiene explicación.

Bajo el cristal hay una rejilla invisible de cables transparentes con una pequeña carga eléctrica. Tu dedo conduce la electricidad (la salchicha también) y al tocar se roba un poco de carga en un cruce. Un chip revisa todos los cruces más de cien veces por segundo y calcula dónde tocaste. El guante es aislante: no se roba nada y la pantalla ni se entera.

Ciencia explicada en 45 segundos.
```

Hashtags para añadir a mano: `#pantallatactil #tecnologia #fisica #ciencia`

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
