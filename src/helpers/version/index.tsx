import packageJson from '../../../package.json'

export default function getConqVersion(): void {
  //cima, cima, baixo, baixo, esquerda, direita, esquerda, direita, a, b
  const codeArray: number[] = [38, 38, 40, 40, 37, 39, 37, 39, 65, 66]
  let position: number = 0
  document.addEventListener('keydown', function(event: KeyboardEvent): void {
    if (event.keyCode === codeArray[position]) {
      position++
      if (position === codeArray.length) {
        console.log(`Versão: v${packageJson.version}`)
        position = 0
      }
    } else {
      position = 0
    }
  })
}
