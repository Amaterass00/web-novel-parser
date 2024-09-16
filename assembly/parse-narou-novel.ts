import { parseNarouRuby } from "./ruby/parse-narou-ruby";

export function parseNarouNovel(input: string): string {
    const lines = input.split('\n');
    let result = "";
    let lineId: i32 = 1;
  
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
  
      if (line.indexOf('|') !== -1 && line.indexOf('《') !== -1 && line.indexOf('》') !== -1) {
        line = parseNarouRuby(line);
      }
  
      result += `<p id="L${lineId.toString()}">${line}</p>`;
      
      lineId++;
  
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
  
    return result;
  }