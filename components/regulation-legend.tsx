export function RegulationLegend() {
  return (
    <div className="mb-6 flex flex-wrap gap-4 rounded-lg border border-border bg-surface px-4 py-3 text-xs">
      <span className="text-muted">색상 범례:</span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm border-b-2 border-[#ff40ff] bg-[rgba(255,0,255,0.15)]" />
        <span className="text-muted">변경사항</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-[#ff6b6b]" />
        <span className="text-muted">거버넌스</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-[#ffb347]" />
        <span className="text-muted">문서 참조</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-[#69db7c]" />
        <span className="text-muted">코멘트</span>
      </span>
    </div>
  );
}
