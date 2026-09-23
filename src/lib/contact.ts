export const CONTACT = {
  name: "Steve Uryuu",
  email: "getlocaljapan@gmail.com",
  phoneDisplay: "+81 90 9562 0737",
  phoneTel: "+819095620737",
  whatsapp: "https://wa.me/819095620737",
} as const;

export const INTRO_TEXT =
  "Hello Steve, I would like a private Japan journey with getlocaljapan.";

export function whatsappLink(text: string) {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}
