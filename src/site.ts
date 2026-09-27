export type Service = {
  title: string;
  text: string;
};

export type Section = {
  id: "audience" | "services" | "approach" | "about" | "contact";
  heading: string;
  paragraphs: string[];
  services?: Service[];
};

export type Site = {
  name: string;
  person: string;
  description: string;
  positioning: string;
  email: string;
  domainLabel: string;
  origin: string;
  cta: string;
  sections: Section[];
};

export const site: Site = {
  name: "Östlind & Co Network",
  person: "Sebastian Östlind",
  description:
    "Organizational psychology, executive coaching, and leadership consulting for senior leaders and their organizations.",
  positioning:
    "Organizational psychology, executive coaching, and leadership consulting for senior leaders and the organizations they lead.",
  email: "sebastian@ostlind.net",
  domainLabel: "ostlind.network",
  origin: "https://ostlind.network",
  cta: "Write to Sebastian",
  sections: [
    {
      id: "audience",
      heading: "Who it's for",
      paragraphs: [
        "The practice is for senior leaders, and for the organizations they are responsible for.",
        "An engagement is usually with one leader, a leadership group, or an organization working through a change that needs careful thought.",
      ],
    },
    {
      id: "services",
      heading: "Services",
      paragraphs: ["Client work takes three forms."],
      services: [
        {
          title: "Executive coaching",
          text: "A confidential relationship with a senior leader, focused on the role and the decisions that come with it.",
        },
        {
          title: "Leadership consulting",
          text: "Work with a leadership team on how that team leads.",
        },
        {
          title: "Organizational psychology",
          text: "The field behind the coaching and the consulting. The practice uses it to understand people, roles, and the organization.",
        },
      ],
    },
    {
      id: "approach",
      heading: "Approach",
      paragraphs: [
        "The work is thoughtful, practical, and confidential.",
        "What is said in a session stays there.",
        "The aim is something the client can act on. There is no standard program.",
      ],
    },
    {
      id: "about",
      heading: "About",
      paragraphs: [
        "Sebastian Östlind works with senior leaders through Östlind & Co Network.",
        "The practice is organizational psychology, executive coaching, and leadership consulting. It takes client work only.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      paragraphs: ["Write to Sebastian Östlind about client work."],
    },
  ],
};
