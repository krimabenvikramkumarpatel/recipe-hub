"use client";

interface FavoriteButtonProps {
  recipe: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
}

export default function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const handleSave = () => {
    const existingFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const alreadyExists = existingFavorites.some(
      (item: { idMeal: string }) => item.idMeal === recipe.idMeal
    );

    if (!alreadyExists) {
      existingFavorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(existingFavorites));
      alert("Recipe saved to favorites!");
    } else {
      alert("Recipe is already in favorites.");
    }
  };

  return (
    <button
      onClick={handleSave}
      style={{
        padding: "12px 18px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: "#222",
        color: "white",
        fontSize: "15px",
        fontWeight: 500,
      }}
    >
      Save to Favorites
    </button>
  );
}