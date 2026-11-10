import json
import subprocess

# 1. Load base translations from JSON
with open('/home/uca/.gemini/antigravity/scratch/hourly-english/base_translations.json', 'r', encoding='utf-8') as f:
    base = json.load(f)

# 2. Load extra dictionaries from update_translations.py
with open('/home/uca/.gemini/antigravity/scratch/hourly-english/update_translations.py', 'r', encoding='utf-8') as f:
    code = f.read()

ns = {}
exec(compile(code, 'update_translations.py', 'exec'), ns)
extra_en = ns['extra_en']
extra_ru = ns['extra_ru']
extra_kg = ns['extra_kg']

# 3. Add aboutPage if not already in base
# Let's verify aboutPage
about_en = {
  "badge": "OUR METHODOLOGY & PHILOSOPHY",
  "title": "Why 1-on-1 English changes everything",
  "subtitle": "Traditional group classes leave 90% of students silent and anxious. At HOURLY, every single minute is built exclusively around you.",
  "comparisonTitle": "Group Classes vs HOURLY 1-on-1",
  "comparisonSubtitle": "See why private mentorship achieves in 3 months what group courses fail to do in 2 years.",
  "talkTimeTitle": "70%+ Speaking Time",
  "talkTimeDesc": "In a group of 10 people, you speak for barely 4 minutes per hour. In our 1-on-1 lessons, you actively speak for 35 to 40 minutes every single session.",
  "confidenceTitle": "Zero Fear of Making Mistakes",
  "confidenceDesc": "No classmates judging your grammar or accent. Your personal tutor creates a comfortable, confidential space where mistakes are turned into rapid learning.",
  "paceTitle": "Paced Exactly to Your Level",
  "paceDesc": "Never wait for slower students, and never get left behind by faster ones. If you understand a concept fast, we move forward; if you struggle, we drill it deeply.",
  "customTitle": "Content Built for Your Real Goals",
  "customDesc": "Forget generic textbook dialogues about train stations in London. We analyze your actual career needs: IT pull requests, international pitch decks, or IELTS Academic tasks.",
  "coursesDeepTitle": "How 1-on-1 Supercharges Our Courses",
  "coursesDeepSubtitle": "Every HOURLY course is engineered around individual live speaking scenarios.",
  "courseSpeakingTitle": "General Speaking Fluency",
  "courseSpeakingDesc": "Break through the psychological barrier from Lesson 1. Natural everyday conversation, colloquial phrasing, and live pronunciation tuning.",
  "courseITTitle": "IT & Tech Industry English",
  "courseITDesc": "Simulate sprint standups, architectural design debates, and live code reviews directly with tutors who know tech terminology and agile workflows.",
  "courseBusinessTitle": "Business & Executive English",
  "courseBusinessDesc": "Master cross-border negotiations, boardroom presentations, high-stakes email correspondence, and contract discussions.",
  "courseIELTSTitle": "IELTS Academic & General Prep",
  "courseIELTSDesc": "Targeted preparation for Bands 7.0–8.5. 1-on-1 live mock speaking tests with immediate examiner-level criteria feedback and essay breakdowns.",
  "courseInterviewTitle": "International Job Interview Prep",
  "courseInterviewDesc": "Practice behavioral interview questions using the STAR framework. Gain the confidence to pass HR and technical rounds for European & US remote roles.",
  "courseKidsTitle": "English for Kids & Teens",
  "courseKidsDesc": "Interactive, gamified private lessons that spark genuine curiosity and foster native-like pronunciation habits without boring homework drills.",
  "missionTitle": "Our Mission for Kyrgyzstan & Central Asia",
  "missionP1": "HOURLY was created in Bishkek with a clear purpose: to give ambitious Kyrgyzstani youth, professionals, and students direct access to high-paying global opportunities.",
  "missionP2": "Language shouldn't be a barrier to earning in USD or securing international university scholarships. By offering world-class 1-on-1 English at accessible local rates, we are helping Central Asian talents unlock global mobility.",
  "stats1Number": "1,200+",
  "stats1Label": "Active & graduated students in Kyrgyzstan",
  "stats2Number": "70%+",
  "stats2Label": "Average active student speaking time per lesson",
  "stats3Number": "94%",
  "stats3Label": "Achieved target IELTS band or international job offer",
  "stats4Number": "4.9/5",
  "stats4Label": "Student satisfaction rating",
  "ctaTitle": "Ready to experience the 1-on-1 difference?",
  "ctaSubtitle": "Book a friendly 15-minute diagnostic session with a senior mentor today. No commitments, just honest assessment and a personalized roadmap.",
  "ctaButton": "Book Free 1-on-1 Trial"
}

