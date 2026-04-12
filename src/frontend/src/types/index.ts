export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  stars: number;
  isCelebrity?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Achievement {
  number: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}
