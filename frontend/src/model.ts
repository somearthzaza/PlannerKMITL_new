export interface curiculum {
  curriculum_id: number;
  curriculum_name: string;
  type_id: string | number;
  total_credit: number;
}

export interface subject {
  subject_id: string;
  subject_name: string;
  credit: number;
  type: string;
  curriculum_id: number;
  Curriculum_name: string;
}

export interface selectSubject {
  firstYear: subject[];
  secondYear: subject[];
  thirdYear: subject[];
}

export interface curiculum {
  abbreviation: string;
  "stand for": string;
  total_plan: number;
}
