import { useState } from 'react'
import { levelLabel } from '../data/resume'
import type { Skill } from '../data/resume'
import { skillUsage } from '../game'
import { Sprite } from '../pixel/Sprite'
import type { SpriteDef } from '../pixel/sprites'

type Props = {
  skills: Skill[]
  /** 화면 상단 부제 */
  subtitle: string
  sprite: SpriteDef
  equipped: string[]
  setEquipped: (next: string[]) => void
  onNext: () => void
}

const branchColor: Record<string, string> = {
  Frontend: 'bg-mp',
  'Cross-Platform': 'bg-[#a33fb0]',
  'Infra / DevOps': 'bg-[#b8641c]',
  Database: 'bg-[#2a8a5a]',
  대인관계: 'bg-[#1f7fa8]',
  협업: 'bg-[#a33fb0]',
  회식: 'bg-[#b13e53]',
  생존: 'bg-[#2a8a5a]',
}

function Badge({ skill, size = 'md' }: { skill: Skill; size?: 'sm' | 'md' }) {
  return (
    <span
      className={`${branchColor[skill.branch] ?? 'bg-mp'} grid shrink-0 place-items-center text-ink shadow-[inset_-3px_-3px_0_0_#00000055,inset_3px_3px_0_0_#ffffff33] ${
        size === 'sm' ? 'size-8 text-[11px]' : 'size-11 text-sm'
      }`}
      aria-hidden
    >
      {skill.short}
    </span>
  )
}

