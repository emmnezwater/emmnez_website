export const site = {
  name: 'Emmnez Water Solution Ltd',
  shortName: 'Emmnez Water',
  url: 'https://www.emmnezwater.com',
  phoneDisplay: '+234 (0) 703 020 9730',
  phone: '+2347030209730',
  whatsapp: '2347030209730',
  email: 'emmnezwatersolution@gmail.com',
  twitter: 'https://twitter.com/Emmnez1202',
  address: '8 Micheal Street, Iwofe Road, Port Harcourt, Rivers State',
  foundingDate: '2015-06-12'
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/services.html', label: 'Services' },
  { href: '/projects.html', label: 'Projects' },
  { href: '/about.html', label: 'About' },
  { href: '/contact.html', label: 'Contact' }
];

export interface Service {
  slug: string;
  number: string;
  title: string;
  summary: string;
  features: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: 'water-treatment', number: '01', title: 'Water treatment',
    summary: 'Source-specific purification systems engineered for homes, schools, healthcare facilities and industrial operations.',
    features: ['Reverse osmosis systems', 'Borehole treatment', 'Filtration and purification'],
    image: '/images/services-water-treatment.webp'
  },
  {
    slug: 'factory-installation', number: '02', title: 'Water factory installation',
    summary: 'Complete table and sachet water production environments, from layout and equipment selection through commissioning.',
    features: ['Factory layout and design', 'Procurement and installation', 'NAFDAC approval consultation'],
    image: '/images/project-ella-water-factory.webp'
  },
  {
    slug: 'equipment-supply', number: '03', title: 'Equipment and supply',
    summary: 'Reliable machines, treatment media, chemicals and critical spare parts sourced for lasting operational performance.',
    features: ['Production machinery', 'Treatment plants and devices', 'Accessories and spare parts'],
    image: '/images/hero-machine.webp'
  },
  {
    slug: 'maintenance', number: '04', title: 'Maintenance and support',
    summary: 'Preventive servicing, rapid diagnosis and expert repairs that protect uptime and extend equipment life.',
    features: ['System troubleshooting', 'Filter replacement', 'Scheduled servicing'],
    image: '/images/project-navy-water-system.webp'
  }
];

export interface Project {
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  metric: string;
}

export const projects: Project[] = [
  {
    title: 'Ella Table Water', category: 'Factory installation', client: 'Commercial production',
    description: 'A complete table-water production line integrating reverse osmosis, bottle blowing and automated filling.',
    image: '/images/project-ella-water-factory.webp', metric: 'End-to-end delivery'
  },
  {
    title: 'Navy Base Quarters', category: 'Water treatment', client: 'Government institution',
    description: 'A high-capacity iron-removal and purification system designed for a residential military complex.',
    image: '/images/project-navy-water-system.webp', metric: 'High-capacity system'
  },
  {
    title: 'Carina International Montessori', category: 'Institutional water', client: 'Education',
    description: 'Safe drinking-water stations and centralized filtration for students and staff.',
    image: '/images/project-school-water-station.webp', metric: 'Safer daily access'
  }
];

export const team = [
  ['Emmanuel Chinonso Ezebuiro', 'Technical Director', 'team-emmanuel.webp'],
  ['Jane Chinyere Ezebuiro', 'Auditor', 'team-jane.webp'],
  ['Ella Miracle Nu-ue', 'Marketing Manager', 'team-ella.webp'],
  ['Nworisa Chidinma Kelechi', 'Human Resources Manager', 'team-nworisa.webp'],
  ['Gift Dynasty Torubiri', 'Secretary', 'team-gift.webp'],
  ['Treasure Chizoba Agu', 'Secretary', 'team-treasure.webp'],
  ['Precious Michael', 'Secretary', 'team-precious.webp'],
  ['Abasiofon Silas', 'Marketer', 'team-abasiofon.webp'],
  ['Glory Thompson', 'Secretary', 'team-glory.webp']
] as const;

export const offices = [
  ['Head office', '8 Micheal Street, Iwofe Road', 'Port Harcourt, Rivers State'],
  ['Owerri office', 'Shop 2 Olive Plaza Industrial Cluster, Nekede Road', 'Owerri, Imo State'],
  ['Eket office', '29 Idua Road', 'Eket, Akwa Ibom State'],
  ['Uyo office', '4 Tabernacle Road, off Ikot Ekpene Road', 'Uyo, Akwa Ibom State'],
  ['Ughelli office', 'No. 1 Kez College Road, Ekrejebor', 'Ughelli, Delta State']
] as const;
