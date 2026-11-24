import type { ReactNode } from 'react'
import type { Quest } from '../data/resume'
import { Sprite } from '../pixel/Sprite'
import { chest, scroll, star, sword } from '../pixel/sprites'
import type { SpriteDef } from '../pixel/sprites'
import { bosses } from './bosses'

type Props = {
  quest: Quest
  /** 제목 위 작은 머리말 */
  label: string
  onStartBoss: () => void
}

function Block({ icon, label, children }: { icon: SpriteDef; label: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="mb-2 flex items-center gap-2 text-sm text-gold">
        <Sprite sprite={icon} scale={3} />
        {label}
      </h3>
      <div className="leading-7 text-ink/90">{children}</div>
    </section>
  )
}

export function QuestDetail({ quest, label, onStartBoss }: Props) {
  const boss = quest.boss ? bosses[quest.boss] : undefined

  return (
    <article className="pixel-panel p-5 sm:p-7" aria-labelledby="quest-title">
      <p className="flex items-center gap-3 text-xs text-muted">
        {label}
        <span className="ml-auto shrink-0 -rotate-6 border-2 border-leaf px-1 whitespace-nowrap text-leaf">CLEAR</span>
      </p>
      <h2 id="quest-title" className="mt-1 font-pixel-title text-2xl leading-snug">
        {quest.title}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="사용 기술">
        {quest.stack.map((s) => (
          <li key={s} className="bg-panel-2 px-2 py-0.5 text-xs text-sky">
            {s}
          </li>
        ))}
      </ul>

      <Block icon={scroll} label="퀘스트 의뢰 · 문제 정의">
        {quest.problem.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="mt-3 border-l-4 border-hp bg-hp/10 px-3 py-2 text-ink">▶ {quest.crux}</p>
      </Block>

      {boss && (
        <div className="mt-6 flex flex-col items-center gap-4 bg-night/70 p-5 sm:flex-row">
          <Sprite sprite={boss.sprite} scale={3} className="anim-bob shrink-0" title={boss.name} />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs text-hp">BOSS · 처치 완료</p>
            <p className="text-lg">{boss.name}</p>
          </div>
          <button type="button" onClick={onStartBoss} className="pixel-btn flex items-center gap-2 px-4 py-2 text-sm">
            <Sprite sprite={sword} scale={2} />
            보스전 다시 보기
          </button>
        </div>
      )}

      <Block icon={sword} label="공략 · 해결 과정">
        {quest.approach && <p className="mb-2">{quest.approach}</p>}
        <ol className="space-y-1">
          {quest.steps.map((s, i) => (
            <li key={s} className="flex gap-2">
              <span className="shrink-0 text-sky">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ol>
      </Block>

      <Block icon={chest} label="획득 보상 · 성과">
        <ul className="grid gap-2 sm:grid-cols-2">
          {quest.rewards.map((r) => (
            <li key={r} className="bg-panel-2/70 px-3 py-2 text-sm leading-6">
              <span className="text-gold">◆</span> {r}
            </li>
          ))}
        </ul>
      </Block>

      <Block icon={star} label="패시브 스킬 습득 · 러닝 포인트">
        <p className="bg-gold/10 px-3 py-2">{quest.lesson}</p>
      </Block>
    </article>
  )
}
