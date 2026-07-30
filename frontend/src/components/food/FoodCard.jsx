import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { money, toggleWishlist, isWishlisted } from "../../utils/storage";
import { isAuthenticated } from "../../utils/auth";
import { addFoodToCart } from "../../utils/cartActions";

function FoodCard({ food }) {
  return (
    <div className="border p-4 rounded bg-white text-black">
      <img
        src={food.image}
        alt={food.name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />

      <h2>{food.name}</h2>

      <p>{food.description}</p>

      <h3>₹{food.price}</h3>
    </div>
  );
}

export default FoodCard;