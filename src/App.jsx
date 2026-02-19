import { useState, useEffect, useRef } from "react";

// ===== ROMANIAN ZONE DATA =====
const JUDETE_ZAPADA = {
  "Alba": 1.5, "Arad": 1.5, "Argeș": 2.0, "Bacău": 2.0, "Bihor": 1.5,
  "Bistrița-Năsăud": 2.0, "Botoșani": 2.0, "Brașov": 2.5, "Brăila": 1.5,
  "Buzău": 2.0, "Caraș-Severin": 1.5, "Călărași": 1.5, "Cluj": 2.0,
  "Constanța": 1.5, "Covasna": 2.5, "Dâmbovița": 2.0, "Dolj": 1.5,
  "Galați": 1.5, "Giurgiu": 1.5, "Gorj": 1.5, "Harghita": 2.5,
  "Hunedoara": 2.0, "Ialomița": 1.5, "Iași": 2.0, "Ilfov": 1.5,
  "Maramureș": 2.0, "Mehedinți": 1.5, "Mureș": 2.0, "Neamț": 2.5,
  "Olt": 1.5, "Prahova": 2.0, "Satu Mare": 1.5, "Sălaj": 1.5,
  "Sibiu": 2.0, "Suceava": 2.5, "Teleorman": 1.5, "Timiș": 1.5,
  "Tulcea": 1.5, "Vaslui": 2.0, "Vâlcea": 2.0, "Vrancea": 2.0, "București": 1.5
};

const JUDETE_VANT = {
  "Alba": 0.4, "Arad": 0.5, "Argeș": 0.4, "Bacău": 0.5, "Bihor": 0.5,
  "Bistrița-Năsăud": 0.4, "Botoșani": 0.5, "Brașov": 0.4, "Brăila": 0.5,
  "Buzău": 0.5, "Caraș-Severin": 0.4, "Călărași": 0.5, "Cluj": 0.4,
  "Constanța": 0.6, "Covasna": 0.4, "Dâmbovița": 0.4, "Dolj": 0.5,
  "Galați": 0.5, "Giurgiu": 0.5, "Gorj": 0.4, "Harghita": 0.4,
  "Hunedoara": 0.4, "Ialomița": 0.5, "Iași": 0.5, "Ilfov": 0.5,
  "Maramureș": 0.4, "Mehedinți": 0.5, "Mureș": 0.4, "Neamț": 0.4,
  "Olt": 0.5, "Prahova": 0.5, "Satu Mare": 0.5, "Sălaj": 0.4,
  "Sibiu": 0.4, "Suceava": 0.4, "Teleorman": 0.5, "Timiș": 0.5,
  "Tulcea": 0.6, "Vaslui": 0.5, "Vâlcea": 0.4, "Vrancea": 0.5, "București": 0.5
};

const JUDETE_SEISMIC = {
  "Alba": { ag: 0.15, Tc: 0.7, oras: "Alba Iulia" },
  "Arad": { ag: 0.10, Tc: 0.7, oras: "Arad" },
  "Argeș": { ag: 0.25, Tc: 1.0, oras: "Pitești" },
  "Bacău": { ag: 0.30, Tc: 0.7, oras: "Bacău" },
  "Bihor": { ag: 0.10, Tc: 0.7, oras: "Oradea" },
  "Bistrița-Năsăud": { ag: 0.15, Tc: 0.7, oras: "Bistrița" },
  "Botoșani": { ag: 0.20, Tc: 0.7, oras: "Botoșani" },
  "Brașov": { ag: 0.25, Tc: 0.7, oras: "Brașov" },
  "Brăila": { ag: 0.30, Tc: 1.0, oras: "Brăila" },
  "Buzău": { ag: 0.35, Tc: 1.0, oras: "Buzău" },
  "Caraș-Severin": { ag: 0.15, Tc: 0.7, oras: "Reșița" },
  "Călărași": { ag: 0.25, Tc: 1.6, oras: "Călărași" },
  "Cluj": { ag: 0.10, Tc: 0.7, oras: "Cluj-Napoca" },
  "Constanța": { ag: 0.15, Tc: 1.0, oras: "Constanța" },
  "Covasna": { ag: 0.25, Tc: 0.7, oras: "Sfântu Gheorghe" },
  "Dâmbovița": { ag: 0.25, Tc: 1.0, oras: "Târgoviște" },
  "Dolj": { ag: 0.20, Tc: 1.0, oras: "Craiova" },
  "Galați": { ag: 0.25, Tc: 1.0, oras: "Galați" },
  "Giurgiu": { ag: 0.20, Tc: 1.6, oras: "Giurgiu" },
  "Gorj": { ag: 0.15, Tc: 0.7, oras: "Târgu Jiu" },
  "Harghita": { ag: 0.20, Tc: 0.7, oras: "Miercurea Ciuc" },
  "Hunedoara": { ag: 0.10, Tc: 0.7, oras: "Deva" },
  "Ialomița": { ag: 0.25, Tc: 1.6, oras: "Slobozia" },
  "Iași": { ag: 0.25, Tc: 0.7, oras: "Iași" },
  "Ilfov": { ag: 0.30, Tc: 1.6, oras: "Buftea" },
  "Maramureș": { ag: 0.15, Tc: 0.7, oras: "Baia Mare" },
  "Mehedinți": { ag: 0.15, Tc: 0.7, oras: "Drobeta-Turnu Severin" },
  "Mureș": { ag: 0.15, Tc: 0.7, oras: "Târgu Mureș" },
  "Neamț": { ag: 0.20, Tc: 0.7, oras: "Piatra Neamț" },
  "Olt": { ag: 0.20, Tc: 1.0, oras: "Slatina" },
  "Prahova": { ag: 0.30, Tc: 1.0, oras: "Ploiești" },
  "Satu Mare": { ag: 0.10, Tc: 0.7, oras: "Satu Mare" },
  "Sălaj": { ag: 0.10, Tc: 0.7, oras: "Zalău" },
  "Sibiu": { ag: 0.15, Tc: 0.7, oras: "Sibiu" },
  "Suceava": { ag: 0.20, Tc: 0.7, oras: "Suceava" },
  "Teleorman": { ag: 0.20, Tc: 1.0, oras: "Alexandria" },
  "Timiș": { ag: 0.20, Tc: 0.7, oras: "Timișoara" },
  "Tulcea": { ag: 0.20, Tc: 1.0, oras: "Tulcea" },
  "Vaslui": { ag: 0.30, Tc: 0.7, oras: "Vaslui" },
  "Vâlcea": { ag: 0.20, Tc: 1.0, oras: "Râmnicu Vâlcea" },
  "Vrancea": { ag: 0.35, Tc: 1.0, oras: "Focșani" },
  "București": { ag: 0.30, Tc: 1.6, oras: "București" }
};

