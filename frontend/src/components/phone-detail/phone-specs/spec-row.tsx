interface SpecRowProps {
  label: string;
  value: string;
  isLast?: boolean;
  valueColor?: string;
}

export function SpecRow({ label, value, isLast = false, valueColor = "text-muted-foreground" }: SpecRowProps) {
  return (
    <div className={`flex justify-between py-3 ${!isLast ? 'border-b' : ''}`}>
      <span className="font-medium capitalize">{label.replace(/([A-Z])/g, ' $1')}</span>
      <span className={valueColor}>{value}</span>
    </div>
  );
}
