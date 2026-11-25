// 도트 그림 정의. 한 글자 = 한 칸, palette에 없는 글자('.')는 투명.
// mirror: true면 왼쪽 절반만 그리고 오른쪽은 좌우 반전으로 채운다.

export type SpriteDef = {
  rows: string[]
  palette: Record<string, string>
  mirror?: boolean
}

const OUTLINE = '#1a1c2c'

export const hero: SpriteDef = {
  palette: {
    k: OUTLINE,
    h: '#3b2a20',
    s: '#f4c99b',
    e: OUTLINE,
    b: '#3b5dc9',
    w: '#f4f4f4',
    p: '#333c57',
    o: '#566c86',
    m: '#c86b5a',
  },
  rows: [
    '................',
    '.....kkkkkk.....',
    '....khhhhhhk....',
    '...khhhhhhhhk...',
    '...khsssssshk...',
    '...ksessssesk...',
    '...kssssssssk...',
    '....ksmmmmsk....',
    '.....kkkkkk.....',
    '...kbbbwwbbbk...',
    '..kbbbbwwbbbbk..',
    '..ksbbbwwbbbsk..',
    '..kkbbbbbbbbkk..',
    '....kppppppk....',
    '....kppkkppk....',
    '...kook..kook...',
  ],
}

/** 사회인 김광현: 같은 얼굴에 정장과 넥타이 */
export const heroSocial: SpriteDef = {
  palette: { ...hero.palette, d: '#2b2f4a', r: '#e43b44', o: OUTLINE },
  rows: hero.rows.map((row, y) =>
    y === 9 ? '...kddwrrwddk...'
    : y === 10 ? '..kdddwrrwdddk..'
    : y === 11 ? '..ksdddrrdddsk..'
    : y === 12 ? '..kkddddddddkk..'
    : y === 13 ? '....kddddddk....'
    : y === 14 ? '....kddkkddk....'
    : row,
  ),
}

/** 팬더TV 도우미의 보스: 스파게티 코드 히드라 */
export const hydra: SpriteDef = {
  mirror: true,
  palette: {
    k: OUTLINE,
    y: '#f4b41b',
    Y: '#c87f1a',
    w: '#f4f4f4',
    r: '#e43b44',
    m: '#5d275d',
    t: '#f4f4f4',
    s: '#b13e53',
  },
  rows: [
    '............',
    '........kkkk',
    '......kkyyyy',
    '.....kyyyYyy',
    '....kyyYyyyy',
    '...kyykkyyYy',
    '...kyyyykkyy',
    '..kyywwwyyyy',
    '..kyywrkyyyy',
    '..kyywwwyyyy',
    '..kyyyyyyysy',
    '.kyyymmmmmmm',
    '.kyyymtmtmtm',
    '.kyyyymmmmmm',
    'kyyYyysyyyyy',
    'kyyYyyyyYyyy',
    '.kyk.kyyk.ky',
    '.ky..kyk..ky',
    '.kk...kk..kk',
    '............',
  ],
}

/** 우리가게 패키지 앱 개편의 보스: 소통 단절 데드라인 마왕 (새벽 4시를 가리키는 자명종) */
export const overtime: SpriteDef = {
  palette: {
    k: OUTLINE,
    R: '#b13e53',
    w: '#f4f4f4',
    g: '#ffcd75',
    e: '#e43b44',
    m: '#5d275d',
  },
  rows: [
    '..kk...........kk...',
    '.kggk...kkkk..kggk..',
    '.kggk....kk...kggk..',
    '..kkk..kkkkkk.kkk...',
    '.....kkRRRRRRkk.....',
    '....kRRRwwwwRRRk....',
    '...kRRwwwkwwwwRRk...',
    '..kRRkkwwkwwwkkRRk..',
    '..kRRwwkwwwwkwwRRk..',
    '..kRweewwwwwweewRk..',
    '.kRRwwwwwkwwwwwwRRk.',
    '.kRRwwwwwkkwwwwwRRk.',
    '.kRRwwwwwwwkkwwwRRk.',
    '..kRwwwwwwwwwkwwRk..',
    '..kRRwwwwwwwwwwRRk..',
    '..kRRwkmkmkmkmwRRk..',
    '...kRRkwwwwwwkRRk...',
    '....kRRRwwwwRRRk....',
    '.....kkRRRRRRkk.....',
    '......kkkkkkkk......',
    '....kkk......kkk....',
    '....................',
  ],
}

export const sword: SpriteDef = {
  palette: { w: '#f4f4f4', s: '#a3a7c9', g: '#ffcd75', k: OUTLINE },
  rows: ['......sw', '.....sws', '....sws.', 'g..sws..', '.gsws...', '..gs....', '.g.g....', 'g.......'],
}

export const chest: SpriteDef = {
  mirror: true,
  palette: { k: OUTLINE, d: '#8b5a2b', D: '#c28a4a', g: '#ffcd75' },
  rows: ['....', 'kkkk', 'kDDD', 'kddd', 'kkkg', 'kddd', 'kddd', 'kkkk'],
}

export const star: SpriteDef = {
  mirror: true,
  palette: { g: '#ffcd75', G: '#f4b41b' },
  rows: ['...g', '...g', '..gg', 'gggG', '.ggG', '..gG', '.gg.', '.g..'],
}

export const scroll: SpriteDef = {
  palette: { k: OUTLINE, p: '#f4e4c1', P: '#d9b98a', l: '#8b5a2b' },
  rows: [
    '.kkkkkkk',
    'kPpppppk',
    '.kpllpk.',
    '.kppppk.',
    '.kpllpk.',
    '.kppppk.',
    'kPpppppk',
    '.kkkkkkk',
  ],
}

