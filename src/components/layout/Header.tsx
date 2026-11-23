import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { DesktopNav, MobileNav } from "./Nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label="Krishna Builder — home" className="shrink-0">
          <Logo />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-3">
          <Button href="/contact" className="hidden min-h-10 px-5 py-2 lg:inline-flex">
            Enquire
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
