import { useEffect, useState } from 'react'
import { getCharacter } from './characters'
import type { CharacterId } from './characters'
import { CharacterContext } from './characterContext'
import { findStage } from './game'
import { SelectScreen } from './screens/SelectScreen'
import { SkillScreen } from './screens/SkillScreen'
import { StageDetailScreen } from './screens/StageDetailScreen'
import { StageScreen } from './screens/StageScreen'
import { SummaryScreen } from './screens/SummaryScreen'

// 화면은 URL 해시로 구분해서 브라우저 뒤로가기와 링크 공유가 되게 한다.
// #            → 캐릭터 선택
// #skills      → 개발자 스킬 장착, #skills/social → 사회인 스킬 장착
// #stages      → 스테이지 선택, #stage/<id> → 스테이지 상세, #summary → 전체 요약
const readHash = () => window.location.hash.replace(/^#\/?/, '')
const go = (hash: string) => {
  window.location.hash = hash
}
const skillsHash = (id: CharacterId) => (id === 'dev' ? 'skills' : `skills/${id}`)

const year = new Date().getFullYear()

export default function App() {
  const [route, setRoute] = useState(readHash)
  const [equipped, setEquipped] = useState<Record<CharacterId, string[]>>({ dev: [], social: [] })

  useEffect(() => {
    const onHash = () => {
      setRoute(readHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const stage = route.startsWith('stage/') ? findStage(route.slice('stage/'.length)) : undefined
  const skillChar: CharacterId | undefined = route === 'skills' ? 'dev' : route === 'skills/social' ? 'social' : undefined
  // 마지막으로 고른 캐릭터를 기억해서 상단 단계 메뉴와 선택 화면에 쓴다.
  const [character, setCharacter] = useState<CharacterId>(skillChar ?? 'dev')
  if (skillChar && skillChar !== character) setCharacter(skillChar)

  const current = stage || route === 'stages' || route === 'summary' ? 'stages' : skillChar ? 'skills' : ''
  const steps = [
    { key: '', hash: '', label: '캐릭터' },
    { key: 'skills', hash: skillsHash(character), label: '스킬' },
    { key: 'stages', hash: 'stages', label: '스테이지' },
  ]

  const selectCharacter = (id: CharacterId) => {
    setCharacter(id)
    go(skillsHash(id))
  }

  let screen
  if (stage) {
    screen = <StageDetailScreen stage={stage} onBack={() => go('stages')} />
  } else if (skillChar) {
    const c = getCharacter(skillChar)
    screen = (
      <SkillScreen
        key={c.id}
        skills={c.skills}
        sprite={c.sprite}
        subtitle={`${c.job} ${c.name}`}
        equipped={equipped[c.id]}
        setEquipped={(next) => setEquipped((prev) => ({ ...prev, [c.id]: next }))}
        onNext={() => go('stages')}
      />
    )
  } else if (route === 'summary') {
    screen = <SummaryScreen onBack={() => go('stages')} />
  } else if (current === 'stages') {
    screen = <StageScreen onOpenStage={(id) => go(`stage/${id}`)} onOpenSummary={() => go('summary')} />
  } else {
    screen = <SelectScreen initial={character} onSelect={selectCharacter} onSkip={() => go('stages')} onSummary={() => go('summary')} />
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:py-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-muted">☁ KIM KWANGHYUN</span>
        <nav aria-label="진행 단계">
          <ol className="flex items-center gap-2">
            {steps.map((s, i) => (
              <li key={s.key} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-muted" aria-hidden>
                    ›
                  </span>
                )}
                <a
                  href={`#${s.hash}`}
                  aria-current={current === s.key ? 'step' : undefined}
                  className={`pixel-focus px-2 py-1 ${current === s.key ? 'bg-mp text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {i + 1}. {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <main className="flex-1">
        <CharacterContext value={character}>{screen}</CharacterContext>
      </main>

      <footer className="mt-16 text-center text-xs text-muted">© {year} 김광현 · Built with React + Vite</footer>
    </div>
  )
}
