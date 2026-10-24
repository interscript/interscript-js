import { describe, it, expect, beforeEach } from "vitest"
import { configure, transliterate } from "../src/index.js"
import { iscBundledStrategy } from "../src/isc/loader.js"
import { checkEquivalence } from "../src/equivalence.js"

const A = `system "TSTA:xx-Latn:Latn:1" {
  metadata {
    authority_id tsta
    id 1
    language iso-639-2:xx
    source_script Latn
    destination_script Latn
  }
  stage main { parallel { sub { from "a" to "x" } } }
}`
const B = `system "TSTB:xx-Latn:Latn:2" {
  metadata {
    authority_id tstb
    id 2
    language iso-639-2:xx
    source_script Latn
    destination_script Latn
  }
  stage main { parallel { sub { from "a" to "y" } } }
}`
const B_EQUIV = `system "TSTB2:xx-Latn:Latn:3" {
  metadata {
    authority_id tstb2
    id 3
    language iso-639-2:xx
    source_script Latn
    destination_script Latn
  }
  stage main { parallel { sub { from "a" to "x" } } }
}`

describe("checkEquivalence (A3)", () => {
  beforeEach(() => {
    configure({
      strategies: [iscBundledStrategy({ TSTA: A, TSTB: B, TSTB2: B_EQUIV })],
    })
  })

  it("reports ratio 1 and no distinguishing samples for equivalent systems", () => {
    const r = checkEquivalence("TSTA", "TSTB2", ["ba", "a", "zzz"])
    expect(r.tested).toBe(3)
    expect(r.matched).toBe(3)
    expect(r.ratio).toBe(1)
    expect(r.distinguishing).toEqual([])
  })

  it("collects the minimal distinguishing samples", () => {
    const r = checkEquivalence("TSTA", "TSTB", ["zzz", "ba"])
    expect(r.tested).toBe(2)
    expect(r.matched).toBe(1)
    expect(r.ratio).toBe(0.5)
    expect(r.distinguishing).toEqual([
      { sample: "ba", first: "bx", second: "by" },
    ])
  })

  it("empty sample set is vacuously equivalent", () => {
    const r = checkEquivalence("TSTA", "TSTB", [])
    expect(r.tested).toBe(0)
    expect(r.ratio).toBe(1)
  })

  it("transliterate works through the configured strategies", () => {
    expect(transliterate("TSTA", "ba")).toBe("bx")
  })
})
