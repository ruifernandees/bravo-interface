
import { INurseWithPossibleJobs } from "../../domain/entities/INurseWithPossibleJobs";
import { api } from "../config/api";

export async function findPossibleJobsForNurses() : Promise<INurseWithPossibleJobs[]>{
  const response = await api.get('/nurses/possibleJobs');
  return response.data;
}