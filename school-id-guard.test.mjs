import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const modules = readFileSync(new URL("./modules.js", import.meta.url), "utf8");

test("school ID validator accepts UUIDs and rejects missing or malformed values", () => {
  const start = html.indexOf("function isValidSchoolId(value){");
  const end = html.indexOf("\nfunction message", start);
  assert.ok(start >= 0 && end > start, "school ID validator must exist before app startup");
  const sandbox = {};
  vm.runInNewContext(html.slice(start, end) + "; globalThis.validate = isValidSchoolId;", sandbox);
  assert.equal(sandbox.validate("123e4567-e89b-42d3-a456-426614174000"), true);
  assert.equal(sandbox.validate("null"), false);
  assert.equal(sandbox.validate(null), false);
  assert.equal(sandbox.validate(""), false);
});

test("school data queries stop when there is no valid school context", () => {
  assert.match(html, /if\(!isValidSchoolId\(membership\.school_id\)\)/);
  assert.match(html, /async function loadStudents\(\)\{\s*if\(!isValidSchoolId\(currentSchoolId\)\)return;/);
  assert.match(html, /async function loadMarks\(\)\{\s*if\(!isValidSchoolId\(currentSchoolId\)\)return;/);
  assert.match(html, /async function buildReport\(\)\{\s*if\(!isValidSchoolId\(currentSchoolId\)\)return;/);
  assert.match(modules, /function count\(table\)\{if\(typeof isValidSchoolId!=='function'\|\|!isValidSchoolId\(currentSchoolId\)\)return Promise\.resolve\('—'\)/);
});
