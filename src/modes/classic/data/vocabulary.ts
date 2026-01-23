/**
 * Vocabulary Helper Data
 *
 * Definitions for challenging words in the story
 * Helps young readers learn while reading
 */

export interface VocabularyWord {
  word: string;
  definition: string;
  definitionEn: string;
  example: string;
  exampleEn: string;
  synonyms?: string[];
  chapterId: number;
}

/**
 * Vocabulary database for all chapters
 */
export const VOCABULARY: VocabularyWord[] = [
  // Chapter 1: Why Am I Like This?
  {
    word: '다르다',
    definition: '같지 않고 차이가 있다',
    definitionEn: 'To be different or unlike',
    example: '노엘은 다른 사람들과 달라요.',
    exampleEn: 'Noel is different from others.',
    synonyms: ['색다르다', '특별하다'],
    chapterId: 1
  },
  {
    word: 'different',
    definition: 'Not the same as another',
    definitionEn: 'Not identical or alike',
    example: 'Everyone is different in their own way.',
    exampleEn: 'Everyone is different in their own way.',
    synonyms: ['unique', 'distinct', 'special'],
    chapterId: 1
  },
  {
    word: '외롭다',
    definition: '혼자 있어서 쓸쓸하다',
    definitionEn: 'Feeling alone and sad',
    example: '친구가 없어서 외로워요.',
    exampleEn: 'I feel lonely without friends.',
    synonyms: ['쓸쓸하다', '고독하다'],
    chapterId: 1
  },
  {
    word: 'lonely',
    definition: 'Feeling sad from being alone',
    definitionEn: 'Without friends or company',
    example: 'Noel felt lonely at school.',
    exampleEn: 'Noel felt lonely at school.',
    synonyms: ['alone', 'isolated', 'solitary'],
    chapterId: 1
  },

  // Chapter 2: My Friend Lia
  {
    word: '친구',
    definition: '가까이 지내며 서로 좋아하는 사람',
    definitionEn: 'A person you like and spend time with',
    example: '리아는 노엘의 첫 친구예요.',
    exampleEn: 'Lia is Noel\'s first friend.',
    synonyms: ['동무', '벗'],
    chapterId: 2
  },
  {
    word: 'friend',
    definition: 'Someone you like and trust',
    definitionEn: 'A person you care about',
    example: 'A true friend accepts you as you are.',
    exampleEn: 'A true friend accepts you as you are.',
    synonyms: ['companion', 'pal', 'buddy'],
    chapterId: 2
  },
  {
    word: '믿다',
    definition: '진짜라고 생각하다',
    definitionEn: 'To have confidence in someone',
    example: '친구를 믿는 것이 중요해요.',
    exampleEn: 'Trusting friends is important.',
    synonyms: ['신뢰하다'],
    chapterId: 2
  },
  {
    word: 'trust',
    definition: 'To believe in someone',
    definitionEn: 'Having confidence in someone',
    example: 'Noel learned to trust Lia.',
    exampleEn: 'Noel learned to trust Lia.',
    synonyms: ['believe', 'rely on', 'have faith in'],
    chapterId: 2
  },

  // Chapter 3: Thank You, Lia~♥
  {
    word: '감사',
    definition: '고마운 마음',
    definitionEn: 'Feeling thankful',
    example: '리아에게 감사를 표현해요.',
    exampleEn: 'Express gratitude to Lia.',
    synonyms: ['고마움'],
    chapterId: 3
  },
  {
    word: 'gratitude',
    definition: 'Feeling thankful',
    definitionEn: 'Being grateful to someone',
    example: 'Show gratitude to those who help you.',
    exampleEn: 'Show gratitude to those who help you.',
    synonyms: ['thankfulness', 'appreciation'],
    chapterId: 3
  },

  // Chapter 4: Why is Studying So Hard?
  {
    word: '공부',
    definition: '새로운 것을 배우는 것',
    definitionEn: 'Learning new things',
    example: '공부는 어렵지만 중요해요.',
    exampleEn: 'Studying is hard but important.',
    synonyms: ['학습', '배움'],
    chapterId: 4
  },
  {
    word: 'challenge',
    definition: 'Something difficult to do',
    definitionEn: 'A hard task or problem',
    example: 'Every challenge makes you stronger.',
    exampleEn: 'Every challenge makes you stronger.',
    synonyms: ['difficulty', 'obstacle', 'trial'],
    chapterId: 4
  },
  {
    word: '노력',
    definition: '목표를 이루려고 애쓰는 것',
    definitionEn: 'Trying hard to achieve something',
    example: '노력하면 할 수 있어요!',
    exampleEn: 'With effort, you can do it!',
    synonyms: ['애쓰다', '힘쓰다'],
    chapterId: 4
  },

  // Chapter 5: The Door of Death
  {
    word: '용기',
    definition: '두려움을 이겨내는 힘',
    definitionEn: 'Bravery in the face of fear',
    example: '용기를 내서 문을 열었어요.',
    exampleEn: 'Had courage to open the door.',
    synonyms: ['담력', '배짱'],
    chapterId: 5
  },
  {
    word: 'courage',
    definition: 'Being brave when scared',
    definitionEn: 'Facing fear with strength',
    example: 'It takes courage to try new things.',
    exampleEn: 'It takes courage to try new things.',
    synonyms: ['bravery', 'valor', 'fearlessness'],
    chapterId: 5
  },
  {
    word: '두려움',
    definition: '무서운 마음',
    definitionEn: 'Feeling afraid',
    example: '두려움을 극복했어요.',
    exampleEn: 'Overcame the fear.',
    synonyms: ['공포', '무서움'],
    chapterId: 5
  },

  // Chapter 6: I'm Not Wrong, Just Different!
  {
    word: '수용',
    definition: '있는 그대로 받아들이는 것',
    definitionEn: 'Accepting as is',
    example: '자신을 수용하는 것이 중요해요.',
    exampleEn: 'Self-acceptance is important.',
    synonyms: ['받아들임'],
    chapterId: 6
  },
  {
    word: 'acceptance',
    definition: 'Agreeing that something is okay',
    definitionEn: 'Approving of who you are',
    example: 'Self-acceptance means loving yourself.',
    exampleEn: 'Self-acceptance means loving yourself.',
    synonyms: ['approval', 'recognition'],
    chapterId: 6
  },
  {
    word: '특별하다',
    definition: '다른 것과 달리 훌륭하다',
    definitionEn: 'Better or different in a good way',
    example: '너는 특별한 존재야!',
    exampleEn: 'You are special!',
    synonyms: ['독특하다', '뛰어나다'],
    chapterId: 6
  },

  // Chapter 7: Epilogue
  {
    word: '희망',
    definition: '좋은 일이 일어나기를 바라는 마음',
    definitionEn: 'Wanting good things to happen',
    example: '미래에 대한 희망이 생겼어요.',
    exampleEn: 'Found hope for the future.',
    synonyms: ['기대', '소망'],
    chapterId: 7
  },
  {
    word: 'hope',
    definition: 'Believing good things will happen',
    definitionEn: 'Positive expectation for the future',
    example: 'Never lose hope, no matter what.',
    exampleEn: 'Never lose hope, no matter what.',
    synonyms: ['optimism', 'expectation'],
    chapterId: 7
  }
];

/**
 * Get vocabulary words for a specific chapter
 */
export function getChapterVocabulary(chapterId: number): VocabularyWord[] {
  return VOCABULARY.filter(v => v.chapterId === chapterId);
}

/**
 * Find vocabulary word definition
 */
export function findVocabularyWord(word: string): VocabularyWord | null {
  const normalizedWord = word.toLowerCase().trim();

  return VOCABULARY.find(v => {
    const targetWord = v.word.toLowerCase();
    return targetWord === normalizedWord || targetWord.includes(normalizedWord);
  }) || null;
}

/**
 * Check if a word has vocabulary entry
 */
export function hasVocabularyEntry(word: string): boolean {
  return findVocabularyWord(word) !== null;
}
