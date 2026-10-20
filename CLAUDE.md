# CLAUDE.md — interscript-ts

The canonical TypeScript/JS engine for Interscript — deterministic
transliteration plus the browser/edge surface for the neural model
contract. Project purpose and direction: `interscript-models` README.

## Facts that bite

- ISC maps load directly (`src/isc/`, `iscStrategy`); the JSON IR
  loader is legacy (precompiled bundles only).
- Cross-runtime parity against the Ruby interpreter is a CI job — a
  parity regression blocks merge like any test failure.
- Releases re-pin the model index (`index-vN`) — stale index
  assertions anywhere in the test suite fail the release; sweep by
  token, not by whole-file regex (the 5.1.0 lesson).
- The conformance harness replays frozen vectors from
  interscript-models' `conformance/` in every release leg.
- npm publishing is OIDC trusted publishing only — tokens 404. The
  package ships code only; maps and models are release artifacts
  resolved at runtime, never bundled.
- Byte-level decode contract (ByT5): ids are byte + 3 with trailing
  EOS (id 1) — raw `text.bytes`/`Uint8Array` of the input is not the
  id sequence.
- Exports take only `input_ids` unless the artifact was built with a
  masked encoder; batched padded decode on unmasked encoders corrupts
  encoder states.

## Laws

- PRs only, never commit to main. Versions are owner decisions.
- Library packages are immutable at runtime: no writes into the
  installed package; generated/consumer data goes to the consumer's
  working directory.
