(function () {
  // ---------- данные ----------
  var MODELS = [
    {
      id: 'neo', group: 'budget', name: 'MacBook Neo', chip: 'A18 Pro (как в iPhone)', price: '$599', priceNote: '$499 по edu; Macworld даёт $699',
      screen: '13" Liquid Retina, 500 нит', ram: '8 ГБ (не расширяется)', ssd: '256 / 512 ГБ', battery: '~16 ч', weight: '~1,23 кг',
      ports: '2× USB-C', ext: '1 внешний дисплей', fan: 'Без вентилятора',
      pros: 'Самый дешёвый вход в macOS, лёгкий', cons: '8 ГБ ОЗУ, без подсветки клавиатуры, Touch ID только в версии 512 ГБ',
      pick: false, verdict: 'Для iOS-разработки тесно'
    },
    {
      id: 'air13', group: 'air', name: 'MacBook Air 13" M5', chip: 'Apple M5', price: '$1 299', priceNote: 'запуск был $1 099; после июня — $1 299',
      screen: '13,6" Liquid Retina, 500 нит', ram: '16–32 ГБ', ssd: '512 ГБ – 4 ТБ', battery: '~18 ч', weight: '~1,24 кг',
      ports: '2× Thunderbolt/USB-C, MagSafe', ext: 'до 2 внешних (проверить)', fan: 'Без вентилятора',
      pros: 'Лучший баланс цены, веса и мощности', cons: 'Нет вентилятора: при долгой нагрузке сбросит частоты; всего 2 порта',
      pick: true, verdict: 'Моя рекомендация'
    },
    {
      id: 'air15', group: 'air', name: 'MacBook Air 15" M5', chip: 'Apple M5', price: '$1 499', priceNote: 'ориентир',
      screen: '15,3" Liquid Retina, 500 нит', ram: '16–32 ГБ', ssd: '512 ГБ – 4 ТБ', battery: '~18 ч', weight: '~1,5 кг',
      ports: '2× Thunderbolt/USB-C, MagSafe', ext: 'до 2 внешних (проверить)', fan: 'Без вентилятора',
      pros: 'Больше экран для Xcode и конспектов, лучшие динамики', cons: 'Дороже, тяжелее; процессор тот же что в 13"',
      pick: false, verdict: 'Если нужен большой экран без Pro'
    },
    {
      id: 'pro14', group: 'pro', name: 'MacBook Pro 14" M5', chip: 'Apple M5', price: '$1 999', priceNote: 'был $1 699; ориентир',
      screen: '14,2" mini-LED, 120 Гц, до 1000 нит (SDR)', ram: '16–32 ГБ (проверить)', ssd: '512 ГБ – 4 ТБ', battery: '~24 ч', weight: '~1,55 кг',
      ports: '3× Thunderbolt, HDMI, SD, MagSafe', ext: 'до 2 внешних (проверить)', fan: 'Есть активное охлаждение',
      pros: 'Экран 120 Гц, порты, вентилятор', cons: 'Чип такой же, как в Air: переплата за экран и охлаждение',
      pick: false, verdict: 'Если важны экран и долгие сборки'
    },
    {
      id: 'pro14pro', group: 'pro', name: 'MacBook Pro 14" M5 Pro', chip: 'M5 Pro, 18 ядер CPU', price: '$2 499', priceNote: 'ориентир; источники от $2 199',
      screen: '14,2" mini-LED, 120 Гц', ram: '24–64 ГБ', ssd: '1 ТБ – 8 ТБ', battery: '~24 ч', weight: '~1,6 кг',
      ports: '3× Thunderbolt 5, HDMI, SD, MagSafe', ext: 'до 3+ внешних (проверить)', fan: 'Есть активное охлаждение',
      pros: 'Мощь для ML, видео, больших проектов; хватит на 3 монитора', cons: 'Цена; для Xcode на студенческих проектах избыточно',
      pick: false, verdict: 'Только при тяжёлых задачах'
    },
    {
      id: 'pro16', group: 'pro', name: 'MacBook Pro 16" M5 Pro / Max', chip: 'M5 Pro или M5 Max', price: 'от $2 999', priceNote: 'Max — от ~$3 900; ориентир',
      screen: '16,2" mini-LED, 120 Гц', ram: '24–128 ГБ', ssd: '1 – 8 ТБ', battery: '~24 ч (M5 Pro)', weight: '~2,1 кг',
      ports: '3× Thunderbolt 5, HDMI, SD, MagSafe', ext: 'до 4 внешних на Max (проверить)', fan: 'Есть активное охлаждение',
      pros: 'Максимум мощности и экрана', cons: 'Дорого и тяжело — противоречит «удобно в поездках»',
      pick: false, verdict: 'Не моя задача'
    }
  ];

  var ROWS = [
    ['Чип', 'chip'], ['Цена (USD, ориентир)', 'price'], ['Экран', 'screen'], ['Память (ОЗУ)', 'ram'],
    ['Накопитель', 'ssd'], ['Батарея (видео)', 'battery'], ['Вес', 'weight'], ['Порты', 'ports'],
    ['Внешние дисплеи', 'ext'], ['Охлаждение', 'fan'], ['Плюс', 'pros'], ['Минус', 'cons'], ['Итог для меня', 'verdict']
  ];

  var REASONS = [
    {
      title: 'Нужен для разработки под iOS', strength: 5, tag: 'Жёсткая причина', cls: 'v-hard',
      text: 'Xcode, iOS Simulator, подпись приложений и отправка в App Store работают только на macOS. Легальной полноценной замены нет: Hackintosh нарушает лицензию и ломается, VM на Windows ограничена.',
      caveat: 'Но это аргумент за Mac, а не за новый дорогой MacBook. Если iOS — подработка раз в месяц, дешевле облачный Mac (GitHub Actions macOS, Codemagic, MacStadium).',
      fix: 'Усиление: сформулировать «сколько часов в неделю я буду в Xcode». Если больше ~5 — Mac окупается.'
    },
    {
      title: 'Удобно для университета', strength: 2, tag: 'Мягкая причина', cls: 'v-soft',
      text: 'Лёгкий, ~18 ч работы, быстро просыпается, хорошая клавиатура и трекпад, студенческая скидка Apple. Но у меня уже есть Kali-ноутбук и Yoga Tab Plus с пером и клавиатурой — то есть и конспекты, и код покрыты.',
      caveat: 'Если универ — единственная причина, покупка не оправдана. Планшет с пером делает конспекты удобнее MacBook.',
      fix: 'Усиление: выписать, что именно сейчас неудобно на Kali-ноутбуке (вес? батарея? поддержка?). Если ответ «ничего» — это не причина.'
    },
    {
      title: 'Работа в поездках', strength: 3, tag: 'Умеренная причина', cls: 'v-soft',
      text: 'Air 13" весит ~1,24 кг и держит ~18 ч, что для ноутбука большая редкость. Без вентилятора — тишина в любой аудитории, дороге и коворкинге.',
      caveat: 'Зависит от того, чем ты занимаешься в дороге. Тяжёлое (игры, большие сборки) всё равно живёт на ПК с RTX 5080 — его можно использовать удалённо.',
      fix: 'Усиление: доступ к ПК с MacBook через Moonlight/Sunshine или Parsec + Tailscale. Мощность дома, лёгкость в дороге.'
    },
    {
      title: 'Удобно с моей остальной техникой', strength: 1, tag: 'Почти фиктивная', cls: 'v-weak',
      text: 'Интеграция Apple работает только внутри Apple: AirDrop, Handoff, iPhone Mirroring, Continuity Camera, iCloud, Сообщения. Из моих устройств Apple только iPhone 17. Windows-ПК и Android-планшет с Mac почти не связаны, Sidecar работает только с iPad.',
      caveat: 'Ошибка рассуждения: список техники я привожу как плюс, хотя 3 из 4 устройств — не Apple. Это скорее нейтрально, чем «за».',
      fix: 'Честная формулировка: «iPhone 17 даёт реальные плюсы, остальное работает без потери — кроссплатформенно через файлы, браузер, KDE Connect и т.п.».'
    }
  ];

  var SETUP = [
    { t: 'iPhone 17', tag: 'Сильная связь', p: 'Запуск приложений на реальном устройстве без возни, AirDrop, Handoff, iPhone Mirroring, пароли и фото в iCloud. Единственное место, где экосистема работает всерьёз.' },
    { t: 'ПК: Ryzen 7 9800X3D + RTX 5080', tag: 'Рабочая связь', p: 'Играть на Mac нельзя — это ПК остаётся. Но MacBook может стримить игры и рабочий стол ПК через Moonlight/Sunshine или Parsec, а доступ из любой точки — через Tailscale. Нужен нормальный аплоад дома.' },
    { t: 'Yoga Tab Plus + перо + клавиатура', tag: 'Слабая связь', p: 'Нативных интеграций нет. Но конспекты и рисование остаются на планшете — это сильная связка без Mac. Как второй экран к Mac — только через сторонние приложения.' },
    { t: 'Ноутбук на Kali Linux', tag: 'Дополняет', p: 'На Apple Silicon Kali запускается в виртуальной машине (UTM/Parallels, ARM64-образ). Для полноценного пентеста Wi-Fi (монитор-режим, инъекции) лучше оставить отдельное железо с USB-адаптером. Его продавать не надо.' },
    { t: 'Мышь, клавиатура, микрофон, звуковой микшер, 3 монитора', tag: 'Нюанс', p: 'Мышь/клавиатура и USB-аудио (class-compliant) работают сразу. Три монитора: базовые чипы обычно тянут меньше — проверь Tech Specs. Реалистичнее: один монитор к Mac + KVM-переключатель на общий набор периферии.' },
    { t: 'Где будет жить Mac', tag: 'Идея', p: 'Дома — через док-станцию Thunderbolt к одному монитору и клавиатуре. В поездках — сам по себе. Это и есть случай, где MacBook удобнее Mac mini.' }
  ];

  var RISKS = [
    { t: 'Цены нестабильны', tag: 'Риск', p: 'В 2026 Apple несколько раз поднимала цены из-за подорожания памяти; апгрейд ОЗУ и SSD стал дороже. Конфигурацию лучше брать сразу — потом не добавишь.' },
    { t: 'Нельзя апгрейдить', tag: 'Риск', p: 'ОЗУ и SSD распаяны. 16 ГБ — это потолок на весь срок жизни ноутбука. Для Xcode я бы брал 24 ГБ.' },
    { t: 'Мало портов у Air', tag: 'Минус', p: 'Два порта USB-C/Thunderbolt и MagSafe. Для микрофона, микшера и монитора понадобится док-станция.' },
    { t: 'Не заменяет игровой ПК', tag: 'Ожидание', p: 'RTX 5080 + 9800X3D в разы мощнее любого MacBook в играх и 3D-рендере на CUDA. MacBook — дополнение, не замена.' },
    { t: 'Fanless и долгие нагрузки', tag: 'Минус Air', p: 'Air без вентилятора: при длительных сборках, обучении моделей или рендере будет снижать частоты. Если это про меня — брать Pro 14" M5.' },
    { t: 'Порог входа и дублирование', tag: 'Вопрос', p: 'Уже есть Kali-ноутбук и планшет. Покупка Mac — третий ноутбук. Если нет чёткой задачи под него — деньги можно оставить.' }
  ];

  var ALTS = [
    { t: 'Облачный Mac', tag: 'Дёшево', p: 'GitHub Actions macOS-runner, Codemagic, MacStadium, AWS EC2 Mac. Подходит, если iOS нужен время от времени и важна только сборка/подпись.' },
    { t: 'Mac mini M4', tag: 'Если без поездок', p: 'Заметно дешевле MacBook при той же мощности. Подходит для стола, где уже стоят 3 монитора. Но в поездки с ним не поедешь — ломается причина №3.' },
    { t: 'Б/у MacBook Air M2/M3', tag: 'Компромисс', p: 'Для старта в Xcode хватит. Минус: меньше срок поддержки и не гарантирует нужную ОЗУ — смотри конфигурацию 16+ ГБ.' }
  ];

  // ---------- рендер ----------
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var cards = document.getElementById('cards');
  function renderCards(f) {
    cards.innerHTML = '';
    MODELS.filter(function (m) { return f === 'all' || m.group === f; }).forEach(function (m) {
      cards.appendChild(el(
        '<article class="card' + (m.pick ? ' pick' : '') + '">' +
        (m.pick ? '<span class="badge">Моя рекомендация</span>' : '') +
        '<h3>' + esc(m.name) + '</h3><div class="chip">' + esc(m.chip) + '</div>' +
        '<div class="price">' + esc(m.price) + ' <small>' + esc(m.priceNote) + '</small></div>' +
        '<ul class="specs">' +
        [['Экран', m.screen], ['ОЗУ', m.ram], ['SSD', m.ssd], ['Батарея', m.battery], ['Вес', m.weight], ['Порты', m.ports]]
          .map(function (r) { return '<li><span>' + r[0] + '</span><span>' + esc(r[1]) + '</span></li>'; }).join('') +
        '</ul>' +
        '<div class="pc"><div class="p"><b>Плюс</b>' + esc(m.pros) + '</div><div class="c"><b>Минус</b>' + esc(m.cons) + '</div></div>' +
        '</article>'));
    });
  }
  renderCards('all');
  document.getElementById('filter').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    this.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
    renderCards(b.dataset.f);
  });

  // таблица
  var t = document.getElementById('table');
  var h = '<thead><tr><th></th>' + MODELS.map(function (m, i) { return '<th data-c="' + i + '"' + (m.pick ? ' class="rec"' : '') + '>' + esc(m.name) + '</th>'; }).join('') + '</tr></thead><tbody>';
  ROWS.forEach(function (r) {
    h += '<tr><th>' + r[0] + '</th>' + MODELS.map(function (m, i) { return '<td data-c="' + i + '"' + (m.pick ? ' class="rec"' : '') + '>' + esc(m[r[1]]) + '</td>'; }).join('') + '</tr>';
  });
  t.innerHTML = h + '</tbody>';
  t.addEventListener('mouseover', function (e) {
    var c = e.target.closest('[data-c]'); if (!c) return;
    t.querySelectorAll('.hl').forEach(function (x) { x.classList.remove('hl'); });
    t.querySelectorAll('[data-c="' + c.dataset.c + '"]').forEach(function (x) { x.classList.add('hl'); });
  });
  t.addEventListener('mouseleave', function () { t.querySelectorAll('.hl').forEach(function (x) { x.classList.remove('hl'); }); });

  // причины
  document.getElementById('reasonList').innerHTML = REASONS.map(function (r) {
    var m = ''; for (var i = 1; i <= 5; i++) m += '<i' + (i <= r.strength ? ' class="on"' : '') + '></i>';
    return '<article class="reason"><div><div class="meter" role="img" aria-label="Сила аргумента ' + r.strength + ' из 5">' + m + '</div>' +
      '<div class="verdictline ' + r.cls + '">' + r.tag + ' · ' + r.strength + '/5</div></div>' +
      '<div><h3>' + esc(r.title) + '</h3><p>' + esc(r.text) + '</p><p><b>Проверка:</b> ' + esc(r.caveat) + '</p><p class="fix">' + esc(r.fix) + '</p></div></article>';
  }).join('');

  function boxes(id, arr) {
    document.getElementById(id).innerHTML = arr.map(function (b) {
      return '<div class="box"><span class="tag">' + esc(b.tag) + '</span><h3>' + esc(b.t) + '</h3><p>' + esc(b.p) + '</p></div>';
    }).join('');
  }
  boxes('setupList', SETUP); boxes('riskList', RISKS); boxes('altList', ALTS);

  // ---------- ещё причины ----------
  var MORE = [
    { t: 'Safari/WebKit только на Mac', tag: 'Сильный · для веба', p: 'Единственный способ проверять сайты и веб-приложения в настоящем Safari (в том числе мобильном через Simulator). На Windows и Linux этого нет. Если делаю фронтенд — это реальный аргумент.' },
    { t: 'Одна машина — iOS и Android', tag: 'Сильный · для разработки', p: 'Flutter, React Native, Kotlin Multiplatform: сборка под iOS возможна только на Mac, под Android — на любой ОС. MacBook закрывает оба таргета.' },
    { t: 'Заработок и портфолио', tag: 'Умеренный', p: 'iOS-разработчик может публиковать приложения и брать фриланс-заказы. Но есть скрытая стоимость: Apple Developer Program стоит 99 $/год.' },
    { t: 'Logic Pro и GarageBand', tag: 'Умеренный · если звук', p: 'Раз у меня микрофон и звуковой микшер: Core Audio даёт малую задержку, а USB-аудио class-compliant подключается без драйверов. Но на Windows есть ASIO и Reaper — незаменимым Mac не будет.' },
    { t: 'Производительность не падает от батареи', tag: 'Умеренный', p: 'Apple Silicon на батарее работает почти так же быстро, как от сети. У Windows-ноутбуков разница обычно заметнее. Это реальная польза в поездках.' },
    { t: 'Тишина (Air)', tag: 'Умеренный', p: 'Air без вентилятора: нет шума на парах, в библиотеке и в дороге. Цена — снижение частот при долгой нагрузке.' },
    { t: 'Срок поддержки и перепродажа', tag: 'Умеренный', p: 'Apple обычно поддерживает Mac обновлениями macOS много лет, а на вторичном рынке они держат цену лучше типичных Windows-ноутбуков. Это снижает реальную стоимость владения.' },
    { t: 'Unix-среда как в Kali', tag: 'Умеренный', p: 'zsh, ssh, Homebrew, Docker — привычный набор для человека, который сидит в Linux. Минус: ARM, x86-контейнеры идут через эмуляцию и медленнее.' },
    { t: 'Единая память для локальных моделей', tag: 'Нишевой', p: 'На Mac с 24+ ГБ можно запускать локальные LLM (MLX, llama.cpp). Но RTX 5080 даёт больше токенов в секунду, хотя и ограничена 16 ГБ видеопамяти. Это дополнение, не замена ПК.' },
    { t: 'Безопасность в поездках', tag: 'Небольшой', p: 'Touch ID, Secure Enclave, FileVault, Find My и Activation Lock: потерянный или украденный ноутбук практически бесполезен вору.' },
    { t: 'iPhone как веб-камера', tag: 'Небольшой', p: 'Continuity Camera делает из iPhone 17 хорошую камеру для созвонов без кабеля. Приятная мелочь, а не причина покупать.' },
    { t: '«Просто хочется»', tag: 'Слабый · но честный', p: 'Дисплей, трекпад, динамики, ощущение качества. Это тоже причина, но её нужно называть прямо, а не прятать за техническими доводами.' }
  ];

  // ---------- сделки ----------
  var DEALS = [
    { t: 'Apple Education Store', tag: 'Первый вариант', p: 'Скидка для студентов, преподавателей и сотрудников вузов; иногда добавляют подарок в сезон back-to-school (в США — подарочная карта или наушники). Нужно подтвердить статус (UNiDAYS или документ). Скидка обычно скромная: порядка 5–10%.', v: 'Вердикт: при статусе студента проверяй обязательно.' },
    { t: 'Apple Certified Refurbished', tag: 'Лучший баланс', p: 'Официально восстановленные устройства: новая батарея и корпус, гарантия 1 год, можно купить AppleCare. Скидка порядка 15%. Минус: ограниченный выбор конфигураций — ОЗУ не подгонишь, как при заказе с нуля.', v: 'Вердикт: сильный вариант для Air или Pro, если подойдёт готовая конфигурация.' },
    { t: 'Распродажи и ресейлеры', tag: 'Подожди и сэкономь', p: 'Чёрная пятница — в конце ноября, до неё около трёх недель. Ресейлеры часто снижают цену на 5–15% или дают бонусы. Но на фоне подорожания памяти скидки в 2026 нестабильны, и ждать выгодно не всегда.', v: 'Вердикт: если Mac нужен не срочно — жди до конца ноября и сравнивай.' },
    { t: 'Предыдущее поколение (Air M4)', tag: 'Компромисс', p: 'Нераспроданные остатки Air M4 у ресейлеров часто дешевле на 15–25%. Для Xcode и университета разница с M5 обычно небольшая. Проверь, что ОЗУ 16 ГБ или больше.', v: 'Вердикт: имеет смысл, если нужна экономия, а не максимум мощности.' },
    { t: 'Б/у (Air M2/M3/M4, Pro M3/M4)', tag: 'Дёшево, но риск', p: 'Экономия до 30–45%. Проверь: серийный номер на checkcoverage.apple.com, отсутствие Activation Lock и MDM, число циклов батареи, чек, физическую встречу. Конфигурация — минимум 16 ГБ ОЗУ.', v: 'Вердикт: подходит, но только с проверкой; гарантии почти нет.' },
    { t: 'Trade-in', tag: 'Если есть что сдать', p: 'Apple и операторы принимают старую технику в зачёт. Мой Kali-ноутбук продавать не стоит: он нужен для пентеста Wi-Fi. Планшет Yoga Tab Plus Apple не принимает — только через сторонние площадки.', v: 'Вердикт: пригодится лишь если есть лишнее устройство.' },
    { t: 'Рассрочка и кредитка', tag: 'Осторожно', p: 'Рассрочка 0% (если есть в стране) и кэшбэк по карте могут быть выгодны. Но проценты, комиссия и штрафы часто съедают всю экономию.', v: 'Вердикт: только беспроцентная и только если плачу вовремя.' },
    { t: 'Как инструмент для заработка', tag: 'Зависит от страны', p: 'Если я зарабатываю на разработке (фриланс, ИП, компания), покупку можно оформить как расход или основное средство. Условия и вычеты зависят от страны — уточни у бухгалтера.', v: 'Вердикт: проверить, прежде чем покупать на частное лицо.' }
  ];

  var STEPS = [
    'Сформулировать главную задачу: какой проект в Xcode я начну в первый месяц. Нет ответа — не покупать.',
    'Выбрать конфигурацию: Air 13" M5, 24 ГБ ОЗУ, 512 ГБ–1 ТБ. Меньше 16 ГБ не брать.',
    'Сравнить цены: Education Store, Refurbished, ресейлеры и Air M4 из остатков.',
    'Если срочности нет — подождать до конца ноября и сравнить предложения.',
    'Посчитать полную стоимость в калькуляторе: с аксессуарами, AppleCare и Developer Program.',
    'Купить с возвратом: у Apple 14 дней, у магазинов — по закону; оставить чек и проверить Mac за неделю в реальной работе (Xcode, Simulator, док-станция).'
  ];

  document.getElementById('moreReasons').innerHTML = MORE.map(function (b) {
    return '<div class="box"><span class="tag">' + esc(b.tag) + '</span><h3>' + esc(b.t) + '</h3><p>' + esc(b.p) + '</p></div>';
  }).join('');
  document.getElementById('dealList').innerHTML = DEALS.map(function (b) {
    return '<div class="box"><span class="tag">' + esc(b.tag) + '</span><h3>' + esc(b.t) + '</h3><p>' + esc(b.p) + '</p><p class="vd">' + esc(b.v) + '</p></div>';
  }).join('');
  document.getElementById('steps').innerHTML = STEPS.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');

  // ---------- калькулятор ----------
  var PRICES = { neo: 599, air13: 1299, air15: 1499, pro14: 1999, pro14pro: 2499, pro16: 2999 };
  var cModel = document.getElementById('cModel');
  cModel.innerHTML = MODELS.map(function (m) { return '<option value="' + m.id + '"' + (m.pick ? ' selected' : '') + '>' + esc(m.name) + ' (' + PRICES[m.id] + ' $)</option>'; }).join('');
  function num(id) { var v = parseFloat(document.getElementById(id).value); return isFinite(v) && v >= 0 ? v : 0; }
  function money(n) { return Math.round(n).toLocaleString('ru-RU').replace(/ /g, ' ') + ' $'; }
  function calc() {
    var base = PRICES[cModel.value];
    var customRaw = document.getElementById('cCustom').value;
    var pct = customRaw !== '' ? Math.min(num('cCustom'), 80) : parseFloat(document.getElementById('cDeal').value);
    var disc = base * pct / 100;
    var up = num('cUp'), care = num('cCare'), acc = num('cAcc');
    var dev = parseInt(document.getElementById('cDev').value, 10) * 99;
    var years = Math.max(1, Math.min(10, Math.round(num('cYears')) || 1));
    var resale = Math.min(num('cResale'), 90);
    var machine = base - disc + up;
    var total = machine + care + acc + dev;
    var back = machine * resale / 100;
    var net = total - back;
    document.getElementById('calcOut').innerHTML =
      '<div class="sub">Итого сейчас</div><div class="big">' + money(total) + '</div>' +
      '<table><tbody>' +
      '<tr><td>Модель</td><td>' + money(base) + '</td></tr>' +
      '<tr><td>Скидка (' + pct + '%)</td><td>−' + money(disc) + '</td></tr>' +
      '<tr><td>Апгрейд ОЗУ/SSD</td><td>' + money(up) + '</td></tr>' +
      '<tr><td>AppleCare</td><td>' + money(care) + '</td></tr>' +
      '<tr><td>Аксессуары</td><td>' + money(acc) + '</td></tr>' +
      '<tr><td>Developer Program</td><td>' + money(dev) + '</td></tr>' +
      '<tr class="total"><td>Всего</td><td>' + money(total) + '</td></tr>' +
      '<tr><td>Возврат при продаже (' + resale + '%)</td><td>−' + money(back) + '</td></tr>' +
      '<tr class="total"><td>Реальная стоимость за ' + years + ' г.</td><td>' + money(net) + '</td></tr>' +
      '<tr><td>В месяц</td><td>' + money(net / (years * 12)) + '</td></tr>' +
      '</tbody></table>';
  }
  document.getElementById('calcForm').addEventListener('input', calc);
  document.getElementById('calcForm').addEventListener('change', calc);
  calc();

  // тема
  var root = document.documentElement;
  try { var s = localStorage.getItem('theme'); if (s) root.dataset.theme = s; } catch (e) {}
  document.getElementById('theme').addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });
})();