function Pips({ level }: { level: number }) {
  return (
    <span className="flex gap-1" aria-label={`숙련도 ${level} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`size-3 ${n <= level ? 'bg-gold shadow-[inset_0_-3px_0_0_#c87f1a]' : 'bg-night'}`} />
      ))}
    </span>
  )
}

export function SkillScreen({ skills, subtitle, sprite, equipped, setEquipped, onNext }: Props) {
  const SLOT_COUNT = skills.length
  const branches = [...new Set(skills.map((s) => s.branch))]
  const byName = new Map(skills.map((s) => [s.name, s]))

  const [focus, setFocus] = useState<string | null>(equipped.at(-1) ?? null)
  const focused = focus && equipped.includes(focus) ? byName.get(focus) : undefined

  function toggle(name: string) {
    if (equipped.includes(name)) {
      setEquipped(equipped.filter((n) => n !== name))
      if (focus === name) setFocus(null)
    } else {
      setEquipped([...equipped, name])
      setFocus(name)
    }
  }

  function equipAll() {
    setEquipped(skills.map((s) => s.name))
    setFocus(null)
  }

  return (
    <section aria-labelledby="skill-title">
      <div className="text-center">
        <h1 id="skill-title" className="font-pixel-title text-2xl text-gold sm:text-3xl">
          SKILL EQUIP
        </h1>
        <p className="mt-2 text-xs text-muted">{subtitle} · 스킬을 슬롯에 장착하면 숙련도를 확인할 수 있어요</p>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
        {/* 왼쪽: 캐릭터 + 슬롯 + 장착 정보 */}
        <div className="pixel-panel p-5">
          <div className="flex items-center gap-4">
            <Sprite sprite={sprite} scale={4} className="anim-bob shrink-0" />
            <div className="flex-1">
              <p className="text-sm">장착 슬롯</p>
              <p className="text-xs text-muted">
                {equipped.length} / {SLOT_COUNT}
              </p>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-5 gap-2" aria-label="장착 슬롯">
            {Array.from({ length: SLOT_COUNT }, (_, i) => {
              const skill = equipped[i] ? byName.get(equipped[i]) : undefined
              return (
                <li key={i}>
                  {skill ? (
                    <button
                      type="button"
                      onClick={() => setFocus(skill.name)}
                      className={`pixel-focus grid aspect-square w-full place-items-center bg-night p-1 ${focus === skill.name ? 'outline-3 outline-gold' : ''}`}
                      title={`${skill.name} 정보 보기`}
                    >
                      <Badge skill={skill} />
                    </button>
                  ) : (
                    <span className="block aspect-square w-full bg-night/60 shadow-[inset_0_0_0_2px_#2e3263]" aria-label="빈 슬롯" />
                  )}
                </li>
              )
            })}
          </ul>

          {/* 장착 정보 */}
          <div className="mt-5 min-h-40 bg-night p-4" aria-live="polite">
            {focused ? (
              <SkillInfo skill={focused} />
            ) : equipped.length > 0 ? (
              <p className="text-xs text-muted">장착한 슬롯이나 아래 목록을 누르면 상세 정보를 볼 수 있어요.</p>
            ) : (
              <p className="pt-10 text-center text-sm text-muted">
                {/* 넓은 화면에서는 보유 스킬이 오른쪽, 좁은 화면에서는 아래에 있다 */}
                <span className="lg:hidden">아래</span>
                <span className="hidden lg:inline">오른쪽</span>
                {' 보유 스킬에서 골라 장착해 보세요'}
              </p>
            )}
          </div>

          {equipped.length > 1 && (
            <div className="mt-4">
              <p className="mb-2 text-xs text-gold">▸ 장착 스킬 현황</p>
              <ul className="space-y-1">
                {[...equipped]
                  .map((n) => byName.get(n)!)
                  .sort((a, b) => b.level - a.level)
                  .map((s) => (
                    <li key={s.name}>
                      <button
                        type="button"
                        onClick={() => setFocus(s.name)}
                        className={`pixel-focus flex w-full items-center gap-3 px-2 py-1 text-left text-sm ${focus === s.name ? 'bg-panel-2' : 'hover:bg-panel-2/60'}`}
                      >
                        <span className="flex-1">{s.name}</span>
                        <Pips level={s.level} />
                        <span className="w-16 text-right text-xs text-muted">{levelLabel[s.level]}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* 오른쪽: 보유 스킬 */}
        <div className="pixel-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">보유 스킬</p>
            <div className="flex gap-3">
              <button type="button" onClick={equipAll} className="pixel-btn px-3 py-1 text-xs" disabled={equipped.length === SLOT_COUNT}>
                전부 장착
              </button>
              <button type="button" onClick={() => setEquipped([])} className="pixel-btn px-3 py-1 text-xs" disabled={equipped.length === 0}>
                전부 해제
              </button>
            </div>
          </div>

          {branches.map((branch) => (
            <div key={branch} className="mt-5">
              <p className="mb-2 text-xs text-sky">{branch}</p>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {skills
                  .filter((s) => s.branch === branch)
                  .map((s) => {
                    const on = equipped.includes(s.name)
                    return (
                      <li key={s.name}>
                        <button
                          type="button"
                          onClick={() => toggle(s.name)}
                          aria-pressed={on}
                          className={`pixel-focus flex w-full items-center gap-2 p-1.5 text-left text-xs ${on ? 'bg-night/60 opacity-50' : 'bg-panel-2 hover:bg-mp'}`}
                        >
                          <Badge skill={s} size="sm" />
                          <span className="flex-1 leading-4">{s.name}</span>
                          {on && <span className="text-gold">E</span>}
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
          <p className="mt-5 text-xs text-muted">스킬을 누르면 장착, 한 번 더 누르면 해제돼요.</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button type="button" onClick={onNext} className="pixel-btn px-6 py-3">
          스테이지 선택 ▶
        </button>
      </div>
    </section>
  )
}

function SkillInfo({ skill }: { skill: Skill }) {
  const usage = skillUsage(skill)
  return (
    <div className="flex gap-4">
      <Badge skill={skill} />
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg">{skill.name}</span>
          <span className="text-xs text-muted">{skill.branch}</span>
        </p>
        <p className="mt-2 flex items-center gap-3 text-xs">
          <span className="text-muted">숙련도</span>
          <Pips level={skill.level} />
          <span className="text-gold">
            Lv.{skill.level} {levelLabel[skill.level]}
          </span>
        </p>
        <p className="mt-3 text-sm leading-6 text-ink/90">{skill.desc}</p>
        {usage.length > 0 && (
          <p className="mt-2 text-xs leading-5 text-muted">사용 스테이지: {usage.join(', ')}</p>
        )}
      </div>
    </div>
  )
}
