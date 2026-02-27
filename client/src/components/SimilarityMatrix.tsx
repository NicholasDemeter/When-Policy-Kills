import { useState } from "react";
import scores from "@/data/scores.json";

interface CorrelationData {
  substance1: string;
  substance2: string;
  correlation: number;
}

export function SimilarityMatrix() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState<[string, string] | null>(null);

  // Calculate Pearson correlation between two substances
  const calculateCorrelation = (indicators1: Record<string, any>, indicators2: Record<string, any>) => {
    const keys = Object.keys(indicators1);
    const values1 = keys.map(k => indicators1[k]?.score || 0);
    const values2 = keys.map(k => indicators2[k]?.score || 0);

    const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
    const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

    const numerator = values1.reduce((sum, v1, i) => sum + (v1 - mean1) * (values2[i] - mean2), 0);
    const denominator1 = Math.sqrt(values1.reduce((sum, v1) => sum + Math.pow(v1 - mean1, 2), 0));
    const denominator2 = Math.sqrt(values2.reduce((sum, v2) => sum + Math.pow(v2 - mean2, 2), 0));

    if (denominator1 === 0 || denominator2 === 0) return 0;
    return numerator / (denominator1 * denominator2);
  };

  // Build correlation matrix
  const substances = Object.entries(scores.substances).map(([key]) => key.replace(/_/g, " "));
  const correlations: CorrelationData[] = [];

  for (let i = 0; i < substances.length; i++) {
    for (let j = i + 1; j < substances.length; j++) {
      const key1 = Object.keys(scores.substances)[i];
      const key2 = Object.keys(scores.substances)[j];
      const indicators1 = (scores.substances as any)[key1].indicators;
      const indicators2 = (scores.substances as any)[key2].indicators;
      const correlation = calculateCorrelation(indicators1, indicators2);

      correlations.push({
        substance1: substances[i],
        substance2: substances[j],
        correlation
      });
    }
  }

  // Normalize correlation to 0-1 range for color mapping
  const minCorr = Math.min(...correlations.map(c => c.correlation));
  const maxCorr = Math.max(...correlations.map(c => c.correlation));
  const range = maxCorr - minCorr;

  const getColor = (correlation: number) => {
    const normalized = (correlation - minCorr) / range;
    // Red (dissimilar) to Green (similar)
    const hue = normalized * 120; // 0 = red, 120 = green
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-display font-bold">Substance Similarity Matrix</h3>
        <p className="text-sm text-muted-foreground">
          Pearson correlation of harm profiles. Green = similar profiles, Red = dissimilar profiles.
          Hover to see exact values. Click to compare in Mix & Match.
        </p>
      </div>

      {/* Matrix Grid */}
      <div className="grid gap-2 overflow-x-auto pb-4">
        {correlations.map((item, idx) => {
          const cellKey = `${item.substance1}-${item.substance2}`;
          const isHovered = hoveredCell === cellKey;
          const isSelected = selectedPair && (
            (selectedPair[0] === item.substance1 && selectedPair[1] === item.substance2) ||
            (selectedPair[0] === item.substance2 && selectedPair[1] === item.substance1)
          );

          return (
            <div
              key={idx}
              className={`p-3 rounded border cursor-pointer transition-all ${
                isHovered || isSelected
                  ? "border-primary ring-2 ring-primary/50 shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
              style={{
                backgroundColor: getColor(item.correlation),
                opacity: isHovered || isSelected ? 1 : 0.7
              }}
              onMouseEnter={() => setHoveredCell(cellKey)}
              onMouseLeave={() => setHoveredCell(null)}
              onClick={() => setSelectedPair([item.substance1, item.substance2])}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-semibold text-white drop-shadow">
                  {item.substance1} ↔ {item.substance2}
                </span>
                <span className="font-mono text-xs text-white drop-shadow">
                  {item.correlation.toFixed(3)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(0, 70%, 50%)" }}></div>
          <span>Dissimilar</span>
        </div>
        <div className="flex-1 h-2 rounded bg-gradient-to-r" style={{
          backgroundImage: "linear-gradient(to right, hsl(0, 70%, 50%), hsl(120, 70%, 50%))"
        }}></div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(120, 70%, 50%)" }}></div>
          <span>Similar</span>
        </div>
      </div>
    </div>
  );
}
