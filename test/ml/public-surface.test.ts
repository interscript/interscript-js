import { describe, expect, it } from "vitest"
import * as ml from "../../src/ml/index.js"

// Public-surface guard: the decode-contract helpers must be reachable
// through the package barrel, not only via source-tree imports.
// (npm 5.8.0 shipped tokens.js with firstAlternates but the imf
// barrel never re-exported it — unreachable by any documented import.)
describe("ml public surface", () => {
  it("exposes imf.firstAlternates through the barrel", () => {
    expect(typeof ml.imf.firstAlternates).toBe("function")
    expect(ml.imf.firstAlternates("a/b c")).toBe("a c")
  })
})
