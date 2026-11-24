import { useEffect, useRef, useState } from 'react'
import type { Quest } from '../data/resume'
import { josa } from '../game'
import { Sprite } from '../pixel/Sprite'
import { hero, star } from '../pixel/sprites'
import type { Boss } from './bosses'

type Props = {
  quest: Quest
  boss: Boss
  onClose: () => void
}

type Popup = { id: number; text: string }

export function BossBattle({ quest, boss, onClose }: Props) {
  const total = quest.steps.length
  const [used, setUsed] = useState<number[]>([])
  const [log, setLog] = useState(`${josa(boss.name, '이', '가')} 앞을 가로막았다! ${boss.entrance}`)
  const [hitKey, setHitKey] = useState(0)
  const [popups, setPopups] = useState<Popup[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)

  const hp = Math.max(0, 100 - Math.round((used.length / total) * 100))
  const won = used.length === total

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLButtonElement>('button[data-skill]')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose])

  function castSkill(i: number) {
    if (used.includes(i) || won) return
    const next = [...used, i]
    const finishing = next.length === total
    setUsed(next)
    setHitKey((k) => k + 1)
    const id = Date.now()
    setPopups((p) => [...p, { id, text: finishing ? 'CRITICAL!' : `-${Math.round(100 / total)}` }])
    window.setTimeout(() => setPopups((p) => p.filter((x) => x.id !== id)), 900)
    setLog(
      finishing
        ? `[${quest.steps[i]}]! 결정타! ${josa(boss.name, '을', '를')} 쓰러뜨렸다!`
        : `[${quest.steps[i]}] 발동! ${boss.name}에게 큰 피해를 입혔다.`,
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-night/90 p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`보스전: ${boss.name}`}
        className="pixel-panel mx-auto my-6 max-w-3xl p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted">BOSS BATTLE · {quest.title}</p>
          {!won && (
            <button type="button" onClick={onClose} className="pixel-btn px-2 py-0.5 text-xs" aria-label="보스전 닫기">
              ✕ 도망가기
            </button>
          )}
        </div>

        {/* 전투 필드 */}
        <div className="relative mt-4 grid grid-cols-[auto_1fr] items-end gap-4 bg-[linear-gradient(#262a52_0_70%,#1b1d3a_70%)] px-4 pt-6 pb-4 sm:px-10">
          <div className="flex flex-col items-center">
            <Sprite sprite={hero} scale={5} className="anim-bob" title="개발자 캐릭터" />
          </div>

          <div className="flex flex-col items-end">
            <div className="mb-3 w-full max-w-64">
              <p className="mb-1 flex justify-between text-xs">
                <span>{boss.name}</span>
                <span className="text-muted">HP {hp}%</span>
              </p>
              <div className="pixel-bar" role="progressbar" aria-valuenow={hp} aria-valuemin={0} aria-valuemax={100} aria-label="보스 체력">
                <span className={hp > 30 ? 'bg-leaf' : 'bg-hp'} style={{ width: `${hp}%` }} />
              </div>
            </div>
            <div className="relative">
              <div key={hitKey} className={won ? 'anim-vanish' : hitKey ? 'anim-hit' : 'anim-bob'}>
                <Sprite sprite={boss.sprite} scale={7} title={boss.name} />
              </div>
              {popups.map((p) => (
                <span key={p.id} className="anim-float pointer-events-none absolute top-0 left-1/2 text-2xl text-gold [text-shadow:2px_2px_0_#1a1c2c]">
                  {p.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 메시지 창 */}
        <p className="mt-4 min-h-16 bg-night px-4 py-3 leading-7" aria-live="polite">
          {log}
        </p>

        {!won ? (
          <div className="mt-4">
            <p className="mb-3 text-xs text-muted">▸ 사용할 스킬을 고르세요 ({used.length}/{total})</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {quest.steps.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  data-skill
                  disabled={used.includes(i)}
                  onClick={() => castSkill(i)}
                  className="pixel-btn px-3 py-2 text-left text-sm leading-6"
                >
                  {used.includes(i) ? '✓ ' : '◇ '}
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div>
              <p className="mb-2 text-sm text-gold">VICTORY! 전리품 획득</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {quest.rewards.map((r) => (
                  <li key={r} className="bg-panel-2 px-3 py-2 text-sm leading-6">
                    <span className="text-gold">◆</span> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 bg-gold/10 p-3">
              <Sprite sprite={star} scale={3} className="mt-1 shrink-0" />
              <p className="leading-7">
                <span className="text-gold">패시브 스킬 습득!</span> {quest.lesson}
              </p>
            </div>
            <div className="text-right">
              <button type="button" onClick={onClose} className="pixel-btn px-4 py-2 text-sm">
                스테이지로 돌아가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
