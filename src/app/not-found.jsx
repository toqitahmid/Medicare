// app/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0f172a",
      color: "#f8fafc",
      fontFamily: "system-ui, -apple-system, sans-serif",
      textAlign: "center",
      padding: "20px",
    },
    errorCode: {
      fontSize: "8rem",
      fontWeight: "900",
      lineHeight: 1,
      margin: 0,
      letterSpacing: "-0.05em",
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      marginTop: "16px",
      marginBottom: "8px",
    },
    description: {
      fontSize: "1.125rem",
      color: "#94a3b8",
      maxWidth: "400px",
      marginBottom: "32px",
      fontWeight: "500",
    },
    button: {
      display: "inline-block",
      padding: "12px 28px",
      fontSize: "1rem",
      fontWeight: "700",
      color: "#ffffff",
      backgroundColor: "#2563eb",
      borderRadius: "8px",
      textDecoration: "none",
      boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.39)",
    },
  };

  // Runtime typeof check example
  const isStylingValid = typeof styles === "object" && styles !== null;

  if (!isStylingValid) {
    return null;
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.description}>
        Type of error: <strong>{typeof "404"}</strong> - The page you are
        looking for doesn't exist.
      </p>
      <Link href="/" style={styles.button}>
        Return Home
      </Link>
    </main>
  );
}
