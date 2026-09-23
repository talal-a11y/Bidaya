// Where a button in copy goes since the doors became one questionnaire (rework/rulings §9–§11):
// "#form-business" opens the questionnaire with "a founder or business owner" answered, and so on.
export const FORM_PRESETS: Record<string, string> = { "#form-business": "business", "#form-partners": "partners", "#form-general": "general" };
export const PAGE_FORMS: Record<string, string> = { "#form-talent": "/work-with-us" };

export function resolveHref(href: string, onHome: boolean): string {
  if (PAGE_FORMS[href]) return PAGE_FORMS[href];
  if (FORM_PRESETS[href]) return `${onHome ? "" : "/"}#form-reach`; // every entry starts at the first question (founder, 2026-09-23)
  if (/^#(form|chapter)-/.test(href)) return onHome ? href : `/${href}`;
  return href;
}
