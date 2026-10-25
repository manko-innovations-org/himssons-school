import test from "node:test";
import assert from "node:assert/strict";
import { domains, messages } from "../lib/content.mjs";

test("navigation contains exactly the five approved domains", () => {
  assert.deepEqual(domains.map((domain) => domain.name.en), [
    "School & People",
    "Money",
    "Academics",
    "Communication",
    "Documents & School Operations",
  ]);
  assert.equal(new Set(domains.map((domain) => domain.id)).size, 5);
  assert.equal(new Set(domains.map((domain) => domain.number)).size, 5);
  for (const domain of domains) {
    assert.match(domain.id, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(domain.name.sw.trim());
    assert.ok(domain.name.en.trim());
  }
});

test("Swahili and English have matching, nonempty interface messages", () => {
  assert.deepEqual(Object.keys(messages.sw).sort(), Object.keys(messages.en).sort());
  for (const language of ["sw", "en"]) {
    for (const [key, message] of Object.entries(messages[language])) {
      assert.equal(typeof message, "string", `${language}.${key}`);
      assert.ok(message.trim(), `${language}.${key}`);
    }
  }
});

test("the preview explicitly reports missing identity and school infrastructure", () => {
  assert.equal(messages.en.school, "No school selected");
  assert.equal(messages.en.signedOut, "Signed out");
  assert.equal(messages.en.authTitle, "Authentication is not connected");
  assert.match(messages.en.signInFootnote, /No user session is created/);
  assert.match(messages.en.placeholderText, /No records are displayed or changed/);
});
