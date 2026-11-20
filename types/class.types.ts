export interface IStage {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export interface IClass {
  id: string;
  stageId: string;
  name: string;
}

/** الفصل مع عدد المخدومين (بيتحسب تلقائياً من قايمة المخدومين) */
export interface IClassWithCount extends IClass {
  studentsCount: number;
}

export interface INewClassInput {
  stageId: string;
  name: string;
}
