/**
 * Royal Enfield-inspired Crest Logo for Rahul Enterprises.
 * Featuring metallic gold borders, concentric enamel rings, flanking motorcycle wings,
 * curved heritage lettering, and vintage serif "RE" monogram.
 */
const RELogo = ({ size = 180, withWings = true, className = '' }) => {
  // If withWings is true, viewBox is wider (400 x 240) to accommodate the wings.
  // If withWings is false, viewBox is circular (240 x 240).
  const viewBox = withWings ? "0 0 440 260" : "0 0 240 240";
  const cx = withWings ? 220 : 120;
  const cy = withWings ? 130 : 120;
  const r = 85;

  return (
    <svg
      width={size}
      height={withWings ? Math.round(size * 0.6) : size}
      viewBox={viewBox}
      className={`re-logo ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rahul Enterprises Royal Enfield-style RE Logo"
    >
      <defs>
        {/* Metallic Gold Primary Gradient */}
        <linearGradient id="reGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="25%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#aa7c11" />
          <stop offset="75%" stopColor="#f5d061" />
          <stop offset="100%" stopColor="#875f0a" />
        </linearGradient>

        {/* Bright Gold Rim Shimmer */}
        <linearGradient id="reGoldRim" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#875f0a" />
          <stop offset="30%" stopColor="#f5d061" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#735005" />
        </linearGradient>

        {/* Deep Cobalt Enamel Radial Gradient */}
        <radialGradient id="reCobaltEnamel" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#1e5ad8" />
          <stop offset="45%" stopColor="#0d2b75" />
          <stop offset="80%" stopColor="#06122e" />
          <stop offset="100%" stopColor="#030814" />
        </radialGradient>

        {/* Midnight Obsidian Gradient for Outer Ring */}
        <radialGradient id="reBlackTrack" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#162035" />
          <stop offset="60%" stopColor="#070a12" />
          <stop offset="100%" stopColor="#020408" />
        </radialGradient>

        {/* Drop shadow for 3D metallic feel */}
        <filter id="reShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#2563eb" floodOpacity="0.35" />
        </filter>

        {/* Monogram Inner Drop Shadow */}
        <filter id="reTextShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.9" />
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f5d061" floodOpacity="0.5" />
        </filter>

        {/* Top Arc Path for "RAHUL ENTERPRISES" */}
        <path
          id={`arcTop-${cx}`}
          d={`M ${cx - 65} ${cy} A 65 65 0 0 1 ${cx + 65} ${cy}`}
          fill="none"
        />

        {/* Bottom Arc Path for Heritage Subtitle */}
        <path
          id={`arcBottom-${cx}`}
          d={`M ${cx + 65} ${cy} A 65 65 0 0 1 ${cx - 65} ${cy}`}
          fill="none"
        />
      </defs>

      {/* ─── VINTAGE MOTORCYCLE WINGS (Flanking Medallion) ─── */}
      {withWings && (
        <g id="royal-wings" filter="url(#reShadow)">
          {/* Left Wing (Feathers spreading outward) */}
          <g transform={`translate(${cx - 80}, ${cy})`}>
            {/* Top Long Wing Blade */}
            <path
              d="M 0 -22 C -40 -35, -95 -38, -135 -15 C -105 -10, -50 -8, 0 -8 Z"
              fill="url(#reGold)"
              stroke="#543c05"
              strokeWidth="0.8"
            />
            {/* Middle Wing Feather 1 */}
            <path
              d="M 0 -8 C -45 -12, -90 -12, -125 5 C -95 6, -45 4, 0 4 Z"
              fill="url(#reGoldRim)"
              stroke="#543c05"
              strokeWidth="0.8"
            />
            {/* Middle Wing Feather 2 */}
            <path
              d="M 0 4 C -35 2, -75 6, -110 22 C -80 18, -35 12, 0 14 Z"
              fill="url(#reGold)"
              stroke="#543c05"
              strokeWidth="0.8"
            />
            {/* Lower Wing Feather 3 */}
            <path
              d="M 0 14 C -25 12, -55 18, -85 36 C -60 28, -25 20, 0 22 Z"
              fill="url(#reGoldRim)"
              stroke="#543c05"
              strokeWidth="0.8"
            />
          </g>

          {/* Right Wing (Mirrored horizontally) */}
          <g transform={`translate(${cx + 80}, ${cy}) scale(-1, 1)`}>
            {/* Top Long Wing Blade */}
            <path
              d="M 0 -22 C -40 -35, -95 -38, -135 -15 C -105 -10, -50 -8, 0 -8 Z"
              fill="url(#reGold)"
              stroke="#543c05"
              strokeWidth="0.8"
            />
            {/* Middle Wing Feather 1 */}
            <path
              d="M 0 -8 C -45 -12, -90 -12, -125 5 C -95 6, -45 4, 0 4 Z"
              fill="url(#reGoldRim)"
              stroke="#543c05"
              strokeWidth="0.8"
            />
            {/* Middle Wing Feather 2 */}
            <path
              d="M 0 4 C -35 2, -75 6, -110 22 C -80 18, -35 12, 0 14 Z"
              fill="url(#reGold)"
              stroke="#543c05"
              strokeWidth="0.8"
            />
            {/* Lower Wing Feather 3 */}
            <path
              d="M 0 14 C -25 12, -55 18, -85 36 C -60 28, -25 20, 0 22 Z"
              fill="url(#reGoldRim)"
              stroke="#543c05"
              strokeWidth="0.8"
            />
          </g>
        </g>
      )}

      {/* ─── CENTRAL MEDALLION / TANK BADGE ─── */}
      <g filter="url(#reShadow)">
        {/* Outer Heavy Gold Bezel Ring */}
        <circle cx={cx} cy={cy} r={r} fill="url(#reGoldRim)" stroke="#543c05" strokeWidth="1.5" />

        {/* Coin Edge Notches / Decorative Studs around Perimeter */}
        <circle
          cx={cx}
          cy={cy}
          r={r - 4}
          fill="none"
          stroke="#422f02"
          strokeWidth="3"
          strokeDasharray="2, 5.5"
        />

        {/* Black Enamel Track for Inscribed Lettering */}
        <circle cx={cx} cy={cy} r={r - 7} fill="url(#reBlackTrack)" stroke="url(#reGold)" strokeWidth="1.2" />

        {/* Inner Gold Beaded Border */}
        <circle cx={cx} cy={cy} r={r - 28} fill="none" stroke="url(#reGoldRim)" strokeWidth="2.5" />
        <circle
          cx={cx}
          cy={cy}
          r={r - 31}
          fill="none"
          stroke="#735005"
          strokeWidth="1.5"
          strokeDasharray="2.5, 3.5"
        />

        {/* Central Royal Cobalt Enamel Core */}
        <circle cx={cx} cy={cy} r={r - 33} fill="url(#reCobaltEnamel)" stroke="url(#reGold)" strokeWidth="1" />

        {/* Sunburst Star Highlight Behind Monogram */}
        <g opacity="0.3" stroke="url(#reGold)" strokeWidth="0.7">
          <line x1={cx} y1={cy - 48} x2={cx} y2={cy + 48} />
          <line x1={cx - 48} y1={cy} x2={cx + 48} y2={cy} />
          <line x1={cx - 34} y1={cy - 34} x2={cx + 34} y2={cy + 34} />
          <line x1={cx - 34} y1={cy + 34} x2={cx + 34} y2={cy - 34} />
        </g>

        {/* ── CURVED HERITAGE TEXT (Royal Enfield Style Typography) ── */}
        <text
          fill="url(#reGold)"
          fontSize="9.5"
          fontWeight="900"
          fontFamily="'Cinzel', 'Times New Roman', 'Georgia', serif"
          letterSpacing="0.22em"
          style={{ textAnchor: 'middle' }}
        >
          <textPath href={`#arcTop-${cx}`} startOffset="50%">
            RAHUL ENTERPRISES
          </textPath>
        </text>

        <text
          fill="url(#reGoldRim)"
          fontSize="8"
          fontWeight="800"
          fontFamily="'Cinzel', 'Times New Roman', 'Georgia', serif"
          letterSpacing="0.18em"
          style={{ textAnchor: 'middle' }}
        >
          <textPath href={`#arcBottom-${cx}`} startOffset="50%">
            ★ MERN STACK DEV ★
          </textPath>
        </text>

        {/* ── VINTAGE CROWN / THREE CHEVRONS (Atop the Monogram) ── */}
        <g transform={`translate(${cx}, ${cy - 30})`} fill="url(#reGold)" filter="url(#reTextShadow)">
          {/* Royal Crown Motif */}
          <path d="M -9 4 L -11 -4 L -5 -1 L 0 -7 L 5 -1 L 11 -4 L 9 4 Z" />
          <circle cx="0" cy="-8.5" r="1.3" />
          <circle cx="-11" cy="-5" r="1" />
          <circle cx="11" cy="-5" r="1" />
        </g>

        {/* ── THE ICONIC ROYAL ENFIELD-STYLE "R E" MONOGRAM ── */}
        {/* Intricately sculpted vintage serif interlocking letters with drop shadow */}
        <g filter="url(#reTextShadow)">
          {/* THE LETTER "R" (Bold flared serifs, classical sweeping motorcycle tail) */}
          <path
            d={`
              M ${cx - 28} ${cy - 18}
              L ${cx - 9} ${cy - 18}
              C ${cx} ${cy - 18}, ${cx + 7} ${cy - 14}, ${cx + 7} ${cy - 6}
              C ${cx + 7} ${cy + 1}, ${cx + 1} ${cy + 5}, ${cx - 8} ${cy + 6}
              L ${cx + 9} ${cy + 22}
              L ${cx + 1} ${cy + 22}
              L ${cx - 13} ${cy + 6}
              L ${cx - 18} ${cy + 6}
              L ${cx - 18} ${cy + 22}
              L ${cx - 28} ${cy + 22}
              Z
              M ${cx - 18} ${cy - 11}
              L ${cx - 18} ${cy}
              L ${cx - 9} ${cy}
              C ${cx - 4} ${cy}, ${cx - 1} ${cy - 2}, ${cx - 1} ${cy - 5.5}
              C ${cx - 1} ${cy - 9}, ${cx - 4} ${cy - 11}, ${cx - 9} ${cy - 11}
              Z
            `}
            fill="url(#reGoldRim)"
            stroke="#422f02"
            strokeWidth="0.8"
          />

          {/* THE LETTER "E" (Interlocking with R's tail, classical slab serifs) */}
          <path
            d={`
              M ${cx + 3} ${cy - 18}
              L ${cx + 27} ${cy - 18}
              L ${cx + 27} ${cy - 11}
              L ${cx + 13} ${cy - 11}
              L ${cx + 13} ${cy - 3}
              L ${cx + 23} ${cy - 3}
              L ${cx + 23} ${cy + 3}
              L ${cx + 13} ${cy + 3}
              L ${cx + 13} ${cy + 15}
              L ${cx + 28} ${cy + 15}
              L ${cx + 28} ${cy + 22}
              L ${cx + 3} ${cy + 22}
              Z
            `}
            fill="url(#reGold)"
            stroke="#422f02"
            strokeWidth="0.8"
          />

          {/* Center Chisel Highlight Line on Monogram */}
          <path
            d={`
              M ${cx - 23} ${cy - 15} L ${cx - 23} ${cy + 19}
              M ${cx + 8} ${cy - 15} L ${cx + 8} ${cy + 19}
            `}
            stroke="#fff6cc"
            strokeWidth="0.9"
            opacity="0.6"
            fill="none"
          />
        </g>

        {/* Bottom Banner Ribbon / "ESTD 2026" */}
        <g transform={`translate(${cx}, ${cy + 28})`} filter="url(#reTextShadow)">
          <rect
            x="-24"
            y="-6"
            width="48"
            height="12"
            rx="3"
            fill="#060c1c"
            stroke="url(#reGold)"
            strokeWidth="1"
          />
          <text
            x="0"
            y="3"
            fill="url(#reGoldRim)"
            fontSize="7"
            fontWeight="900"
            fontFamily="'Cinzel', serif"
            letterSpacing="0.12em"
            textAnchor="middle"
          >
            SINCE 2026
          </text>
        </g>
      </g>
    </svg>
  );
};

export default RELogo;
