import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Preview from './Preview'
import Lessons from './Lessons'

function CoursesIndex({id}) {
  return (
    <section className="w-full h-full p-5">
      <div>
        <Breadcrumb>
          <BreadcrumbList className="text-base">
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/course/${id}`}>{id}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <Preview/>
        <Lessons/>
      </div>
    </section>
  );
}

export default CoursesIndex;
