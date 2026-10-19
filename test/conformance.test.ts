/**
 * Frozen conformance fixtures (interscript-models/conformance/) — the
 * TypeScript runtime must reproduce the vectors byte-exactly under the
 * declared decode mode, or the change does not merge.
 *
 * Gated on env: SECRYST_E2E_ZIP (the artifact) + CONFORMANCE_VECTORS
 * (the fixture file), so CI runs without downloads.
 */

import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { IMFModel } from "../src/ml/imf/index.js"

const e2eZip = process.env["SECRYST_E2E_ZIP"]
const conformanceVectors = process.env["CONFORMANCE_VECTORS"]

describe("frozen conformance fixtures", () => {
  it.skipIf(!e2eZip || !conformanceVectors)(
    "reproduces the vectors byte-exactly (single-row-greedy)",
    async () => {
      const vectors = JSON.parse(readFileSync(conformanceVectors!, "utf-8")) as {
        model: string
        decode: { mode: string }
        vectors: { src: string; out: string }[]
      }
      expect(vectors.decode.mode).toBe("single-row-greedy")
      const model = await IMFModel.load(e2eZip!)
      const failures: string[] = []
      for (const v of vectors.vectors) {
        const got = await model.translate(v.src, 256)
        if (got !== v.out) {
          failures.push(`${v.src} -> ${got} (expected ${v.out})`)
        }
      }
      await model.dispose()
      expect(
        failures,
        `${vectors.model}: ${failures.length}/${vectors.vectors.length} mismatched`,
      ).toEqual([])
    },
    600_000,
  )
})
