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
    //body: JSON.stringify({ role }),
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

// Video Handling
export async function addMedia(
  media: File,
  sub: string,
  mediaType: string,
): Promise<Media> {
  const url = `${API_BASE_URL}/${mediaType}/upload`;
  const formData = new FormData();
  formData.append('file', media);
  formData.append('sub', sub);
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      method: 'POST',
      headers: {},
      body: formData,
    });

    if (!response.ok)
      throw new Error('upload Video Error: Failed to Upload video');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchVideoById(id: string) {
  const url = `${API_BASE_URL}/Video/${id}
  `;
  const response = await fetch(url, {
    cache: 'no-store',
  });
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('fetchVideoById: Failed to fetch video');
  }
  return await response.json();
}

export async function deleteMedia(mediaType: string, mediaTitle: string) {
  const url = `${API_BASE_URL}/${mediaType}/delete?${mediaType.toLowerCase()}Name=${mediaTitle}`;
  const response = await fetch(url, {
    cache: 'no-store',
    method: 'DELETE',
  });
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`fetchMediaById: Failed to delete ${mediaType}`);
  }
  return await response.json();
}

// Posts

export async function addNewPostHandler(
  title: string,
  content: string,
  sub: string,
): Promise<Post> {
  const url = `${API_BASE_URL}/Posts`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 0,
        title: title,
        content: content,
        userSub: sub,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add a new post. Server responded with ${response.status}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error in addNewPostHandler:', error);
    throw error;
  }
}

export async function updateUserPost(
  postId: number,
  title: string,
  content: string,
): Promise<void> {
  const url = `${API_BASE_URL}/Posts/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    console.log('Update Post Response:', response);

    if (!response.ok) {
      console.error('Failed to update post. Server response:', response);
      throw new Error('Failed to update post');
    }
  } catch (error) {
    console.error('Error in updateUserPost:', error);
    throw error;
  }
}

export async function deleteUserPost(postId: number): Promise<void> {
  const url = `${API_BASE_URL}/Posts/${postId}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('deleteUserPost: Failed to delete user posts');
  }
}
