import { Alert, Linking } from "react-native";

/** يفتح رابط خارجي (اتصال / واتساب / خرائط) ويعرض رسالة لو الجهاز ما قدرش يفتحه */
export async function openExternalUrl(url: string): Promise<void> {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      "تعذر فتح الرابط",
      "تأكد إن التطبيق المطلوب متاح على جهازك وحاول مرة أخرى.",
    );
  }
}
