// AssemblyScript
export function parseRuby(input: string): string {
    // 入力に `|` と `《》` が含まれているかを確認し、正しいルビ形式にパースする
    let output = input;
    let pipeIndex: i32 = output.indexOf('|');
    while (pipeIndex !== -1) {
      const rubyEnd: i32 = output.indexOf('《', pipeIndex);
      const rtEnd: i32 = output.indexOf('》', rubyEnd);
  
      if (rubyEnd !== -1 && rtEnd !== -1) {
        // | から 《 の間が ruby のベーステキスト
        const baseText = output.substring(pipeIndex + 1, rubyEnd);
        // 《 から 》 の間がルビテキスト
        const rubyText = output.substring(rubyEnd + 1, rtEnd);
  
        // 変換するHTML要素の構築
        const rubyHtml = `<ruby>${baseText}<rp>(</rp><rt>${rubyText}</rt><rp>)</rp></ruby>`;
  
        // 元の文字列の該当部分をルビ付きHTMLに置換
        output = output.substring(0, pipeIndex) + rubyHtml + output.substring(rtEnd + 1);
  
        // 次の `|` を探す
        pipeIndex = output.indexOf('|', pipeIndex + rubyHtml.length);
      } else {
        break;
      }
    }
  
    return output;
  }
  