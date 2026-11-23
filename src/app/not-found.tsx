import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-7xl font-extrabold text-gold">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-brand-ink">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button href="/">Back to home</Button>
        <Button href="/projects" variant="outline">
          View projects
        </Button>
      </div>
    </Container>
  );
}
