// 캐릭터 선택 화면에 나오는 캐릭터들
import { profile, skills, socialProfile, socialSkills } from './data/resume'
import type { Skill } from './data/resume'
import { careerLevel } from './game'
import { hero, heroSocial } from './pixel/sprites'
import type { SpriteDef } from './pixel/sprites'

export type CharacterId = 'dev' | 'social'

export type Character = {
  id: CharacterId
  name: string
  job: string
  title: string
  intro: string[]
  level: string
  sprite: SpriteDef
  skills: Skill[]
}

export const characters: Character[] = [
  { id: 'dev', ...profile, level: `Lv.${careerLevel().level}`, sprite: hero, skills },
  { id: 'social', ...socialProfile, level: `Lv.${33 + new Date().getFullYear() - 2026}`, sprite: heroSocial, skills: socialSkills },
]

export const getCharacter = (id: CharacterId) => characters.find((c) => c.id === id)!
