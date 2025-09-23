import { usePhones } from '@/hooks/usePhones';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatPrice, truncateText } from '@/lib/utils';

export function PhoneListPage() {
  const { data, isLoading, error } = usePhones();
  console.log(data, isLoading, error);

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading phones: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Available Phones</h2>
        {data && (
          <p className="text-muted-foreground">
            Showing {data.data.length} of {data.pagination.totalItems} phones
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-48 mb-4" />
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.data.map((phone) => (
            <Card key={phone.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{phone.name}</CardTitle>
                  <Badge variant={phone.inStock ? "default" : "secondary"}>
                    {phone.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{phone.brand}</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-square overflow-hidden rounded-md mb-4">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {truncateText(phone.description, 100)}
                </p>
                <p className="font-bold text-xl mb-4">{formatPrice(phone.price)}</p>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {data && data.data.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No phones found</p>
        </div>
      )}
    </div>
  );
}
