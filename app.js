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

  // тема
  var root = document.documentElement;
  try { var s = localStorage.getItem('theme'); if (s) root.dataset.theme = s; } catch (e) {}
  document.getElementById('theme').addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });
})();
