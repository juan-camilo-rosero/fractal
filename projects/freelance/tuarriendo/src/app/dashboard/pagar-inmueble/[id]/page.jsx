"use client"

import { useParams } from "next/navigation";

function page() {
    const params = useParams();
    const { id } = params;
  return (
    <div>
        <h2 className="dashboard-title">Pagar inmueble con el id {id}</h2>
    </div>
  )
}

export default page