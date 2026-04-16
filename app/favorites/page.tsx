"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FavoriteRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const handleRemove = (idMeal: string) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <main style={{ padding: "30px" }}>
      <section style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Your Favorites</h1>
        <p style={{ color: "#555", fontSize: "17px" }}>
          View and manage the recipes you saved.
        </p>
      </section>

      {favorites.length === 0 ? (
        <div
          style={{
            marginTop: "30px",
            padding: "30px",
            border: "1px solid #e5e5e5",
            borderRadius: "14px",
            backgroundColor: "#fafafa",
          }}
        >
          <p style={{ fontSize: "16px" }}>No favorites saved yet.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "24px",
            marginTop: "20px",
          }}
        >
          {favorites.map((recipe) => (
            <div
              key={recipe.idMeal}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "14px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              <Link
                href={`/recipe/${recipe.idMeal}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "12px",
                  }}
                />
                <h3 style={{ fontSize: "18px", lineHeight: "1.4" }}>{recipe.strMeal}</h3>
              </Link>

              <button
                onClick={() => handleRemove(recipe.idMeal)}
                style={{
                  marginTop: "14px",
                  padding: "10px 14px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#222",
                  color: "white",
                  width: "100%",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}