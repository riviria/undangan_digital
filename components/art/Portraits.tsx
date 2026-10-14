const stroke = { fill: 'none', strokeLinecap: 'round' as const };

export function GroomArt() {
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax slice" className="h-full w-full" role="img" aria-label="Ilustrasi mempelai pria memakai blangkon dan beskap">
      <circle cx="100" cy="125" r="92" fill="#F4B73F" opacity=".12" />
      {/* beskap */}
      <path d="M14 260 C14 208 52 192 100 192 C148 192 186 208 186 260 Z" fill="#1B2150" stroke="#F4B73F" strokeOpacity=".5" />
      <rect x="87" y="160" width="26" height="36" rx="8" fill="#C98B52" />
      <rect x="84" y="186" width="32" height="9" rx="4" fill="#F4B73F" />
      {[207, 222, 237].map((y) => <circle key={y} cx="100" cy={y} r="2.6" fill="#F4B73F" />)}
      {/* rangkaian melati */}
      <path d="M58 200 C66 252 134 252 142 200" stroke="#F4F1FF" strokeWidth="5" strokeDasharray="0 7" {...stroke} />
      {/* wajah */}
      <ellipse cx="67" cy="128" rx="5" ry="9" fill="#C98B52" />
      <ellipse cx="133" cy="128" rx="5" ry="9" fill="#C98B52" />
      <ellipse cx="100" cy="126" rx="33" ry="41" fill="#D79A5E" />
      {/* blangkon */}
      <path d="M65 112 C62 74 80 56 100 56 C120 56 138 74 135 112 C126 98 114 94 100 94 C86 94 74 98 65 112 Z" fill="#3A2216" />
      <path d="M65 112 C74 98 86 94 100 94 C114 94 126 98 135 112 L135 119 C126 105 114 101 100 101 C86 101 74 105 65 119 Z" fill="#F4B73F" />
      {[[84, 76], [100, 70], [116, 76], [92, 86], [108, 86]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" fill="#F4B73F" opacity=".7" />)}
      <path d="M80 118 q8 -5 16 -1 M104 117 q8 -4 16 1" stroke="#2A1810" strokeWidth="2.5" {...stroke} />
      <path d="M82 127 q7 5 14 0 M104 127 q7 5 14 0" stroke="#2A1810" strokeWidth="2.2" {...stroke} />
      <path d="M100 130 q-4 10 1 13" stroke="#A8693A" strokeWidth="2" {...stroke} />
      <path d="M89 147 q11 -5 22 0" stroke="#2A1810" strokeWidth="2.5" {...stroke} />
      <path d="M92 153 q8 5 16 0" stroke="#7A2E2E" strokeWidth="2.5" {...stroke} />
    </svg>
  );
}

export function BrideArt() {
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax slice" className="h-full w-full" role="img" aria-label="Ilustrasi mempelai wanita memakai kebaya dan sanggul dengan melati">
      <circle cx="100" cy="125" r="92" fill="#D4577A" opacity=".16" />
      <ellipse cx="100" cy="118" rx="44" ry="54" fill="#17101A" />
      {/* kebaya */}
      <path d="M14 260 C14 210 52 194 100 194 C148 194 186 210 186 260 Z" fill="#8E2C4C" stroke="#F4B73F" strokeOpacity=".5" />
      <rect x="87" y="162" width="26" height="36" rx="8" fill="#DDA06A" />
      <path d="M74 194 C84 218 116 218 126 194 Z" fill="#DDA06A" />
      <path d="M72 194 Q100 236 128 194" stroke="#F4B73F" strokeWidth="3" {...stroke} />
      <path d="M84 200 Q100 224 116 200" stroke="#F4B73F" strokeWidth="3" strokeDasharray="1 5" {...stroke} />
      {/* roncean melati */}
      <path d="M66 74 C46 118 50 168 58 204" stroke="#F4F1FF" strokeWidth="5" strokeDasharray="0 7" {...stroke} />
      <path d="M134 74 C154 118 150 168 142 204" stroke="#F4F1FF" strokeWidth="5" strokeDasharray="0 7" {...stroke} />
      {/* sanggul */}
      <ellipse cx="100" cy="58" rx="34" ry="26" fill="#17101A" />
      {/* wajah */}
      <ellipse cx="100" cy="128" rx="32" ry="40" fill="#E3AE72" />
      <path d="M69 112 C76 90 124 90 131 112 C124 102 112 98 100 98 C88 98 76 102 69 112 Z" fill="#17101A" />
      <path d="M80 110 Q86 102 92 108 Q100 98 108 108 Q114 102 120 110" stroke="#0A060B" strokeWidth="3" {...stroke} />
      <circle cx="100" cy="102" r="2.2" fill="#F4B73F" />
      <path d="M82 119 q7 -4 14 -1 M104 118 q7 -3 14 1" stroke="#2A1810" strokeWidth="2.2" {...stroke} />
      <path d="M83 129 q6 4.5 12 0 M105 129 q6 4.5 12 0" stroke="#2A1810" strokeWidth="2.2" {...stroke} />
      <path d="M100 132 q-3 9 1 12" stroke="#B9783F" strokeWidth="2" {...stroke} />
      <path d="M91 150 q9 7 18 0 q-9 -3 -18 0z" fill="#B5304F" />
      <circle cx="82" cy="142" r="5" fill="#E57F8F" opacity=".35" />
      <circle cx="118" cy="142" r="5" fill="#E57F8F" opacity=".35" />
      <circle cx="68" cy="140" r="3.5" fill="#F4B73F" />
      <circle cx="132" cy="140" r="3.5" fill="#F4B73F" />
      {/* hiasan sanggul */}
      {[[76, 50], [100, 40], [124, 50], [88, 68], [112, 68]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#F4B73F" />)}
      {[[64, 62], [136, 62]].map(([x, y]) => (
        <g key={x}><circle cx={x} cy={y} r="6" fill="#F4F1FF" /><circle cx={x} cy={y} r="2" fill="#F4B73F" /></g>
      ))}
    </svg>
  );
}
