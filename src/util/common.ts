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
