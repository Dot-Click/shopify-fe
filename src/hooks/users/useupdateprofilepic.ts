import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "@/configs/axios.config";

interface UploadResponse {
  url: string;
}

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation<UploadResponse, any, File>({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("userProfile", file);
      return axios
        .post<UploadResponse>("/user/upload-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => resp.data);
    },
    onSuccess: () => {
      toast.success("Image uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      console.error("Failed to upload image:", error);
      toast.error(error?.response?.data?.message || "Image upload failed");
    },
  });
};
