/**
 * Pre-generate TTS audio for all lesson steps using ElevenLabs API.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk-... npx tsx scripts/generate-lesson-audio.ts
 *
 * Audio files are saved to public/audio/lessons/{skillId}-{stepIndex}.mp3
 * These are served as static assets at runtime — zero latency for students.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/audio/lessons');

// ElevenLabs config
const API_KEY = process.env.ELEVENLABS_API_KEY;
// "Roger" voice — clear, engaging, good for educational content.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'CwhRBWXzGAHq8TQ4Fs17';
const MODEL_ID = 'eleven_turbo_v2_5';
const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

// Set to Infinity to generate all files
const MAX_FILES = 10;

if (!API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY environment variable is required.');
  console.error('Usage: ELEVENLABS_API_KEY=sk-... npx tsx scripts/generate-lesson-audio.ts');
  process.exit(1);
}

// Parse lesson data from all module files in src/data/lessons/
async function loadLessons() {
  const lessonsDir = path.resolve(__dirname, '../src/data/lessons');
  const moduleFiles = fs.readdirSync(lessonsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .map(f => path.join(lessonsDir, f));

  const lessons: { skillId: string; steps: { content: string }[] }[] = [];

  for (const filePath of moduleFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let currentSkillId = '';
    let currentSteps: { content: string }[] = [];

    for (const line of content.split('\n')) {
      const skillMatch = line.match(/skillId:\s*'([^']+)'/);
      if (skillMatch) {
        if (currentSkillId && currentSteps.length > 0) {
          lessons.push({ skillId: currentSkillId, steps: [...currentSteps] });
        }
        currentSkillId = skillMatch[1];
        currentSteps = [];
      }

      const contentMatch = line.match(/^\s*content:\s*'(.+)',?\s*$/);
      if (contentMatch && currentSkillId) {
        const text = contentMatch[1].replace(/\\'/g, "'");
        currentSteps.push({ content: text });
      }
    }
    if (currentSkillId && currentSteps.length > 0) {
      lessons.push({ skillId: currentSkillId, steps: [...currentSteps] });
    }
  }

  return lessons;
}

async function generateAudio(text: string, outputPath: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': API_KEY!,
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.75,
        style: 0.3,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs API error ${response.status}: ${err}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const lessons = await loadLessons();
  let total = 0;
  let generated = 0;
  let skipped = 0;

  for (const lesson of lessons) {
    if (generated >= MAX_FILES) break;
    for (let i = 0; i < lesson.steps.length; i++) {
      if (generated >= MAX_FILES) break;
      total++;
      const filename = `${lesson.skillId}-${i}.mp3`;
      const outputPath = path.join(OUT_DIR, filename);

      // Skip if already generated
      if (fs.existsSync(outputPath)) {
        skipped++;
        continue;
      }

      const text = lesson.steps[i].content;
      console.log(`Generating: ${filename} — "${text.substring(0, 60)}..."`);

      try {
        await generateAudio(text, outputPath);
        generated++;
        // Rate limit: ~2 requests per second for free tier
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        console.error(`  Failed: ${err}`);
      }
    }
  }

  console.log(`\nDone! Generated: ${generated}, Skipped: ${skipped}, Total: ${total}`);
}

main().catch(console.error);
