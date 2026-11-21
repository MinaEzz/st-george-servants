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
  /** false لو المخدوم اتحفظ لكن حفظ الملاحظة فشل (في الإضافة بس) */
  noteSaved: boolean;
}

export interface IUseStudentFormOptions {
  /** لو اتبعت، الفورم بيشتغل في وضع التعديل على المخدوم ده */
  student?: IStudent | null;
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

export function studentToFormValues(student: IStudent): IStudentFormValues {
  return {
    name: student.name,
    gender: student.gender,
    birthDate: student.birthDate,
    stageId: student.stageId,
    classId: student.classId,
    phoneNumber: student.phoneNumber,
    parentPhoneNumber: student.parentPhoneNumber,
    address: student.address,
    school: student.school,
    notes: "",
  };
}

export function useStudentForm({ student = null }: IUseStudentFormOptions = {}) {
  const { addStudent, updateStudent, addNote } = useDataStore();
  const { scope, getAuthor } = useSession();
  const { stages, getClassesByStage } = useClasses();

  const isEditing = student !== null;

  const initialValues = useMemo<IStudentFormValues>(
    () => (student ? studentToFormValues(student) : createInitialStudentValues(scope)),
    [student, scope],
  );

  const [values, setValues] = useState<IStudentFormValues>(initialValues);
  const [errors, setErrors] = useState<IStudentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initialValues),
    [values, initialValues],
  );

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

    const payload = {
      name: values.name.trim().replace(/\s+/g, " "),
      gender: values.gender as Gender,
      birthDate: values.birthDate,
      stageId: values.stageId,
      classId: values.classId,
      phoneNumber: normalizeDigits(values.phoneNumber),
      parentPhoneNumber: normalizeDigits(values.parentPhoneNumber),
      address: values.address.trim(),
      school: values.school.trim(),
    };

    try {
      if (student) {
        const updated = await updateStudent(student.id, payload);
        // نزامن الفورم مع القيم المحفوظة فعلاً (بعد التنظيف: أرقام لاتينية، مسافات...)
        setValues(studentToFormValues(updated));
        return { student: updated, noteSaved: true };
      }

      const created = await addStudent({ ...payload, image: null });

      let noteSaved = true;
      const noteBody = values.notes.trim();

      if (noteBody) {
        const author = getAuthor();
        try {
          await addNote({
            studentId: created.id,
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

      return { student: created, noteSaved };
    } catch (caught) {
      setSubmitError(getErrorMessage(caught));
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, student, addStudent, updateStudent, addNote, getAuthor]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setSubmitError(null);
  }, [initialValues]);

  return {
    values,
    errors,
    invalidCount: Object.keys(errors).length,
    isEditing,
    isDirty,
    isSubmitting,
    submitError,
    stageOptions,
    classOptions,
    onChange,
    submit,
    reset,
  };
}

export type StudentFormState = ReturnType<typeof useStudentForm>;
