import { IQuestionOneShift } from '../entities/IQuestionOneShift';

export interface ICompareTwoShiftsDTOInput {
  firstShift: IQuestionOneShift['shiftId'];
  secondShift: IQuestionOneShift['shiftId'];
}
