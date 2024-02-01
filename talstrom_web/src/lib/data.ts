const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addUserHandler(user: UserProps, jwt: { sub: string }) {
  const url = `${API_BASE_URL}/Users`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      picture: user.image,
      sub: jwt.sub,
    })
  });
  if (!response.ok) throw new Error("data.tsx : Failed to Create user")
  return await response.json
}

export async function fetchUsersByRole(role: string) {
  const url = `${API_BASE_URL}/Users/role?role=${role}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch users");
  return await response.json();
}

export async function updateUserRole(sub: string, newRole: string) {
  const url = `${API_BASE_URL}/Users/${sub}/role`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newRole : newRole }),
  });
  if (!response.ok) throw new Error("Failed to update user role");
  return await response.json();
}
