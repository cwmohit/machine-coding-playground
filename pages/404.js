export default function Custom404() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "72px", marginBottom: "20px" }}>404</h1>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Page Not Found</h2>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        Oops! It looks like the page you’re looking for doesn’t exist.
      </p>
      <a style={{ fontSize: "18px", color: "#0070f3" }} href="/">Go back to Home</a>
    </div>
  );
}
