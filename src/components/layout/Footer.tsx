export default function Footer() {
  return (
    <footer className="bg-muted py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} InfoFlash. Tous droits réservés.</p>
        <p className="text-sm mt-1">Une plateforme d'actualités moderne conçue pour vous.</p>
      </div>
    </footer>
  );
}
