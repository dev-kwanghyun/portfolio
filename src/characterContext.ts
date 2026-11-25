import { createContext } from 'react'
import type { CharacterId } from './characters'

/** 마지막으로 고른 캐릭터. 보스전처럼 화면 깊은 곳에서 캐릭터별 반응을 다르게 할 때 쓴다. */
export const CharacterContext = createContext<CharacterId>('dev')
