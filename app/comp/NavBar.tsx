import Link from "next/link";
import { routes } from "@/app/comp/routes";

export default function NavigationBar() {
  const title = "Recipe Generator!";
  const titlePath = "/";

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-orange-500 flex flex-col items-center p-4 shadow-lg">
      <Link href={titlePath} className="text-3xl text-white font-bold text-center mb-4 drop-shadow-lg hover:underline">
        {title}
      </Link>
      <div className="flex space-x-4 justify-center">
        {routes.map((route) => (
          <Link
            key={route.name}
            href={route.path}
            className="text-white text-lg bg-gray-900 p-2 rounded-lg transition duration-300 ease-in-out transform hover:bg-gray-800 hover:scale-105"
          >
            {route.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}