about_ru = {
  "badge": "НАША МЕТОДОЛОГИЯ И ФИЛОСОФИЯ",
  "title": "Почему формат 1-на-1 меняет всё",
  "subtitle": "В традиционных группах 90% времени студенты молчат и стесняются. В HOURLY каждая минута урока посвящена исключительно вам.",
  "comparisonTitle": "Групповые курсы против 1-на-1 в HOURLY",
  "comparisonSubtitle": "Почему индивидуальные занятия за 3 месяца дают больший результат, чем 2 года в обычных группах.",
  "talkTimeTitle": "Более 70% времени говорите вы",
  "talkTimeDesc": "В группе из 10 человек каждому достается от силы 4 минуты речи за урок. У нас вы активно говорите от 35 до 40 минут на каждом занятии.",
  "confidenceTitle": "Никакого страха сделать ошибку",
  "confidenceDesc": "Рядом нет одногруппников, перед которыми неловко ошибиться. Преподаватель создает комфортную доверительную среду, где ошибки разбираются сразу и без стресса.",
  "paceTitle": "Темп, созданный под вас",
  "paceDesc": "Вам не нужно ждать отстающих или догонять тех, кто схватывает быстрее. Поняли тему — идем дальше; есть сложности — отрабатываем до автоматизма.",
  "customTitle": "Темы под ваши реальные цели",
  "customDesc": "Забудьте о шаблонных текстах из старых учебников. Мы учим тому, что нужно вам: защита проектов в IT, переписка с зарубежными партнерами или часть Speaking в IELTS.",
  "coursesDeepTitle": "Как формат 1-на-1 усиливает наши курсы",
  "coursesDeepSubtitle": "Каждая программа в HOURLY построена на живой практике реальных ситуаций.",
  "courseSpeakingTitle": "Разговорный английский",
  "courseSpeakingDesc": "Снятие языкового барьера с первого урока. Живое общение, современный сленг, идиомы и постановка правильного произношения.",
  "courseITTitle": "Английский для IT и технологий",
  "courseITDesc": "Симуляция дейли-стендапов, защита архитектурных решений и обсуждение пулл-реквестов с преподавателями, разбирающимися в IT-терминологии.",
  "courseBusinessTitle": "Деловой английский и переговоры",
  "courseBusinessDesc": "Уверенное участие в международных встречах, проведение презентаций, деловая переписка и подготовка к заключению контрактов.",
  "courseIELTSTitle": "Подготовка к IELTS (Academic & General)",
  "courseIELTSDesc": "Прицельная подготовка на балл 7.0–8.5. Пробные 1-на-1 интервью по критериям экзаменаторов и детальный разбор эссе.",
  "courseInterviewTitle": "Подготовка к собеседованиям",
  "courseInterviewDesc": "Отработка ответов по методике STAR, репетиция технических и поведенческих интервью для работы в зарубежных компаниях.",
  "courseKidsTitle": "Английский для детей и подростков",
  "courseKidsDesc": "Увлекательные интерактивные уроки в игровом формате, формирующие естественную речь и интерес к языку без зубрежки.",
  "missionTitle": "Наша миссия для Кыргызстана и Центральной Азии",
  "missionP1": "HOURLY был основан в Бишкеке с понятной целью: дать амбициозным кыргызстанцам и специалистам прямой доступ к международным возможностям и высоким доходам.",
  "missionP2": "Языковой барьер не должен мешать получать офферы в валюте или выигрывать зарубежные стипендии. Предоставляя индивидуальное обучение мирового уровня по доступным ценам, мы помогаем нашим талантам выходить на глобальный уровень.",
  "stats1Number": "1,200+",
  "stats1Label": "Студентов обучено в Кыргызстане и за рубежом",
  "stats2Number": "70%+",
  "stats2Label": "Среднее время активной речи студента на уроке",
  "stats3Number": "94%",
  "stats3Label": "Достигли целевого балла IELTS или оффера в компанию",
  "stats4Number": "4.9/5",
  "stats4Label": "Средняя оценка студентов",
  "ctaTitle": "Попробуйте преимущество формата 1-на-1",
  "ctaSubtitle": "Запишитесь на 15-минутную ознакомительную диагностику с преподавателем. Без обязательств — только честный разбор вашего уровня и пошаговый план.",
  "ctaButton": "Записаться на бесплатный пробный урок"
}

