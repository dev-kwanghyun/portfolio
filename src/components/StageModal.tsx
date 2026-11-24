import { useCallback, useEffect, useRef, useState } from 'react'
import type { Stage } from '../game'
import { BossBattle } from './BossBattle'
import { bosses } from './bosses'
import { QuestDetail } from './QuestDetail'

type Props = { stage: Stage; onClose: () => void }

/** 요약 화면에서 스테이지 상세를 팝업으로 띄운다. 닫으면 보던 위치 그대로 돌아간다. */
export function StageModal({ stage, onClose }: Props) {
  const [battle, setBattle] = useState(false)
  const closeBattle = useCallback(() => setBattle(false), [])
  const boss = stage.quest.boss ? bosses[stage.quest.boss] : undefined
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (battle) return // 보스전이 열려 있으면 Esc는 보스전만 닫는다
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [battle, onClose])

  useEffect(() => {
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-night/90 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`스테이지 ${stage.code} 상세`}
        className="mx-auto my-6 max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 text-right">
          <button ref={closeRef} type="button" onClick={onClose} className="pixel-btn px-3 py-1 text-xs">
            ✕ 닫기
          </button>
        </div>
        <QuestDetail
          quest={stage.quest}
          label={`STAGE ${stage.code} · ${stage.region.company} · ${stage.quest.role}`}
          onStartBoss={() => setBattle(true)}
        />
      </div>
      {battle && boss && (
        <div onClick={(e) => e.stopPropagation()}>
          <BossBattle quest={stage.quest} boss={boss} onClose={closeBattle} />
        </div>
      )}
    </div>
  )
}
