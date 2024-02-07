const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Posts
export async function addNewPostHandler(
  title: string,
  content: string,
  userSub: string,
  postType: string,
  recruiterName?: string,
  recruiterEmail?: string,
): Promise<Post> {
  const url = `${API_BASE_URL}/Posts`;

  let postBody: any = {
    title: title,
    content: content,
    userSub: userSub,
  };

  if (postType === "JobPost") {
    postBody = {
      ...postBody,
      postType: "JobPost",
      recruiterName: recruiterName,
      recruiterEmail: recruiterEmail,
    };
  } else {
    postBody = {
      ...postBody,
      postType: postType,
      recruiterName: recruiterName,
      recruiterEmail: recruiterEmail,
    };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify(postBody),
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
  postType: string,
  userSub: string,
): Promise<void> {
  const url = `${API_BASE_URL}/Posts/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postType: postType,
        title: title,
        content: content,
        userSub: userSub,
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
