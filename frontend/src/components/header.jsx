import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between px-4 bg-magenta w-full h-20">
      <Image src="/images/Icono.png" alt="Logo" width={300} height={20} />
      <nav>
        <ul className="flex space-x-4">
          <li className="text-foreground">Integrantes</li>
          <li className="text-foreground">Servicios</li>
        </ul>
        <button className="bg-magenta text-foreground px-4 py-2 rounded">Ingresar</button>
      </nav>
    </header>
  );
}