
import { INurseWithPossibleJobs } from "../../domain/entities/INurseWithPossibleJobs";
import { api } from "../config/api";

export async function findBestFitForJobs() : Promise<INurseWithPossibleJobs[]>{
  const response = await api.get('/jobs/findBestFit');
  return response.data;
}