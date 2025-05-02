export const metadata = {
  title: "OCR Multilingue & Extraction de mots-clés",
  description: "Convertir des documents manuscrits en texte et extraire les 5 mots clés",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa" }}>
        <header style={{ backgroundColor: "#343a40", padding: "1rem", color: "#fff", textAlign: "center" }}>
          <h1>OCR Multilingue + Extraction de Mots-Clés</h1>
        </header>
        <main style={{ padding: "2rem" }}>{children}</main>
        <footer style={{ backgroundColor: "#343a40", color: "#fff", textAlign: "center", padding: "1rem", marginTop: "2rem" }}>
          <small>© 2025 - Projet OCR NLP Multilingue</small>
        </footer>
      </body>
    </html>
  );
}
