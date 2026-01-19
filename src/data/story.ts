export interface Choice {
  id: 'A' | 'B';
  text: string;
  textEn: string;
}

export interface Chapter {
  id: number;
  title: string;
  titleEn: string;
  image: string;
  content: string;
  contentEn: string;
  question: string;
  questionEn: string;
  choices: [Choice, Choice];
  aiContinuation: string;
  aiContinuationEn: string;
  reflectionQuestion?: string;
  reflectionQuestionEn?: string;
}

export const story: Chapter[] = [
  {
    id: 1,
    title: '문 앞에서 멈춘 날',
    titleEn: 'The Day We Stopped at the Door',
    image: 'assets/images/image_1.png',
    content: '학교 뒤편에서 노을은 오래된 문을 발견한다. 리아는 문 안이 궁금하다고 말한다. 노을의 마음은 두근거리며 망설임과 호기심 사이에서 흔들린다.',
    contentEn: 'Behind the school, Noel spots an old door. Lia says she is curious about what is inside. Noel’s heart races, pulled between hesitation and curiosity.',
    question: '지금 가장 이상하게 느껴지는 건 뭐야?',
    questionEn: 'What feels the strangest right now?',
    choices: [
      {
        id: 'A',
        text: '문 손잡이를 살짝 잡아본다.',
        textEn: 'Gently touch the door handle.'
      },
      {
        id: 'B',
        text: '리아에게 먼저 생각을 말해본다.',
        textEn: 'Share your thoughts with Lia first.'
      }
    ],
    aiContinuation: '노을은 숨을 고르고 손잡이를 살짝 잡아본다. 차가운 감촉이 손끝에 전해지며 마음이 조금 진정된다. 문은 아직 열리지 않았고, 다음 선택이 필요해 보인다.',
    aiContinuationEn: 'Noel takes a breath and lightly touches the handle. The cold surface calms them a little. The door is still closed, and another decision is needed.',
    reflectionQuestion: '왜 그 선택을 하고 싶었어?',
    reflectionQuestionEn: 'Why did you want to choose that?'
  },
  {
    id: 2,
    title: '복도의 속삭임',
    titleEn: 'Whispers in the Hall',
    image: 'assets/images/image_2.png',
    content: '복도에서 아이들의 웃음소리가 커진다. 노을은 그 소리가 마음을 찌르는 것처럼 느낀다. 리아는 노을의 표정을 보고 걸음을 늦춘다.',
    contentEn: 'Laughter grows louder in the hallway. Noel feels the sound like a sting. Lia notices Noel’s face and slows down.',
    question: '노을이 지금 필요로 하는 건 무엇일까?',
    questionEn: 'What does Noel need right now?',
    choices: [
      {
        id: 'A',
        text: '잠시 멈춰 숨을 깊게 쉰다.',
        textEn: 'Stop and take a deep breath.'
      },
      {
        id: 'B',
        text: '리아에게 손을 내민다.',
        textEn: 'Reach out a hand to Lia.'
      }
    ],
    aiContinuation: '노을은 잠시 멈춰 숨을 깊게 쉰다. 리아는 조용히 옆에 서서 기다려 준다. 분위기는 조금 부드러워지지만 아직 정답은 없다.',
    aiContinuationEn: 'Noel pauses and breathes deeply. Lia stands nearby and waits quietly. The moment softens, but there is still no single right answer.',
    reflectionQuestion: '왜 그 선택이 중요하다고 생각했어?',
    reflectionQuestionEn: 'Why did that choice feel important?'
  },
  {
    id: 3,
    title: '같이 걷는 규칙',
    titleEn: 'The Rule of Walking Together',
    image: 'assets/images/image_3_1.jpg',
    content: '리아는 “무서울 때는 같이 가는 게 국룰”이라고 말한다. 노을은 그 말이 이상하게 마음을 편하게 만든다. 둘은 계단 앞에서 서로를 바라본다.',
    contentEn: 'Lia says, “When you’re scared, the golden rule is to go together.” The words strangely calm Noel. The two look at each other by the stairs.',
    question: '너라면 어떤 약속을 하고 싶어?',
    questionEn: 'What promise would you want to make?',
    choices: [
      {
        id: 'A',
        text: '서로 겁나면 바로 말하기로 한다.',
        textEn: 'Promise to say it when you feel scared.'
      },
      {
        id: 'B',
        text: '끝까지 같이 보겠다고 말한다.',
        textEn: 'Promise to keep going together.'
      }
    ],
    aiContinuation: '노을은 먼저 겁이 나면 바로 말하자고 약속한다. 리아는 고개를 끄덕이며 그게 더 용기 있어 보인다고 말한다. 계단 아래로 내려가는 길이 조금 덜 무섭게 느껴진다.',
    aiContinuationEn: 'Noel promises to say it right away when scared. Lia nods and says that sounds even more brave. The steps downward feel a little less frightening.',
    reflectionQuestion: '그 약속이 어떤 도움이 될 것 같아?',
    reflectionQuestionEn: 'How do you think that promise will help?'
  },
  {
    id: 4,
    title: '열릴까, 말까?',
    titleEn: 'Open It, or Not Yet?',
    image: 'assets/images/image_4.png',
    content: '철문 앞에서 노을의 손이 멈춘다. 문은 차갑고 무겁게 느껴진다. 리아는 노을이 결정할 시간을 주려 한다.',
    contentEn: 'Noel’s hand pauses in front of the iron door. It feels cold and heavy. Lia gives Noel time to decide.',
    question: '지금 할 수 있는 작은 행동은 뭘까?',
    questionEn: 'What is a small action you can take now?',
    choices: [
      {
        id: 'A',
        text: '문에 귀를 대고 안쪽 소리를 들어본다.',
        textEn: 'Press your ear to the door and listen.'
      },
      {
        id: 'B',
        text: '리아에게 먼저 열어도 괜찮은지 묻는다.',
        textEn: 'Ask Lia if it is okay to open it.'
      }
    ],
    aiContinuation: '노을은 문에 귀를 댄다. 안쪽에서는 작은 바람 소리만 들려온다. 아직 무엇이든 될 수 있는 순간이다.',
    aiContinuationEn: 'Noel presses an ear to the door. Only a faint breeze can be heard inside. It still feels like a moment that could become many things.',
    reflectionQuestion: '왜 그 작은 행동을 골랐어?',
    reflectionQuestionEn: 'Why did you choose that small action?'
  },
  {
    id: 5,
    title: '다음 선택을 남기기',
    titleEn: 'Leaving Room for the Next Choice',
    image: 'assets/images/image_5.png',
    content: '문은 아직 완전히 열리지 않았다. 노을은 마음속에서 여러 가능성을 떠올린다. 리아는 “다음 선택은 우리 몫”이라고 말한다.',
    contentEn: 'The door is not fully open yet. Noel imagines several possibilities. Lia says, “The next choice is ours.”',
    question: '다음 장면에서 무엇이 가장 궁금해?',
    questionEn: 'What are you most curious about in the next scene?',
    choices: [
      {
        id: 'A',
        text: '문 너머의 공간이 어떤 느낌인지.',
        textEn: 'What the space beyond the door feels like.'
      },
      {
        id: 'B',
        text: '노을이 어떤 표정을 지을지.',
        textEn: 'What expression Noel will make.'
      }
    ],
    aiContinuation: '문틈 사이로 희미한 빛이 보인다. 노을은 깊게 숨을 들이마시며 한 걸음 더 다가간다. 하지만 문 너머의 이야기는 아직 남겨 두자.',
    aiContinuationEn: 'A faint light slips through the crack of the door. Noel takes a deep breath and steps closer. But the story beyond is still left for the next choice.',
    reflectionQuestion: '그 궁금증이 왜 너에게 중요할까?',
    reflectionQuestionEn: 'Why does that curiosity feel important to you?'
  }
];
