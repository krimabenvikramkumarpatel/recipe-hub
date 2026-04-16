"use client";

import Link from "next/link";
import { useState } from "react";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data = await res.json();
    setRecipes(data.meals || []);
    setHasSearched(true);
  };

  const handleFilter = async (category: string) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    const data = await res.json();
    setRecipes(data.meals || []);
    setHasSearched(true);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "12px",
            width: "420px",
            maxWidth: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#ff6b6b",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </div>

      <div
        style={{
          marginBottom: "25px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <button
          onClick={() => handleFilter("Vegetarian")}
          style={{
            padding: "10px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#eee",
          }}
        >
          Vegetarian
        </button>

        <button
          onClick={() => handleFilter("Seafood")}
          style={{
            padding: "10px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#eee",
          }}
        >
          Seafood
        </button>

        <button
          onClick={() => handleFilter("Dessert")}
          style={{
            padding: "10px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#eee",
          }}
        >
          Dessert
        </button>
      </div>

      {hasSearched && recipes.length === 0 && (
        <p style={{ marginTop: "20px", fontSize: "16px" }}>
          No recipes found. Try another search.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "24px",
          width: "100%",
          marginTop: "10px",
        }}
      >
        {recipes.map((recipe) => (
          <Link
            key={recipe.idMeal}
            href={`/recipe/${recipe.idMeal}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "14px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                height: "100%",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
              }}
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
              <h3 style={{ fontSize: "18px", lineHeight: "1.4" }}>
                {recipe.strMeal}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}