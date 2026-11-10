export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const skills = [
  'React', 'TypeScript', 'Tailwind CSS', 'HTML/CSS',
  'Flutter', 'Dart', 'C++', 'Python',
  'PHP', 'MySQL/MariaDB',
  'Linux', 'Git',
];

export const projects: Project[] = [
  {
    id: 'wmap',
    title: 'WMap',
    description: 'An interactive web and mobile map for locating water vending machines. Implemented using Leaflet for mapping with a PHP/MySQL backend.',
    techStack: ['React', 'PHP', 'MySQL', 'Leaflet', 'Flutter'],
    githubUrl: 'https://github.com/mkzxsm/wmap',
  },
  {
    id: 'book-of-hours',
    title: 'BookOfHours',
    description: 'Cross-platform mobile application with local storage and Java 17 desugaring support.',
    techStack: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/mkzxsm/BookOfHours',
  },
  {
    id: 'mini-btop',
    title: 'Mini-btop',
    description: 'Custom terminal system monitor. Written using the Standard Template Library (STL) and the CMake build system.',
    techStack: ['C++', 'CMake', 'STL'],
    githubUrl: 'https://github.com/mkzxsm/mini-btop',
  },
];
