import { Skeleton } from "@/components/ui/skeleton";

export function SectionSkeleton() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PricingSkeleton() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-8 space-y-4"
            >
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-12 w-full mt-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProvidersSkeleton() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-4">
              <Skeleton className="h-32 w-32 rounded-full mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
