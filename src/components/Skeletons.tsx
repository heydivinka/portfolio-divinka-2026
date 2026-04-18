export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-100 bg-white/75 dark:border-zinc-800 dark:bg-zinc-900/70">
      {/* Image area */}
      <div className="aspect-video w-full animate-pulse bg-zinc-100 dark:bg-zinc-800" />
      <div className="p-6 sm:p-8 space-y-4">
        {/* Title */}
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-4 w-4/6 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
        </div>
        {/* Tech badges */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-6 w-14 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
        </div>
        {/* CTA */}
        <div className="h-5 w-28 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800 mt-4" />
      </div>
    </div>
  )
}

export function CertificateCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-100 bg-white/75 p-6 dark:border-zinc-800 dark:bg-zinc-900/70">
      {/* Logo circle */}
      <div className="h-12 w-12 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
      {/* Title */}
      <div className="space-y-2 w-full flex flex-col items-center">
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
      </div>
      {/* View link */}
      <div className="h-3 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
    </div>
  )
}
