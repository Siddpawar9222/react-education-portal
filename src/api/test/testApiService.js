import axios from "../customAxiosConfig/CustomAxiosConfig";

const testApiService = () => {
  try {
    return axios.get(`/collaborator/getAllCollaboratorsInfo`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default testApiService;