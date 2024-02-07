const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
