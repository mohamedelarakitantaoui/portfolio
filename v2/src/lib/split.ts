// v5 headings: the second clause may be set in Cormorant italic. The text itself never changes: a heading is split
// after its first ", " or ": " (the punctuation stays with the first part). No natural split: [whole, ''], all Jost.
export function splitClause(text: string): [string, string] {
  const m = /^(.+?[,:])\s+(\S.*)$/s.exec(text);
  return m ? [m[1], m[2]] : [text, ''];
}
