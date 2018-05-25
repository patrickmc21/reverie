const deleteRobot = async (id) => {
  const url = `/api/v1/hosts/${id}`;
  const options = {
    method: 'DELETE'
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error
  }
};

export default deleteRobot;