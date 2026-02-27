import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface Indicator {
  score: number;
  confidence: string;
}

interface RiskRadarProps {
  data: Record<string, Indicator>;
  color?: string;
  showLabels?: boolean;
  className?: string;
}

const INDICATOR_LABELS: Record<string, string> = {
  "1_acute_lethality": "Acute Lethality",
  "2_chronic_toxicity": "Chronic Toxicity",
  "3_addiction": "Addiction Potential",
  "4_acute_psych": "Acute Psych Risk",
  "5_chronic_psych": "Chronic Psych Risk",
  "6_withdrawal": "Withdrawal Severity",
  "7_polydrug_risk": "Polydrug Risk",
  "8_dose_predict": "Dose Predictability",
  "9_disinhibition": "Disinhibition",
  "10_normalization": "Normalization"
};

// Fixed order for the chart axes
const ORDERED_KEYS = [
  "1_acute_lethality",
  "2_chronic_toxicity",
  "3_addiction",
  "4_acute_psych",
  "5_chronic_psych",
  "6_withdrawal",
  "7_polydrug_risk",
  "8_dose_predict",
  "9_disinhibition",
  "10_normalization"
];

export function RiskRadar({ data, color = "var(--primary)", showLabels = true, className }: RiskRadarProps) {
  const chartData = ORDERED_KEYS.map(key => ({
    subject: INDICATOR_LABELS[key],
    fullMark: 10,
    value: data[key]?.score || 0,
    confidence: data[key]?.confidence || "High",
    key
  }));

  return (
    <div className={`w-full aspect-square relative ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="var(--border)" strokeDasharray="4 4" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-mono)" }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          
          {/* Main Radar for Fill */}
          <Radar
            name="Risk Profile Fill"
            dataKey="value"
            stroke="none"
            fill={color}
            fillOpacity={0.3}
            isAnimationActive={true}
          />
          
          {/* Solid Line for High/Moderate Confidence */}
          <Radar
            name="High Confidence"
            dataKey={(entry) => entry.confidence !== "Low" ? entry.value : null}
            stroke={color}
            strokeWidth={3}
            fill="none"
            connectNulls={false}
            isAnimationActive={true}
          />

          {/* Dotted Line for Low Confidence (Overlay) */}
          {/* We render the full shape dotted, but it will overlap. 
              Ideally we'd only render the low confidence segments, but Recharts makes that tricky.
              Instead, we'll render the whole shape dotted, and the solid one on top will cover it 
              except where the solid one is null. 
              Wait, connectNulls=false means gaps. 
              Let's try rendering the full shape as dotted first, then the high-confidence parts as solid on top.
          */}
          <Radar
            name="Risk Profile Outline"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            strokeDasharray="5 5"
            fill="none"
            isAnimationActive={true}
          />
          
          {/* Re-render Solid Line on top to cover the dots for high confidence areas */}
          <Radar
            name="High Confidence Overlay"
            dataKey={(entry) => entry.confidence !== "Low" ? entry.value : null}
            stroke={color}
            strokeWidth={3}
            fill="none"
            connectNulls={true} 
            isAnimationActive={true}
          />
          
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-card border border-border p-3 rounded-none shadow-xl">
                    <p className="font-display font-bold text-foreground">{data.subject}</p>
                    <p className="text-sm font-mono text-primary">Score: {data.value}/10</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence: <span className={data.confidence === "Low" ? "text-destructive" : "text-foreground"}>{data.confidence}</span>
                    </p>
                    {data.confidence === "Low" && (
                      <p className="text-[10px] text-destructive mt-1 uppercase tracking-wider">Data Uncertain</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Uncertainty Overlay - Visualizing low confidence points */}
      {/* Note: Recharts doesn't support dotted lines for specific segments easily, 
          so we use the tooltip to highlight uncertainty as requested */}
    </div>
  );
}
