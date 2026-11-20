import {
  readJson,
  removeKey,
  writeJson,
} from "@/services/storage/storage.service";
import type {
  IPersistedSession,
  ISessionAuthor,
  ISessionScope,
  ISessionUser,
} from "@/types/session.types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SESSION_STORAGE_KEY = "st-george-servants/session";

const EMPTY_SCOPE: ISessionScope = {
  stageId: null,
  stageName: null,
  classId: null,
  className: null,
};

const FALLBACK_AUTHOR: ISessionAuthor = { id: "unknown", name: "خادم" };

interface ISessionContextValue {
  user: ISessionUser | null;
  scope: ISessionScope;
  /** true بعد ما نخلص قراءة الجلسة المحفوظة (مهم لما التخزين يبقى دائم) */
  isHydrated: boolean;
  signIn: (user: ISessionUser) => void;
  signOut: () => void;
  selectScope: (scope: ISessionScope) => void;
  clearScope: () => void;
  /** الخادم الحالي كمؤلف للملاحظات وتسجيل الحضور */
  getAuthor: () => ISessionAuthor;
}

const SessionContext = createContext<ISessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ISessionUser | null>(null);
  const [scope, setScope] = useState<ISessionScope>(EMPTY_SCOPE);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const saved = await readJson<IPersistedSession>(SESSION_STORAGE_KEY);
      if (cancelled) return;

      if (saved) {
        setUser(saved.user);
        setScope(saved.scope);
      }
      setIsHydrated(true);
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!user) {
      void removeKey(SESSION_STORAGE_KEY);
      return;
    }

    const session: IPersistedSession = { user, scope };
    void writeJson(SESSION_STORAGE_KEY, session);
  }, [isHydrated, user, scope]);

  const signIn = useCallback((nextUser: ISessionUser) => {
    setUser(nextUser);
    setScope(EMPTY_SCOPE);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setScope(EMPTY_SCOPE);
  }, []);

  const selectScope = useCallback((nextScope: ISessionScope) => {
    setScope(nextScope);
  }, []);

  const clearScope = useCallback(() => {
    setScope(EMPTY_SCOPE);
  }, []);

  const getAuthor = useCallback((): ISessionAuthor => {
    return user ? { id: user.id, name: user.name } : FALLBACK_AUTHOR;
  }, [user]);

  const value = useMemo<ISessionContextValue>(
    () => ({
      user,
      scope,
      isHydrated,
      signIn,
      signOut,
      selectScope,
      clearScope,
      getAuthor,
    }),
    [user, scope, isHydrated, signIn, signOut, selectScope, clearScope, getAuthor],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): ISessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession لازم يتستخدم داخل SessionProvider");
  }
  return context;
}
