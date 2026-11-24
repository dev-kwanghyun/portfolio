import { useEffect, useRef, useState } from 'react'
import { prologue, profile } from '../data/resume'
import { stages, worlds } from '../game'
import { Sprite } from '../pixel/Sprite'
import { hero } from '../pixel/sprites'

type Props = { onOpenStage: (id: string) => void; onOpenSummary: () => void }

export function StageScreen({ onOpenStage, onOpenSummary }: Props) {
  const [recruit, setRecruit] = useState(false)
  const nextWorld = worlds.length + 1

  return (
    <section aria-labelledby="stage-title">
      <div className="text-center">
        <h1 id="stage-title" className="font-pixel-title text-2xl text-gold sm:text-3xl">
          STAGE SELECT
        </h1>
        <p className="mt-2 text-xs text-muted">
          클리어 {stages.length} / {stages.length + 1} · 스테이지를 누르면 공략 기록을 볼 수 있어요
        </p>
        <button type="button" onClick={onOpenSummary} className="pixel-btn mt-4 px-3 py-1 text-xs">
          ☰ 전체 스테이지 요약 보기
        </button>
      </div>

      {/* 최신 WORLD가 위, 오래된 WORLD가 아래. 맨 위는 아직 클리어하지 못한 다음 스테이지 */}
      <ol className="mt-8 space-y-8">
        <li className="pixel-panel border-0 p-5">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="text-xs text-muted">WORLD {nextWorld}</span>
            <span className="font-pixel-title text-xl text-gold">???</span>
            <span className="anim-blink ml-auto bg-hp px-2 text-xs">NEW</span>
          </div>
          <button
            type="button"
            onClick={() => setRecruit(true)}
            className="pixel-btn mt-4 flex w-full flex-col items-center gap-3 bg-night! p-6 text-center sm:flex-row sm:text-left"
          >
            <span className="grid size-16 shrink-0 place-items-center bg-panel-2 text-3xl text-gold" aria-hidden>
              ?
            </span>
            <span className="flex-1">
              <span className="block text-xs text-gold">STAGE {nextWorld}-1 · NOT CLEARED</span>
              <span className="mt-1 block text-lg">당신의 회사</span>
              <span className="mt-1 block text-xs text-muted">아직 아무도 공략하지 않은 스테이지입니다</span>
            </span>
            <span className="text-sm text-gold">도전하기 ▶</span>
          </button>
        </li>
        {[...worlds].reverse().map((w) => (
          <li key={w.company} className="pixel-panel p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xs text-muted">WORLD {w.chapter}</span>
              <span className="font-pixel-title text-xl text-sky">{w.company}</span>
              <span className="text-xs text-muted">
                {w.period} · {w.position}
              </span>
              <span className="ml-auto bg-leaf px-2 text-xs text-night">ALL CLEAR</span>
            </div>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stages
                .filter((s) => s.region === w)
                .map((s) => (
                  <li key={s.quest.id}>
                    <button
                      type="button"
                      onClick={() => onOpenStage(s.quest.id)}
                      className="pixel-btn relative flex h-full w-full flex-col items-start gap-2 p-3 text-left"
                    >
                      <span className="flex w-full items-center gap-2 text-xs">
                        <span className="text-gold">STAGE {s.code}</span>
                        {s.quest.boss && <span className="bg-hp px-1 text-[10px] leading-4">BOSS</span>}
                        <span className="ml-auto -rotate-6 border-2 border-leaf px-1 text-[10px] leading-4 text-leaf">CLEAR</span>
                      </span>
                      <span className="text-sm leading-6">{s.quest.title}</span>
                      <span className="mt-auto text-xs text-muted">{s.quest.role}</span>
                    </button>
                  </li>
                ))}
            </ul>

            {w.sideQuests && (
              <details className="mt-4 text-sm">
                <summary className="pixel-focus cursor-pointer text-xs text-muted hover:text-ink">+ 보너스 스테이지 {w.sideQuests.length}개 (CLEAR)</summary>
                <ul className="mt-2 grid gap-2 pl-3 sm:grid-cols-2">
                  {w.sideQuests.map((b) => (
                    <li key={b.title} className="leading-6">
                      <span>· {b.title}</span>
                      <br />
                      <span className="text-xs text-muted">{b.desc}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </li>
        ))}

      </ol>

      <p className="mt-8 text-center text-xs text-muted">
        PROLOGUE · {prologue.company} ({prologue.period}) · {prologue.desc}
      </p>

      {recruit && <RecruitDialog onClose={() => setRecruit(false)} />}
    </section>
  )
}

function RecruitDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-night/90 p-4" onClick={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruit-title"
        className="pixel-panel w-full max-w-lg p-6 text-center sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Sprite sprite={hero} scale={7} className="anim-bob mx-auto" />
        <p className="mt-5 text-xs text-gold">STAGE ??? · 당신의 회사</p>
        <h2 id="recruit-title" className="mt-3 font-pixel-title text-xl leading-9 sm:text-2xl">
          당신의 회사로
          <br />
          모험을 떠나고 싶습니다!
        </h2>
        <p className="mt-4 text-sm leading-7 text-ink/90">
          아직 공략하지 못한 문제가 있다면, 구조부터 함께 살펴보겠습니다.
          <br />
          파티 초대를 기다리고 있을게요.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a href={`mailto:${profile.contact.email}`} className="pixel-btn px-4 py-2 text-sm">
            ✉ 파티 초대 보내기
          </a>
          <a href={profile.contact.github} target="_blank" rel="noreferrer" className="pixel-btn px-4 py-2 text-sm">
            GitHub 보기
          </a>
        </div>
        <p className="mt-4 text-xs text-muted">{profile.contact.email}</p>

        <button type="button" onClick={onClose} className="mt-6 text-xs text-muted underline-offset-4 hover:underline">
          나중에 할게요
        </button>
      </div>
    </div>
  )
}
