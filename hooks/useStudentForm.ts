import { useClasses } from "@/hooks/useClasses";
import { getErrorMessage } from "@/services/errors";
import { useDataStore } from "@/store/data.store";
import { useSession } from "@/store/session.store";
import type { Gender, ISelectOption } from "@/types/common.types";
import type { ISessionScope } from "@/types/session.types";
import type {
  IStudentFormErrors,
  IStudentFormValues,
  StudentFormChangeHandler,
} from "@/types/student-form.types";
import type { IStudent } from "@/types/student.types";
import { normalizeDigits } from "@/utils/formatPhone";
import { validateStudentForm } from "@/utils/validateStudentForm";
import { useCallback, useMemo, useState } from "react";

export interface ISubmitStudentResult {
  student: IStudent;
  /** false لو المخدوم اتحفظ لكن حفظ الملاحظة فشل */
  noteSaved: boolean;
}

export function createInitialStudentValues(
  scope?: ISessionScope,
): IStudentFormValues {
  return {
    name: "",
    gender: "",
    birthDate: "",
    stageId: scope?.stageId ?? "",
    classId: scope?.classId ?? "",
    phoneNumber: "",
    parentPhoneNumber: "",
    address: "",
    school: "",
    notes: "",
  };
}

export function useStudentForm() {
  const { addStudent, addNote } = useDataStore();
  const { scope, getAuthor } = useSession();
  const { stages, getClassesByStage } = useClasses();

  const [values, setValues] = useState<IStudentFormValues>(() =>
    createInitialStudentValues(scope),
  );
  const [errors, setErrors] = useState<IStudentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = useCallback<StudentFormChangeHandler>((field, value) => {
    setValues((previous) => {
      const next = { ...previous, [field]: value };
      // تغيير المرحلة بيلغي الفصل المختار لأنه ممكن ما يبقاش تابع للمرحلة الجديدة
      if (field === "stageId" && value !== previous.stageId) {
        next.classId = "";
      }
      return next;
    });

    setErrors((previous) => {
      if (!previous[field] && !(field === "stageId" && previous.classId)) {
        return previous;
      }
      const next = { ...previous };
      delete next[field];
      if (field === "stageId") delete next.classId;
      return next;
    });

    setSubmitError(null);
  }, []);

  const stageOptions = useMemo<ISelectOption[]>(
    () => stages.map((stage) => ({ label: stage.name, value: stage.id })),
    [stages],
  );

  const classOptions = useMemo<ISelectOption[]>(
    () =>
      values.stageId
        ? getClassesByStage(values.stageId).map((item) => ({
            label: item.name,
            value: item.id,
          }))
        : [],
    [values.stageId, getClassesByStage],
  );

  const submit = useCallback(async (): Promise<ISubmitStudentResult | null> => {
    const validation = validateStudentForm(values);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setSubmitError(null);
      return null;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const student = await addStudent({
        name: values.name.trim().replace(/\s+/g, " "),
        gender: values.gender as Gender,
        birthDate: values.birthDate,
        stageId: values.stageId,
        classId: values.classId,
        image: null,
        phoneNumber: normalizeDigits(values.phoneNumber),
        parentPhoneNumber: normalizeDigits(values.parentPhoneNumber),
        address: values.address.trim(),
        school: values.school.trim(),
      });

      let noteSaved = true;
      const noteBody = values.notes.trim();

      if (noteBody) {
        const author = getAuthor();
        try {
          await addNote({
            studentId: student.id,
            kind: "general",
            contactMethod: null,
            body: noteBody,
            authorId: author.id,
            authorName: author.name,
          });
        } catch {
          noteSaved = false;
        }
      }

      return { student, noteSaved };
    } catch (caught) {
      setSubmitError(getErrorMessage(caught));
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, addStudent, addNote, getAuthor]);

  const reset = useCallback(() => {
    setValues(createInitialStudentValues(scope));
    setErrors({});
    setSubmitError(null);
  }, [scope]);

  return {
    values,
    errors,
    invalidCount: Object.keys(errors).length,
    isSubmitting,
    submitError,
    stageOptions,
    classOptions,
    onChange,
    submit,
    reset,
  };
}
