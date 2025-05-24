import Link from "next/link";

function page() {
  return (
    <div>
      <h2>Parece que la página que estás buscando no existe :(</h2>
      <div className="mt-8">
        <Link href="/dashboard" className="dashboard-primary-button">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default page;
