"use client";

import { useLanguage, type Language } from "@/contexts/language-context";
import type { ReactNode } from "react";

interface BilingualTextProps {
  en: string | ReactNode;
  vi: string | ReactNode;
}

interface BilingualParagraphProps {
  id?: string;
  en: ReactNode;
  vi: ReactNode;
}

/**
 * Component for inline bilingual text that switches based on language
 * Usage: <T en="Hello" vi="Xin chào" />
 */
export function T({ en, vi }: BilingualTextProps) {
  const { language } = useLanguage();
  return <>{language === "en" ? en : vi}</>;
}

/**
 * Component for bilingual paragraphs with optional id
 * Usage: <P en={<p>English content</p>} vi={<p>Vietnamese content</p>} />
 */
export function P({ en, vi, id }: BilingualParagraphProps) {
  const { language } = useLanguage();
  return <div id={id}>{language === "en" ? en : vi}</div>;
}

/**
 * Component for bilingual headings
 * Usage: <H2 en="Title" vi="Tiêu đề" />
 */
export function H2({ en, vi }: BilingualTextProps) {
  const { language } = useLanguage();
  return <h2>{language === "en" ? en : vi}</h2>;
}

export function H3({ en, vi }: BilingualTextProps) {
  const { language } = useLanguage();
  return <h3>{language === "en" ? en : vi}</h3>;
}

export function H4({ en, vi }: BilingualTextProps) {
  const { language } = useLanguage();
  return <h4>{language === "en" ? en : vi}</h4>;
}

/**
 * Higher-order component to make any component bilingual
 * Usage: <Bilingual en={<Component>English</Component>} vi={<Component>Vietnamese</Component>} />
 */
export function Bilingual({ en, vi }: BilingualTextProps) {
  const { language } = useLanguage();
  return <>{language === "en" ? en : vi}</>;
}

/**
 * Component for creating bilingual sections with multiple elements
 */
interface BilingualSectionProps {
  children: {
    [K in Language]: ReactNode;
  };
}

export function BilingualSection({ children }: BilingualSectionProps) {
  const { language } = useLanguage();
  return <>{children[language]}</>;
}
