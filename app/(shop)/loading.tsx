export default function Loading() {
  return (
    <div className="space-y-16 animate-pulse">
      {/* Hero Skeleton */}
      <div className="py-12 border-b border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6 max-w-xl">
          <div className="h-16 bg-gray-100 rounded-2xl w-2/3" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-50 rounded-full w-full" />
            <div className="h-4 bg-gray-50 rounded-full w-4/5" />
          </div>
        </div>
        <div className="h-12 bg-gray-100 rounded-2xl w-full md:w-80" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-6">
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl" />
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="h-2 bg-gray-50 rounded-full w-1/4" />
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                </div>
                <div className="h-4 bg-gray-100 rounded-full w-1/4" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-50 rounded-full w-full" />
                <div className="h-3 bg-gray-50 rounded-full w-2/3" />
              </div>
              <div className="h-12 bg-gray-100 rounded-2xl w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
