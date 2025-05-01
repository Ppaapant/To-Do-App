import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";  // Ваш файл налаштування Firebase

export const getUserRole = async (userId: string) => {
  const userRoleRef = doc(db, "user_roles", userId);  // Замість userId підставте ID користувача
  const userRoleSnap = await getDoc(userRoleRef);

  if (userRoleSnap.exists()) {
    return userRoleSnap.data().role;  // Повертає роль користувача (admin або viewer)
  } else {
    throw new Error("Role not found");
  }
};
