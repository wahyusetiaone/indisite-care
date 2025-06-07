import { createAxiosWithAuth } from "@/helper/axiosHelper";
import {
  FetchAllSchedulesParams,
  FetchAllSchedulesResponse,
  CreateScheduleDto,
  UpdateScheduleDto,
} from "./types/ScheduleInterface";

const proxy = "medical-api";
const axiosWithAuth = createAxiosWithAuth(proxy);

export const fetchAllSchedules = async (params: FetchAllSchedulesParams) => {
  const response = await axiosWithAuth.get<FetchAllSchedulesResponse>(
    "/schedules",
    { params }
  );
  return response.data;
};

export const fetchScheduleById = async (id: string) => {
  const response = await axiosWithAuth.get(`/schedules/${id}`);
  return response.data;
};

export const createSchedule = async (data: CreateScheduleDto) => {
  const response = await axiosWithAuth.post(
    "/schedules",
    data,
    {
      headers: { "Content-Type": "application/json" },
      transformRequest: [(data) => JSON.stringify(data)],
    }
  );
  return response.data;
};

export const updateSchedule = async (id: string, data: UpdateScheduleDto) => {
  const response = await axiosWithAuth.put(
    `/schedules/${id}`,
    data,
    {
      headers: { "Content-Type": "application/json" },
      transformRequest: [(data) => JSON.stringify(data)],
    }
  );
  return response.data;
};

export const deleteSchedule = async (id: string) => {
  const response = await axiosWithAuth.delete(`/schedules/${id}`);
  return response.data;
};
