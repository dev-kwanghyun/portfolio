import { useContext, useEffect, useRef, useState } from 'react'
import { CharacterContext } from '../characterContext'
import { getCharacter } from '../characters'
import type { CharacterId } from '../characters'
import type { Quest } from '../data/resume'
import { josa } from '../game'
import { Sprite } from '../pixel/Sprite'
import { star } from '../pixel/sprites'
import type { Boss } from './bosses'

type Props = {
  quest: Quest
  boss: Boss
  onClose: () => void
}

type Popup = { id: number; text: string; target: 'boss' | 'hero' }

/** 전투 메시지. 누가 한 행동인지에 따라 색을 다르게 보여준다. */
type LogLine = { text: string; by: 'hero' | 'boss' | 'system' }

const logStyle: Record<LogLine['by'], string> = {
  hero: 'text-ink',
  boss: 'text-[#ff7b84]',
  system: 'text-sky',
}

const COFFEE_REFILL = 60

/** 도망가기를 눌렀을 때 캐릭터별 반응 */
const fleeMessage = {
  dev: { title: '개발자에겐 포기란 없어!', canStay: true },
  social: { title: '그래, 술이나 먹으러 가자!', canStay: false },
} as const

export function BossBattle({ quest, boss, onClose }: Props) {
  const character = useContext(CharacterContext)
  const [fleeAsk, setFleeAsk] = useState(false)
  const total = quest.steps.length
  const [used, setUsed] = useState<number[]>([])
  // 한 턴의 메시지(내 공격 → 보스 반격 → 커피 수혈)를 줄 단위로 쌓는다
  const [log, setLog] = useState<LogLine[]>([
    { text: `${josa(boss.name, '이', '가')} 앞을 가로막았다! ${boss.entrance}`, by: 'boss' },
  ])
  const [hitKey, setHitKey] = useState(0)
  const [popups, setPopups] = useState<Popup[]>([])
  // 플레이어 체력 = 멘탈. 0이 되면 커피 수혈로 회복하므로 게임 오버는 없다.
  const [mental, setMental] = useState(100)
  const mentalRef = useRef(100)
  const [heroHitKey, setHeroHitKey] = useState(0)
  const [bossTurn, setBossTurn] = useState(false)
  const turnRef = useRef(0)
  const timers = useRef<number[]>([])
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  function popup(text: string, target: Popup['target']) {
    const id = Date.now() + Math.random()
    setPopups((p) => [...p, { id, text, target }])
    later(() => setPopups((p) => p.filter((x) => x.id !== id)), 900)
  }

  function bossAttack() {
    const attack = boss.attacks[turnRef.current % boss.attacks.length]
    turnRef.current += 1
    setHeroHitKey((k) => k + 1)
    popup(`-${attack.damage}`, 'hero')
    const next = mentalRef.current - attack.damage
    const drained = next <= 0
    mentalRef.current = drained ? COFFEE_REFILL : next
    setMental(mentalRef.current)
    const lines: LogLine[] = [{ text: `BOSS 공격!! ${boss.name}의 [${attack.name}]! ${attack.line}`, by: 'boss' }]
    if (drained) lines.push({ text: 'PLAYER 방어!! 멘탈이 바닥나기 직전, 커피 수혈로 멘탈을 회복했다.', by: 'system' })
    setLog((prev) => [...prev, ...lines])
    later(() => setBossTurn(false), 500)
  }

  const hp = Math.max(0, 100 - Math.round((used.length / total) * 100))
  const won = used.length === total

  // 이긴 뒤에는 바로 닫고, 싸우는 중에는 도망칠지 먼저 묻는다
  const requestClose = () => (won ? onClose() : setFleeAsk(true))
  const escapeRef = useRef(requestClose)
  useEffect(() => {
    escapeRef.current = fleeAsk ? () => setFleeAsk(false) : requestClose
  })

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLButtonElement>('button[data-skill]')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') escapeRef.current()
    }
    window.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [])

  function castSkill(i: number) {
    if (used.includes(i) || won || bossTurn) return
    const next = [...used, i]
    const finishing = next.length === total
    setUsed(next)
    setHitKey((k) => k + 1)
    popup(finishing ? 'CRITICAL!' : `-${Math.round(100 / total)}`, 'boss')
    setLog([
      {
        text: finishing
          ? `PLAYER 공격!! [${quest.steps[i]}]! 결정타! ${josa(boss.name, '을', '를')} 쓰러뜨렸다!`
          : `PLAYER 공격!! [${quest.steps[i]}] 발동! ${boss.name}에게 큰 피해를 입혔다.`,
        by: 'hero',
      },
    ])
    // 쓰러뜨리지 못했으면 보스가 반격한다
    if (!finishing) {
      setBossTurn(true)
      later(bossAttack, 900)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-night/90 p-4" onClick={requestClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`보스전: ${boss.name}`}
        className="pixel-panel relative mx-auto my-6 max-w-3xl p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted">BOSS BATTLE · {quest.title}</p>
          {!won && (
            <button type="button" onClick={requestClose} className="pixel-btn shrink-0 px-2 py-0.5 text-xs whitespace-nowrap" aria-label="보스전 닫기">
              ✕ 도망가기
            </button>
          )}
        </div>

        {/* 전투 필드 */}
        <div className="relative mt-4 grid grid-cols-[auto_1fr] items-end gap-4 bg-[linear-gradient(#262a52_0_70%,#1b1d3a_70%)] px-4 pt-6 pb-4 sm:px-10">
          <div className="relative flex flex-col items-center">
            <div key={heroHitKey} className={heroHitKey ? 'anim-hit' : 'anim-bob'}>
              <Sprite sprite={getCharacter(character).sprite} scale={5} title={`${getCharacter(character).job} 캐릭터`} />
            </div>
            {popups
              .filter((p) => p.target === 'hero')
              .map((p) => (
                <span key={p.id} className="anim-float pointer-events-none absolute top-0 left-1/2 text-2xl text-hp [text-shadow:2px_2px_0_#1a1c2c]">
                  {p.text}
                </span>
              ))}
            <div className="mt-3 w-24 sm:w-32">
              <p className="mb-1 flex justify-between text-[11px]">
                <span>멘탈</span>
                <span className="text-muted">{mental}%</span>
              </p>
              <div className="pixel-bar" role="progressbar" aria-valuenow={mental} aria-valuemin={0} aria-valuemax={100} aria-label="내 멘탈">
                <span className={mental > 30 ? 'bg-sky' : 'bg-hp'} style={{ width: `${mental}%` }} />
              </div>
            </div>
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
              {popups
                .filter((p) => p.target === 'boss')
                .map((p) => (
                  <span key={p.id} className="anim-float pointer-events-none absolute top-0 left-1/2 text-2xl text-gold [text-shadow:2px_2px_0_#1a1c2c]">
                    {p.text}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* 메시지 창 */}
        <div className="mt-4 min-h-24 space-y-1 bg-night px-4 py-3 leading-7" aria-live="polite">
          {log.map((l, i) => (
            <p key={i} className={logStyle[l.by]}>
              {l.text}
            </p>
          ))}
        </div>

        {!won ? (
          <div className="mt-4">
            <p className="mb-3 text-xs text-muted">
              {bossTurn ? <span className="anim-blink text-hp">▸ 보스의 반격!</span> : `▸ 사용할 스킬을 고르세요 (${used.length}/${total})`}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {quest.steps.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  data-skill
                  disabled={used.includes(i) || bossTurn}
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

        {fleeAsk && <FleeDialog character={character} onStay={() => setFleeAsk(false)} onFlee={onClose} />}
      </div>
    </div>
  )
}

function FleeDialog({ character, onStay, onFlee }: { character: CharacterId; onStay: () => void; onFlee: () => void }) {
  const msg = fleeMessage[character]
  const firstRef = useRef<HTMLButtonElement>(null)
  useEffect(() => firstRef.current?.focus(), [])

  return (
    <div className="absolute inset-0 z-10 grid place-items-center bg-night/80 p-4">
      <div role="alertdialog" aria-modal="true" aria-labelledby="flee-title" className="pixel-panel w-full max-w-sm p-6 text-center">
        <Sprite sprite={getCharacter(character).sprite} scale={5} className="anim-bob mx-auto" />
        <p id="flee-title" className="mt-4 font-pixel-title text-xl leading-8 text-gold">
          {msg.title}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {msg.canStay ? (
            <>
              <button ref={firstRef} type="button" onClick={onStay} className="pixel-btn px-5 py-2 text-sm">
                확인
              </button>
              <button type="button" onClick={onFlee} className="pixel-btn bg-panel! px-4 py-2 text-xs text-muted">
                그래도 도망가기
              </button>
            </>
          ) : (
            <button ref={firstRef} type="button" onClick={onFlee} className="pixel-btn px-5 py-2 text-sm">
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
