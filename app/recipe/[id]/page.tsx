import FavoriteButton from "@/components/FavoriteButton";
import ReviewSection from "@/components/ReviewSection";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipeDetailsPage({
  params,
}: RecipePageProps) {
  const { id } = await params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  const recipe = data.meals?.[0];

  if (!recipe) {
    return (
      <main style={{ padding: "30px" }}>
        <h1>Recipe not found</h1>
      </main>
    );
  }

  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <main style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <section style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "38px", marginBottom: "12px" }}>{recipe.strMeal}</h1>
        <p style={{ color: "#555", fontSize: "17px" }}>
          Explore recipe details, ingredients, and cooking steps.
        </p>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "start",
        }}
      >
        <div>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "16px",
              marginBottom: "20px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            }}
          />

          <FavoriteButton
            recipe={{
              idMeal: recipe.idMeal,
              strMeal: recipe.strMeal,
              strMealThumb: recipe.strMealThumb,
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: "#fafafa",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #e5e5e5",
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            <strong>Category:</strong> {recipe.strCategory}
          </p>

          <p style={{ marginBottom: "20px" }}>
            <strong>Area:</strong> {recipe.strArea}
          </p>

          <h2 style={{ marginTop: "10px", marginBottom: "15px" }}>Ingredients</h2>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <section
        style={{
          marginTop: "35px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Instructions</h2>
        <p style={{ lineHeight: "1.8", whiteSpace: "pre-line" }}>
          {recipe.strInstructions}
        </p>
      </section>

      <section
        style={{
          marginTop: "35px",
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",
        }}
      >
        <ReviewSection recipeId={recipe.idMeal} />
      </section>
    </main>
  );
}