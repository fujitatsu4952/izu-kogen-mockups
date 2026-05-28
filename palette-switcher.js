// 浮 -uki- カラーパレット切り替え
// 5パレット候補をモックアップ上で切り替えるためのスイッチャー
// 各モックアップHTMLから `<script src="palette-switcher.js" defer></script>` で読み込む

(function () {
  const PALETTES = [
    {
      id: 'C',
      name: '墨と和紙',
      subtitle: 'モノクロマティック・既存延長',
      vars: {
        '--bg': '#FAFAF7',
        '--text': '#333333',
        '--muted': '#666666',
        '--soft': '#AEACAC',
        '--accent': '#8C8578',
        '--dark': '#1F1E1B',
        '--photo-light': '#d8d3cb',
        '--photo-mid': '#8a857c',
        '--photo-dark': '#3a3631'
      },
      proportions: [
        { color: '#FAFAF7', name: '和紙温白', meaning: '漉いたばかりの和紙の地', percent: 65 },
        { color: '#1F1E1B', name: '墨', meaning: '一筆だけの墨痕', percent: 15 },
        { color: '#333333', name: '鉄黒', meaning: '本文の主軸', percent: 10 },
        { color: '#666666', name: '鼠色', meaning: '註釈・キャプション', percent: 5 },
        { color: '#8C8578', name: 'トープ', meaning: '控えめ装飾', percent: 5 }
      ]
    },
    {
      id: 'A',
      name: '森の繭',
      subtitle: '緑系・籠る側に振り切る',
      vars: {
        '--bg': '#1A1F1A',
        '--text': '#FAFAF7',
        '--muted': '#ABA999',
        '--soft': '#6E6657',
        '--accent': '#8C8578',
        '--dark': '#0E1110',
        '--photo-light': '#ABA999',
        '--photo-mid': '#5A6157',
        '--photo-dark': '#2D332D'
      },
      proportions: [
        { color: '#1A1F1A', name: '影の中の木々', meaning: '木材の経年変化', percent: 40 },
        { color: '#3D4A3B', name: '森の緑', meaning: '自然の持つ緑', percent: 25 },
        { color: '#8C8578', name: '木や葉に映る光', meaning: 'あたたかみのある雰囲気', percent: 20 },
        { color: '#6E6657', name: '古材の艶', meaning: '築57年の柱の温度', percent: 10 },
        { color: '#FAFAF7', name: '和紙', meaning: 'やさしく広がる光', percent: 5 }
      ]
    },
    {
      id: 'B',
      name: '朝霧',
      subtitle: '伊豆らしさ・海と山の中間',
      vars: {
        '--bg': '#FAFAF7',
        '--text': '#2D2A26',
        '--muted': '#6B7280',
        '--soft': '#D4CFC4',
        '--accent': '#C9B89A',
        '--dark': '#2D2A26',
        '--photo-light': '#D4CFC4',
        '--photo-mid': '#6B7280',
        '--photo-dark': '#2D2A26'
      },
      proportions: [
        { color: '#FAFAF7', name: '温白', meaning: '霧が抜けきらない朝の部屋', percent: 40 },
        { color: '#2D2A26', name: '雨上がりの杉皮', meaning: '軒下に残る湿った濃さ', percent: 25 },
        { color: '#6B7280', name: '海霧の青鼠', meaning: '伊豆の海から立ち上る朝霧', percent: 15 },
        { color: '#D4CFC4', name: '障子越しの光', meaning: '柔らかい拡散光', percent: 15 },
        { color: '#C9B89A', name: '朝光の小麦', meaning: '雲が切れて差す一瞬の暖色', percent: 5 }
      ]
    },
    {
      id: 'D',
      name: '露天の湯けむり',
      subtitle: '温泉感・木の温度',
      vars: {
        '--bg': '#F2EFE7',
        '--text': '#2A2825',
        '--muted': '#5A5854',
        '--soft': '#B6A584',
        '--accent': '#6F7C82',
        '--dark': '#2A2825',
        '--photo-light': '#C5BFB3',
        '--photo-mid': '#5A5854',
        '--photo-dark': '#2A2825'
      },
      proportions: [
        { color: '#F2EFE7', name: '朝湯の白', meaning: '湯気で煙った浴室の温白', percent: 45 },
        { color: '#2A2825', name: '湯けむり灰', meaning: '早朝の浴室の暗さ', percent: 25 },
        { color: '#5A5854', name: '御影石', meaning: '露天風呂の石の質感', percent: 15 },
        { color: '#B6A584', name: '湯桶のヒノキ', meaning: '経年の木の温度', percent: 10 },
        { color: '#6F7C82', name: '朝もやの青', meaning: '浴室の窓の外、薄明の空', percent: 5 }
      ]
    },
    {
      id: 'E',
      name: '暁の経年',
      subtitle: '時間軸・夜明け前後',
      vars: {
        '--bg': '#1C1B19',
        '--text': '#E8E4D9',
        '--muted': '#A39B89',
        '--soft': '#4A4845',
        '--accent': '#D9B98E',
        '--dark': '#0E0D0C',
        '--photo-light': '#E8E4D9',
        '--photo-mid': '#7A6E5C',
        '--photo-dark': '#1C1B19'
      },
      proportions: [
        { color: '#1C1B19', name: '夜明け前', meaning: 'まだ朝が来ていない瞬間', percent: 35 },
        { color: '#E8E4D9', name: '経年の紙', meaning: '古い書物の表紙の温度', percent: 25 },
        { color: '#4A4845', name: '山の影', meaning: '夜明け直前の山の輪郭', percent: 20 },
        { color: '#7A6E5C', name: '古材の艶', meaning: '築57年の柱の艶', percent: 15 },
        { color: '#D9B98E', name: '朝光の暖色', meaning: '山際から差す一筋の光', percent: 5 }
      ]
    }
  ];

  const STORAGE_KEY = 'uki-palette';
  const DEFAULT_ID = 'C';

  function applyPalette(palette) {
    const root = document.documentElement;
    Object.entries(palette.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    document.querySelectorAll('.palette-item').forEach((item) => {
      item.classList.toggle('active', item.dataset.id === palette.id);
    });
    updateDetail(palette);
    try {
      localStorage.setItem(STORAGE_KEY, palette.id);
    } catch (e) {}
  }

  function updateDetail(palette) {
    const detail = document.querySelector('.palette-detail');
    if (!detail) return;
    const rows = palette.proportions
      .map(
        (p) => `
          <tr>
            <td><span class="palette-detail-swatch" style="background:${p.color}"></span></td>
            <td class="palette-detail-name">${p.name}</td>
            <td class="palette-detail-meaning">${p.meaning}</td>
            <td class="palette-detail-percent">${p.percent}</td>
          </tr>
        `
      )
      .join('');
    detail.innerHTML = `
      <div class="palette-detail-title">${palette.id}. ${palette.name}</div>
      <div class="palette-detail-sub">${palette.subtitle}</div>
      <table class="palette-detail-table">
        <thead><tr><th></th><th>名称</th><th>意味</th><th>%</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function buildUI() {
    const switcher = document.createElement('div');
    switcher.className = 'palette-switcher';
    switcher.id = 'paletteSwitcher';
    const items = PALETTES.map(
      (p) => `
        <li class="palette-item" data-id="${p.id}">
          <div class="palette-swatches">
            ${p.proportions
              .map(
                (prop) =>
                  `<span style="background:${prop.color};flex:${prop.percent}" title="${prop.name}"></span>`
              )
              .join('')}
          </div>
          <div class="palette-meta">
            <div class="palette-name">${p.id}. ${p.name}</div>
            <div class="palette-sub">${p.subtitle}</div>
          </div>
        </li>
      `
    ).join('');
    switcher.innerHTML = `
      <div class="palette-switcher-header">
        <span class="palette-switcher-title">Palette · 浮 -uki-</span>
        <button class="palette-switcher-toggle" type="button" aria-label="toggle">−</button>
      </div>
      <div class="palette-switcher-body">
        <ul class="palette-list">${items}</ul>
        <div class="palette-detail"></div>
      </div>
    `;
    document.body.appendChild(switcher);

    switcher
      .querySelector('.palette-switcher-toggle')
      .addEventListener('click', () => {
        switcher.classList.toggle('collapsed');
        const btn = switcher.querySelector('.palette-switcher-toggle');
        btn.textContent = switcher.classList.contains('collapsed') ? '+' : '−';
      });
    switcher.querySelectorAll('.palette-item').forEach((item) => {
      item.addEventListener('click', () => {
        const palette = PALETTES.find((p) => p.id === item.dataset.id);
        if (palette) applyPalette(palette);
      });
    });
  }

  function init() {
    buildUI();
    let savedId = DEFAULT_ID;
    try {
      savedId = localStorage.getItem(STORAGE_KEY) || DEFAULT_ID;
    } catch (e) {}
    const palette =
      PALETTES.find((p) => p.id === savedId) ||
      PALETTES.find((p) => p.id === DEFAULT_ID);
    applyPalette(palette);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
