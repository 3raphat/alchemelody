import Balance from "react-wrap-balancer"
import { cn } from "~/lib/utils"

function PageHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("flex flex-col gap-2 py-6", className)} {...props} />
  )
}

function PageHeaderText({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-lg text-muted-foreground sm:text-xl", className)}
      {...props}
    />
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold leading-tight md:text-5xl lg:text-6xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn("text-lg text-muted-foreground sm:text-xl", className)}
      {...props}
    />
  )
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription, PageHeaderText }
