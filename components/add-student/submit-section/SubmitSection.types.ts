export interface ISubmitSectionProps {
  onSubmit: () => void;
  onCancel: () => void;
  /** نص زرار الحفظ (الافتراضي: حفظ المخدوم) */
  submitLabel?: string;
  isSubmitting: boolean;
  /** رسالة خطأ جاية من الحفظ (شبكة / سيرفر) */
  errorMessage: string | null;
  /** عدد الحقول اللي فيها أخطاء تحقق */
  invalidCount: number;
}
