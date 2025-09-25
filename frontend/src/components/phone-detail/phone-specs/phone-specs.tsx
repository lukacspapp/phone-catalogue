import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, HardDrive, Camera, Battery } from 'lucide-react';
import type { Phone } from '@/types/phone';
import { SpecCard } from './spec-card';
import { SpecRow } from './spec-row';

interface PhoneSpecsProps {
  phone: Phone;
}

const specIcons = {
  display: Monitor,
  storage: HardDrive,
  camera: Camera,
  battery: Battery,
};

export function PhoneSpecs({ phone }: PhoneSpecsProps) {
  const specEntries = Object.entries(phone.specs);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Specifications</CardTitle>
        <CardDescription>
          Detailed specifications for {phone.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Specs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {specEntries.map(([key, value]) => {
                const IconComponent = specIcons[key as keyof typeof specIcons];
                return (
                  <SpecCard
                    key={key}
                    icon={IconComponent}
                    label={key}
                    value={value}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="mt-6">
            <div className="space-y-4">
              {specEntries.map(([key, value]) => (
                <SpecRow
                  key={key}
                  label={key}
                  value={value}
                  isLast={false}
                />
              ))}
              <SpecRow
                label="Stock Status"
                value={phone.inStock ? "Available" : "Out of Stock"}
                valueColor={phone.inStock ? "text-green-600" : "text-red-600"}
                isLast={false}
              />
              <SpecRow
                label="Product ID"
                value={`#${phone.id}`}
                isLast={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
