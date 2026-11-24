import type { BossId } from '../data/resume'
import type { SpriteDef } from '../pixel/sprites'
import { hydra } from '../pixel/sprites'

export type Boss = {
  name: string
  sprite: SpriteDef
  /** 등장 대사 */
  entrance: string
}

export const bosses: Record<BossId, Boss> = {
  hydra: {
    name: '스파게티 코드 히드라',
    sprite: hydra,
    entrance: '얽히고설킨 hook과 끝없는 loop를 휘두르며 사용자에게 렉을 퍼뜨리고 있다!',
  },
}
