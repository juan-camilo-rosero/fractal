// @/components/sidebar/BreadcrumbNavigation.jsx
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  
  export default function BreadcrumbNavigation({ breadcrumbs }) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center">
              {idx > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.text}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.url}>
                    {crumb.text}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }