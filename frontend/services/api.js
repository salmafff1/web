import axios from "axios";

const API_BASE = "http://localhost:5000";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_BASE}/api/ocr`, formData);
  return res.data;
};
