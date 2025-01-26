export const filials: Record<string, any>[] = [
  {
    id: 1,
    name: 'ZIYO ILM NUR MARKAZI',
  },
  {
    id: 2,
    name: 'ZIYO ILM NUR MARKAZI 2',
  },
  {
    id: 3,
    name: 'ZIYO ILM NUR MARKAZI 3',
  },
  {
    id: 4,
    name: 'ZIYO ILM NUR MARKAZI 4',
  },
  {
    id: 5,
    name: 'ZIYO ILM NUR MARKAZI 5',
  },
  {
    id: 6,
    name: 'ZIYO ILM NUR MARKAZI 6',
  },
]

export const groups: Record<string, any>[] = [
  {
    id: 1,
    teacherId: 1,
    filialId: 1,
    name: 'G18',
    direction: 'Frontend',
    startTime: '10:00',
    dayType: 'evenDays',
  },
  {
    id: 2,
    teacherId: 1,
    filialId: 2,
    name: 'G19',
    direction: 'Backend',
    startTime: '15:00',
    dayType: 'oddDays',
  },
  {
    id: 3,
    teacherId: 3,
    filialId: 3,
    name: 'G20',
    direction: 'PHP',
    startTime: '18:00',
    dayType: 'oddDays',
  },
]

export const finance: Record<string, any>[] = [
  {
    name: 'O‘q. oylik',
    date: '01.07.2023',
    category: 'Ma’m. hara.',
    recipient: 'Ru. Abdulloh',
    amount: 1000000,
  },
  {
    name: 'Internet',
    date: '01.07.2023',
    category: 'oylik',
    recipient: 'Uztelecom',
    amount: 1000000,
  },
  {
    name: 'Oylik',
    date: '01.07.2023',
    category: 'Ma’m. hara.',
    recipient: 'Ru. Abdulloh',
    amount: 1000000,
  },
  {
    name: 'Suv',
    date: '01.07.2023',
    category: 'Ma’m. hara.',
    recipient: 'Uztelecom',
    amount: 1000000,
  },
]

export const courseFees: Record<string, any>[] = [
  {
    id: 1,
    name: 'Matematika',
    amount: 1000000,
  },
  {
    id: 2,
    name: 'Fizika',
    amount: 1000000,
  },
  {
    id: 3,
    name: 'Kimyo',
    amount: 1000000,
  },
  {
    id: 4,
    name: 'Ingliz tili',
    amount: 1000000,
  },
  {
    id: 5,
    name: 'Rus tili',
    amount: 1000000,
  },
]

export const debtors: Record<string, any>[] = [
  {
    id: 1234,
    fullName: 'Rustamxojayev Abdulloh',
    phone: '+998 94 650 65 69',
    group: {
      name: 'Python',
      time: '13:55',
    },
    comment: 'Lorem ipsum',
  },
  {
    id: 1235,
    fullName: 'Ismoilov Doniyor',
    phone: '+998 90 123 45 67',
    group: {
      name: 'JavaScript',
      time: '10:30',
    },
    comment: 'NextJS loyihasi',
  },
  {
    id: 1236,
    fullName: 'Nurmatova Maftuna',
    phone: '+998 99 777 88 99',
    group: {
      name: 'React',
      time: '14:20',
    },
    comment: 'Redux o‘rganmoqda',
  },
]

export const rooms: Record<string, any>[] = [
  {
    id: 1,
    name: 'Telegram',
    capacity: 100,
    count: 50,
  },
  {
    id: 2,
    name: 'Discord',
    capacity: 100,
    count: 50,
  },
  {
    id: 3,
    name: 'Zoom',
    capacity: 100,
    count: 50,
  },
  {
    id: 4,
    name: 'Amazon',
    capacity: 100,
    count: 50,
  },
  {
    id: 5,
    name: 'Alibaba',
    capacity: 100,
    count: 50,
  },
  {
    id: 6,
    name: 'Apple',
    capacity: 100,
    count: 50,
  },
  {
    id: 7,
    name: 'Microsoft',
    capacity: 100,
    count: 50,
  },
  {
    id: 8,
    name: 'Google',
    capacity: 100,
    count: 50,
  },
  {
    id: 9,
    name: 'Facebook',
    capacity: 100,
    count: 50,
  },
  {
    id: 10,
    name: 'Twitter',
    capacity: 100,
    count: 50,
  },
  {
    id: 11,
    name: 'Linkedin',
    capacity: 100,
    count: 50,
  },
  {
    id: 12,
    name: 'Instagram',
    capacity: 100,
    count: 50,
  },
]
