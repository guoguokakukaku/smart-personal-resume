export const HEADER_TYPE = {
  TOP: '1',
  SEARCH: '2',
  COMMON: '3',
}

export function hex2rgb(hex: string) {
  return hex.slice(0, hex.length - 1) + ', 0.5)'
}

export function getStyleFromCSSClass(className: string, keyName: string): string {
  const tmp = document.createElement('div') 
  tmp.style.cssText = 'position:fixed;width:0;height:0'
  tmp.className = className
  document.body.appendChild(tmp)
  const value = getComputedStyle(tmp).getPropertyValue(keyName)
  document.body.removeChild(tmp)
  return value
}

export const DEV_PROCESS = {
  REQUIREMENTS_DEFINITION: "要件定義",
  BASIC_DESIGN: "基本設計",
  DETAILED_DESIGN: "詳細設計",
  CODING: "実装",
  TEST: "試験",
  MENTINATION: "運用"
}