// 지원하는 회사명을 URL로 받는다. 예: /portfolio/?to=토스
// 해시 라우팅은 ?to= 를 건드리지 않으므로 화면을 이동해도 유지된다.
const MAX_LENGTH = 30

function read(): string | null {
  try {
    const value = new URLSearchParams(window.location.search).get('to')?.trim()
    return value ? value.slice(0, MAX_LENGTH) : null
  } catch {
    return null
  }
}

export const targetCompany = read()

// 받침 유무에 맞춰 '로'/'으로'를 붙인다. 한글이 아닌 이름은 판단할 수 없어 '(으)로'를 쓴다.
export function withRo(word: string): string {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  if (code < 0 || code > 11171) return `${word}(으)로`
  const jong = code % 28
  return jong === 0 || jong === 8 ? `${word}로` : `${word}으로`
}
