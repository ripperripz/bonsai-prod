
const fs = require('fs');

// Read the translations file
const content = fs.readFileSync('src/translations.ts', 'utf8');

// Extract the object part (this is a hacky way, but effective for this file structure)
// We assume the file starts with "export const translations = {" and ends with "};"
const startIndex = content.indexOf('{');
const endIndex = content.lastIndexOf(';');
const jsonString = content.substring(startIndex, endIndex);

// Since the file is TS/JS object literal (keys not quoted, trailing commas), JSON.parse won't work directly.
// We will use eval (safe enough here as we control the file content loosely and it's local) 
// or simpler: just write a node script that IMPORTS the ts file (using ts-node would be ideal, but let's try to just use node by transpiling or regex).

// Actually, simpler approach:
// Let's just create a small TS file that imports the translations and checks them.
// We need to run it with ts-node if available, or compile it.
// Given the environment, I'll try to run a script that regex-parses or I will look for keys manually if I can't run it.

// WAIT, I can just use the runtime! I have `npm run dev` running.
// I can write a small utility script to be executed in the browser context if I could use the browser tool.
// Since I can't, I will use a local node script with simple regex/logic to find mismatches.

// Better yet: I will create a temporary test file `test_trans.js` which mimics the structure and checks it.
// I'll copy the content of translations.ts, strip the "export const" and type annotations if any, and run it.

// The file is typescript, so I might need to strip types?
// Looking at previous `view_file`, it seems to be standard JS-compatible object object literals mostly (except for `export const`).
// Let's try to read it, checking for keys.

// Plan B: Write a node script that reads the file, evals it (after stripping export), and compares.

const translationsCode = content.replace('export const translations =', 'const translations =');

// We need to handle the fact that it is not valid JS if it has type assertions, but `src/translations.ts` seems clean of types inside the object.
// Let's wrapping it in a function and return keys.

try {
    eval(translationsCode + '; module.exports = translations;');
} catch (e) {
    console.error("Failed to eval:", e.message);
    process.exit(1);
}

const t = module.exports;
const en = t.en;
const ar = t.ar;

function compareObjects(obj1, obj2, path = '') {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    keys1.forEach(key => {
        if (!obj2.hasOwnProperty(key)) {
            console.error(`Missing key in AR: ${path}.${key}`);
        } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            if (typeof obj2[key] !== 'object' || obj2[key] === null) {
                console.error(`Type mismatch at ${path}.${key}: expected object`);
            } else {
                compareObjects(obj1[key], obj2[key], `${path}.${key}`);
            }
        }
    });

    keys2.forEach(key => {
        if (!obj1.hasOwnProperty(key)) {
            console.error(`Extra key in AR (missing in EN): ${path}.${key}`);
        }
    });
}

console.log("Comparing EN to AR...");
compareObjects(en, ar, 'root');
console.log("Comparison complete.");
