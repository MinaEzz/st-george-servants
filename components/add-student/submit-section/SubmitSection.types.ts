export interface ISubmitSectionProps {
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  /** رسالة خطأ جاية من الحفظ (شبكة / سيرفر) */
  errorMessage: string | null;
  /** عدد الحقول اللي فيها أخطاء تحقق */
  invalidCount: number;
}
