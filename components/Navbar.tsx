import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "20px 30px",
        backgroundColor: "#222",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "white",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        Recipe Hub
      </h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/" style={{ color: "white" }}>
          Home
        </Link>
        <Link href="/favorites" style={{ color: "white" }}>
          Favorites
        </Link>
        <Link href="/login" style={{ color: "white" }}>
          Login
        </Link>
      </div>
    </nav>
  );
}