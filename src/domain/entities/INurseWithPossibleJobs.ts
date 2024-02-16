import { INurse } from './INurse';

export interface INurseWithPossibleJobs extends INurse {
  possibleJobs: number;
}
