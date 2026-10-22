import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import palabras from '../public/palabras.json';

// Palabras con sus tiempos (segundos), sacadas de la transcripción de ElevenLabs.
type Palabra = {text: string; start: number; end: number};
const P = palabras as Palabra[];

export const FPS = 30;
export const duracionEnFrames = Math.ceil((P[P.length - 1].end + 1.5) * FPS);

const C = {
  fondo: '#1e1a17',
  rejilla: 'rgba(255,255,255,0.05)',
  crema: '#efe6d6',
  tinta: '#2a211c',
  rojo: '#e0503f',
  amarillo: '#e8c547',
  gris: '#a89f94',
};

// Escenas: cada una empieza cuando la voz dice su palabra clave.
const ESCENAS: {desde: string; titulo: string; dibujo: (f: number) => JSX.Element}[] = [
  {desde: 'Te', titulo: 'TE APUESTO', dibujo: (f) => <Cara f={f} x={540} y={760} r={260} />},
  {desde: 'contagioso', titulo: 'CONTAGIOSO', dibujo: (f) => <Cadena f={f} />},
  {desde: 'basta', titulo: 'VER · OÍR · LEER', dibujo: (f) => <Sentidos f={f} />},
  {desde: 'científicos', titulo: 'EMPATÍA', dibujo: (f) => <Empatia f={f} />},
  {desde: 'Por', titulo: '4 – 5 AÑOS', dibujo: (f) => <Ninos f={f} />},
  {desde: 'ojo,', titulo: 'PERROS TAMBIÉN', dibujo: (f) => <Perro f={f} />},
  {desde: '¿Ya', titulo: '¿YA BOSTEZASTE?', dibujo: (f) => <Cara f={f} x={540} y={760} r={260} />},
];

const limpia = (s: string) => s.toLowerCase().replace(/[^a-záéíóúñü0-9]/g, '');
const inicioEscenas = (() => {
  let desdeIdx = 0;
  return ESCENAS.map((e) => {
    const i = P.findIndex((p, k) => k >= desdeIdx && limpia(p.text) === limpia(e.desde));
    if (i < 0) throw new Error(`No encuentro la palabra "${e.desde}"`);
    desdeIdx = i + 1;
    return Math.round(P[i].start * FPS);
  });
})();

export const Bostezo = () => {
  const frame = useCurrentFrame();
  let n = 0;
  while (n + 1 < ESCENAS.length && frame >= inicioEscenas[n + 1]) n++;
  const f = frame - inicioEscenas[n];

  return (
    <AbsoluteFill style={{background: C.fondo, fontFamily: 'Montserrat, Arial, sans-serif'}}>
      <Rejilla />
      <Audio src={staticFile('voz.mp3')} />
      <div style={{position: 'absolute', left: 60, top: 80, color: C.crema}}>
        <div style={{fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 44}}>ciencia, el bostezo</div>
        <div style={{fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 30, color: C.gris}}>
          un bostezo, muchos cerebros
        </div>
      </div>
      <Titulo texto={ESCENAS[n].titulo} f={f} />
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        {ESCENAS[n].dibujo(f)}
      </svg>
      <Grafica frame={frame} />
      <Subtitulos t={frame / FPS} />
    </AbsoluteFill>
  );
};

const Rejilla = () => (
  <svg width={1080} height={1920} style={{position: 'absolute'}}>
    {Array.from({length: 28}, (_, i) => (
      <line key={'h' + i} x1={0} x2={1080} y1={i * 72} y2={i * 72} stroke={C.rejilla} />
    ))}
    {Array.from({length: 16}, (_, i) => (
      <line key={'v' + i} y1={0} y2={1920} x1={i * 72} x2={i * 72} stroke={C.rejilla} />
    ))}
  </svg>
);

const Titulo = ({texto, f}: {texto: string; f: number}) => {
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps});
  return (
    <div
      style={{
        position: 'absolute',
        top: 300,
        width: '100%',
        textAlign: 'center',
        color: C.rojo,
        fontSize: texto.length > 12 ? 90 : 110,
        fontWeight: 900,
        letterSpacing: 6,
        transform: `scale(${0.9 + 0.1 * s})`,
      }}
    >
      {texto}
    </div>
  );
};

