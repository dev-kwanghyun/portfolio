import { useCallback, useState } from 'react'
import { StageModal } from '../components/StageModal'
import { prologue } from '../data/resume'
import { careerLevel, stages, worlds } from '../game'
import type { Stage } from '../game'

type Props = { onBack: () => void }

/** 모든 스테이지를 한 화면에서 훑어볼 수 있는 요약 (최근 회사부터) */
export function SummaryScreen({ onBack }: Props) {
  const [open, setOpen] = useState<Stage | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const recent = [...worlds].reverse()
  const bossCount = stages.filter((s) => s.quest.boss).length
  const bonusCount = worlds.reduce((n, w) => n + (w.sideQuests?.length ?? 0), 0)

  return (
    <section aria-labelledby="summary-title" className="mx-auto max-w-4xl">
      <button type="button" onClick={onBack} className="pixel-btn mb-6 px-3 py-1 text-xs">
        ◀ 스테이지 선택
      </button>

      <div className="text-center">
        <h1 id="summary-title" className="font-pixel-title text-2xl text-gold sm:text-3xl">
          CLEAR RECORD
        </h1>
        <p className="mt-2 text-xs text-muted">모든 스테이지 공략 기록을 한눈에 볼 수 있어요 · 최근 기록부터</p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
        {[
          ['경력', `${careerLevel().level}년+`],
          ['WORLD', `${worlds.length}`],
          ['STAGE CLEAR', `${stages.length}`],
          ['BOSS · BONUS', `${bossCount} · ${bonusCount}`],
        ].map(([k, v]) => (
          <div key={k} className="bg-panel p-3">
            <dt className="text-[11px] text-muted">{k}</dt>
            <dd className="font-pixel-title mt-1 text-xl text-gold">{v}</dd>
          </div>
        ))}
      </dl>

      <ol className="mt-8 space-y-6">
        {recent.map((w) => (
          <li key={w.company} className="pixel-panel p-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b-2 border-panel-2 pb-3">
              <span className="text-xs text-muted">WORLD {w.chapter}</span>
              <span className="font-pixel-title text-xl text-sky">{w.company}</span>
              <span className="text-xs text-muted">
                {w.period} · {w.position}
              </span>
            </div>

            <ul className="divide-y-2 divide-panel-2">
              {stages
                .filter((s) => s.region === w)
                .map((s) => (
                  <li key={s.quest.id} className="py-4">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-xs text-gold">STAGE {s.code}</span>
                      {s.quest.boss && <span className="bg-hp px-1 text-[10px] leading-4">BOSS</span>}
                      <button
                        type="button"
                        onClick={() => setOpen(s)}
                        className="pixel-focus text-left underline decoration-muted decoration-dotted underline-offset-4 hover:text-gold"
                      >
                        {s.quest.title}
                      </button>
                      <span className="text-xs text-muted">· {s.quest.role}</span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-ink/80">
                      <span className="text-muted">문제 </span>
                      {s.quest.crux}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm leading-6">
                      {s.quest.rewards.map((r) => (
                        <li key={r}>
                          <span className="text-gold">◆</span> {r}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 flex flex-wrap gap-1">
                      {s.quest.stack.map((t) => (
                        <span key={t} className="bg-night px-1.5 text-[11px] leading-5 text-muted">
                          {t}
                        </span>
                      ))}
                    </p>
                  </li>
                ))}
            </ul>

            {w.sideQuests && (
              <p className="border-t-2 border-panel-2 pt-3 text-xs leading-5 text-muted">
                보너스 · {w.sideQuests.map((b) => b.title).join(', ')}
              </p>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 text-center text-xs text-muted">
        PROLOGUE · {prologue.company} ({prologue.period}) · {prologue.desc}
      </p>

      {open && <StageModal stage={open} onClose={close} />}
    </section>
  )
}
