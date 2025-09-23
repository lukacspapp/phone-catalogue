import { useParams, useNavigate } from 'react-router-dom';
import { usePhone } from '@/hooks/usePhones';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Monitor, HardDrive, Camera, Battery } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function PhoneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const phoneId = id ? parseInt(id, 10) : 0;

  const { data: phone, isLoading, error } = usePhone(phoneId);

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Phones
        </Button>
        <Alert variant="destructive">
          <AlertDescription>
            Error loading phone details: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Phones
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="container mx-auto p-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Phones
        </Button>
        <Alert>
          <AlertDescription>Phone not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  const specIcons = {
    display: Monitor,
    storage: HardDrive,
    camera: Camera,
    battery: Battery,
  };

  return (
    <div className="container mx-auto p-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Phones
      </Button>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Phone Image */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={phone.image}
              alt={phone.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Phone Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold">{phone.name}</h1>
              <Badge variant={phone.inStock ? "default" : "secondary"} className="ml-4">
                {phone.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground mb-4">{phone.brand}</p>
            <p className="text-4xl font-bold text-primary mb-6">
              {formatPrice(phone.price)}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {phone.description}
            </p>
          </div>

          <Separator />

          <Button
            size="lg"
            className="w-full"
            disabled={!phone.inStock}
          >
            {phone.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      {/* Specifications Tabs */}
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
                {Object.entries(phone.specs).map(([key, value]) => {
                  const IconComponent = specIcons[key as keyof typeof specIcons];
                  return (
                    <Card key={key}>
                      <CardContent className="flex items-center p-4">
                        <IconComponent className="h-8 w-8 text-muted-foreground mr-4" />
                        <div>
                          <p className="font-medium capitalize">{key}</p>
                          <p className="text-sm text-muted-foreground">{value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="mt-6">
              <div className="space-y-4">
                {Object.entries(phone.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3 border-b">
                  <span className="font-medium">Stock Status</span>
                  <span className={phone.inStock ? "text-green-600" : "text-red-600"}>
                    {phone.inStock ? "Available" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium">Product ID</span>
                  <span className="text-muted-foreground">#{phone.id}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
