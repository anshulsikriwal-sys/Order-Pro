import { cartApi, isBackendUp } from "../services/api";
import { getCart, saveCart } from "./storage";
import { getCurrentUser } from "./auth";

export async function addFoodToCart(food, quantity = 1) {
  console.log("Food object:", food);
      console.log("food._id:", food._id);
      console.log("food.id:", food.id);
  const user = getCurrentUser();

  if (user?.source === "backend" && (await isBackendUp())) {
    try {
      await cartApi.addToCart({foodId: food._id,quantity,});
    } catch (err) {
      console.warn("Backend add-to-cart failed, using local cart.", err.message);
    }
  }

  const cart = getCart();
  const existing = cart.find((item) => item.id === food._id);
  const updated = existing
    ? cart.map((item) => (item.id === food._id ? { ...item, quantity: item.quantity + quantity } : item))
    : [...cart, { ...food, quantity }];

  saveCart(updated);
  return updated;
}
