/**
 * Centralized Q-Build-CoLab Prompts and Mock Responses
 *
 * Issue #11: Hardcoded content was scattered across components
 * This module centralizes all questions, choices, and AI mock responses
 */

export interface QuestionPrompt {
  chapterId: number;
  question: string;
  helpText?: string;
}

export interface ChoicePrompt {
  chapterId: number;
  choiceA: {
    label: string;
    description: string;
  };
  choiceB: {
    label: string;
    description: string;
  };
}

export interface MockAIResponse {
  chapterId: number;
  choiceA: string;
  choiceB: string;
}

/**
 * Metacognitive questions for each chapter
 * PRD: Trigger thinking before choosing
 */
export const QUESTIONS: Record<number, QuestionPrompt> = {
  1: {
    chapterId: 1,
    question: 'Why do you think Noel feels different from everyone else?',
    helpText: 'Think about what makes someone feel like they don\'t belong.'
  },
  2: {
    chapterId: 2,
    question: 'What would you do if someone offered to be your friend?',
    helpText: 'Think about trust and taking chances with new people.'
  },
  3: {
    chapterId: 3,
    question: 'How do you show someone you\'re grateful for their kindness?',
    helpText: 'Think about words versus actions.'
  },
  4: {
    chapterId: 4,
    question: 'When something is hard, do you ask for help or try alone?',
    helpText: 'Think about when it\'s brave to ask for help.'
  },
  5: {
    chapterId: 5,
    question: 'Would you open a door marked "death" if someone needed you to?',
    helpText: 'Think about facing fears for someone else.'
  },
  6: {
    chapterId: 6,
    question: 'Should you share your story even if it makes you feel vulnerable?',
    helpText: 'Think about the power of sharing your truth.'
  },
  7: {
    chapterId: 7,
    question: 'What does it mean to accept yourself just as you are?',
    helpText: 'Think about the difference between being "wrong" and being "different".'
  }
};

/**
 * Binary choices for each chapter
 * PRD: Force execution without perfection
 */
export const CHOICES: Record<number, ChoicePrompt> = {
  1: {
    chapterId: 1,
    choiceA: {
      label: 'Hope for acceptance',
      description: 'Noel keeps hoping someone will see beyond the outside.'
    },
    choiceB: {
      label: 'Try to change',
      description: 'Noel tries to look more like everyone else.'
    }
  },
  2: {
    chapterId: 2,
    choiceA: {
      label: 'Trust Lia',
      description: 'Noel decides to give friendship a chance.'
    },
    choiceB: {
      label: 'Keep distance',
      description: 'Noel stays cautious and maintains boundaries.'
    }
  },
  3: {
    chapterId: 3,
    choiceA: {
      label: 'Say thank you',
      description: 'Noel expresses gratitude with words.'
    },
    choiceB: {
      label: 'Show gratitude through action',
      description: 'Noel finds a way to show thanks through a gesture.'
    }
  },
  4: {
    chapterId: 4,
    choiceA: {
      label: 'Ask for help',
      description: 'Noel reaches out to Lia for support.'
    },
    choiceB: {
      label: 'Try alone first',
      description: 'Noel attempts to handle it independently.'
    }
  },
  5: {
    chapterId: 5,
    choiceA: {
      label: 'Open the door',
      description: 'Noel faces the fear to help Lia.'
    },
    choiceB: {
      label: 'Find another way',
      description: 'Noel looks for an alternative solution.'
    }
  },
  6: {
    chapterId: 6,
    choiceA: {
      label: 'Share the story',
      description: 'Noel opens up about being different.'
    },
    choiceB: {
      label: 'Keep it private',
      description: 'Noel chooses to keep the story inside.'
    }
  },
  7: {
    chapterId: 7,
    choiceA: {
      label: 'Look forward',
      description: 'Noel thinks about what comes next.'
    },
    choiceB: {
      label: 'Reflect on the journey',
      description: 'Noel considers how far they\'ve come.'
    }
  }
};

/**
 * Mock AI responses as fallback when Gemini API unavailable
 * PRD: AI should add possibilities, not answers
 */
export const MOCK_AI_RESPONSES: Record<number, MockAIResponse> = {
  1: {
    chapterId: 1,
    choiceA: 'Maybe there\'s someone out there who sees beyond appearances. Someone who understands what it\'s like to feel different.',
    choiceB: 'Perhaps changing yourself isn\'t the answer. Maybe being different is what makes you special.'
  },
  2: {
    chapterId: 2,
    choiceA: 'Trusting someone new is scary. But Lia seems genuine. What if this is the beginning of a real friendship?',
    choiceB: 'Keeping distance feels safer. But staying alone... is that really protection, or just another kind of hurt?'
  },
  3: {
    chapterId: 3,
    choiceA: 'Words can be powerful. Sometimes "thank you" is exactly what someone needs to hear.',
    choiceB: 'Actions speak louder than words. What small gesture could show Lia how much this means to you?'
  },
  4: {
    chapterId: 4,
    choiceA: 'Asking for help isn\'t weakness. Lia offered friendship — maybe she wants to help with more than just lunch.',
    choiceB: 'Trying alone shows determination. But sometimes the bravest thing is admitting you need someone.'
  },
  5: {
    chapterId: 5,
    choiceA: 'Behind every door marked "death" might be an ordinary truth waiting to be discovered. Courage means opening it anyway.',
    choiceB: 'Walking away is also a choice. Sometimes wisdom means knowing which doors to leave closed.'
  },
  6: {
    chapterId: 6,
    choiceA: 'Sharing your story makes you vulnerable. But vulnerability can also be strength. Who knows who might be listening?',
    choiceB: 'Privacy is valid too. You don\'t owe anyone your story — it\'s yours to tell when you\'re ready.'
  },
  7: {
    chapterId: 7,
    choiceA: 'Tomorrow holds new possibilities. You\'ve learned that being different isn\'t being wrong. What comes next?',
    choiceB: 'Looking back, you\'ve come so far. From "wrong" to just "different." That journey matters.'
  }
};

/**
 * Default fallback for chapters without configured prompts
 */
export const DEFAULT_QUESTION: QuestionPrompt = {
  chapterId: 0,
  question: 'What do you think about this part of the story?',
  helpText: 'Take a moment to think about what you just read.'
};

export const DEFAULT_CHOICE: ChoicePrompt = {
  chapterId: 0,
  choiceA: {
    label: 'Option A',
    description: 'The first path forward.'
  },
  choiceB: {
    label: 'Option B',
    description: 'The second path forward.'
  }
};

export const DEFAULT_MOCK_RESPONSE: MockAIResponse = {
  chapterId: 0,
  choiceA: 'The story continues in ways you might not expect. What happens next depends on your next choice.',
  choiceB: 'The story continues in ways you might not expect. What happens next depends on your next choice.'
};

/**
 * Helper functions to get prompts safely
 */
export function getQuestion(chapterId: number): QuestionPrompt {
  return QUESTIONS[chapterId] || DEFAULT_QUESTION;
}

export function getChoice(chapterId: number): ChoicePrompt {
  return CHOICES[chapterId] || DEFAULT_CHOICE;
}

export function getMockAIResponse(chapterId: number, choice: 'A' | 'B'): string {
  const responses = MOCK_AI_RESPONSES[chapterId] || DEFAULT_MOCK_RESPONSE;
  return choice === 'A' ? responses.choiceA : responses.choiceB;
}
