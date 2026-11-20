/**
 * طبقة التخزين المحلي. حالياً في الذاكرة فقط (بتتمسح لما التطبيق يتقفل).
 *
 * لما تضيف @react-native-async-storage/async-storage (أو expo-secure-store)
 * بدّل تنفيذ `appStorage` تحت في الملف ده بس، وباقي التطبيق مش هيتغير.
 */
export interface IAppStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

const memory = new Map<string, string>();

const memoryStorage: IAppStorage = {
  async getItem(key) {
    return memory.get(key) ?? null;
  },
  async setItem(key, value) {
    memory.set(key, value);
  },
  async removeItem(key) {
    memory.delete(key);
  },
};

export const appStorage: IAppStorage = memoryStorage;

export async function readJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await appStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

export async function writeJson<T>(key: string, value: T): Promise<void> {
  try {
    await appStorage.setItem(key, JSON.stringify(value));
  } catch {
    // فشل الحفظ المحلي لا يجب أن يوقف التطبيق
  }
}

export async function removeKey(key: string): Promise<void> {
  try {
    await appStorage.removeItem(key);
  } catch {
    // نتجاهل الخطأ
  }
}
