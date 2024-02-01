//const API_BASE_URL = 'https://talstromapi.azurewebsites.net/api'
const API_BASE_URL = 'http://localhost:5000/api'

export const fetchUsersByRole = async (role: string) => {
    const response = await fetch(`${API_BASE_URL}/Users/role?role=${role}`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

export const updateUserRole = async (userSub: string, newRole: string) => {
    const response = await fetch(`${API_BASE_URL}/Users/${userSub}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user role');
    }
    return response.json();
  };