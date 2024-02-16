
import { IRemainingJobsGroupedByFacilityAndNurseTypes } from "../../domain/entities/IRemainingJobsGroupedByFacilityAndNurseTypes";
import { api } from "../config/api";

export async function findRemainingJobs() : Promise<IRemainingJobsGroupedByFacilityAndNurseTypes[]>{
  const response = await api.get('/jobs/remaining');
  return response.data;
}