import { axiosClassic, axiosWithAuth } from "@/api/interseptors";

class ImageService {
  private BASE_URL = '/image';

  async GetImage(imageId: number | null) {
    if (imageId === null) return;
    const response = await axiosClassic.get(this.BASE_URL + `/${imageId}`, {responseType: 'blob'});
    return response.data;
  }

  async AddImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosWithAuth.post<string>(this.BASE_URL, formData, {headers: { 'Content-Type': 'multipart/form-data'} });
    return response.data;
  }

  async GetImagesByType(total: number, type: 'country' | 'hotel' | 'tour') {
    const response = await axiosClassic.get<{image_id: number}[]>(this.BASE_URL + `/type/${total}/${type}`);
    return response.data;
  }
}

export const imageService = new ImageService();