about_kg = {
  "badge": "БИЗДИН МЕТОДОЛОГИЯ ЖАНА ФИЛОСОФИЯ",
  "title": "Эмне үчүн 1-ге-1 форматы баарын өзгөртөт",
  "subtitle": "Кадимки топтук сабактарда окуучулардын 90%ы тартынып, унчукпай отурушат. HOURLYде ар бир мүнөт жалаң гана сизге арналат.",
  "comparisonTitle": "Топтук сабактар vs HOURLY 1-ге-1 форматы",
  "comparisonSubtitle": "Эмне үчүн жеке окутуу 3 айда топтук курстардын 2 жылдык жыйынтыгынан ашып түшөрүн көрүңүз.",
  "talkTimeTitle": "Убакыттын 70%+ сиз сүйлөйсүз",
  "talkTimeDesc": "10 адамдан турган топтордо ар бир окуучу сабагына болгону 4 мүнөт сүйлөйт. Биздин 1-ге-1 сабактарда сиз 35-40 мүнөт бою үзгүлтүксүз активдүү сүйлөйсүз.",
  "confidenceTitle": "Ката кетирүүдөн эч коркпоңуз",
  "confidenceDesc": "Сизди сындай турган башка окуучулар жок. Мугалимиңиз эркин жана ишенимдүү чөйрө түзүп, каталарды дароо пайдалуу тажрыйбага айландырат.",
  "paceTitle": "Сиздин жеке темпиңизге ылайыкталат",
  "paceDesc": "Артка калгандарды күтүп убакыт коротпойсуз, алдыга кеткендердин артынан кууп кыйналбайсыз. Түшүнсөңүз — алдыга жылабыз, кыйын болсо — бышыктайбыз.",
  "customTitle": "Чыныгы максаттарыңызга ылайык программа",
  "customDesc": "Эски китептердеги пайдасыз диалогдорду унутуңуз. Сизге эмне керек болсо ошону үйрөтөбүз: IT-долбоорлор, чет элдик кардарлар менен сүйлөшүүлөр же IELTS.",
  "coursesDeepTitle": "1-ге-1 форматы курстарыбыздын натыйжалуулугун кантип арттырат",
  "coursesDeepSubtitle": "HOURLYдин ар бир программасы реалдуу жашоодогу сүйлөшүү кырдаалдарына негизделген.",
  "courseSpeakingTitle": "Эркин сүйлөшүү курсу",
  "courseSpeakingDesc": "Биринчи сабактан баштап тилдик тоскоолдукту жеңүү. Күнүмдүк жандуу баарлашуу, заманбап фразалар жана туура айтылыш.",
  "courseITTitle": "IT жана технологиялар үчүн англис тили",
  "courseITDesc": "IT терминологиясын жакшы билген мугалимдер менен стендаптарды симуляциялоо, коддорду жана архитектураны коргоо.",
  "courseBusinessTitle": "Бизнес жана расмий сүйлөшүүлөр",
  "courseBusinessDesc": "Эл аралык жолугушууларда өз пикирин так билдирүү, презентацияларды жасоо, иш каттарын жазуу жана келишимдерди түзүү.",
  "courseIELTSTitle": "IELTS экзаменине даярдык (7.0–8.5)",
  "courseIELTSDesc": "Жогорку упай алуу үчүн жеке даярдык. Экзамендин талаптарына ылайык 1-ге-1 сүйлөшүү практикасы жана эсселерди деталдуу талдоо.",
  "courseInterviewTitle": "Эл аралык интервьюларга даярдык",
  "courseInterviewDesc": "STAR усулу менен суроолорго жооп берүүгө машыгуу. Европалык жана америкалык компанияларга ишке орношуу үчүн репетициялар.",
  "courseKidsTitle": "Балдар жана өспүрүмдөр үчүн англис тили",
  "courseKidsDesc": "Оюн түрүндөгү кызыктуу жеке сабактар. Тажатма эрежелерсиз, кичинекей кезден табигый акцент жана тилге болгон сүйүүнү калыптандыруу.",
  "missionTitle": "Кыргызстан жана Борбор Азия үчүн биздин миссиябыз",
  "missionP1": "HOURLY Бишкекте так максат менен түзүлгөн: кыргызстандык жаштарга, адистерге жана студенттерге жогорку айлыктуу глобалдык мүмкүнчүлүктөргө түз жол ачуу.",
  "missionP2": "Тилди билбөө чет элдик долбоорлордон акча табууга же чет өлкөлүк гранттарды утуп алууга тоскоол болбошу керек. Дүйнөлүк деңгээлдеги 1-ге-1 билимди жергиликтүү жеткиликтүү баада сунуштоо менен биз өлкөбүздүн талантын дүйнөгө чыгарууга салым кошобуз.",
  "stats1Number": "1,200+",
  "stats1Label": "Кыргызстанда жана чет жерде окуган студенттер",
  "stats2Number": "70%+",
  "stats2Label": "Сабакта окуучунун активдүү сүйлөө убактысы",
  "stats3Number": "94%",
  "stats3Label": "IELTS упайын алып же чет элдик компанияга өттү",
  "stats4Number": "4.9/5",
  "stats4Label": "Студенттердин орточо баасы",
  "ctaTitle": "1-ге-1 форматынын артыкчылыгын байкап көрүңүз",
  "ctaSubtitle": "Тил деңгээлиңизди аныктоо үчүн мугалим менен 15 мүнөттүк акысыз маекке жазылыңыз. Эч кандай милдеттенмесиз — деңгээлиңизди так аныктап, жеке план аласыз.",
  "ctaButton": "Акысыз 1-ге-1 сыноо сабагына жазылуу"
}

