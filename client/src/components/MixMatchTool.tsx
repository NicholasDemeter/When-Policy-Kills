import { useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import scores from "@/data/scores.json";

const SUBSTANCE_COLORS: Record<string, string> = {
  "Alcohol": "var(--chart-1)",
  "Opioids_Street": "var(--chart-2)",
  "Benzodiazepines": "var(--chart-3)",
  "Cocaine": "var(--chart-4)",
  "Nitrous_Oxide": "var(--chart-5)",
  "Ketamine": "#ff00ff",
  "LSD": "#00ff00",
  "Psilocybin": "#ffff00",
  "MDMA": "#00ffff",
  "Cannabis": "#ff8800"
};

const INDICATOR_LABELS: Record<string, string> = {
  "1_acute_lethality": "Lethality",
  "2_chronic_toxicity": "Toxicity",
  "3_addiction": "Addiction",
  "4_acute_psych": "Acute Psych",
  "5_chronic_psych": "Chronic Psych",
  "6_withdrawal": "Withdrawal",
  "7_polydrug_risk": "Polydrug",
  "8_dose_predict": "Dose Unpredict",
  "9_disinhibition": "Disinhibition",
  "10_normalization": "Normalization"
};

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

export function MixMatchTool() {
  const [selectedSubstances, setSelectedSubstances] = useState<string[]>(["Alcohol", "Ketamine"]);

  const toggleSubstance = (substance: string) => {
    setSelectedSubstances(prev => 
      prev.includes(substance) 
        ? prev.filter(s => s !== substance)
        : [...prev, substance]
    );
  };

  // Transform data for Recharts
  // Format: [{ subject: 'Lethality', Alcohol: 9, Ketamine: 3, ... }, ...]
  const chartData = ORDERED_KEYS.map(key => {
    const point: any = {
      subject: INDICATOR_LABELS[key],
      fullMark: 10,
    };
    
    Object.keys(scores.substances).forEach(substance => {
      // @ts-ignore
      point[substance] = scores.substances[substance].indicators[key].score;
    });
    
    return point;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-card border border-border">
      <div className="lg:col-span-1 space-y-6">
        <div>
          <h3 className="text-2xl font-display font-bold mb-2">Mix & Match</h3>
          <p className="text-muted-foreground text-sm">
            Select substances to compare their risk profiles across all 10 dimensions.
            Notice how "safe" drugs spike on different axes than "hard" drugs.
          </p>
        </div>

        <ScrollArea className="h-[300px] lg:h-auto pr-4">
          <div className="space-y-3">
            {Object.keys(scores.substances).map(substance => (
              <div key={substance} className="flex items-center space-x-3 p-2 hover:bg-muted/50 transition-colors">
                <Checkbox 
                  id={substance} 
                  checked={selectedSubstances.includes(substance)}
                  onCheckedChange={() => toggleSubstance(substance)}
                  className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label 
                  htmlFor={substance} 
                  className="flex-1 cursor-pointer font-mono text-sm uppercase tracking-wider"
                  style={{ color: selectedSubstances.includes(substance) ? SUBSTANCE_COLORS[substance] : 'var(--muted-foreground)' }}
                >
                  {substance.replace('_', ' ')}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="lg:col-span-2 h-[400px] lg:h-[500px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="var(--border)" strokeDasharray="4 4" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
            
            {selectedSubstances.map(substance => (
              <Radar
                key={substance}
                name={substance.replace('_', ' ')}
                dataKey={substance}
                stroke={SUBSTANCE_COLORS[substance]}
                strokeWidth={2}
                fill={SUBSTANCE_COLORS[substance]}
                fillOpacity={0.1}
              />
            ))}
            
            <Legend wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: "12px", paddingTop: "20px" }} />
            <Tooltip 
              contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0" }}
              itemStyle={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
              labelStyle={{ fontFamily: "var(--font-display)", fontWeight: "bold", color: "var(--foreground)", marginBottom: "8px" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
