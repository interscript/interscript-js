// A3 (WO59): mechanical equivalence checking between two systems.
//
// Probes a sample set through both systems and reports the agreement
// ratio plus the distinguishing samples. Mirrors the ruby
// Interscript::Equivalence contract (ruby lib/interscript/equivalence.rb).

import { transliterate } from "./index.js"

export interface DistinguishingSample {
  sample: string
  first: string
  second: string
}

export interface EquivalenceResult {
  tested: number
  matched: number
  ratio: number
  distinguishing: DistinguishingSample[]
}

export function checkEquivalence(
  first: string,
  second: string,
  samples: string[],
): EquivalenceResult {
  let tested = 0
  let matched = 0
  const distinguishing: DistinguishingSample[] = []
  for (const sample of samples) {
    tested += 1
    const a = transliterate(first, sample)
    const b = transliterate(second, sample)
    if (a === b) {
      matched += 1
    } else {
      distinguishing.push({ sample, first: a, second: b })
    }
  }
  return {
    tested,
    matched,
    ratio: tested === 0 ? 1.0 : matched / tested,
    distinguishing,
  }
}
