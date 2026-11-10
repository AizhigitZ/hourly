import json
import os
import re

transcript_path = '/home/uca/.gemini/antigravity/brain/cdf430b5-1767-418e-b459-ff80aee8d3ba/.system_generated/logs/transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    lines = [json.loads(l) for l in f]

# Base file from prompt 23
d23 = lines[23]
base_text = None
for tc in d23.get('tool_calls', []):
    p = tc.get('args', {}).get('Prompt', '')
    parts = p.split('## 2. src/i18n/translations.js')
    if len(parts) > 1:
        sec = parts[1].split('```')[1]
        base_text = '\n'.join(sec.split('\n')[1:])

assert base_text is not None

# Apply edits
current = base_text
for idx, d in enumerate(lines):
    for tc in d.get('tool_calls', []):
        if tc.get('name') == 'edit_file':
            args = tc.get('args', {})
            path = args.get('Path') or args.get('path')
            if path and path.endswith('translations.js'):
                target = args.get('Target') or args.get('target')
                replacement = args.get('Replacement') if 'Replacement' in args else args.get('replacement', '')
                if target in current:
                    current = current.replace(target, replacement)
                    print(f'Applied edit at line {idx}')
                else:
                    print(f'Failed edit at line {idx}')

print('Clean translations.js text recovered, length:', len(current))

with open('/home/uca/.gemini/antigravity/scratch/hourly-english/clean_translations_raw.js', 'w', encoding='utf-8') as f:
    f.write(current)
