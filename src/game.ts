// 이력서 데이터를 게임 화면에서 쓰기 좋은 형태로 가공한다.
import { profile, regions } from './data/resume'
import type { Quest, Region, Skill } from './data/resume'

export type Stage = { code: string; quest: Quest; region: Region }

/** 오래된 회사부터 WORLD 1 → 4 순서로 진행한다. */
export const worlds = [...regions].sort((a, b) => a.chapter - b.chapter)

export const stages: Stage[] = worlds.flatMap((region) =>
  region.quests.map((quest, i) => ({ code: `${region.chapter}-${i + 1}`, quest, region })),
)

export const findStage = (id: string) => stages.find((s) => s.quest.id === id)

/** 이 스킬을 사용한 스테이지·보너스 스테이지 이름 */
export function skillUsage(skill: Skill) {
  const names = [skill.name, ...(skill.aliases ?? [])].map((n) => n.toLowerCase())
  const used: string[] = []
  for (const s of stages) {
    if (s.quest.stack.some((t) => names.includes(t.toLowerCase()))) used.push(s.quest.title)
  }
  for (const r of worlds) {
    for (const b of r.sideQuests ?? []) {
      if (names.some((n) => b.title.toLowerCase().includes(n))) used.push(b.title)
    }
  }
  return used
}

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000

export function careerLevel(now = new Date()) {
  const years = (now.getTime() - profile.startedAt.getTime()) / YEAR_MS
  const level = Math.floor(years)
  return { level, exp: Math.round((years - level) * 100) }
}

/** 마지막 글자의 받침 유무에 따라 조사를 고른다. 예: josa('히드라', '을', '를') → '히드라를' */
export function josa(word: string, withFinal: string, withoutFinal: string) {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  const hasFinal = code >= 0 && code <= 11171 && code % 28 !== 0
  return word + (hasFinal ? withFinal : withoutFinal)
}