base['en']['aboutPage'] = about_en
base['ru']['aboutPage'] = about_ru
base['kg']['aboutPage'] = about_kg

# Merge extras
for k, v in extra_en.items():
    base['en'][k] = v
for k, v in extra_ru.items():
    base['ru'][k] = v
for k, v in extra_kg.items():
    base['kg'][k] = v

target_path = '/home/uca/.gemini/antigravity/scratch/hourly-english/src/i18n/translations.js'
backup_path = '/home/uca/.gemini/antigravity/brain/cdf430b5-1767-418e-b459-ff80aee8d3ba/scratch/hourly-english/src/i18n/translations.js'

js_content = 'export const translations = ' + json.dumps(base, ensure_ascii=False, indent=2) + ';\n'

with open(target_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

with open(backup_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

res = subprocess.run(
    ['node', '-e', "import('./src/i18n/translations.js').then(m => console.log('Successfully validated translations! EN keys:', Object.keys(m.translations.en).length, 'KG keys:', Object.keys(m.translations.kg).length))"] ,
    cwd='/home/uca/.gemini/antigravity/scratch/hourly-english',
    capture_output=True,
    text=True
)
print('STDOUT:', res.stdout)
if res.returncode != 0:
    print('STDERR:', res.stderr)
else:
    print('Translations successfully built and verified!')
