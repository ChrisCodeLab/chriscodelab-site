export const projects = [
  {
    id: 1,
    name: "Veridex",
    description:
      "An immutable audit evidence platform that preserves records across audit cycles with full version history, timestamps, and ownership metadata. Built to replace fragile, mutable audit trails in financial compliance workflows.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "AWS", "REST API"],
    status: "Active",
    highlights: [
      "Immutable record architecture using append-only event sourcing",
      "Full version history with diff-based change tracking",
      "Ownership metadata and timestamp chains for compliance",
      "Role-based access control with JWT authentication",
    ],
    github: "https://github.com/ChrisCodeLab",
    featured: true,
  },
  {
    id: 2,
    name: "Student Project Showcase",
    description:
      "A platform enabling students to publish short project summaries and demos, helping recruiters discover talent beyond traditional resumes. Features search, tech stack filtering, and recruiter outreach tooling.",
    tags: ["Java", "Spring Boot", "MySQL", "React", "AWS"],
    status: "In Progress",
    highlights: [
      "Student profiles with project portfolios and video demos",
      "Tech stack filtering and full-text keyword search",
      "Recruiter discovery and direct outreach tooling",
      "Showcases projects with repo links and live demos",
    ],
    github: "https://github.com/ChrisCodeLab",
    featured: true,
  },
];
