import { Stethoscope } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center sm:justify-start gap-2 py-2">
      <Stethoscope className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold text-primary group-data-[state=collapsed]:hidden">VisibleMD</h1>
    </div>
  );
}
