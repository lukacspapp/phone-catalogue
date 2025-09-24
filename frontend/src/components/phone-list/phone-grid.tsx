import { PhoneCard } from '@/components/phone-card';
import type { Phone } from '@/types/phone';

interface PhoneGridProps {
  phones: Phone[];
}

export function PhoneGrid({ phones }: PhoneGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-8">
      {phones.map((phone) => (
        <PhoneCard key={phone.id} phone={phone} />
      ))}
    </div>
  );
}