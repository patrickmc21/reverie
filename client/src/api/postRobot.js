const postRobot = async (robot) => {
  const url = '/api/v1/hosts';
  const options = {
    method: 'POST',
    body: JSON.stringify(robot),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    const robotWithId = await response.json();
    return robotWithId;
  } catch (error) {
    return error;
  }
};

export default postRobot;