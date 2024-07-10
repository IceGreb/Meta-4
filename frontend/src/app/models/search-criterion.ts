export interface SearchCriterion {
  logic: string | null;
  field: string;
  operator: string;
  value: string;
  type: string;
}
