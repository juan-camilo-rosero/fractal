import Image from "next/image";

export default function Logo() {
  return (
    <div className="px-6 py-4">
      <Image src="/static/logo.png" alt="Logo" width={150} height={40} priority className="h-auto" />
    </div>
  );
}