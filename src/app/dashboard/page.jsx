"use client";

import Courses from "@/components/dashboard/Courses";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <div className="rounded-xl w-full mt-5 bg-fblue-700 flex flex-col md:flex-row md:gap-6 py-6 items-center lg:px-8 lg:gap-12">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/studying-illustration-download-in-svg-png-gif-file-formats--read-a-book-female-reader-women-daily-lifestyle-pack-people-illustrations-2900928.png" alt="Person studying" className="w-2/3 md:w-48"/>
        <div>
          <h3 className="text-3xl font-semibold text-fgray-200 lg:text-4xl">Tú puedes hacerlo!!</h3>
          <p className="text-xl font-semibold text-fgray-400 mt-2">Creemos en ti...</p>
        </div>
      </div>
      <Courses />
    </div>
  );
}