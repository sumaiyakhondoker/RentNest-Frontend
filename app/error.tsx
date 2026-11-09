'use client'
import { Button } from "@/components/ui/button"

 

export default function Error({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  return (
     <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <p className="text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={retry}>Try again</Button>
    </div>
  )
}

