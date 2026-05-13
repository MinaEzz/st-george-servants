export function getStudentImage(
  image: string | null,
  gender: "male" | "female",
) {
  if (image && image.trim() !== "") {
    return { uri: image };
  }
  return gender === "male"
    ? require("@/assets/images/male-image-placeholder.png")
    : require("@/assets/images/female-image-placeholder.png");
}
