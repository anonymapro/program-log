import Link from "next/link";
import { getCategories } from "@/lib/data";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Newspaper } from "lucide-react";
import { NavLink } from "./NavLink";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Newspaper className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary">
            InfoFlash
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
          {categories.map((category) => (
            <NavLink
              key={category.id}
              href={`/category/${category.slug}`}
            >
              {category.name}
            </NavLink>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu de navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <Link href="/" className="flex items-center gap-2 mb-8">
                  <Newspaper className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold font-headline text-primary">
                    InfoFlash
                  </span>
                </Link>
                <nav className="flex flex-col space-y-2">
                  {categories.map((category) => (
                     <NavLink
                      key={category.id}
                      href={`/category/${category.slug}`}
                      isMobile={true}
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
