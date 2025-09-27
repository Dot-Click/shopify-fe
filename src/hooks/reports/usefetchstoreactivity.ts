import { useMutation } from "@tanstack/react-query";
import { axios, type ErrorWithMessage } from "@/configs/axios.config"; // Adjust the path as needed

interface GenerateReportArgs {
  url: string;
  fileName: string;
}

const generateReportFn = async ({ url, fileName }: GenerateReportArgs) => {
  try {
    const response = await axios.get(url, {
      responseType: "blob",
    });

    const fileURL = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);

    link.click();
    link.remove();
    window.URL.revokeObjectURL(fileURL);

    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const useGenerateReportMutation = () => {
  return useMutation<unknown, ErrorWithMessage, GenerateReportArgs>({
    mutationFn: generateReportFn,
  });
};
