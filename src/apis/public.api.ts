import baseInstance from "./axios";
import { PlaceInfo, FuneralService, MedicalService, FoodService } from "@/types/petApi.type";

const getFuneralData = async (): Promise<FuneralService[]> => {
  try {
    const response = await baseInstance.get("/public/funeral");
    return response.data.funeralData;
  } catch (error) {
    return [];
  }
};

const getMedicalData = async (
  region: string,
  type: "hospital" | "pharmacy"
): Promise<MedicalService[]> => {
  try {
    const response = await baseInstance.get("/public/medical", {
      params: { region, type },
    });
    return response.data.medicalData;
  } catch (error) {
    return [];
  }
};

const getPlacesData = async (category: string): Promise<PlaceInfo[]> => {
  try {
    const response = await baseInstance.get("/public/place", {
      params: { category, page: 1, numOfRows: 100 },
    });
    return response.data.places || [];
  } catch (error) {
    return [];
  }
};

const getPlaceDetail = async (id: string) => {
  try {
    const response = await baseInstance.get(`/public/place/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const getPetFood = async (search?: string, category?: string): Promise<FoodService[]> => {
  try {
    const params: Record<string, string> = {};

    if (search) params.search = search;
    if (category && category !== "all") params.category = category;

    const response = await baseInstance.get("/public/food", { params });

    return response.data.data || [];
  } catch (error) {
    return [];
  }
};

export { getFuneralData, getMedicalData, getPlacesData, getPlaceDetail, getPetFood };