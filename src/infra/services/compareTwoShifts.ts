import { ICompareTwoShiftsDTOInput } from "../../domain/dtos/ICompareTwoShiftsDTOInput";
import { ICompareTwoShiftsDTOOutput } from "../../domain/dtos/ICompareTwoShiftsDTOOutput";
import { api } from "../config/api";

export async function compareTwoShifts(shifts: ICompareTwoShiftsDTOInput): Promise<ICompareTwoShiftsDTOOutput>{
  const response = await api.post('/question-one-shifts/compare', shifts);
  return response.data;
}