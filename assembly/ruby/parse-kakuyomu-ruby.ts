import { parseNarouRuby } from "./parse-narou-ruby";

// AssemblyScript
export function parseKakuyomuRuby(input: string): string {
    let output = input;

    if (output.startsWith('|')) {
        output = parseNarouRuby(input)
    }
    
    else if (output.startsWith('《')) {
        let rubyStart: i32 = output.indexOf('《');
        while (rubyStart !== -1) {
            const rtEnd: i32 = output.indexOf('》', rubyStart);
    
            if (rtEnd !== -1) {
                const rubyText = output.substring(rubyStart + 1, rtEnd);
    
                // baseStartを調整し、直前の単語にルビを適用する
                const baseEnd = rubyStart;
                let baseStart = baseEnd - 1;
    
                while (baseStart >= 0 && !isDelimiter(output.charAt(baseStart))) {
                    baseStart--;
                }
                baseStart++;  // 単語の最初の位置
    
                const baseText = output.substring(baseStart, baseEnd);
                const rubyHtml = `<ruby>${baseText}<rp>(</rp><rt>${rubyText}</rt><rp>)</rp></ruby>`;
    
                output = output.substring(0, baseStart) + rubyHtml + output.substring(rtEnd + 1);
    
                rubyStart = output.indexOf('《', baseStart + rubyHtml.length); // 再び検索
            } else {
                break;
            }
        }
    }

    return output;
}

function isDelimiter(char: string): bool {
    return char === ' ' || char === '　' || char === '、' || char === '。';
}
