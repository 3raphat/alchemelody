import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button, ButtonProps } from "~/components/ui/button"
import { cn } from "~/lib/utils"

export default function BackButton({ className, ...props }: ButtonProps) {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className={cn("absolute left-4 top-4 md:left-6 md:top-6", className)}
      {...props}
    >
      <ChevronLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  )
}
