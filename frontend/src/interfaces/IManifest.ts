import { IAssignmentTest } from "./IAssignmentTest";

export interface IManifest {
  assignmentName: string;
  filePath: string;
  language: string;
  functionName: string;
  functionArity: number;
  tests: IAssignmentTest[];
}
