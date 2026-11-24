import type { SpriteDef } from './sprites'

type Props = {
  sprite: SpriteDef
  /** 도트 1칸의 화면 크기(px) */
  scale?: number
  className?: string
  title?: string
  /** 지정하면 모든 칸을 이 색 하나로 칠한다 (잠긴 캐릭터 실루엣용) */
  silhouette?: string
}

/** 문자열 격자로 정의한 도트 그림을 SVG로 그린다. 같은 색이 이어지는 칸은 rect 하나로 합친다. */
export function Sprite({ sprite, scale = 4, className, title, silhouette }: Props) {
  const rows = sprite.mirror
    ? sprite.rows.map((r) => r + [...r].reverse().join(''))
    : sprite.rows
  const width = Math.max(...rows.map((r) => r.length))
  const height = rows.length

  const rects: { x: number; y: number; w: number; fill: string }[] = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const color = sprite.palette[row[x]]
      const fill = color && silhouette ? silhouette : color
      let run = 1
      while (x + run < row.length && row[x + run] === row[x]) run++
      if (fill) rects.push({ x, y, w: run, fill })
      x += run
    }
  })

  return (
    <svg
      width={width * scale}
      height={height * scale}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  )
}
