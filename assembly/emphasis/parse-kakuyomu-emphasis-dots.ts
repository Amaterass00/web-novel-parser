export function parseKakuyomuEmphasisDots(text: string): string {
  let result = '';
  let i: i32 = 0;

  while (i < text.length) {
    const start: i32 = text.indexOf('《《', i);
    if (start === -1) {
      result += text.slice(i);
      break;
    }

    result += text.slice(i, start);
    const end: i32 = text.indexOf('》》', start);

    if (end === -1) {
      result += text.slice(start);
      break;
    }

    const content = text.slice(start + 2, end);
    const spans: string = content.split('')
      .map<string>(char => `<span>${char}</span>`)
      .join('');

    result += `<em style="text-emphasis: filled black;">${spans}</em>`;
    i = end + 2;
  }

  return result;
}