// Bostezo: 0 → boca cerrada, 1 → abierta. Un ciclo dura ~2 s.
const bostezo = (f: number, retraso = 0) => {
  const t = f - retraso;
  if (t < 0) return 0;
  return Math.max(0, Math.sin(Math.min(t / 60, 1) * Math.PI));
};

const Cara = ({f, x, y, r, retraso = 0, mira = true}: {f: number; x: number; y: number; r: number; retraso?: number; mira?: boolean}) => {
  const b = bostezo(f, retraso);
  const ojo = r * 0.32;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.crema} stroke={C.tinta} strokeWidth={r * 0.04} />
      {[-1, 1].map((s) => (
        <path
          key={s}
          d={`M ${x + s * ojo - r * 0.14} ${y - r * 0.2} q ${r * 0.14} ${r * (0.12 - 0.2 * b)} ${r * 0.28} 0`}
          stroke={C.tinta}
          strokeWidth={r * 0.05}
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <ellipse cx={x} cy={y + r * 0.35} rx={r * (0.18 + 0.06 * b)} ry={r * (0.03 + 0.3 * b)} fill={C.tinta} />
      {mira && b > 0.05 && (
        <g opacity={b} stroke={C.rojo} strokeWidth={r * 0.025} fill="none">
          <circle cx={x} cy={y + r * 0.35} r={r * 0.5} />
          <circle cx={x} cy={y + r * 0.35} r={r * 0.62} strokeDasharray="10 14" />
          <line x1={x - r * 0.8} x2={x - r * 0.45} y1={y + r * 0.35} y2={y + r * 0.35} />
          <line x1={x + r * 0.45} x2={x + r * 0.8} y1={y + r * 0.35} y2={y + r * 0.35} />
        </g>
      )}
    </g>
  );
};

const Cadena = ({f}: {f: number}) => (
  <g>
    {[0, 1, 2].map((i) => (
      <Cara key={i} f={f} x={220 + i * 320} y={780} r={130} retraso={i * 25} mira={false} />
    ))}
    {[0, 1].map((i) => (
      <path
        key={i}
        d={`M ${330 + i * 320} 780 l 60 0`}
        stroke={C.rojo}
        strokeWidth={8}
        strokeDasharray="12 10"
        opacity={interpolate(f, [i * 25, i * 25 + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
    ))}
  </g>
);

const Sentidos = ({f}: {f: number}) => {
  const aparece = (i: number) => interpolate(f, [i * 18, i * 18 + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <g stroke={C.crema} strokeWidth={10} fill="none" strokeLinecap="round" transform="translate(0 -130)">
      {/* ojo */}
      <g opacity={aparece(0)}>
        <path d="M 120 760 q 110 -110 220 0 q -110 110 -220 0" />
        <circle cx={230} cy={760} r={30} fill={C.rojo} stroke="none" />
      </g>
      {/* oído */}
      <g opacity={aparece(1)}>
        <path d="M 500 700 q 0 -60 60 -60 q 60 0 60 70 q 0 50 -50 80 q -20 15 -20 50" />
        <path d="M 680 680 q 30 40 0 80 M 710 650 q 55 70 0 140" stroke={C.rojo} />
      </g>
      {/* texto */}
      <g opacity={aparece(2)}>
        <rect x={780} y={650} width={190} height={230} rx={14} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={815} x2={i === 3 ? 890 : 935} y1={700 + i * 45} y2={700 + i * 45} stroke={i === 1 ? C.rojo : C.crema} />
        ))}
      </g>
      {/* cerebro que copia */}
      <g opacity={aparece(3)} transform="translate(540 1090)">
        <ellipse rx={150} ry={100} fill={C.crema} stroke={C.tinta} />
        <path d="M -100 -20 q 50 -60 100 0 q 50 60 100 0 M -90 40 q 40 -30 80 0" stroke={C.tinta} strokeWidth={8} />
        <circle r={170 + (f % 30) * 3} stroke={C.rojo} strokeWidth={6} opacity={1 - (f % 30) / 30} />
      </g>
    </g>
  );
};

const Empatia = ({f}: {f: number}) => {
  const latido = 1 + 0.12 * Math.max(0, Math.sin(f / 4));
  return (
    <g>
      <Cara f={f} x={280} y={800} r={150} mira={false} />
      <Cara f={f} x={800} y={800} r={150} retraso={20} mira={false} />
      <path
        d="M 0 30 C -60 -20 -50 -80 0 -50 C 50 -80 60 -20 0 30 Z"
        transform={`translate(540 640) scale(${1.6 * latido})`}
        fill={C.rojo}
      />
    </g>
  );
};

const Ninos = ({f}: {f: number}) => {
  const p = interpolate(f, [0, 70], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <g>
      <Cara f={f + 1000} x={540} y={720} r={140} mira={false} />
      <rect x={160} y={980} width={760} height={30} rx={15} fill="rgba(255,255,255,0.12)" />
      <rect x={160} y={980} width={760 * p} height={30} rx={15} fill={C.amarillo} />
      {[0, 1, 2, 3, 4, 5].map((a) => (
        <text key={a} x={160 + a * 152} y={1070} fill={a >= 4 ? C.rojo : C.gris} fontSize={44} textAnchor="middle" fontWeight={700}>
          {a}
        </text>
      ))}
    </g>
  );
};

const Perro = ({f}: {f: number}) => {
  const b = bostezo(f, 15);
  return (
    <g stroke={C.tinta} strokeWidth={10}>
      <path d="M 360 600 l -60 220 l 140 -120 Z M 720 600 l 60 220 l -140 -120 Z" fill="#8a5a3c" />
      <circle cx={540} cy={800} r={230} fill="#c99466" />
      <circle cx={460} cy={740} r={18} fill={C.tinta} />
      <circle cx={620} cy={740} r={18} fill={C.tinta} />
      <ellipse cx={540} cy={880} rx={120} ry={90} fill={C.crema} />
      <ellipse cx={540} cy={835} rx={34} ry={24} fill={C.tinta} />
      <ellipse cx={540} cy={915} rx={50} ry={6 + 45 * b} fill={C.tinta} />
      {b > 0.05 && <circle cx={540} cy={915} r={110} stroke={C.rojo} strokeWidth={6} fill="none" opacity={b} />}
    </g>
  );
};

// Línea de "ganas de bostezar" que sube con el vídeo, con picos en cada escena.
const Grafica = ({frame}: {frame: number}) => {
  const ancho = 1000;
  const total = duracionEnFrames;
  const puntos: string[] = [];
  for (let i = 0; i <= Math.min(frame, total); i += 3) {
    const x = 40 + (i / total) * ancho;
    const pico = inicioEscenas.some((s) => i >= s && i < s + 12) ? 50 : 0;
    const y = 1640 - (i / total) * 90 - pico - Math.sin(i / 7) * 6;
    puntos.push(`${x},${y}`);
  }
  return (
    <svg width={1080} height={1920} style={{position: 'absolute'}}>
      <line x1={40} x2={1040} y1={1660} y2={1660} stroke="rgba(255,255,255,0.15)" strokeWidth={3} />
      <polyline points={puntos.join(' ')} fill="none" stroke={C.amarillo} strokeWidth={5} />
    </svg>
  );
};

// Subtítulos en grupos de 4 palabras; la que suena va en un recuadro rojo.
const Subtitulos = ({t}: {t: number}) => {
  const i = P.findIndex((p) => t < p.end);
  const actual = i < 0 ? P.length - 1 : i;
  const grupo = Math.floor(actual / 4) * 4;
  const palabrasGrupo = P.slice(grupo, grupo + 4);
  return (
    <div
      style={{
        position: 'absolute',
        top: 1260,
        width: '100%',
        padding: '0 70px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: 76,
        fontWeight: 800,
        color: C.crema,
        lineHeight: 1.35,
      }}
    >
      {palabrasGrupo.map((p, k) => {
        const activa = grupo + k === actual && t >= p.start;
        return (
          <span
            key={k}
            style={{
              padding: '0 12px',
              margin: '0 2px',
              borderRadius: 10,
              border: `4px solid ${activa ? C.rojo : 'transparent'}`,
              background: activa ? 'rgba(224,80,63,0.18)' : 'transparent',
            }}
          >
            {p.text}
          </span>
        );
      }).flatMap((el, k) => (k ? [' ', el] : [el]))}
    </div>
  );
};
