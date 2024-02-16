import { IQuestionOneShift } from "../../domain/entities/IQuestionOneShift";
import { api } from "../config/api";

export async function findAllShiftsService() : Promise<IQuestionOneShift[]>{
  const response = await api.get('/question-one-shifts');
  return response.data;
}