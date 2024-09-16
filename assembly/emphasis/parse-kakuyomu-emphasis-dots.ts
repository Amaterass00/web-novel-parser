function parseEmphasisDots(text: string): string {
    const regex:RegExp = /《《(.*?)》》/g;
  
    // @ts-ignore
    return text.replace(regex, (match: string, content: string) => {
      const spans = content.split('').map(char => `<span>${char}</span>`).join('');
      return `<em>${spans}</em>`;
    });
  }
  