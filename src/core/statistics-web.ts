export const getDashboardStatistics = async (userId: string) => {
  const url = `http://localhost:3000/dashboard/${userId}/statistics`;
  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    throw new Error('Failed to fetch Dashboard Statistics');
  }
  const data = await res.json();
  return data.data;
}