import { ArticleItem } from '../../components/article-card/article-card';
import { UserProfileData } from '../../pages/profile/profile';

export const MOCK_ARTICLES: ArticleItem[] = [
  {
    id: 'art-101',
    title: 'Mastering Type-Safe Architectures with NestJS and Prisma',
    description:
      'Dive deep into database schemas, data transition objects (DTOs), and how to leverage Prisma Client extensions to build an incredibly resilient, fully type-safe backend API pipeline.',
    tags: ['nestjs', 'prisma', 'typescript', 'backend'],
    createdAt: new Date('2026-06-01T10:30:00Z'),
    readingTime: '6 min',
    isLiked: true,
    isArchived: false,
    author: {
      name: 'Franck Amani',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
  },
  {
    id: 'art-102',
    title: 'Why You Should Switch to Angular Signals Right Now',
    description:
      'A practical comparison between traditional zone-based change detection and the modern reactivity model of Signals. Learn how to optimize component rendering cycles effortlessly.',
    tags: ['angular', 'signals', 'frontend', 'webdev'],
    createdAt: '2026-06-04', // Testing string date compatibility
    readingTime: '4 min',
    isLiked: false,
    isArchived: true,
    author: {
      name: 'Sarah Jenkins',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
  },
  {
    id: 'art-103',
    title: 'Real-Time Database Subscriptions Using Supabase Storage & Broadcast',
    description:
      'An architectural breakdown of building a live collaborative space. We look into managing WebSocket channels, database listeners, and handling secure media streaming buckets seamlessly.',
    tags: ['supabase', 'database', 'realtime', 'saas'],
    createdAt: new Date('2026-06-06T17:15:00Z'),
    readingTime: '8 min',
    isLiked: false,
    isArchived: false,
    author: {
      name: 'Alex Rivera',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  },
];

export const SAMPLE_PROFILE: UserProfileData = {
  id: 'usr-701',
  name: 'Franck Amani',
  username: 'franck_dev',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  bio: 'Full-Stack Software Engineer building modern application architectures with Angular, NestJS, and Supabase. Building clean platforms for developers.',
  skills: ['Angular', 'NestJS', 'TypeScript', 'TailwindCSS', 'Prisma', 'Supabase', 'PostgreSQL'],
  stats: {
    posts: 12,
    followers: 348,
    following: 192,
  },
  links: {
    website: 'https://emprovesmart.dev',
    github: 'franck-amani',
  },
};
