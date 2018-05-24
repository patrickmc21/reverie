const updateRobot = async (robot) => {
  const url = `/api/v1/hosts/${robot.id}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify(robot),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    const updatedRobot = response.json();
    return updatedRobot;
  } catch (error) {
    return error;
  }
};

export default updateRobot;