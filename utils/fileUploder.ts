export const UploadFile = async (
  file: File,
  field: string
): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("user", file);

  try {
    const response = await fetch(`http://localhost:3001/${field}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        // Optional headers if required
        // 'Authorization': 'Bearer <your-token>',
      },
    });

    const result = await response.json();
    if (response.ok) {
      console.log("File uploaded successfully:", result);
      return result.path;
    } else {
      console.log("Failed to upload file:", result.message);
    }
  } catch (error) {
    console.log("Error uploading file:", error);
  }
};

export const UploadFiles = async (file: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("user", file);

  try {
    const response = await fetch(
      "http://localhost:3001/student-profile/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          // Optional headers if required
          // 'Authorization': 'Bearer <your-token>',
        },
      }
    );

    const result = await response.json();
    if (response.ok) {
      console.log("File uploaded successfully:", result);
      return result.path;
    } else {
      console.log("Failed to upload file:", result.message);
    }
  } catch (error) {
    console.log("Error uploading file:", error);
  }
};
