import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

function Breadcrumb({
  ...props
}) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({
  className,
  ...props
}) {
  return (
    (<ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props} />)
  );
}

function BreadcrumbItem({
  className,
  ...props
}) {
  return (
    (<li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props} />)
  );
}

function BreadcrumbLink({
  asChild,
  className,
  href,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "a"
  
  // Verificamos si la ruta es exactamente "dashboard" o "/dashboard" para mostrar "Panel principal"
  const displayText = typeof href === 'string' && 
    (href === 'dashboard' || 
     href === '/dashboard' || 
     href === '#dashboard' || 
     href.match(/^(https?:\/\/[^\/]+)?\/?dashboard\/?$/))
    ? "Panel principal" 
    : children;
  
  return (
    (<Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      href={href}
      {...props}>
      {displayText}
    </Comp>)
  );
}

function BreadcrumbPage({
  className,
  children,
  ...props
}) {
  // Verificamos si el contenido es "dashboard" para mostrar "Panel principal"
  const displayText = children === 'dashboard' ? "Panel principal" : children;
  
  return (
    (<span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}>
      {displayText}
    </span>)
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return (
    (<li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}>
      {children ?? <ChevronRight />}
    </li>)
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return (
    (<span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>)
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}