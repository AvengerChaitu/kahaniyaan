export const TERM_MAP: Record<string, { term: string; script: string }> = {
  Hindi: { term: "बेटा", script: "beta" },
  Telugu: { term: "కన్నా", script: "kanna" },
  Tamil: { term: "கண்ணு", script: "kannu" },
  Kannada: { term: "ಮುದ್ದು", script: "muddu" },
  Malayalam: { term: "കുഞ്ഞേ", script: "kunje" },
  Marathi: { term: "बाळ", script: "baal" },
  Bengali: { term: "সোনা", script: "shona" },
  Gujarati: { term: "બેટા", script: "beta" },
  Punjabi: { term: "ਪੁੱਤ", script: "putt" },
  English: { term: "sweetie", script: "sweetie" },
};

export const MORAL_LABEL_MAP: Record<string, string> = {
  Hindi: "सीख",
  Telugu: "నీతి",
  Tamil: "நீதி",
  Kannada: "ನೀತಿ",
  Malayalam: "നീതി",
  Marathi: "शिक्षा",
  Bengali: "শিক্ষা",
  Gujarati: "શીખ",
  Punjabi: "ਸਿੱਖ",
  English: "Moral",
};

export function getTerm(language: string): string {
  return TERM_MAP[language]?.term || "beta";
}

export function getMoralLabel(language: string): string {
  return MORAL_LABEL_MAP[language] || "Moral";
}
