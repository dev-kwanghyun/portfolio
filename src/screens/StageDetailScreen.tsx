import { useCallback, useState } from 'react'
import { BossBattle } from '../components/BossBattle'
import { bosses } from '../components/bosses'
import { QuestDetail } from '../components/QuestDetail'
import type { Stage } from '../game'

type Props = { stage: Stage; onBack: () => void }

export function StageDetailScreen({ stage, onBack }: Props) {
  const [battle, setBattle] = useState(false)
  const closeBattle = useCallback(() => setBattle(false), [])
  const boss = stage.quest.boss ? bosses[stage.quest.boss] : undefined

  return (
    <section className="mx-auto max-w-4xl">
      <button type="button" onClick={onBack} className="pixel-btn mb-6 px-3 py-1 text-xs">
        ◀ 스테이지 선택
      </button>
      <QuestDetail
        quest={stage.quest}
        label={`STAGE ${stage.code} · ${stage.region.company} · ${stage.quest.role}`}
        onStartBoss={() => setBattle(true)}
      />
      {battle && boss && <BossBattle quest={stage.quest} boss={boss} onClose={closeBattle} />}
    </section>
  )
}
