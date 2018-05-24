const getSingleRobot = async (id) => {
  const url = `/api/v1/hosts/${id}`;

  try {
    const response = await fetch(url);
    const robot = await response.json();
    return robot;
  } catch (error) {
    return error;
  }
};

export default getSingleRobot;