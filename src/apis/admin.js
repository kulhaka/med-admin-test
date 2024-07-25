import axios from "axios";

const adminApi = {};

adminApi.getDashboardData = () =>
  axios.get("https://test-api-py77dwlbxa-df.a.run.app/data");

export default adminApi;
