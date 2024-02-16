import { IQuestionOneShift } from '../entities/IQuestionOneShift';

export interface ICompareTwoShiftsDTOInput {
  firstShift: IQuestionOneShift;
  secondShift: IQuestionOneShift;
}
