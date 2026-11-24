import { useEffect, useState } from 'react'
import { characters } from '../characters'
import type { CharacterId } from '../characters'
import { Sprite } from '../pixel/Sprite'
import { hero } from '../pixel/sprites'

type Props = {
  initial: CharacterId
  onSelect: (id: CharacterId) => void
  /** 캐릭터·스킬 단계를 건너뛰고 스테이지(경력)로 바로 이동 */
  onSkip: () => void
  /** 전체 스테이지 요약 화면으로 이동 */
  onSummary: () => void
}

export function SelectScreen({ initial, onSelect, onSkip, onSummary }: Props) {
  const [index, setIndex] = useState(() => Math.max(0, characters.findIndex((c) => c.id === initial)))
  const current = characters[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement) return
      if (e.key === 'ArrowLeft') setIndex((i) => (i + characters.length - 1) % characters.length)
      else if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % characters.length)
      else if (e.key === 'Enter') onSelect(characters[index].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onSelect])

  return (
    <section className="flex flex-col items-center text-center" aria-labelledby="select-title">
      <h1 id="select-title" className="font-pixel-title text-2xl text-gold sm:text-3xl">
        SELECT YOUR CHARACTER
      </h1>
      <p className="mt-2 text-xs text-muted">함께할 캐릭터를 선택하세요 · ← → 로 이동</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
        <p className="flex items-center gap-2">
          바쁘시다면 프로젝트부터
          <button type="button" onClick={onSkip} className="pixel-btn bg-panel! px-3 py-1 text-xs">
            ▶▶ 스테이지 바로가기
          </button>
        </p>
        <p className="flex items-center gap-2">
          한눈에 보고 싶으시다면
          <button type="button" onClick={onSummary} className="pixel-btn bg-panel! px-3 py-1 text-xs">
            ☰ 전체 요약
          </button>
        </p>
      </div>

      <div className="mt-10 flex items-end justify-center gap-4 sm:gap-8" role="radiogroup" aria-label="캐릭터">
        {characters.map((c, i) => {
          const on = i === index
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => (on ? onSelect(c.id) : setIndex(i))}
              className="pixel-focus group flex flex-col items-center"
              aria-label={`${c.job} ${c.name}`}
            >
              <span className={`mb-2 text-gold ${on ? 'anim-blink' : 'invisible'}`} aria-hidden>
                ▼
              </span>
              <span
                className={`grid place-items-center transition-transform group-hover:-translate-y-1 ${
                  on ? 'pixel-panel size-36 bg-panel-2! sm:size-48' : 'size-28 bg-panel/70 opacity-70 sm:size-36'
                }`}
              >
                <Sprite sprite={c.sprite} scale={on ? 8 : 5} className={on ? 'anim-bob' : undefined} />
              </span>
              <span className={`mt-3 text-xs ${on ? 'text-gold' : 'text-muted'}`}>{c.job}</span>
              <span className="text-xs text-muted">{c.level}</span>
            </button>
          )
        })}

        <div className="hidden flex-col items-center opacity-50 sm:flex" aria-hidden>
          <span className="grid size-28 place-items-center bg-panel/70">
            <Sprite sprite={hero} scale={5} silhouette="#2e3263" />
          </span>
          <span className="mt-3 text-xs text-muted">???</span>
          <span className="text-xs text-muted">LOCKED</span>
        </div>
      </div>

      <div className="pixel-panel mt-8 w-full max-w-xl p-5 text-left sm:p-6" aria-live="polite">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-pixel-title text-2xl">{current.name}</span>
          <span className="text-sky">{current.job}</span>
        </p>
        <p className="mt-1 text-xs text-gold">〈{current.title}〉</p>
        <div className="mt-4 space-y-2 leading-7 text-ink/90">
          {current.intro.map((line, i) => (
            <p key={line} className={i === 0 ? 'text-lg text-ink' : undefined}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <button type="button" onClick={() => onSelect(current.id)} className="pixel-btn mt-8 px-6 py-3">
        ▶ {current.job} {current.name}으로 시작
      </button>
      <p className="mt-3 text-xs text-muted">
        <span className="anim-blink">PRESS ENTER</span>
      </p>
    </section>
  )
}
