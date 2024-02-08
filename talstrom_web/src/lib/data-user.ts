import { User } from '@/types/IUser';
import { EditUserProfile } from '@/ui/atoms/profile/edit-profile';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addUserHandler(user: User): Promise<User> {
  const url = `${API_BASE_URL}/Users`;
  const response = await fetch(url, {
    cache: 'no-store',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      picture: user.picture,
      sub: user.sub,
    }),
  });
  if (!response.ok) throw new Error('addUserHandler: Failed to Create user');
  return await response.json();
}

export async function fetchUsers() {
  const url = `${API_BASE_URL}/Users`;
  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });
  if (!response.ok) throw new Error('fetchUsersByRole: Failed to fetch users');
  return await response.json();
}

export async function fetchUsersBySub(sub: string) {
  const url = `${API_BASE_URL}/Users/${sub}`;
  const response = await fetch(url, {
    cache: 'no-store',
  });
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('fetchUsersByRole: Failed to fetch users');
  }
  return await response.json();
}

export async function fetchUsersByRole(role: string) {
  const url = `${API_BASE_URL}/Users/role/${role}`;
  const response = await fetch(url, {
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('fetchUsersByRole: Failed to fetch users');
  return await response.json();
}

export async function fetchUsersByFilter(sub: string) {
  const url = `${API_BASE_URL}/Users/technologies/filter/${sub}/`;
  const response = await fetch(url, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('fetchUsersByRole: Failed to fetch users');
  return await response.json();
}

export async function updateUserRole(sub: string, role: string) {
  const url = `${API_BASE_URL}/Users/${sub}/${role}`;
  const response = await fetch(url, {
    cache: 'no-store',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok)
    throw new Error('updateUserRole:Failed to update user role');
  return await response.json();
}

export async function updateUserProfile(sub: string, props: EditUserProfile) {
  const adjustedProps = {
    ...props,
    technologies: props.technologies.join(','),
  };
  const url = `${API_BASE_URL}/Users/editProfile/${sub}`;
  const response = await fetch(url, {
    cache: 'no-store',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adjustedProps),
  });
  if (!response.ok)
    throw new Error('updateUserRole:Failed to update user role');
  return await response.json();
}

export async function deleteUser(sub: string) {
  const response = await fetch(`${API_BASE_URL}/Users/${sub}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('deleteUser:It could not delete the developer');
  }
  return response.json();
}