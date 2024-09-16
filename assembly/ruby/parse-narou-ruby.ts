// AssemblyScript
export function parseNarouRuby(input: string): string {
    let output = input;

    let pipeIndex: i32 = output.indexOf('|');
  
    while (pipeIndex !== -1) {
        const rubyStart: i32 = output.indexOf('《', pipeIndex);
        const rubyEnd: i32 = output.indexOf('》', rubyStart);
        
        if (rubyStart !== -1 && rubyEnd !== -1) {
            const baseText = output.substring(pipeIndex + 1, rubyStart);
            const rubyText = output.substring(rubyStart + 1, rubyEnd);
            const rubyHtml = `<ruby>${baseText}<rp>(</rp><rt>${rubyText}</rt><rp>)</rp></ruby>`;
            
            output = output.substring(0, pipeIndex) + rubyHtml + output.substring(rubyEnd + 1);
            
            pipeIndex = output.indexOf('|', pipeIndex + rubyHtml.length);
        } else {
            break;
        }
    }
  
    return output;
}
