import { User } from "@/types/IUser";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addUserHandler(user: User) {
  const url = `${API_BASE_URL}/Users`;
  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      picture: user.picture,
      sub: user.sub,
    })
  });
  if (!response.ok) throw new Error("data.tsx : Failed to Create user")
  return await response.json
}

export async function fetchUsersByRole(role: string) {
  const url = `${API_BASE_URL}/Users/role/${role}`;
  const response = await fetch(url, {
    cache: "no-store"
  });
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
}

export async function updateUserRole(sub: string, newRole: string) {
  const url = `${API_BASE_URL}/Users/${sub}/role`;
  const response = await fetch(url, {
    cache: "no-store",
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ NewRole : newRole }),
  });
  if (!response.ok) throw new Error("Failed to update user role");
  return await response.json();
}

export async function deleteUser(sub:string) {
  const response = await fetch(`${API_BASE_URL}/Users/${sub}`, {
      method: 'DELETE'
  })
  if (!response.ok) {
      throw new Error('It could not delete the developer')
  }
  return response.json()
}