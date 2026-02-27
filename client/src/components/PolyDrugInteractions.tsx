'use client';

import { useState, useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import polydrugData from '@/data/polydrug_extended.json';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BodySystems {
  respiratory: { score: number; evidence: string };
  cardiac: { score: number; evidence: string };
  hepatic: { score: number; evidence: string };
  neurological: { score: number; evidence: string };
  thermoregulatory: { score: number; evidence: string };
  renal: { score: number; evidence: string };
}

interface Interaction {
  risk_level: number;
  interaction_type: 'Dangerous' | 'Caution' | 'Low Risk';
  mechanism: string;
  evidence: string;
  citation: string;
  source_url: string;
  body_systems: BodySystems;
  dose_multiplier: number;
  threshold_interaction_dose: Record<string, string>;
  contraindications: string[];
}

interface PolydrugJson {
  interactions: Record<string, Record<string, Interaction>>;
  substance_dosage: Record<string, {
    threshold_dose: string;
    moderate_dose: string;
    high_dose: string;
    lethal_dose_reference: string;
    dose_unit: string;
  }>;
  body_weight_scaling: Record<string, { weight_dependent: boolean; note: string }>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_SUBSTANCES = [
  'Alcohol',
  'Benzodiazepines',
  'Cannabis',
  'Cocaine',
  'Ketamine',
  'Kratom',
  'LSD',
  'MDMA',
  'Nitrous_Oxide',
  'Opioids_(Heroin/Fentanyl)',
  'Psilocybin',
  'Suboxone',
  'Tramadol',
] as const;

type Substance = (typeof ALL_SUBSTANCES)[number];

const LABELS: Record<Substance, string> = {
  Alcohol: 'Alcohol',
  Benzodiazepines: 'Benzos',
  Cannabis: 'Cannabis',
  Cocaine: 'Cocaine',
  Ketamine: 'Ketamine',
  Kratom: 'Kratom',
  LSD: 'LSD',
  MDMA: 'MDMA',
  Nitrous_Oxide: 'Nitrous Oxide',
  'Opioids_(Heroin/Fentanyl)': 'Opioids Street',
  Psilocybin: 'Psilocybin',
  Suboxone: 'Suboxone',
  Tramadol: 'Tramadol',
};

// Colours cycle for up to 5 selected substances
const PALETTE = ['#06b6d4', '#d946ef', '#f59e0b', '#10b981', '#f43f5e'];

const AXES = [
  { key: 'respiratory', label: 'Respiratory' },
  { key: 'cardiac', label: 'Cardiac' },
  { key: 'hepatic', label: 'Hepatic' },
  { key: 'neurological', label: 'Neurological' },
  { key: 'thermoregulatory', label: 'Thermoregulatory' },
  { key: 'renal', label: 'Renal' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInteraction(
  data: PolydrugJson,
  a: Substance,
  b: Substance,
): Interaction | null {
  return (
    data.interactions[a]?.[b] ??
    data.interactions[b]?.[a] ??
    null
  );
}

function getRiskColor(level: number): string {
  if (level >= 7) return '#ef4444';
  if (level >= 4) return '#f59e0b';
  return '#10b981';
}

function getRiskLabel(level: number): string {
  if (level >= 7) return 'Dangerous';
  if (level >= 4) return 'Caution';
  return 'Low Risk';
}

/**
 * For a given pair of substances, aggregate body-system scores.
 * If more than 2 substances are selected, we average across all unique pairs.
 */
function buildRadarData(
  data: PolydrugJson,
  selected: Substance[],
): { subject: string; [key: string]: number | string }[] {
  if (selected.length < 2) return [];

  // Collect all unique pairs
  const pairs: [Substance, Substance][] = [];
  for (let i = 0; i < selected.length; i++) {
    for (let j = i + 1; j < selected.length; j++) {
      pairs.push([selected[i], selected[j]]);
    }
  }

  return AXES.map(({ key, label }) => {
    const entry: { subject: string; [k: string]: number | string } = { subject: label };
    pairs.forEach(([a, b], idx) => {
      const interaction = getInteraction(data, a, b);
      const score = interaction?.body_systems?.[key as keyof BodySystems]?.score ?? 0;
      const pairLabel = `${LABELS[a]} + ${LABELS[b]}`;
      entry[pairLabel] = score;
    });
    return entry;
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PolyDrugInteractions() {
  const data = polydrugData as unknown as PolydrugJson;
  const [selected, setSelected] = useState<Substance[]>([]);

  function toggleSubstance(s: Substance) {
    setSelected((prev) => {
      if (prev.includes(s)) return prev.filter((x) => x !== s);
      if (prev.length >= 5) return prev; // max 5
      return [...prev, s];
    });
  }

  // All unique pairs from selected substances
  const pairs = useMemo(() => {
    const result: [Substance, Substance][] = [];
    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        result.push([selected[i], selected[j]]);
      }
    }
    return result;
  }, [selected]);

  const radarData = useMemo(() => buildRadarData(data, selected), [data, selected]);

  // Keys for radar lines (one per pair)
  const radarKeys = pairs.map(([a, b]) => `${LABELS[a]} + ${LABELS[b]}`);

  return (
    <section className="space-y-10">

      {/* ── Section Header (matches drug profile pattern) ── */}
      <div>
        <div className="inline-block bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded mb-3 tracking-widest uppercase">
          Interactions
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Poly-Drug Interactions
        </h2>
        <p className="text-cyan-400 text-lg font-medium">The Lethal Combinations</p>
      </div>

      {/* ── Banner Image ── */}
      <div className="relative w-full overflow-hidden rounded-xl">
        <img
          src="/images/polydrug-header.png"
          alt="Poly-Drug Interaction Network"
          className="w-full object-cover max-h-72 rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent rounded-xl" />
      </div>

      {/* ── Narrative ── */}
      <div className="space-y-4 text-slate-300 leading-relaxed max-w-4xl">
        <p>
          Polydrug interactions represent one of the most lethal and least-discussed gaps in harm reduction education. While individual substances carry documented risks, the combination of two or more substances frequently produces synergistic effects that are not merely additive — they are multiplicative. A substance rated 5/10 for risk in isolation can become a 9/10 when combined with another CNS depressant. The pharmacological mechanisms are well-documented; the policy response has been catastrophically inadequate.
        </p>
        <p>
          The CDC's SUDORS data consistently shows that the majority of overdose deaths involve more than one substance. In 2022, over 75% of opioid-involved overdose deaths also involved at least one other drug. Alcohol and benzodiazepines appear as co-detected substances in tens of thousands of fatalities annually. Despite this, drug education, clinical screening, and public health messaging continue to treat substances as isolated variables — a framework that kills people.
        </p>
        <p>
          This section maps interaction risk across all 13 substances using six body-system axes: <strong className="text-slate-200">Respiratory, Cardiac, Hepatic, Neurological, Thermoregulatory,</strong> and <strong className="text-slate-200">Renal</strong>. Select up to 5 substances to compare their interaction risk profiles simultaneously. Each combination is scored using TripSit combination data, PubMed clinical literature, CDC SUDORS overdose surveillance, and FDA adverse event reporting.
        </p>
      </div>

      {/* ── Mix & Match Layout (mirrors first section UI) ── */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Interaction Risk Profile</h3>
        <p className="text-slate-400 text-sm mb-5">
          Select substances to compare their interaction risk across 6 body systems. Select up to 5 — each pair generates its own radar profile. Notice how CNS depressants spike on Respiratory and Neurological axes.
        </p>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: Checkbox List */}
          <div className="lg:w-56 shrink-0 space-y-2">
            {ALL_SUBSTANCES.map((substance, idx) => {
              const isSelected = selected.includes(substance);
              const colorIdx = selected.indexOf(substance);
              const color = isSelected ? PALETTE[colorIdx] : undefined;
              return (
                <label
                  key={substance}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                      isSelected
                        ? 'border-transparent'
                        : 'border-slate-600 group-hover:border-slate-400'
                    }`}
                    style={isSelected ? { backgroundColor: color, borderColor: color } : {}}
                    onClick={() => toggleSubstance(substance)}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                      isSelected ? '' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                    style={isSelected ? { color } : {}}
                    onClick={() => toggleSubstance(substance)}
                  >
                    {LABELS[substance]}
                  </span>
                </label>
              );
            })}
            {selected.length >= 5 && (
              <p className="text-xs text-amber-400 mt-2">Maximum 5 substances selected</p>
            )}
          </div>

          {/* Right: Radar Chart */}
          <div className="flex-1 min-h-[360px]">
            {selected.length < 2 ? (
              <div className="flex items-center justify-center h-full min-h-[300px] border border-slate-700/50 rounded-xl bg-slate-900/40">
                <p className="text-slate-500 text-sm text-center px-6">
                  Select at least 2 substances to generate<br />an interaction risk profile
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart data={radarData} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                  <PolarGrid stroke="#334155" strokeOpacity={0.5} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                  />
                  {radarKeys.map((key, idx) => (
                    <Radar
                      key={key}
                      name={key}
                      dataKey={key}
                      stroke={PALETTE[idx % PALETTE.length]}
                      fill={PALETTE[idx % PALETTE.length]}
                      fillOpacity={0.15}
                      strokeWidth={2}
                      dot={{ fill: PALETTE[idx % PALETTE.length], r: 3 }}
                    />
                  ))}
                  <Legend
                    wrapperStyle={{ fontSize: '12px', color: '#94a3b8', paddingTop: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '12px',
                    }}
                    formatter={(value: number, name: string) => [`${value}/10`, name]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* ── Pair Detail Cards ── */}
      {pairs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest">
            Selected Combination Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pairs.map(([a, b], idx) => {
              const interaction = getInteraction(data, a, b);
              if (!interaction) return null;
              const color = PALETTE[idx % PALETTE.length];
              return (
                <div
                  key={`${a}-${b}`}
                  className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 space-y-3"
                  style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-slate-200">
                      {LABELS[a]} + {LABELS[b]}
                    </h4>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="text-xl font-bold"
                        style={{ color: getRiskColor(interaction.risk_level) }}
                      >
                        {interaction.risk_level}
                        <span className="text-sm text-slate-500">/10</span>
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded font-medium"
                        style={{
                          color: getRiskColor(interaction.risk_level),
                          backgroundColor: `${getRiskColor(interaction.risk_level)}22`,
                          border: `1px solid ${getRiskColor(interaction.risk_level)}44`,
                        }}
                      >
                        {getRiskLabel(interaction.risk_level)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400">
                    <div>
                      <span className="text-slate-500 font-mono uppercase tracking-wider">Mechanism: </span>
                      <span className="text-slate-300">{interaction.mechanism}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono uppercase tracking-wider">Dose multiplier: </span>
                      <span className="text-slate-300">×{interaction.dose_multiplier} at combined moderate doses</span>
                    </div>
                    {interaction.contraindications.length > 0 && (
                      <div>
                        <span className="text-slate-500 font-mono uppercase tracking-wider">Contraindications: </span>
                        <span className="text-slate-300">{interaction.contraindications.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-600">Evidence: {interaction.evidence}</span>
                      <a
                        href={interaction.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-500 hover:text-cyan-400 transition-colors"
                      >
                        Source →
                      </a>
                    </div>
                  </div>

                  {/* Body system mini-bars */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {AXES.map(({ key, label }) => {
                      const score = interaction.body_systems?.[key as keyof BodySystems]?.score ?? 0;
                      return (
                        <div key={key} className="space-y-0.5">
                          <div className="text-xs text-slate-600 truncate">{label}</div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${score * 10}%`,
                                backgroundColor: getRiskColor(score),
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
