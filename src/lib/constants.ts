// ── Paleta de Colores ──
export const COLORS = {
    crimson: '#4a0404',
    crimsonLight: '#8b1a1a',
    crimsonMid: '#6b0f0f',
    crimsonGlow: '#c43030',
    charcoal: '#1a1a1a',
    charcoalDeep: '#0a0a0a',
    bone: '#f5f0eb',
    boneMuted: '#d4cfc8',
    gold: '#c9a84c',
    goldLight: '#e6d18e',
} as const;

// ── Nombres de Etapas ──
export const STAGE_NAMES = {
    quiz: 'Conoce a Arlecchino',
    memory: 'Fragmentos de Memoria',
    runner: 'La Recolección',
    finale: 'El Gran Final',
} as const;

// ── Datos del Quiz ──
export interface QuizQuestion {
    id: number;
    category: string;
    question: string;
    options: string[];
    correctIndex: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        category: 'Identidad',
        question: '¿Cuál es el verdadero nombre completo de nacimiento de Arlecchino?',
        options: ['Arlecchino Snezhevna', 'Peruere Snezhevna', 'Crucabena Peruere', 'Clervie Snezhevna'],
        correctIndex: 1,
    },
    {
        id: 2,
        category: 'Jerarquía',
        question: 'Dentro de los Once Heraldos de los Fatui, ¿qué rango ocupa "The Knave"?',
        options: ['La Sexta', 'La Cuarta', 'La Octava', 'La Segunda'],
        correctIndex: 1,
    },
    {
        id: 3,
        category: 'El Título',
        question: '¿Cómo deben dirigirse los niños de la "Casa de la Hoguera" a Arlecchino?',
        options: ['Madre', 'Padre', 'Maestra', 'Directora'],
        correctIndex: 1,
    },
    {
        id: 4,
        category: 'Origen',
        question: '¿A qué dinastía antigua de Khaenri\'ah pertenece su linaje de sangre maldita?',
        options: ['Dinastía del Eclipse', 'Dinastía del Sol Negro', 'Dinastía de la Luna Carmesí', 'Dinastía del Crepúsculo'],
        correctIndex: 2,
    },
    {
        id: 5,
        category: 'Poder',
        question: '¿Cuál es el título oficial de Arlecchino como jefa de la Casa de la Hoguera?',
        options: ['La Luna Sangrienta', 'La Sombra de la Nieve', 'La Luna Aciaga (Dire Balemoon)', 'La Llama del Purgatorio'],
        correctIndex: 2,
    },
];

// ── Pares del Juego de Memoria ──
export interface MemoryPair {
    id: string;
    label: string;
    image: string;
}

export const MEMORY_PAIRS: MemoryPair[] = [
    { id: 'par-1', label: 'Huevo', image: '/images/iconos/egg.png' },
    { id: 'par-2', label: 'Leche', image: '/images/iconos/milk_bucket.png' },
    { id: 'par-3', label: 'Azúcar', image: '/images/iconos/sugar.png' },
    { id: 'par-4', label: 'Trigo', image: '/images/iconos/wheat.png' },
];

// ── Ingredientes del Runner ──
export const REQUIRED_INGREDIENTS = ['harina', 'huevo', 'fresas'] as const;

export const INGREDIENT_LABELS: Record<string, string> = {
    harina: 'Harina',
    huevo: 'Huevo',
    fresas: 'Fresas',
};

export const INGREDIENT_TEXTURES: Record<string, string> = {
    harina: '/textures/ingredient-flour.svg',
    huevo: '/textures/ingredient-egg.svg',
    fresas: '/textures/ingredient-berry.svg',
};
