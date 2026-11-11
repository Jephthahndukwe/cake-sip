import Image from "next/image";
import { SPONSORS } from "@/lib/site";

/** Every partner gets an identical box; logos are normalised to the same visual size. */
export default function LogoWall() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {SPONSORS.map((s) => (
        <li key={s.name} className="flex aspect-[3/2] items-center justify-center rounded-3xl bg-raise p-6 text-center">
          {s.logo ? (
            <span className="relative block h-12 w-full">
              <Image src={s.logo} alt={s.name} fill sizes="200px" className="object-contain brightness-0 invert" />
            </span>
          ) : (
            <span className="serif-h text-lg leading-tight sm:text-xl">{s.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
