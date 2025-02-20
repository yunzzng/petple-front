import baseInstance from "./axios";

const getPresignedUrl = async ({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) => {
  try {
    const response = await baseInstance.get(
      `/images/s3/presigned-url?fileName=${fileName}&fileType=${fileType}`
    );
    return response.data.presignedUrl;
  } catch (error) {
    throw error;
  }
};

export { getPresignedUrl };
