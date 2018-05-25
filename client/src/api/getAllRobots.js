const getAllRobots = async () => {
  const url = '/api/v1/hosts';

  try {
    const response = await fetch(url);
    const robots = await response.json();
    return robots;
  } catch (error) {
    throw error;
  }
};

export default getAllRobots;