const MATERIALE_DEFAULT = [
  { id: "m1", name: "Beton armat", density: 25, unit: "kN/m³" },
  { id: "m2", name: "Oțel", density: 78.5, unit: "kN/m³" },
  { id: "m3", name: "Zidărie cărămidă", density: 18, unit: "kN/m³" },
  { id: "m4", name: "Zidărie BCA", density: 7, unit: "kN/m³" },
  { id: "m5", name: "Mortar ciment", density: 21, unit: "kN/m³" },
  { id: "m6", name: "Șapă ciment", density: 22, unit: "kN/m³" },
  { id: "m7", name: "Lemn (rășinoase)", density: 5, unit: "kN/m³" },
  { id: "m8", name: "Pardoseală ceramică", density: 22, unit: "kN/m³" },
  { id: "m9", name: "Hidroizolație bituminoasă", density: 12, unit: "kN/m³" },
  { id: "m10", name: "Termoizolație polistiren", density: 0.3, unit: "kN/m³" },
  { id: "m11", name: "Tablă cutată", density: 0.12, unit: "kN/m²" },
  { id: "m12", name: "Țiglă ceramică", density: 0.50, unit: "kN/m²" }
];

const CLASE_IMPORTANTA = [
  { cls: "I", gamma: 1.4, desc: "Clădiri esențiale (spitale, pompieri)" },
  { cls: "II", gamma: 1.2, desc: "Clădiri aglomerate (școli, săli)" },
  { cls: "III", gamma: 1.0, desc: "Clădiri curente (locuințe, birouri)" },
  { cls: "IV", gamma: 0.8, desc: "Clădiri temporare, agricole" }
];

const CATEGORII_TEREN = [
  { cat: "0", z0: 0.003, zmin: 1, desc: "Mare deschisă, lacuri" },
  { cat: "I", z0: 0.01, zmin: 1, desc: "Teren plat, vegetație rară" },
  { cat: "II", z0: 0.05, zmin: 2, desc: "Vegetație joasă, obstacole izolate" },
  { cat: "III", z0: 0.3, zmin: 5, desc: "Vegetație/clădiri regulate (suburbii)" },
  { cat: "IV", z0: 1.0, zmin: 10, desc: "Minim 15% acoperit cu clădiri >15m" }
];

// ===== ICONS =====
const Icons = {
  Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/></svg>,
  Snow: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>,
  Wind: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>,
  Seismic: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="2 12 6 12 8 4 12 20 16 8 18 12 22 12"/></svg>,
  Layers: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Combo: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>,
  Document: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
};

// ===== COMPONENTS =====
const Input = ({ label, value, onChange, type = "text", suffix, small, disabled }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: small ? "0 0 auto" : 1 }}>
    {label && <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{label}</label>}
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
        disabled={disabled}
        style={{
          background: disabled ? "#1e293b" : "#0f172a", border: "1px solid #334155", borderRadius: 6,
          padding: "8px 12px", color: "#e2e8f0", fontSize: 13, width: small ? 80 : "100%",
          outline: "none", opacity: disabled ? 0.6 : 1
        }}
      />
      {suffix && <span style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>{suffix}</span>}
    </div>
  </div>
);

const Select = ({ label, value, onChange, options, disabled }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
    {label && <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{label}</label>}
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      style={{
        background: "#0f172a", border: "1px solid #334155", borderRadius: 6,
        padding: "8px 12px", color: "#e2e8f0", fontSize: 13, outline: "none"
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Card = ({ children, title, accent }) => (
  <div style={{
    background: "#1e293b", borderRadius: 10, border: "1px solid #334155",
    borderTop: accent ? `3px solid ${accent}` : undefined, overflow: "hidden"
  }}>
    {title && (
      <div style={{
        padding: "12px 16px", borderBottom: "1px solid #334155", fontWeight: 600, fontSize: 14, color: "#f1f5f9",
        background: accent ? accent + "15" : undefined
      }}>
        {title}
      </div>
    )}
    <div style={{ padding: 16 }}>{children}</div>
  </div>
);

const Btn = ({ children, onClick, variant = "primary", small, disabled, style: extraStyle }) => {
  const styles = {
    primary: { background: "#3b82f6", color: "#fff" },
    danger: { background: "#ef4444", color: "#fff" },
    ghost: { background: "transparent", color: "#94a3b8", border: "1px solid #334155" },
    success: { background: "#10b981", color: "#fff" }
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant], borderRadius: 6, border: "none", cursor: disabled ? "not-allowed" : "pointer",
        padding: small ? "4px 10px" : "8px 16px", fontSize: small ? 12 : 13, fontWeight: 500,
        display: "inline-flex", alignItems: "center", gap: 6, opacity: disabled ? 0.5 : 1,
        transition: "all 0.15s", ...extraStyle
      }}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, color = "#3b82f6" }) => (
  <span style={{
    background: color + "20", color, fontSize: 11, fontWeight: 600,
    padding: "2px 8px", borderRadius: 20
  }}>{children}</span>
);

