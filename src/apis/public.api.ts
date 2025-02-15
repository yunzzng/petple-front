import baseInstance from "./axios";

const fetchFuneralData = async () => {
  const response = await baseInstance.get("/public/funeral");
  return response.data.funeralData;
};

const fetchMedicalData = async (
  region: string,
  type: "hospital" | "pharmacy"
) => {
  const response = await baseInstance.get("/public/medical", {
    params: { region, type },
  });
  return response.data.medicalData;
};


export { fetchFuneralData, fetchMedicalData  };
