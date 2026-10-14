import type { ReactNode } from 'react';

function Scene({ id, bg, label, children }: { id: string; bg: string; label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={label}>
      <defs>
        <pattern id={`kw-${id}`} width="48" height="48" patternUnits="userSpaceOnUse" fill="none" stroke="#F4B73F" strokeOpacity=".2">
          <ellipse cx="24" cy="12" rx="6" ry="12" /><ellipse cx="24" cy="36" rx="6" ry="12" />
          <ellipse cx="12" cy="24" rx="12" ry="6" /><ellipse cx="36" cy="24" rx="12" ry="6" />
        </pattern>
      </defs>
      <rect width="300" height="300" fill={bg} />
      <rect width="300" height="300" fill={`url(#kw-${id})`} />
      {children}
    </svg>
  );
}

const Melati = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-16" rx="8" ry="16" fill="#F4F1FF" transform={`rotate(${a})`} />)}
    <circle r="6" fill="#F4B73F" />
  </g>
);

export const MOTIFS: ReactNode[] = [
  // Siraman: kendi
  <Scene key="0" id="0" bg="#10403D" label="Ilustrasi kendi untuk siraman">
    <ellipse cx="140" cy="185" rx="62" ry="50" fill="#F4B73F" />
    <path d="M120 140 L126 106 H154 L160 140 Z" fill="#F4B73F" />
    <ellipse cx="140" cy="106" rx="14" ry="5" fill="#B7791F" />
    <path d="M196 170 Q238 160 244 124 L230 120 Q226 146 192 154 Z" fill="#F4B73F" />
    <path d="M92 188 H188" stroke="#10403D" strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" />
    {[[240, 150], [246, 176], [238, 204]].map(([x, y]) => <path key={y} d={`M${x} ${y} q-7 11 0 15 q7 -4 0 -15`} fill="#BFE7F5" />)}
    <Melati x={70} y={90} s={0.8} /><Melati x={232} y={70} s={0.6} />
  </Scene>,
  // Midodareni: melati
  <Scene key="1" id="1" bg="#3A1530" label="Ilustrasi bunga melati untuk midodareni">
    <Melati x={150} y={150} s={2} /><Melati x={70} y={80} s={1} /><Melati x={236} y={86} s={1.1} />
    <Melati x={80} y={226} s={1.1} /><Melati x={226} y={232} s={0.9} />
  </Scene>,
  // Akad: cincin
  <Scene key="2" id="2" bg="#12163A" label="Ilustrasi sepasang cincin untuk akad nikah">
    <circle cx="122" cy="160" r="54" fill="none" stroke="#F4B73F" strokeWidth="10" />
    <circle cx="178" cy="160" r="54" fill="none" stroke="#F4F1FF" strokeWidth="10" opacity=".9" />
    <polygon points="122,96 135,110 122,124 109,110" fill="#D4577A" />
  </Scene>,
  // Panggih: gunungan
  <Scene key="3" id="3" bg="#5A1E34" label="Ilustrasi gunungan wayang">
    <path d="M150 36 C176 80 238 120 238 232 L62 232 C62 120 124 80 150 36 Z" fill="#F4B73F" />
    <path d="M120 232 V172 C120 148 180 148 180 172 V232 Z" fill="#5A1E34" />
    <path d="M150 66 V132" stroke="#5A1E34" strokeWidth="4" />
    {[[150, 92], [136, 112], [164, 112]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="7" fill="#D4577A" />)}
    <rect x="50" y="232" width="200" height="10" fill="#F4B73F" />
  </Scene>,
  // Sungkeman: joglo
  <Scene key="4" id="4" bg="#1D2A5E" label="Ilustrasi rumah joglo">
    <polygon points="150,56 208,104 92,104" fill="#F4B73F" />
    <polygon points="76,104 224,104 256,150 44,150" fill="#E3A12F" />
    {[70, 118, 170, 218].map((x) => <rect key={x} x={x} y="150" width="12" height="80" fill="#F4F1FF" opacity=".9" />)}
    <rect x="130" y="172" width="40" height="58" fill="#12163A" />
    <rect x="44" y="230" width="212" height="12" fill="#F4B73F" />
    <rect x="74" y="242" width="152" height="8" fill="#E3A12F" />
  </Scene>,
  // Kirab: payung agung
  <Scene key="5" id="5" bg="#2B1B4A" label="Ilustrasi payung agung untuk kirab">
    <rect x="146" y="46" width="8" height="214" fill="#F4F1FF" />
    <circle cx="150" cy="42" r="8" fill="#F4B73F" />
    <path d="M48 170 A102 102 0 0 1 252 170 Z" fill="#F4B73F" />
    {[68, 88, 108, 128, 148, 168, 188, 208, 228].map((x) => <circle key={x} cx={x} cy="170" r="10" fill="#F4B73F" />)}
    <path d="M62 148 A88 88 0 0 1 238 148" fill="none" stroke="#B7791F" strokeWidth="3" />
    <path d="M84 124 A66 66 0 0 1 216 124" fill="none" stroke="#B7791F" strokeWidth="3" />
    {[68, 108, 188, 228].map((x) => (
      <g key={x}><path d={`M${x} 180 V212`} stroke="#D4577A" strokeWidth="3" /><circle cx={x} cy="216" r="5" fill="#D4577A" /></g>
    ))}
  </Scene>,
];
