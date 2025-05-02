export default function ResultDisplay({ text, keywords }) {
    return (
      <div style={styles.container}>
        <h2>Texte Reconnu :</h2>
        <p style={styles.text}>{text}</p>
        <h2>Mots-Clés Extraits :</h2>
        <ul>
          {keywords.map((kw, index) => (
            <li key={index}>{kw}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  const styles = {
    container: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "10px",
      maxWidth: "700px",
      margin: "2rem auto",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    text: {
      whiteSpace: "pre-wrap",
      backgroundColor: "#f1f1f1",
      padding: "1rem",
      borderRadius: "5px",
    },
  };
  