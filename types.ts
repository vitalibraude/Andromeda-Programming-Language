
export interface LanguageSpecs {
  variables: string;
  functions: string;
  loops: string;
  print: string;
  types: string;
  description: string;
}

export interface ExecutionResult {
  output: string;
  error?: string;
  analysis?: string;
}

export interface HistoryItem {
  id: string;
  code: string;
  specs: LanguageSpecs;
  result: ExecutionResult;
  timestamp: number;
}
