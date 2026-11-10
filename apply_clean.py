import json
import subprocess

# Load clean base
from clean_translations import base_translations

target_path = '/home/uca/.gemini/antigravity/scratch/hourly-english/src/i18n/translations.js'
backup_path = '/home/uca/.gemini/antigravity/brain/cdf430b5-1767-418e-b459-ff80aee8d3ba/scratch/hourly-english/src/i18n/translations.js'

with open('/home/uca/.gemini/antigravity/scratch/hourly-english/update_translations.py', 'r', encoding='utf-8') as f:
    code = f.read()

# We already have extra_en, extra_ru, extra_kg defined in update_translations.py
# Let's extract them
namespace = {}
exec(compile(code, 'update_translations.py', 'exec'), namespace)
extra_en = namespace['extra_en']
extra_ru = namespace['extra_ru']
extra_kg = namespace['extra_kg']

# Deep merge into base_translations
for k, v in extra_en.items():
    base_translations['en'][k] = v
for k, v in extra_ru.items():
    base_translations['ru'][k] = v
for k, v in extra_kg.items():
    base_translations['kg'][k] = v

# Format as JavaScript export
js_content = 'export const translations = ' + json.dumps(base_translations, ensure_ascii=False, indent=2) + ';\n'

with open(target_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

with open(backup_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

# Test with node
res = subprocess.run(['node', '-e', \"import('./src/i18n/translations.js').then(m => console.log('Successfully validated translations! EN count:', Object.keys(m.translations.en).length))\"] , cwd='/home/uca/.gemini/antigravity/scratch/hourly-english', capture_output=True, text=True)
print(res.stdout)
if res.returncode != 0:
    print('Error:', res.stderr)
