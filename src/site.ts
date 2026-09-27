export type NavItem = {
  label: string;
  href: string;
};

export type Site = {
  name: string;
  wordmark: string;
  person: string;
  description: string;
  hero: string;
  support: string;
  closing: string;
  email: string;
  domainLabel: string;
  origin: string;
  nav: NavItem[];
};

const email = "sebastian@ostlind.net";

export const site: Site = {
  name: "Östlind & Co Network",
  wordmark: "Östlind",
  person: "Sebastian Östlind",
  description:
    "Organizational psychology, executive coaching, and leadership consulting for senior leaders and their organizations.",
  hero: "Östlind & Co Network works with senior leaders, and with the organizations they are responsible for, through organizational psychology, executive coaching, and leadership consulting.",
  support:
    "The work is thoughtful, practical, and confidential. There is no standard program.",
  closing: "Sebastian Östlind takes client work only. The site is",
  email,
  domainLabel: "ostlind.network",
  origin: "https://ostlind.network",
  nav: [{ label: email, href: `mailto:${email}` }],
};
