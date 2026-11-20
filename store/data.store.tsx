import * as attendanceService from "@/services/attendance.service";
import * as classesService from "@/services/classes.service";
import { getErrorMessage } from "@/services/errors";
import * as notesService from "@/services/notes.service";
import * as studentsService from "@/services/students.service";
import type {
  IAttendanceRecord,
  ISaveAttendanceInput,
} from "@/types/attendance.types";
import type { IClass, INewClassInput } from "@/types/class.types";
import type {
  INewNoteInput,
  INote,
  IUpdateNoteInput,
} from "@/types/note.types";
import type {
  INewStudentInput,
  IStudent,
  IUpdateStudentInput,
} from "@/types/student.types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface IDataContextValue {
  classes: IClass[];
  students: IStudent[];
  attendanceRecords: IAttendanceRecord[];
  notes: INote[];
  isLoading: boolean;
  /** رسالة عربية جاهزة للعرض لو آخر تحميل فشل */
  error: string | null;
  refresh: () => Promise<void>;

  addClass: (input: INewClassInput) => Promise<IClass>;
  addStudent: (input: INewStudentInput) => Promise<IStudent>;
  updateStudent: (
    id: string,
    changes: IUpdateStudentInput,
  ) => Promise<IStudent>;
  saveAttendance: (input: ISaveAttendanceInput) => Promise<void>;
  addNote: (input: INewNoteInput) => Promise<INote>;
  updateNote: (input: IUpdateNoteInput) => Promise<INote>;
  deleteNote: (id: string) => Promise<void>;
}

const DataContext = createContext<IDataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    IAttendanceRecord[]
  >([]);
  const [notes, setNotes] = useState<INote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [loadedClasses, loadedStudents, loadedRecords, loadedNotes] =
        await Promise.all([
          classesService.getClasses(),
          studentsService.getStudents(),
          attendanceService.getAttendanceRecords({}),
          notesService.getNotes({}),
        ]);

      setClasses(loadedClasses);
      setStudents(loadedStudents);
      setAttendanceRecords(loadedRecords);
      setNotes(loadedNotes);
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addClass = useCallback(async (input: INewClassInput) => {
    const created = await classesService.addClass(input);
    setClasses((previous) => [...previous, created]);
    return created;
  }, []);

  const addStudent = useCallback(async (input: INewStudentInput) => {
    const created = await studentsService.addStudent(input);
    setStudents((previous) => [...previous, created]);
    return created;
  }, []);

  const updateStudent = useCallback(
    async (id: string, changes: IUpdateStudentInput) => {
      const updated = await studentsService.updateStudent(id, changes);
      setStudents((previous) =>
        previous.map((student) => (student.id === id ? updated : student)),
      );
      return updated;
    },
    [],
  );

  const saveAttendance = useCallback(async (input: ISaveAttendanceInput) => {
    const savedRecords = await attendanceService.saveAttendance(input);

    setAttendanceRecords((previous) => [
      ...previous.filter(
        (record) =>
          !(record.date === input.date && record.classId === input.classId),
      ),
      ...savedRecords,
    ]);
  }, []);

  const addNote = useCallback(async (input: INewNoteInput) => {
    const created = await notesService.addNote(input);
    setNotes((previous) => [...previous, created]);
    return created;
  }, []);

  const updateNote = useCallback(async (input: IUpdateNoteInput) => {
    const updated = await notesService.updateNote(input);
    setNotes((previous) =>
      previous.map((note) => (note.id === updated.id ? updated : note)),
    );
    return updated;
  }, []);

  const deleteNote = useCallback(async (id: string) => {
    await notesService.deleteNote(id);
    setNotes((previous) => previous.filter((note) => note.id !== id));
  }, []);

  const value = useMemo<IDataContextValue>(
    () => ({
      classes,
      students,
      attendanceRecords,
      notes,
      isLoading,
      error,
      refresh,
      addClass,
      addStudent,
      updateStudent,
      saveAttendance,
      addNote,
      updateNote,
      deleteNote,
    }),
    [
      classes,
      students,
      attendanceRecords,
      notes,
      isLoading,
      error,
      refresh,
      addClass,
      addStudent,
      updateStudent,
      saveAttendance,
      addNote,
      updateNote,
      deleteNote,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataStore(): IDataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataStore لازم يتستخدم داخل DataProvider");
  }
  return context;
}
