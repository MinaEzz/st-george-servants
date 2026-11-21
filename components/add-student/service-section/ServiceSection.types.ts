import type { ISelectOption } from "@/types/common.types";
import type { IStudentFormSectionProps } from "@/types/student-form.types";

export interface IServiceSectionProps extends IStudentFormSectionProps {
  stageOptions: ISelectOption[];
  classOptions: ISelectOption[];
}
