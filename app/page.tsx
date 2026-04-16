import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <main
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <section
        style={{
          textAlign: "center",
          marginBottom: "30px",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "10px",
            color: "#222",
          }}
        >
          Recipe Hub
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#555",
          }}
        >
          Discover delicious recipes, save your favorites, and share reviews.
        </p>
      </section>

      <div style={{ width: "100%", maxWidth: "800px" }}>
        <SearchBar />
      </div>
    </main>
  );
}