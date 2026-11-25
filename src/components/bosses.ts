import type { BossId } from '../data/resume'
import type { SpriteDef } from '../pixel/sprites'
import { hydra, overtime } from '../pixel/sprites'

export type BossAttack = {
  name: string
  /** 공격 대사 */
  line: string
  /** 멘탈 피해량 */
  damage: number
}

export type Boss = {
  name: string
  sprite: SpriteDef
  /** 등장 대사 */
  entrance: string
  /** 플레이어가 스킬을 쓸 때마다 순서대로 반격한다 */
  attacks: BossAttack[]
}

export const bosses: Record<BossId, Boss> = {
  hydra: {
    name: '스파게티 코드 히드라',
    sprite: hydra,
    entrance: '얽히고설킨 hook과 끝없는 loop를 휘두르며 사용자에게 렉을 퍼뜨리고 있다!',
    attacks: [
      { name: '무한 루프 휘감기', line: 'IndexedDB를 끝없이 돌며 휘감는다!', damage: 25 },
      { name: '훅 의존성 매듭', line: 'useEffect가 서로를 부르며 얽혀든다!', damage: 30 },
      { name: '오버코딩 폭탄', line: '아무도 쓰지 않는 로직이 쏟아진다!', damage: 25 },
    ],
  },
  overtime: {
    name: '소통 단절 데드라인 마왕',
    sprite: overtime,
    entrance: '흩어진 레거시와 수시로 바뀌는 기획을 등에 업고, 오픈 일정을 압박하고 있다!',
    attacks: [
      { name: '늦어지는 기획 답변', line: '질문을 남겼지만 답이 오지 않는다…', damage: 25 },
      { name: '어긋난 기획서와 규격서', line: '기획서와 규격서의 내용이 서로 다르다!', damage: 30 },
      { name: '주말 야근 강요', line: '토요일 아침, 오늘도 출근이다! 퇴근은 새벽에나…', damage: 35 },
      { name: '엇갈린 브릿지 응답', line: '요청과 다른 type으로 콜백이 돌아온다!', damage: 25 },
      { name: '막판 기획 변경', line: '오픈 직전, 기획이 통째로 바뀌었다!', damage: 30 },
    ],
  },
}
