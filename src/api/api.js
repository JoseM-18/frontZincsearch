
const response = async () => {

  try {

    const response = await fetch('http://localhost:9090/search?q=james');
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }



}

export default response;