// ===== MAIN APP =====
export default function StructCalcAI() {
  const [tab, setTab] = useState("project");
  const [project, setProject] = useState({
    name: "", judet: "București", tipCladire: "locuinta",
    H: 10, L: 20, B: 12, nrEtaje: 3, clasaImp: "III"
  });
  const [layers, setLayers] = useState([
    { id: "l1", material: "Pardoseală ceramică", density: 22, thickness: 0.02, unit: "kN/m³" },
    { id: "l2", material: "Șapă ciment", density: 22, thickness: 0.05, unit: "kN/m³" },
    { id: "l3", material: "Beton armat", density: 25, thickness: 0.15, unit: "kN/m³" }
  ]);
  const [snowParams, setSnowParams] = useState({ roofType: "plat", mu: 0.8, Ce: 1.0, Ct: 1.0 });
  const [windParams, setWindParams] = useState({ catTeren: "III", co: 1.0 });
  const [seismicParams, setSeismicParams] = useState({ q: 3.5, eta: 1.0, beta0: 2.5, customAg: null, customTc: null });
  const [normLib, setNormLib] = useState([]);

  // Load saved normatives from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("structcalc_norms");
      if (saved) setNormLib(JSON.parse(saved));
    } catch (e) { /* first use */ }
  }, []);

  const saveNorms = (norms) => {
    setNormLib(norms);
    try { localStorage.setItem("structcalc_norms", JSON.stringify(norms)); } catch (e) {}
  };

  // ===== CALCULATIONS =====
  const s0k = JUDETE_ZAPADA[project.judet] || 1.5;
  const qb = JUDETE_VANT[project.judet] || 0.5;
  const seismicZoneBase = JUDETE_SEISMIC[project.judet] || { ag: 0.20, Tc: 1.0 };
  const seismicZone = {
    ...seismicZoneBase,
    ag: seismicParams.customAg !== null ? seismicParams.customAg : seismicZoneBase.ag,
    Tc: seismicParams.customTc !== null ? seismicParams.customTc : seismicZoneBase.Tc
  };
  const gammaI = CLASE_IMPORTANTA.find(c => c.cls === project.clasaImp)?.gamma || 1.0;

  // Permanent loads
  const totalG = layers.reduce((sum, l) => {
    const g = l.unit === "kN/m²" ? l.density : l.density * l.thickness;
    return sum + g;
  }, 0);

  // Snow
  const snowLoad = snowParams.mu * snowParams.Ce * snowParams.Ct * s0k;

  // Wind
  const terenCat = CATEGORII_TEREN.find(c => c.cat === windParams.catTeren) || CATEGORII_TEREN[2];
  const z = Math.max(project.H, terenCat.zmin);
  const kr = 0.19 * Math.pow(terenCat.z0 / 0.05, 0.07);
  const crz = kr * Math.log(z / terenCat.z0);
  const qpz = qb * (1 + 7 * kr / (crz * windParams.co)) * crz * crz * windParams.co * windParams.co;

  // Seismic spectrum
  const getSpectralAccel = (T) => {
    const ag = seismicZone.ag;
    const Tc = seismicZone.Tc;
    const Tb = Tc / 3;
    const Td = 2.0;
    const b0 = seismicParams.beta0;
    const eta = seismicParams.eta;
    if (T === 0) return ag * b0 * gammaI;
    if (T < Tb) return ag * gammaI * (1 + (b0 * eta - 1) * T / Tb);
    if (T <= Tc) return ag * b0 * eta * gammaI;
    if (T <= Td) return ag * b0 * eta * gammaI * (Tc / T);
    return ag * b0 * eta * gammaI * (Tc * Td / (T * T));
  };

  // ===== COMBINATIONS (EN 1990) =====
  const combinations = (() => {
    const G = totalG;
    const S = snowLoad;
    const W = qpz;
    const gammaG_sup = 1.35, gammaG_inf = 1.0, gammaQ = 1.5;
    const psi0_snow = 0.5, psi0_wind = 0.6;
    const psi1_snow = 0.2, psi1_wind = 0.2;
    const psi2_snow = 0.0, psi2_wind = 0.0;

    return {
      uls: [
        { name: "ULS 1: G + S (dominant)", value: gammaG_sup * G + gammaQ * S + gammaQ * psi0_wind * W, formula: `${gammaG_sup}×${G.toFixed(2)} + ${gammaQ}×${S.toFixed(2)} + ${gammaQ}×${psi0_wind}×${W.toFixed(3)}` },
        { name: "ULS 2: G + W (dominant)", value: gammaG_sup * G + gammaQ * W + gammaQ * psi0_snow * S, formula: `${gammaG_sup}×${G.toFixed(2)} + ${gammaQ}×${W.toFixed(3)} + ${gammaQ}×${psi0_snow}×${S.toFixed(2)}` },
        { name: "ULS 3: G minim", value: gammaG_inf * G, formula: `${gammaG_inf}×${G.toFixed(2)}` }
      ],
      sls_freq: [
        { name: "SLS Frecventă (S dom.)", value: G + psi1_snow * S + psi2_wind * W, formula: `${G.toFixed(2)} + ${psi1_snow}×${S.toFixed(2)} + ${psi2_wind}×${W.toFixed(3)}` },
        { name: "SLS Frecventă (W dom.)", value: G + psi1_wind * W + psi2_snow * S, formula: `${G.toFixed(2)} + ${psi1_wind}×${W.toFixed(3)} + ${psi2_snow}×${S.toFixed(2)}` }
      ],
      sls_qp: [
        { name: "SLS Quasi-permanentă", value: G + psi2_snow * S + psi2_wind * W, formula: `${G.toFixed(2)} + ${psi2_snow}×${S.toFixed(2)} + ${psi2_wind}×${W.toFixed(3)}` }
      ]
    };
  })();

  // ===== SPECTRUM CHART =====
  const SpectrumChart = () => {
    const points = [];
    for (let T = 0; T <= 4; T += 0.05) {
      points.push({ T: T.toFixed(2), Sa: getSpectralAccel(T) });
    }
    const maxSa = Math.max(...points.map(p => p.Sa));
    const w = 500, h = 200, px = 50, py = 20;
    const cw = w - 2 * px, ch = h - 2 * py;

    const pathD = points.map((p, i) => {
      const x = px + (p.T / 4) * cw;
      const y = py + ch - (p.Sa / (maxSa * 1.1)) * ch;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    }).join(" ");

    return (
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxWidth: 500 }}>
        <defs>
          <linearGradient id="specGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={pathD + ` L${px + cw},${py + ch} L${px},${py + ch} Z`} fill="url(#specGrad)" />
        <path d={pathD} fill="none" stroke="#ef4444" strokeWidth="2" />
        <line x1={px} y1={py + ch} x2={px + cw} y2={py + ch} stroke="#475569" strokeWidth="1" />
        <line x1={px} y1={py} x2={px} y2={py + ch} stroke="#475569" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map(t => (
          <text key={t} x={px + (t / 4) * cw} y={h - 2} fill="#94a3b8" fontSize="10" textAnchor="middle">{t}s</text>
        ))}
        <text x={15} y={py + ch / 2} fill="#94a3b8" fontSize="10" textAnchor="middle" transform={`rotate(-90,15,${py + ch / 2})`}>Sa (g)</text>
        <line x1={px + (seismicZone.Tc / 4) * cw} y1={py} x2={px + (seismicZone.Tc / 4) * cw} y2={py + ch} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
        <text x={px + (seismicZone.Tc / 4) * cw} y={py - 4} fill="#f59e0b" fontSize="9" textAnchor="middle">Tc={seismicZone.Tc}s</text>
      </svg>
    );
  };

  // ===== TABS =====
  const tabs = [
    { id: "project", label: "Proiect", icon: <Icons.Building /> },
    { id: "permanent", label: "G", icon: <Icons.Layers /> },
    { id: "snow", label: "Zăpadă", icon: <Icons.Snow /> },
    { id: "wind", label: "Vânt", icon: <Icons.Wind /> },
    { id: "seismic", label: "Seismic", icon: <Icons.Seismic /> },
    { id: "combo", label: "Combinații", icon: <Icons.Combo /> },
    { id: "print", label: "Print", icon: <Icons.Document /> },
    { id: "contact", label: "Contact", icon: <Icons.Mail /> },
  ];

  // ===== RENDER SECTIONS =====
  const renderProject = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Date Generale" accent="#3b82f6">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input label="Denumire proiect" value={project.name} onChange={v => setProject(p => ({...p, name: v}))} />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Select label="Județ / Locație" value={project.judet} onChange={v => setProject(p => ({...p, judet: v}))}
              options={Object.keys(JUDETE_ZAPADA).map(j => ({ value: j, label: j }))} />
            <Select label="Tip clădire" value={project.tipCladire} onChange={v => setProject(p => ({...p, tipCladire: v}))}
              options={[
                { value: "locuinta", label: "Locuință" }, { value: "birou", label: "Clădire birouri" },
                { value: "comercial", label: "Comercial" }, { value: "industrial", label: "Industrial" },
                { value: "educatie", label: "Educație" }, { value: "sanatate", label: "Sănătate" }
              ]} />
            <Select label="Clasă importanță" value={project.clasaImp} onChange={v => setProject(p => ({...p, clasaImp: v}))}
              options={CLASE_IMPORTANTA.map(c => ({ value: c.cls, label: `${c.cls} — ${c.desc}` }))} />
          </div>
        </div>
      </Card>
      <Card title="Geometrie" accent="#8b5cf6">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input label="Înălțime H" value={project.H} onChange={v => setProject(p => ({...p, H: v}))} type="number" suffix="m" small />
          <Input label="Lungime L" value={project.L} onChange={v => setProject(p => ({...p, L: v}))} type="number" suffix="m" small />
          <Input label="Lățime B" value={project.B} onChange={v => setProject(p => ({...p, B: v}))} type="number" suffix="m" small />
          <Input label="Nr. etaje" value={project.nrEtaje} onChange={v => setProject(p => ({...p, nrEtaje: v}))} type="number" small />
        </div>
      </Card>
      <Card title="Parametri Zonali (automat din județ)" accent="#10b981">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { label: "Zăpadă s₀,k", value: `${s0k} kN/m²`, color: "#38bdf8" },
            { label: "Vânt qb", value: `${qb} kN/m²`, color: "#a78bfa" },
            { label: "Seismic ag", value: `${seismicZone.ag}g`, color: "#f87171" },
            { label: "Perioadă Tc", value: `${seismicZone.Tc}s`, color: "#fbbf24" },
            { label: "Ref. seismic", value: seismicZone.oras || project.judet, color: "#fb923c" },
            { label: "Factor γI", value: gammaI.toString(), color: "#34d399" }
          ].map(item => (
            <div key={item.label} style={{ background: "#0f172a", borderRadius: 8, padding: 12, borderLeft: `3px solid ${item.color}` }}>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{item.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPermanent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Straturi Constructive" accent="#f59e0b">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {layers.map((l, i) => (
            <div key={l.id} style={{ display: "flex", gap: 8, alignItems: "end", background: "#0f172a", padding: 10, borderRadius: 8 }}>
              <Select label={i === 0 ? "Material" : undefined} value={l.material}
                onChange={v => {
                  const mat = MATERIALE_DEFAULT.find(m => m.name === v);
                  setLayers(prev => prev.map((ll, ii) => ii === i ? {...ll, material: v, density: mat?.density || ll.density, unit: mat?.unit || ll.unit} : ll));
                }}
                options={MATERIALE_DEFAULT.map(m => ({ value: m.name, label: m.name }))} />
              <Input label={i === 0 ? "Densitate" : undefined} value={l.density} type="number"
                onChange={v => setLayers(prev => prev.map((ll, ii) => ii === i ? {...ll, density: v} : ll))} suffix={l.unit} small />
              {l.unit === "kN/m³" && (
                <Input label={i === 0 ? "Grosime" : undefined} value={l.thickness} type="number"
                  onChange={v => setLayers(prev => prev.map((ll, ii) => ii === i ? {...ll, thickness: v} : ll))} suffix="m" small />
              )}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
                {i === 0 && <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>g</label>}
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fbbf24", padding: "8px 0" }}>
                  {(l.unit === "kN/m²" ? l.density : l.density * l.thickness).toFixed(2)}
                </span>
              </div>
              <Btn variant="danger" small onClick={() => setLayers(prev => prev.filter((_, ii) => ii !== i))}>
                <Icons.Trash />
              </Btn>
            </div>
          ))}
          <Btn variant="ghost" onClick={() => setLayers(prev => [...prev, { id: "l" + Date.now(), material: "Beton armat", density: 25, thickness: 0.1, unit: "kN/m³" }])}>
            <Icons.Plus /> Adaugă strat
          </Btn>
        </div>
      </Card>
      <div style={{ background: "#0f172a", borderRadius: 10, padding: 20, textAlign: "center", border: "2px solid #f59e0b" }}>
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>TOTAL ÎNCĂRCARE PERMANENTĂ (G)</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#fbbf24" }}>{totalG.toFixed(2)} <span style={{ fontSize: 16 }}>kN/m²</span></div>
      </div>
    </div>
  );

  const renderSnow = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Parametri Zăpadă — CR 1-1-3" accent="#38bdf8">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, background: "#0f172a", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>s₀,k (din județ: {project.judet})</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#38bdf8" }}>{s0k} kN/m²</div>
            </div>
            <Select label="Tip acoperiș" value={snowParams.roofType}
              onChange={v => {
                const muMap = { plat: 0.8, simpanta: 0.8, dubla: 0.8, shed: 0.6 };
                setSnowParams(p => ({...p, roofType: v, mu: muMap[v] || 0.8}));
              }}
              options={[
                { value: "plat", label: "Plat (0° - 5°)" },
                { value: "simpanta", label: "Monopantă" },
                { value: "dubla", label: "Două ape" },
                { value: "shed", label: "Shed / Dinte de fierăstrău" }
              ]} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Input label="μi (coef. formă)" value={snowParams.mu} onChange={v => setSnowParams(p => ({...p, mu: v}))} type="number" small />
            <Input label="Ce (expunere)" value={snowParams.Ce} onChange={v => setSnowParams(p => ({...p, Ce: v}))} type="number" small />
            <Input label="Ct (termic)" value={snowParams.Ct} onChange={v => setSnowParams(p => ({...p, Ct: v}))} type="number" small />
          </div>
        </div>
      </Card>
      <div style={{ background: "#0f172a", borderRadius: 10, padding: 20, textAlign: "center", border: "2px solid #38bdf8" }}>
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>s = μi × Ce × Ct × s₀,k = {snowParams.mu} × {snowParams.Ce} × {snowParams.Ct} × {s0k}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#38bdf8" }}>{snowLoad.toFixed(2)} <span style={{ fontSize: 16 }}>kN/m²</span></div>
      </div>
    </div>
  );

  const renderWind = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Parametri Vânt — CR 1-1-4" accent="#a78bfa">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, background: "#0f172a", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>qb (din județ: {project.judet})</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#a78bfa" }}>{qb} kN/m²</div>
            </div>
            <Select label="Categoria de teren" value={windParams.catTeren}
              onChange={v => setWindParams(p => ({...p, catTeren: v}))}
              options={CATEGORII_TEREN.map(c => ({ value: c.cat, label: `${c.cat} — ${c.desc}` }))} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Input label="co(z) (orografie)" value={windParams.co} onChange={v => setWindParams(p => ({...p, co: v}))} type="number" small />
            <div style={{ flex: 1, background: "#0f172a", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>z₀ = {terenCat.z0}m, z_min = {terenCat.zmin}m, kr = {kr.toFixed(4)}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>cr(z) = {crz.toFixed(4)} (la z = {z.toFixed(1)}m)</div>
            </div>
          </div>
        </div>
      </Card>
      <div style={{ background: "#0f172a", borderRadius: 10, padding: 20, textAlign: "center", border: "2px solid #a78bfa" }}>
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>PRESIUNE LA VÂRF qp(z)</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#a78bfa" }}>{qpz.toFixed(3)} <span style={{ fontSize: 16 }}>kN/m²</span></div>
      </div>
    </div>
  );

  const renderSeismic = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Parametri Seismici — P100-1/2013" accent="#ef4444">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#0f172a", borderRadius: 8, padding: 10, border: "1px solid #334155", marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>
              📍 Localitate de referință: <strong style={{ color: "#f1f5f9" }}>{seismicZone.oras || project.judet}</strong> (jud. {project.judet})
            </div>
            <div style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>
              Conform P100-1/2013 | IMR = 225 ani | 20% probabilitate depășire în 50 ani | β₀ = 2.5
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
            {[
              { label: "ag", value: `${seismicZone.ag}g`, color: "#f87171", desc: "Accelerație teren" },
              { label: "Tc", value: `${seismicZone.Tc}s`, color: "#fbbf24", desc: "Perioadă colț" },
              { label: "γI", value: gammaI, color: "#34d399", desc: "Factor importanță" },
              { label: "Sd,max", value: `${(seismicZone.ag * seismicParams.beta0 * gammaI / seismicParams.q).toFixed(3)}g`, color: "#f472b6", desc: "Spectru proiectare max" }
            ].map(item => (
              <div key={item.label} style={{ background: "#0f172a", borderRadius: 8, padding: 12, borderLeft: `3px solid ${item.color}` }}>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{item.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 9, color: "#475569" }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Input label={`ag (implicit: ${seismicZoneBase.ag}g)`} value={seismicParams.customAg !== null ? seismicParams.customAg : seismicZoneBase.ag} onChange={v => setSeismicParams(p => ({...p, customAg: v}))} type="number" small />
            <Input label={`Tc (implicit: ${seismicZoneBase.Tc}s)`} value={seismicParams.customTc !== null ? seismicParams.customTc : seismicZoneBase.Tc} onChange={v => setSeismicParams(p => ({...p, customTc: v}))} type="number" small />
            <Input label="q (factor de comportare)" value={seismicParams.q} onChange={v => setSeismicParams(p => ({...p, q: v}))} type="number" small />
            <Input label="η (factor amortizare)" value={seismicParams.eta} onChange={v => setSeismicParams(p => ({...p, eta: v}))} type="number" small />
            <Input label="β₀ (amplificare max.)" value={seismicParams.beta0} onChange={v => setSeismicParams(p => ({...p, beta0: v}))} type="number" small />
          </div>
        </div>
      </Card>
      <Card title="Spectru Elastic de Răspuns — Se(T)">
        <SpectrumChart />
        <div style={{ fontSize: 10, color: "#64748b", marginTop: 8, lineHeight: 1.5 }}>
          Tb = Tc/3 = {(seismicZone.Tc / 3).toFixed(2)}s | Tc = {seismicZone.Tc}s | Td = 2.0s |
          Se,max = ag·β₀·η·γI = {(seismicZone.ag * seismicParams.beta0 * seismicParams.eta * gammaI).toFixed(3)}g
        </div>
      </Card>
    </div>
  );

  const renderCombinations = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Combinații ULS — EN 1990 (STR/GEO)" accent="#ef4444">
        {combinations.uls.map((c, i) => (
          <div key={i} style={{ background: "#0f172a", borderRadius: 8, padding: 12, marginBottom: 8, borderLeft: "3px solid #ef4444" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", marginTop: 2 }}>{c.formula}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#f87171" }}>{c.value.toFixed(2)} <span style={{ fontSize: 12 }}>kN/m²</span></div>
            </div>
          </div>
        ))}
      </Card>
      <Card title="Combinații SLS — Frecventă" accent="#3b82f6">
        {combinations.sls_freq.map((c, i) => (
          <div key={i} style={{ background: "#0f172a", borderRadius: 8, padding: 12, marginBottom: 8, borderLeft: "3px solid #3b82f6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", marginTop: 2 }}>{c.formula}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#60a5fa" }}>{c.value.toFixed(2)} <span style={{ fontSize: 12 }}>kN/m²</span></div>
            </div>
          </div>
        ))}
      </Card>
      <Card title="Combinații SLS — Quasi-permanentă" accent="#10b981">
        {combinations.sls_qp.map((c, i) => (
          <div key={i} style={{ background: "#0f172a", borderRadius: 8, padding: 12, borderLeft: "3px solid #10b981" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", marginTop: 2 }}>{c.formula}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#34d399" }}>{c.value.toFixed(2)} <span style={{ fontSize: 12 }}>kN/m²</span></div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );

  const renderContact = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingTop: 20 }}>
      <Card title="Personalizare și Consultanță" accent="#8b5cf6">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "12px 0" }}>
          <p style={{ fontSize: 14, color: "#94a3b8", textAlign: "center", lineHeight: 1.6, maxWidth: 480 }}>
            Dorești funcționalități personalizate, calcule suplimentare sau integrare în fluxul tău de proiectare?
          </p>
          <div style={{ background: "#0f172a", borderRadius: 10, padding: 20, border: "1px solid #334155", display: "flex", alignItems: "center", gap: 12 }}>
            <Icons.Mail />
            <div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>Contactează-mă la:</div>
              <a href="mailto:calin_pantis@yahoo.com" style={{ fontSize: 15, fontWeight: 600, color: "#8b5cf6", textDecoration: "none" }}>
                calin_pantis@yahoo.com
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPrint = () => {
    const tipCladireMap = { locuinta: "Locuință", birou: "Clădire birouri", comercial: "Comercial", industrial: "Industrial", educatie: "Educație", sanatate: "Sănătate" };
    const currentDate = new Date().toLocaleDateString("ro-RO", { year: "numeric", month: "long", day: "numeric" });
    const sdMax = (seismicZone.ag * seismicParams.beta0 * gammaI / seismicParams.q).toFixed(3);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="no-print" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Btn variant="primary" onClick={() => window.print()} style={{ gap: 8 }}>
            <Icons.Document /> Descarcă PDF
          </Btn>
        </div>

        <div id="print-report" className="print-area">
          {/* ANTET */}
          <div className="report-header" style={{ background: "#1e293b", borderRadius: 10, padding: 24, textAlign: "center", marginBottom: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 4, letterSpacing: 1 }}>MEMORIU TEHNIC — Evaluare Încărcări</h1>
            <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 2 }}>{project.name || "Proiect nedefinit"}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Județul {project.judet} • {currentDate}</div>
          </div>

          {/* 1. DATE GENERALE PROIECT */}
          <Card title="1. Date generale proiect" accent="#3b82f6">
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Denumire proiect", project.name || "—"],
                  ["Tip clădire", tipCladireMap[project.tipCladire] || project.tipCladire],
                  ["Clasă importanță", `${project.clasaImp} (γI = ${gammaI})`],
                  ["Județ / Locație", `${project.judet} (ref: ${seismicZone.oras || project.judet})`],
                  ["Înălțime H", `${project.H} m`],
                  ["Lungime L", `${project.L} m`],
                  ["Lățime B", `${project.B} m`],
                  ["Număr etaje", project.nrEtaje],
                ].map(([label, val], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                    <td style={{ padding: "8px 12px", color: "#94a3b8", fontWeight: 500, width: "45%" }}>{label}</td>
                    <td style={{ padding: "8px 12px", color: "#f1f5f9", fontWeight: 600 }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* 2. ÎNCĂRCĂRI PERMANENTE */}
          <div style={{ marginTop: 16 }}>
            <Card title="2. Încărcări permanente (G)" accent="#f59e0b">
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #475569" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left", color: "#94a3b8", fontWeight: 600 }}>Material</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", color: "#94a3b8", fontWeight: 600 }}>Densitate</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", color: "#94a3b8", fontWeight: 600 }}>Grosime</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", color: "#94a3b8", fontWeight: 600 }}>g (kN/m²)</th>
                  </tr>
                </thead>
                <tbody>
                  {layers.map((l, i) => {
                    const g = l.unit === "kN/m²" ? l.density : l.density * l.thickness;
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                        <td style={{ padding: "8px 12px", color: "#f1f5f9" }}>{l.material}</td>
                        <td style={{ padding: "8px 12px", textAlign: "right", color: "#e2e8f0" }}>{l.density} {l.unit}</td>
                        <td style={{ padding: "8px 12px", textAlign: "right", color: "#e2e8f0" }}>{l.unit === "kN/m³" ? `${l.thickness} m` : "—"}</td>
                        <td style={{ padding: "8px 12px", textAlign: "right", color: "#fbbf24", fontWeight: 700 }}>{g.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr style={{ borderTop: "2px solid #475569" }}>
                    <td colSpan={3} style={{ padding: "8px 12px", color: "#f1f5f9", fontWeight: 700 }}>TOTAL G</td>
                    <td style={{ padding: "8px 12px", textAlign: "right", color: "#fbbf24", fontWeight: 800, fontSize: 15 }}>{totalG.toFixed(2)} kN/m²</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          {/* 3. ZĂPADĂ */}
          <div style={{ marginTop: 16 }}>
            <Card title="3. Încărcarea din zăpadă — CR 1-1-3" accent="#38bdf8">
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["s₀,k (valoare caracteristică)", `${s0k} kN/m²`],
                    ["μi (coeficient de formă)", snowParams.mu],
                    ["Ce (coeficient de expunere)", snowParams.Ce],
                    ["Ct (coeficient termic)", snowParams.Ct],
                  ].map(([label, val], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                      <td style={{ padding: "8px 12px", color: "#94a3b8", width: "55%" }}>{label}</td>
                      <td style={{ padding: "8px 12px", color: "#f1f5f9", fontWeight: 600 }}>{val}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "2px solid #475569", background: "#0f172a" }}>
                    <td style={{ padding: "10px 12px", color: "#f1f5f9", fontWeight: 700 }}>s = μi × Ce × Ct × s₀,k</td>
                    <td style={{ padding: "10px 12px", color: "#38bdf8", fontWeight: 800, fontSize: 16 }}>{snowLoad.toFixed(2)} kN/m²</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          {/* 4. VÂNT */}
          <div style={{ marginTop: 16 }}>
            <Card title="4. Încărcarea din vânt — CR 1-1-4" accent="#a78bfa">
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["qb (presiune de referință)", `${qb} kN/m²`],
                    ["Categoria de teren", `${windParams.catTeren} — ${terenCat.desc}`],
                    ["z₀ (rugozitate)", `${terenCat.z0} m`],
                    ["kr (factor teren)", kr.toFixed(4)],
                    ["cr(z) (factor rugozitate)", `${crz.toFixed(4)} (la z = ${z.toFixed(1)} m)`],
                    ["co(z) (factor orografie)", windParams.co],
                  ].map(([label, val], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                      <td style={{ padding: "8px 12px", color: "#94a3b8", width: "55%" }}>{label}</td>
                      <td style={{ padding: "8px 12px", color: "#f1f5f9", fontWeight: 600 }}>{val}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "2px solid #475569", background: "#0f172a" }}>
                    <td style={{ padding: "10px 12px", color: "#f1f5f9", fontWeight: 700 }}>qp(z) — Presiune la vârf</td>
                    <td style={{ padding: "10px 12px", color: "#a78bfa", fontWeight: 800, fontSize: 16 }}>{qpz.toFixed(3)} kN/m²</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          {/* 5. SEISMIC */}
          <div style={{ marginTop: 16 }}>
            <Card title="5. Parametri seismici — P100-1/2013" accent="#ef4444">
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["Accelerație teren ag", `${seismicZone.ag}g`],
                    ["Perioadă colț Tc", `${seismicZone.Tc} s`],
                    ["Factor importanță γI", gammaI],
                    ["Factor de comportare q", seismicParams.q],
                    ["Factor amortizare η", seismicParams.eta],
                    ["Amplificare maximă β₀", seismicParams.beta0],
                  ].map(([label, val], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                      <td style={{ padding: "8px 12px", color: "#94a3b8", width: "55%" }}>{label}</td>
                      <td style={{ padding: "8px 12px", color: "#f1f5f9", fontWeight: 600 }}>{val}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "2px solid #475569", background: "#0f172a" }}>
                    <td style={{ padding: "10px 12px", color: "#f1f5f9", fontWeight: 700 }}>Sd,max (spectru proiectare)</td>
                    <td style={{ padding: "10px 12px", color: "#ef4444", fontWeight: 800, fontSize: 16 }}>{sdMax}g</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          {/* 6. COMBINAȚII */}
          <div style={{ marginTop: 16 }}>
            <Card title="6. Combinații de încărcări — EN 1990" accent="#f59e0b">
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f87171", marginBottom: 8 }}>ULS (STR/GEO)</div>
                <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #475569" }}>
                      <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8" }}>Combinație</th>
                      <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8" }}>Formulă</th>
                      <th style={{ padding: "6px 10px", textAlign: "right", color: "#94a3b8" }}>Valoare (kN/m²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinations.uls.map((c, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                        <td style={{ padding: "6px 10px", color: "#f1f5f9", fontWeight: 500 }}>{c.name}</td>
                        <td style={{ padding: "6px 10px", color: "#94a3b8", fontFamily: "monospace", fontSize: 11 }}>{c.formula}</td>
                        <td style={{ padding: "6px 10px", textAlign: "right", color: "#f87171", fontWeight: 700 }}>{c.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", marginBottom: 8 }}>SLS — Frecventă</div>
                <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #475569" }}>
                      <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8" }}>Combinație</th>
                      <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8" }}>Formulă</th>
                      <th style={{ padding: "6px 10px", textAlign: "right", color: "#94a3b8" }}>Valoare (kN/m²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinations.sls_freq.map((c, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                        <td style={{ padding: "6px 10px", color: "#f1f5f9", fontWeight: 500 }}>{c.name}</td>
                        <td style={{ padding: "6px 10px", color: "#94a3b8", fontFamily: "monospace", fontSize: 11 }}>{c.formula}</td>
                        <td style={{ padding: "6px 10px", textAlign: "right", color: "#60a5fa", fontWeight: 700 }}>{c.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#34d399", marginBottom: 8 }}>SLS — Quasi-permanentă</div>
                <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #475569" }}>
                      <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8" }}>Combinație</th>
                      <th style={{ padding: "6px 10px", textAlign: "left", color: "#94a3b8" }}>Formulă</th>
                      <th style={{ padding: "6px 10px", textAlign: "right", color: "#94a3b8" }}>Valoare (kN/m²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinations.sls_qp.map((c, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                        <td style={{ padding: "6px 10px", color: "#f1f5f9", fontWeight: 500 }}>{c.name}</td>
                        <td style={{ padding: "6px 10px", color: "#94a3b8", fontFamily: "monospace", fontSize: 11 }}>{c.formula}</td>
                        <td style={{ padding: "6px 10px", textAlign: "right", color: "#34d399", fontWeight: 700 }}>{c.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* FOOTER */}
          <div style={{ marginTop: 24, padding: "16px 0", borderTop: "1px solid #334155", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>Generat cu StructCalc • Data: {currentDate}</div>
          </div>
        </div>
      </div>
    );
  };

  const contentMap = {
    project: renderProject,
    permanent: renderPermanent,
    snow: renderSnow,
    wind: renderWind,
    seismic: renderSeismic,
    combo: renderCombinations,
    print: renderPrint,
    contact: renderContact
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#e2e8f0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1e293b", borderBottom: "1px solid #334155", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>SC</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>StructCalc</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>Evaluare încărcări • EN 1991 / P100-1/2013 (IMR=225 ani) / CR 1-1-3 / CR 1-1-4</div>
        </div>
        {project.name && <Badge color="#3b82f6">{project.name}</Badge>}
      </div>
      {/* Tabs */}
      <div style={{ background: "#1e293b", borderBottom: "1px solid #334155", display: "flex", overflowX: "auto", padding: "0 12px" }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: "none", border: "none", color: tab === t.id ? "#3b82f6" : "#94a3b8",
              padding: "10px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
              borderBottom: tab === t.id ? "2px solid #3b82f6" : "2px solid transparent",
              transition: "all 0.15s"
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
        {contentMap[tab]?.()}
      </div>
    </div>
  );
}
