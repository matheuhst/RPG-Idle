const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
  playerStats: $('#player-stats'),
  activeBuffsPanel: $('#active-buffs-panel'),
  monsterStats: $('#monster-stats'),
  battleLog: $('#battle-log'),
  attackButton: $('#attack-button'),
  autoButton: $('#auto-button'),
  nextButton: $('#next-button'),
  bossButton: $('#boss-button'),
  continueButton: $('#continue-button'),
  prestigeButton: $('#prestige-button'),
  prestigeTitle: $('#prestige-title'),
  prestigePoints: $('#prestige-points'),
  prestigeModal: $('#prestige-modal'),
  prestigeMainView: $('#prestige-main-view'),
  prestigeConfirmationView: $('#prestige-confirmation-view'),
  closePrestigeModalButton: $('#close-prestige-modal-button'),
  prestigeReviewButton: $('#prestige-review-button'),
  cancelPrestigeConfirmationButton: $('#cancel-prestige-confirmation-button'),
  confirmPrestigeButton: $('#confirm-prestige-button'),
  prestigeSummary: $('#prestige-summary'),
  prestigeModalBalance: $('#prestige-modal-balance'),
  prestigeRelicBalance: $('#prestige-relic-balance'),
  prestigeConfirmationSummary: $('#prestige-confirmation-summary'),
  prestigeCountdownText: $('#prestige-countdown-text'),
  prestigeCountdownBar: $('#prestige-countdown-bar'),
  relicList: $('#relic-list'),
  clearLogButton: $('#clear-log-button'),
  coinDisplay: $('#coin-display'),
  shopCard: document.querySelector('.shop-card'),
  shopTitle: $('#shop-title'),
  shopStatus: $('#shop-status'),
  shopMessage: $('#shop-message'),
  shopMerchantVisual: $('#shop-merchant-visual'),
  shopItemsContainer: $('#shop-items'),
  shopStayControls: $('#shop-stay-controls'),
  shopStayText: $('#shop-stay-text'),
  shopStayProgress: $('#shop-stay-progress'),
  leaveShopButton: $('#leave-shop-button'),
  inventoryCount: $('#inventory-count'),
  inventoryItemsContainer: $('#inventory-items'),
  skillPointsDisplay: $('#skill-points'),
  skillButtons: $$('.skill-button'),
  tabButtons: $$('.tab-button'),
  heroLevel: $('#hero-level'),
  stageDisplay: $('#stage-display'),
  biomeDisplay: $('#biome-display'),
  playerHpBar: $('#player-hp-bar'),
  playerXpBar: $('#player-xp-bar'),
  monsterName: $('#monster-name'),
  monsterLevel: $('#monster-level'),
  monsterTypeBadge: $('#monster-type-badge'),
  monsterPortrait: $('#monster-portrait'),
  monsterHpBar: $('#monster-hp-bar'),
  turnDisplay: $('#turn-display'),
  autoStatus: $('#auto-status'),
  offlineMessage: $('#offline-message'),
  playerHpText: $('#player-hp-text'),
  playerXpText: $('#player-xp-text'),
  monsterHpText: $('#monster-hp-text'),
  playerPower: $('#player-power'),
  equipmentSummary: $('#equipment-summary'),
  gearModal: $('#gear-modal'),
  gearModalList: $('#gear-modal-list'),
  closeGearModalButton: $('#close-gear-modal-button'),
  offlineModal: $('#offline-modal'),
  closeOfflineModalButton: $('#close-offline-modal-button'),
  offlineSummary: $('#offline-summary'),
  sellUnequippedGearButton: $('#sell-unequipped-gear-button'),
  heroAutomation: $('#hero-automation'),
  skillAmountButtons: $('#skill-amount-buttons'),
  skillList: $('#skill-list'),
  prestigeRushBanner: $('#prestige-rush-banner'),
  prestigeRushTitle: $('#prestige-rush-title'),
  prestigeRushText: $('#prestige-rush-text'),
  prestigeRushProgress: $('#prestige-rush-progress'),
  prestigeRushCount: $('#prestige-rush-count'),
  prestigeRushTarget: $('#prestige-rush-target'),
  prestigeRushGear: $('#prestige-rush-gear'),
  prestigeRushConsumables: $('#prestige-rush-consumables'),
  prestigeRushCrates: $('#prestige-rush-crates'),
};

const saveKey = 'idle-rpg-dungeon-infinita-v2';
// localStorage.removeItem('idle-rpg-dungeon-infinita-v2');

const gameConfig = {
  turnDelay: 150,
  enemyTurnDelay: 200,
  afterTurnDelay: 50,
  autoAttackDelay: 1000,
  importantMessageTime: 5000,

  shopKeepBattles: 2,
  specialShopKeepBattles: 20,
  currentBiomeEnemyChance: 72,

  mandatoryBossEvery: 5,
  prestigeRushStageStep: 18,
  prestigeRushMinBosses: 8,
  prestigeRushMaxBosses: 45,
  prestigeRushReturnRatio: 0.75,
  prestigeRushMinimumGap: 20,
  prestigeRushMilestoneEvery: 5,

  // Bosses usam apenas andar e bioma como referência de força.
  bossHitCap: 0.30,
  specialBossHitCap: 0.38,

  offlineMinSeconds: 60,
  offlineMaxMinutes: 720,
  offlineBattleSeconds: 95,
  offlineGearDropCap: 6,
  offlineRewardRate: 0.45,
  offlineMaxBattles: 70,
  spellDamageMultiplier: 1.85,

  // Regras dinâmicas de combate.
  echoResistancePerStack: 0.08,
  echoResistanceMaxStacks: 5,
  healingRageMaxStacks: 5,

  // Fenda Mítica: chance fixa e baixa. Sem aumento progressivo.
  mythicRiftBaseChance: 2,
  mythicRiftChanceGain: 0,
  mythicRiftGuaranteeBosses: 999,

  // Mítico melhora pouco em nível, mas ganha muito status. O bloqueio real é Fragmento.
  mythicUpgradeCoinCostMultiplier: 0.55,
  mythicUpgradeFragmentBaseCost: 5,
  mythicUpgradeFragmentMaxCost: 50,

  // Boss especial precisa ser respeitado, sem virar parede impossível.
  specialBossHpMultiplier: 1.24,
  specialBossAttackMultiplier: 1.10,
};


const buffVisualCatalog = {
  fury: {
    itemId: 'furyPotion',
    name: 'Fúria',
    icon: '🔥',
    affectedStat: 'attack',
    bonusLabel: '+35% Ataque',
    shortBonus: '+35%',
    color: '#ff9858',
  },
  stone: {
    itemId: 'stonePotion',
    name: 'Resistência',
    icon: '🛡️',
    affectedStat: 'defense',
    bonusLabel: '+25% Defesa',
    shortBonus: '+25%',
    color: '#d7c7a7',
  },
  wind: {
    itemId: 'windPotion',
    name: 'Ímpeto',
    icon: '⚡',
    affectedStat: 'agility',
    bonusLabel: '+25% Agilidade',
    shortBonus: '+25%',
    color: '#72ddff',
  },
  arcane: {
    itemId: 'arcanePotion',
    name: 'Arcana',
    icon: '🔮',
    affectedStat: 'magic',
    bonusLabel: '+30% Magia',
    shortBonus: '+30%',
    color: '#b38cff',
  },
  fortune: {
    itemId: 'fortuneIncense',
    name: 'Fortuna Dourada',
    icon: '🪙',
    affectedStat: 'coins',
    bonusLabel: '+40% moedas • +80% em bosses',
    shortBonus: '+40%',
    color: '#ffd86b',
  },
};

const visualStatMemory = {
  player: {},
  monsterId: '',
  monster: {},
  buffs: {},
};

function getAnimationFrame(callback) {
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    return window.requestAnimationFrame(callback);
  }

  return setTimeout(() => callback(Date.now()), 16);
}

function animateDisplayedNumber(element, fromValue, toValue, options = {}) {
  if (!element) return;

  const from = Number(fromValue);
  const to = Number(toValue);
  const duration = Math.max(180, Number(options.duration) || 760);
  const suffix = options.suffix || '';
  const formatter = typeof options.formatter === 'function'
    ? options.formatter
    : (value) => formatCompactNumber(Math.round(value));

  if (!Number.isFinite(from) || !Number.isFinite(to) || from === to) {
    element.textContent = `${formatter(to)}${suffix}`;
    return;
  }

  const rising = to > from;
  element.classList.remove('stat-value-rising', 'stat-value-falling');
  void element.offsetWidth;
  element.classList.add(rising ? 'stat-value-rising' : 'stat-value-falling');

  const hasNativeAnimationFrame = typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function';
  const startTime = hasNativeAnimationFrame && typeof performance !== 'undefined' && performance.now
    ? performance.now()
    : Date.now();

  const step = (timestamp) => {
    if (!element.isConnected) return;

    const now = Number(timestamp) || Date.now();
    const progress = Math.min(1, Math.max(0, (now - startTime) / duration));
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = from + (to - from) * eased;

    element.textContent = `${formatter(current)}${suffix}`;

    if (progress < 1) {
      getAnimationFrame(step);
      return;
    }

    element.textContent = `${formatter(to)}${suffix}`;
    setTimeout(() => {
      if (!element.isConnected) return;
      element.classList.remove('stat-value-rising', 'stat-value-falling');
    }, 650);
  };

  getAnimationFrame(step);
}

function getBuffMaximumDuration(buffKey) {
  const meta = buffVisualCatalog[buffKey];
  const item = shopCatalog.find((catalogItem) => catalogItem.id === meta?.itemId);
  return Math.max(1, Number(item?.duration) || 5);
}

function getActiveBuffVisuals() {
  const buffs = gameState.player.buffs || {};

  return Object.entries(buffVisualCatalog)
    .map(([key, meta]) => ({
      key,
      ...meta,
      remaining: Math.max(0, Number(buffs[key]) || 0),
      maximum: getBuffMaximumDuration(key),
    }))
    .filter((buff) => buff.remaining > 0);
}

function getBuffVisualForStat(statKey) {
  return getActiveBuffVisuals().find((buff) => buff.affectedStat === statKey) || null;
}

// =====================================================
// FERREIROS E MARCAS DE FORJA
// Uma única marca permanente por arma. Aplicar outra substitui a anterior.
// =====================================================

const forgeMerchantCatalog = {
  consumables: {
    title: 'Loja',
    status: 'Mercador de consumíveis',
    icon: '🧪',
    className: 'merchant-consumables',
  },
  blacksmith: {
    title: 'Ferreiro Itinerante',
    status: 'Aprimora a arma física equipada',
    icon: '⚒️',
    className: 'merchant-blacksmith',
  },
  arcaneSmith: {
    title: 'Ferreiro Alquimista',
    status: 'Aprimora a arma mágica equipada',
    icon: '🔮',
    className: 'merchant-arcane-smith',
  },
};

const physicalForgeTechniquePools = {
  spear: [
    {
      id: 'piercing-tip',
      name: 'Ponta Perfurante',
      icon: '🛡️',
      tone: 'precision',
      description: 'Transforma a lança em uma resposta direta contra armaduras e bosses resistentes.',
      summary: ['−12% Ataque', '+30% Ignorar Defesa'],
      drawback: 'Menos eficiente contra inimigos frágeis.',
      effects: { attackPercent: -12, armorPenPercent: 30 },
      power: 4, versatility: 5, risk: 2,
    },
    {
      id: 'hunter-reach',
      name: 'Alcance do Caçador',
      icon: '🎯',
      tone: 'hunter',
      description: 'A ponta é alongada e balanceada para enfrentar alvos grandes.',
      summary: ['+8% Ataque', '+24% Dano contra Boss'],
      drawback: '−8% de dano contra inimigos comuns.',
      effects: { attackPercent: 8, bossDamagePercent: 24, nonBossDamagePercent: -8 },
      power: 4, versatility: 3, risk: 2,
    },
  ],
  sword: [
    {
      id: 'duelist-guard',
      name: 'Guarda de Duelo',
      icon: '⚔️',
      tone: 'duelist',
      description: 'A espada passa a favorecer precisão, controle e confrontos contra bosses.',
      summary: ['+10% Ataque', '+6% Crítico', '+12% contra Boss'],
      drawback: 'Bônus espalhados, sem explosão imediata.',
      effects: { attackPercent: 10, critChance: 6, bossDamagePercent: 12 },
      power: 4, versatility: 5, risk: 1,
    },
    {
      id: 'perfect-edge',
      name: 'Fio Impecável',
      icon: '✨',
      tone: 'balanced',
      description: 'Uma têmpera limpa e confiável para qualquer situação.',
      summary: ['+14% Ataque', '+4% Crítico'],
      drawback: 'Não possui vantagem especializada.',
      effects: { attackPercent: 14, critChance: 4 },
      power: 3, versatility: 5, risk: 1,
    },
  ],
  axe: [
    {
      id: 'executioner-edge',
      name: 'Gume do Carrasco',
      icon: '🩸',
      tone: 'execution',
      description: 'O machado sacrifica velocidade para encerrar inimigos feridos rapidamente.',
      summary: ['+10% Ataque', '+42% abaixo de 35% HP'],
      drawback: '−12% Agilidade.',
      effects: { attackPercent: 10, agilityPercent: -12, executeDamagePercent: 42, executeThreshold: 0.35 },
      power: 5, versatility: 3, risk: 3,
    },
    {
      id: 'guard-breaker',
      name: 'Quebra-Guarda',
      icon: '💥',
      tone: 'breaker',
      description: 'O peso é redistribuído para atravessar defesa e castigar bosses.',
      summary: ['−5% Ataque', '+22% Ignorar Defesa', '+14% contra Boss'],
      drawback: 'Perde dano bruto fora de alvos resistentes.',
      effects: { attackPercent: -5, armorPenPercent: 22, bossDamagePercent: 14 },
      power: 4, versatility: 4, risk: 2,
    },
  ],
  dagger: [
    {
      id: 'relentless-chain',
      name: 'Sequência Implacável',
      icon: '📈',
      tone: 'combo',
      description: 'Cada acerto consecutivo na mesma criatura acelera a pressão da adaga.',
      summary: ['−10% Ataque', '+6% por acerto', 'Máximo: +30%'],
      drawback: 'A sequência zera quando o golpe é esquivado ou o inimigo muda.',
      effects: { attackPercent: -10, comboDamagePerHit: 6, comboMaxStacks: 5 },
      power: 5, versatility: 3, risk: 3,
    },
    {
      id: 'swift-blade',
      name: 'Lâmina Veloz',
      icon: '⚡',
      tone: 'speed',
      description: 'Uma lâmina menor e mais leve, ideal para críticos e iniciativa.',
      summary: ['−15% Ataque', '+28% Agilidade', '+8% Crítico'],
      drawback: 'Cada golpe individual causa menos dano.',
      effects: { attackPercent: -15, agilityPercent: 28, critChance: 8 },
      power: 4, versatility: 4, risk: 2,
    },
  ],
  hammer: [
    {
      id: 'demolishing-impact',
      name: 'Impacto Demolidor',
      icon: '🔨',
      tone: 'breaker',
      description: 'A cabeça do martelo recebe peso adicional para esmagar proteção.',
      summary: ['+18% Ataque', '+18% Ignorar Defesa'],
      drawback: '−18% Agilidade.',
      effects: { attackPercent: 18, armorPenPercent: 18, agilityPercent: -18 },
      power: 5, versatility: 3, risk: 3,
    },
    {
      id: 'defensive-weight',
      name: 'Peso Defensivo',
      icon: '🧱',
      tone: 'guard',
      description: 'O cabo e a guarda são reforçados para transformar o martelo em apoio defensivo.',
      summary: ['+12% Ataque', '+18% Defesa'],
      drawback: '−20% Agilidade.',
      effects: { attackPercent: 12, defensePercent: 18, agilityPercent: -20 },
      power: 4, versatility: 4, risk: 3,
    },
  ],
  scythe: [
    {
      id: 'harvest',
      name: 'Colheita',
      icon: '🌘',
      tone: 'execution',
      description: 'A foice é afinada para ceifar inimigos já enfraquecidos.',
      summary: ['−8% Ataque', '+50% abaixo de 40% HP'],
      drawback: 'Começa a luta com menos dano.',
      effects: { attackPercent: -8, executeDamagePercent: 50, executeThreshold: 0.40 },
      power: 5, versatility: 3, risk: 3,
    },
    {
      id: 'soul-reaper',
      name: 'Ceifadora de Essência',
      icon: '💚',
      tone: 'vampire',
      description: 'Canais no metal conduzem parte do dano de volta ao herói.',
      summary: ['−12% Ataque', '+12% Roubo de Vida', '+15% Vida Roubada'],
      drawback: 'Menor dano bruto por golpe.',
      effects: { attackPercent: -12, lifeStealChance: 12, lifeStealAmountPercent: 15 },
      power: 4, versatility: 5, risk: 2,
    },
  ],
  default: [
    {
      id: 'tempered-edge',
      name: 'Fio Temperado',
      icon: '⚔️',
      tone: 'balanced',
      description: 'Uma melhoria simples, estável e útil em qualquer combate.',
      summary: ['+15% Ataque', '+3% Crítico'],
      drawback: 'Sem especialização.',
      effects: { attackPercent: 15, critChance: 3 },
      power: 3, versatility: 5, risk: 1,
    },
  ],
};

const arcaneForgeTechniquePools = {
  staff: [
    {
      id: 'focused-conductor',
      name: 'Condutor Concentrado',
      icon: '🔮',
      tone: 'arcane',
      description: 'O fluxo da arma é comprimido para gerar mais poder mágico por ataque.',
      summary: ['+30% Magia'],
      drawback: '−15% Agilidade.',
      effects: { magicPercent: 30, agilityPercent: -15 },
      power: 5, versatility: 4, risk: 3,
    },
    {
      id: 'runic-conductor',
      name: 'Condutor Rúnico',
      icon: 'ᚱ',
      tone: 'rune',
      description: 'Runas auxiliam tanto a arma mágica quanto a magia equipada.',
      summary: ['+18% Magia', '+22% Dano de Magia'],
      drawback: 'Bônus dividido entre dois tipos de ataque.',
      effects: { magicPercent: 18, spellDamagePercent: 22 },
      power: 4, versatility: 5, risk: 1,
    },
  ],
  orb: [
    {
      id: 'resonant-core',
      name: 'Núcleo Ressonante',
      icon: '🟣',
      tone: 'resonance',
      description: 'O núcleo amplifica toda energia mágica enquanto a arma estiver ativa.',
      summary: ['+16% Magia', '+20% Dano Mágico', '+4% Crítico'],
      drawback: 'Não oferece defesa ou velocidade.',
      effects: { magicPercent: 16, magicDamagePercent: 20, critChance: 4 },
      power: 5, versatility: 4, risk: 1,
    },
    {
      id: 'arcane-prism',
      name: 'Prisma Arcano',
      icon: '💠',
      tone: 'precision',
      description: 'O cristal refrata magia através das proteções do alvo.',
      summary: ['−8% Magia', '+28% Ignorar Defesa'],
      drawback: 'Menos poder contra alvos frágeis.',
      effects: { magicPercent: -8, armorPenPercent: 28 },
      power: 4, versatility: 5, risk: 2,
    },
  ],
  book: [
    {
      id: 'chained-formula',
      name: 'Fórmula Encadeada',
      icon: '📖',
      tone: 'rune',
      description: 'As páginas são reescritas para favorecer conjurações longas e destrutivas.',
      summary: ['+12% Magia', '+30% Dano de Magia'],
      drawback: '−10% Agilidade.',
      effects: { magicPercent: 12, spellDamagePercent: 30, agilityPercent: -10 },
      power: 5, versatility: 4, risk: 2,
    },
    {
      id: 'living-index',
      name: 'Índice Vivo',
      icon: '👁️',
      tone: 'arcane',
      description: 'O tomo encontra com maior frequência o momento certo para conjurar.',
      summary: ['+16% Magia', '+12% Chance de Magia'],
      drawback: 'Não aumenta diretamente o dano físico.',
      effects: { magicPercent: 16, magicChance: 12 },
      power: 4, versatility: 5, risk: 1,
    },
  ],
  default: [
    {
      id: 'arcane-tempering',
      name: 'Têmpera Arcana',
      icon: '✨',
      tone: 'arcane',
      description: 'Uma melhoria estável para qualquer arma mágica.',
      summary: ['+22% Magia', '+5% Chance de Magia'],
      drawback: 'Sem especialização.',
      effects: { magicPercent: 22, magicChance: 5 },
      power: 4, versatility: 5, risk: 1,
    },
  ],
};

const forgeBiomeCatalog = {
  catacombs: { physicalName: 'Prata Funerária', arcaneName: 'Selo Funerário', icon: '☠️', bonus: 60 },
  abandonedMines: { physicalName: 'Aço Quebra-Pedra', arcaneName: 'Runa Sísmica', icon: '⛏️', bonus: 60 },
  sunkenTemple: { physicalName: 'Fio Abissal', arcaneName: 'Catalisador das Marés', icon: '🌊', bonus: 62 },
  brokenTower: { physicalName: 'Liga Dissipadora', arcaneName: 'Núcleo Fraturado', icon: '🔷', bonus: 62 },
  mechanicArcane: { physicalName: 'Núcleo Magnético', arcaneName: 'Circuito Rúnico', icon: '⚙️', bonus: 65 },
  ashHell: { physicalName: 'Metal Consagrado', arcaneName: 'Cinza Santificada', icon: '🔥', bonus: 65 },
  infiniteVoid: { physicalName: 'Âncora da Realidade', arcaneName: 'Prisma do Vazio', icon: '🌌', bonus: 68 },
};

function getForgeSmithSlot(type) {
  return type === 'arcaneSmith' ? 'magicWeapon' : 'physicalWeapon';
}

function getForgeWeaponArchetype(item) {
  const name = `${getGearBaseName(item)} ${item?.name || ''}`.toLowerCase();

  if (item?.slot === 'magicWeapon') {
    if (name.includes('cajado') || name.includes('varinha')) return 'staff';
    if (name.includes('orbe') || name.includes('cristal')) return 'orb';
    if (name.includes('livro') || name.includes('tomo') || name.includes('grimório')) return 'book';
    return 'default';
  }

  if (name.includes('lança') || name.includes('tridente')) return 'spear';
  if (name.includes('espada') || name.includes('sabre') || name.includes('katana')) return 'sword';
  if (name.includes('machado')) return 'axe';
  if (name.includes('adaga')) return 'dagger';
  if (name.includes('martelo')) return 'hammer';
  if (name.includes('foice')) return 'scythe';
  return 'default';
}

function getRandomEntry(list) {
  if (!Array.isArray(list) || !list.length) return null;
  return list[randomBetween(0, list.length - 1)];
}

function getForgeOfferCost(weapon, category) {
  const multipliers = { technique: 0.92, biome: 1.08, experiment: 1.18 };
  const base = Math.max(120, getGearUpgradeCost(weapon));
  return Math.max(100, Math.round(base * (multipliers[category] || 1)));
}

function getForgeMinimumRequiredCoins(type) {
  if (!isSpecialShop(type)) return 0;

  const slot = getForgeSmithSlot(type);
  const weapon = gameState.equipment?.[slot];
  if (!weapon) return Number.POSITIVE_INFINITY;

  // A técnica é sempre a opção mais barata da visita.
  // O ferreiro só entra no sorteio quando pelo menos uma escolha puder ser comprada.
  return getForgeOfferCost(weapon, 'technique');
}

function canAffordForgeMerchant(type) {
  const minimumCost = getForgeMinimumRequiredCoins(type);
  return Number.isFinite(minimumCost)
    && (Number(gameState.player?.coins) || 0) >= minimumCost;
}

function hasAffordableForgeOffer(items = gameState.shop?.items) {
  return Array.isArray(items)
    && items.some((offer) => offer?.type === 'forgeOffer'
      && (Number(gameState.player?.coins) || 0) >= (Number(offer.cost) || 0));
}

function closeLoadedUnaffordableForgeShop() {
  if (!gameState.shop?.active || !isSpecialShop(gameState.shop.type)) return;
  if (hasAffordableForgeOffer()) return;

  const required = getForgeMinimumRequiredCoins(gameState.shop.type);
  const requiredText = Number.isFinite(required)
    ? formatMoney(required)
    : 'mais moedas';

  closeShop(`O ferreiro adiou a visita. Ele voltará quando você tiver ao menos ${requiredText} para uma melhoria.`);
}

function buildForgeOffer(template, weapon, shopType, category) {
  const mark = {
    id: `${shopType}:${template.id}`,
    name: template.name,
    icon: template.icon,
    tone: template.tone || (category === 'biome' ? 'biome' : 'forge'),
    category,
    slot: weapon.slot,
    description: template.description,
    summary: [...(template.summary || [])],
    drawback: template.drawback || '',
    effects: structuredCloneSafe(template.effects || {}),
  };

  return {
    id: `forge-offer:${weapon.uid}:${mark.id}:${Date.now()}:${randomBetween(1000, 9999)}`,
    type: 'forgeOffer',
    category,
    cost: getForgeOfferCost(weapon, category),
    power: template.power || 3,
    versatility: template.versatility || 3,
    risk: template.risk || 1,
    mark,
  };
}

function createBiomeForgeTemplate(shopType, biome) {
  const config = forgeBiomeCatalog[biome.id] || forgeBiomeCatalog.catacombs;
  const magical = shopType === 'arcaneSmith';
  const attackName = magical ? 'dano mágico' : 'dano físico';

  return {
    id: `biome-${biome.id}`,
    name: magical ? config.arcaneName : config.physicalName,
    icon: config.icon,
    tone: 'biome',
    description: `Uma especialização extrema criada para ${biome.name}. Fora desse bioma, a arma volta ao desempenho normal.`,
    summary: [`+${config.bonus}% ${attackName} em ${biome.name}`, '+8% Crítico no bioma'],
    drawback: 'Nenhum bônus fora do bioma gravado.',
    effects: {
      biomeDamagePercent: config.bonus,
      biomeCritChance: 8,
      targetBiomeId: biome.id,
      targetBiomeName: biome.name,
    },
    power: 5,
    versatility: 2,
    risk: 2,
  };
}

function createRiskyForgeTemplate(shopType, archetype) {
  if (shopType === 'arcaneSmith') {
    return {
      id: 'unstable-core',
      name: 'Núcleo Instável',
      icon: '💥',
      tone: 'unstable',
      description: 'O catalisador pode repetir parte do ataque mágico, mas ensina o Eco Adaptativo mais rapidamente.',
      summary: ['+20% Magia', '30% de repetir 55% do dano'],
      drawback: 'Bosses recebem +1 carga extra de Eco a cada acerto.',
      effects: { magicPercent: 20, forgeDoubleHitChance: 30, forgeDoubleHitDamagePercent: 55, echoExtraStacks: 1 },
      power: 5,
      versatility: 3,
      risk: 5,
    };
  }

  const names = {
    spear: ['Lança Bifurcada', '🔱'],
    sword: ['Lâmina Dupla', '⚔️'],
    axe: ['Machado de Duplo Gume', '🪓'],
    dagger: ['Adaga Gêmea', '🗡️'],
    hammer: ['Cabeça Ressonante', '🔨'],
    scythe: ['Foice de Duas Luas', '🌙'],
    default: ['Fio Bifurcado', '⚔️'],
  };
  const [name, icon] = names[archetype] || names.default;

  return {
    id: 'double-edge-experiment',
    name,
    icon,
    tone: 'unstable',
    description: 'A arma ganha uma segunda área de impacto e pode repetir parte do golpe.',
    summary: ['+15% Ataque', '30% de repetir 55% do dano'],
    drawback: 'O alvo recebe +12% de defesa efetiva e bosses ganham +1 Eco extra.',
    effects: { attackPercent: 15, forgeDoubleHitChance: 30, forgeDoubleHitDamagePercent: 55, enemyDefenseBoostPercent: 12, echoExtraStacks: 1 },
    power: 5,
    versatility: 3,
    risk: 5,
  };
}

function createForgeOffers(shopType) {
  const slot = getForgeSmithSlot(shopType);
  const weapon = gameState.equipment?.[slot];
  if (!weapon) return [];

  const archetype = getForgeWeaponArchetype(weapon);
  const pools = shopType === 'arcaneSmith' ? arcaneForgeTechniquePools : physicalForgeTechniquePools;
  const techniqueTemplate = getRandomEntry(pools[archetype] || pools.default);
  const biomeTemplate = createBiomeForgeTemplate(shopType, getDungeonBiome(gameState.player.stage));
  const riskyTemplate = createRiskyForgeTemplate(shopType, archetype);

  return [
    buildForgeOffer(techniqueTemplate, weapon, shopType, 'technique'),
    buildForgeOffer(biomeTemplate, weapon, shopType, 'biome'),
    buildForgeOffer(riskyTemplate, weapon, shopType, 'experiment'),
  ];
}

function getActiveForgeWeapon(slot = gameState.player.activeWeaponSlot) {
  if (!slot || gameState.player.activeWeaponSlot !== slot) return null;
  return gameState.equipment?.[slot] || null;
}

function getActiveForgeMark(slot = gameState.player.activeWeaponSlot) {
  return getActiveForgeWeapon(slot)?.forgeMark || null;
}

function getForgeMarkForDamageType(damageType) {
  if (damageType === 'physical') return getActiveForgeMark('physicalWeapon');
  if (damageType === 'magicWeapon' || damageType === 'magic') return getActiveForgeMark('magicWeapon');
  return null;
}

function getActiveForgeEffect(key) {
  return Number(getActiveForgeMark()?.effects?.[key]) || 0;
}

function getForgeEffectForDamageType(damageType, key) {
  return Number(getForgeMarkForDamageType(damageType)?.effects?.[key]) || 0;
}

function getForgeDamageMultiplier(mark, defender, damageType) {
  if (!mark) return 1;
  const effects = mark.effects || {};
  let multiplier = 1;

  if (defender?.isBoss) multiplier += (Number(effects.bossDamagePercent) || 0) / 100;
  if (!defender?.isBoss) multiplier += (Number(effects.nonBossDamagePercent) || 0) / 100;

  if (effects.targetBiomeId && defender?.biomeId === effects.targetBiomeId) {
    multiplier += (Number(effects.biomeDamagePercent) || 0) / 100;
  }

  const threshold = Number(effects.executeThreshold) || 0;
  if (threshold > 0 && defender?.maxHp > 0 && defender.hp / defender.maxHp <= threshold) {
    multiplier += (Number(effects.executeDamagePercent) || 0) / 100;
  }

  const comboStacks = Number(defender?.forgeCombo?.stacks) || 0;
  if (effects.comboDamagePerHit && defender?.forgeCombo?.weaponUid === gameState.equipment?.[gameState.player.activeWeaponSlot]?.uid) {
    multiplier += (comboStacks * Number(effects.comboDamagePerHit)) / 100;
  }

  return Math.max(0.25, multiplier);
}

function advanceForgeCombo(defender, mark) {
  const effects = mark?.effects || {};
  if (!effects.comboDamagePerHit || !defender) return;
  const weapon = gameState.equipment?.[gameState.player.activeWeaponSlot];
  if (!weapon) return;
  const maxStacks = Math.max(1, Number(effects.comboMaxStacks) || 5);
  const previous = defender.forgeCombo?.weaponUid === weapon.uid ? Number(defender.forgeCombo.stacks) || 0 : 0;
  defender.forgeCombo = { weaponUid: weapon.uid, stacks: clamp(previous + 1, 0, maxStacks) };
}

function resetForgeCombo(defender, mark) {
  if (mark?.effects?.comboDamagePerHit && defender) defender.forgeCombo = null;
}

function isForgeBiomeMarkActive(mark, monster = gameState.monster) {
  return Boolean(mark?.effects?.targetBiomeId && monster?.biomeId === mark.effects.targetBiomeId);
}

function getForgeMarkPlainSummary(mark) {
  if (!mark) return '';
  const summary = (mark.summary || []).join(' • ');
  const drawback = mark.drawback ? `\nConsequência: ${mark.drawback}` : '';
  return `${mark.icon || '⚒️'} ${mark.name}\n${summary}${drawback}`;
}

function getForgeMarkHtml(mark) {
  if (!mark) return '';
  const activeBiome = isForgeBiomeMarkActive(mark);
  return `
    <div class="gear-tooltip-section forge-mark-tooltip forge-tone-${escapeAttr(mark.tone || 'forge')}">
      <small>${escapeAttr(mark.icon || '⚒️')} MARCA DE FORJA ${activeBiome ? '• ATIVA' : ''}</small>
      <strong>${escapeAttr(mark.name)}</strong>
      <p>${escapeAttr(mark.description || '')}</p>
      <div class="forge-mark-tooltip-lines">
        ${(mark.summary || []).map((line) => `<span>${escapeAttr(line)}</span>`).join('')}
      </div>
      ${mark.drawback ? `<em>${escapeAttr(mark.drawback)}</em>` : ''}
    </div>
  `;
}

function getForgeCategoryMeta(category) {
  const meta = {
    technique: { label: 'Técnica da arma', icon: '⚔️' },
    biome: { label: 'Têmpera do bioma', icon: '🏰' },
    experiment: { label: 'Experimento arriscado', icon: '⚠️' },
  };
  return meta[category] || meta.technique;
}

function renderForgeMeter(label, value, className = '') {
  return `
    <div class="forge-meter-row ${className}">
      <span>${label}</span>
      <div class="forge-meter-segments">
        ${Array.from({ length: 5 }, (_, index) => `<i class="${index < value ? 'active' : ''}"></i>`).join('')}
      </div>
    </div>
  `;
}

function showForgeEffectActivation(mark, detail = '', targetSide = 'monster', onApply = null) {
  const target = targetSide === 'player'
    ? document.querySelector('.hero-card')
    : document.querySelector('.monster-card');

  if (!target) {
    if (typeof onApply === 'function') onApply();
    return Promise.resolve();
  }

  const runVisual = () => {
    const center = getCombatTargetCenter(target);
    const badge = document.createElement('div');
    badge.className = `forge-effect-activation forge-tone-${mark?.tone || 'forge'}`;
    badge.style.setProperty('--forge-effect-x', `${center.x}px`);
    badge.style.setProperty('--forge-effect-y', `${center.y}px`);
    badge.innerHTML = `
      <span>${escapeAttr(mark?.icon || '⚒️')}</span>
      <strong>${escapeAttr(mark?.name || 'Marca de Forja')}</strong>
      ${detail ? `<small>${escapeAttr(detail)}</small>` : ''}
    `;
    document.body.appendChild(badge);
    pulseCombatCard(target, 'combat-card-forge', 700);
  };

  return queueCardEffect(target, runVisual, 950, 60, {
    apply: onApply,
    applyDelay: typeof onApply === 'function' ? 0 : 620,
  });
}

function showForgeCompletion(weapon, mark, previousMark = null) {
  document.querySelector('.forge-completion-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.className = `forge-completion-overlay forge-tone-${mark.tone || 'forge'}`;
  overlay.innerHTML = `
    <div class="forge-completion-sparks" aria-hidden="true"></div>
    <div class="forge-completion-card">
      <span class="forge-completion-kicker">⚒️ FORJA CONCLUÍDA</span>
      <div class="forge-completion-weapon">${gearImageTag(weapon)}</div>
      <small>${escapeAttr(weapon.name)}</small>
      <strong>${escapeAttr(mark.icon || '⚒️')} ${escapeAttr(mark.name)}</strong>
      <div class="forge-completion-lines">
        ${(mark.summary || []).map((line) => `<span>${escapeAttr(line)}</span>`).join('')}
      </div>
      ${previousMark ? `<em>Substituiu: ${escapeAttr(previousMark.name)}</em>` : '<em>Primeira Marca de Forja desta arma</em>'}
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add('visible'), 20);
  setTimeout(() => overlay.classList.add('leaving'), 2100);
  setTimeout(() => overlay.remove(), 2650);
}

function applyForgeOffer(offerId) {
  hideFloatingTooltip();
  const shopType = gameState.shop.type;
  const offer = gameState.shop.items.find((entry) => entry.id === offerId && entry.type === 'forgeOffer');
  if (!offer) return;

  const slot = getForgeSmithSlot(shopType);
  const weapon = gameState.equipment?.[slot];
  if (!weapon) {
    log(`Equipe uma ${gearSlots[slot]} antes de usar este ferreiro.`, 'shop', true);
    return;
  }

  if (gameState.player.coins < offer.cost) {
    log('Saldo insuficiente para aplicar esta Marca de Forja.', 'shop', true);
    return;
  }

  const previousMark = weapon.forgeMark ? structuredCloneSafe(weapon.forgeMark) : null;
  gameState.player.coins -= offer.cost;
  weapon.forgeMark = structuredCloneSafe(offer.mark);
  weapon.forgeMark.forgedAtStage = gameState.player.stage;
  weapon.forgeMark.forgedAtBiome = getDungeonBiome(gameState.player.stage).id;

  log(
    `${offer.mark.icon || '⚒️'} ${weapon.name} recebeu a Marca de Forja ${offer.mark.name}${previousMark ? `, substituindo ${previousMark.name}` : ''}.`,
    'reward',
    true
  );

  closeShop('A forja foi concluída. O ferreiro recolheu as ferramentas e partiu.');
  showForgeCompletion(weapon, weapon.forgeMark, previousMark);
  updateStats();
}

const rarities = [
  { id: 'common', name: 'Comum', chance: 45, multiplier: 1, className: 'rarity-common' },
  { id: 'uncommon', name: 'Incomum', chance: 27, multiplier: 1.25, className: 'rarity-uncommon' },
  { id: 'rare', name: 'Raro', chance: 17, multiplier: 1.6, className: 'rarity-rare' },
  { id: 'epic', name: 'Épico', chance: 8, multiplier: 2.15, className: 'rarity-epic' },
  { id: 'legendary', name: 'Lendário', chance: 3, multiplier: 3, className: 'rarity-legendary' },
  { id: 'mythic', name: 'Mítico', chance: 0, multiplier: 4.25, className: 'rarity-mythic' },
];

// Coloque as imagens dos inimigos nesta pasta, mantendo estes nomes de arquivo.
// Exemplo: assets/inimigos/slime-acido.png
const enemyImageBasePath = 'assets/inimigos/';
const itemImageBasePath = 'assets/itens/';
const coinImagePath = `${itemImageBasePath}moeda.png`;

const enemyImageByName = {
  // Inimigos antigos / Catacumbas
  'Slime Ácido': 'slimeAcido.png',
  'Goblin Ladrão': 'goblinLadrao.png',
  'Lobo da Névoa': 'loboNevoa.png',
  'Esqueleto Antigo': 'esqueletoAntigo.png',
  'Orc Guerreiro': 'orcGuerreiro.png',
  'Lesma Necrótica': 'lesmaNecrotica.png',

  // Minas Abandonadas
  'Golem de Pedra': 'golemPedra.png',
  'Morcego Ferrugento': 'morcegoFerrugento.png',
  'Mineiro Amaldiçoado': 'mineiroAmaldicoado.png',
  'Aranha das Minas': 'aranhaMinas.png',
  'Rato das Profundezas': 'ratoProfundezas.png',
  'Elemental de Carvão': 'elementalCarvao.png',

  // Templo Submerso
  'Guarda Abissal': 'guardaAbissal.png',
  'Sereia Corrompida': 'sereiaCorrompida.png',
  'Caranguejo Colossal': 'caranguejoColossal.png',
  'Cavaleiro das Marés': 'cavaleiroMares.png', //
  'Anêmona Carnívora': 'anemonaCarnivora.png', //
  'Profeta das Profundezas': 'profetaProfundezas.png', //

  // Torre Arcana
  'Mago Fraturado': 'magoFraturado.png',
  'Sentinela Rúnico': 'sentinelaRunico.png',
  'Livro Vivo': 'livroVivo.png',
  'Cristal Mágico': 'cristalMagico.png',
  'Mago Sombrio': 'magoSombrio.png', //
  'Mão do Feiticeiro': 'maoFeiticeiro.png', //

  // Mecânicos / Arcanos
  'Golem de Engrenagens': 'golemEngrenagens.png',
  'Drone Arcano': 'droneArcano.png',
  'Armadura Vazia': 'armaduraVazia.png',
  'Rato de Cobre': 'ratoCobre.png', //
  'Cão de Aço': 'caoAco.png', //
  'Autômato Duelista': 'automatoDuelista.png', //

  // Inferno de Cinzas
  'Demônio de Cinzas': 'demonioCinzas.png',
  'Dragão Carbonizado': 'dragaoCarbonizado.png',
  'Cavaleiro Queimado': 'cavaleiroQueimado.png',
  'Lobo de Fuligem': 'loboFuligem.png',
  'Anjo Caído das Brasas': 'anjoCaidoBrasas.png', //
  'Golem de Obsidiana': 'golemObsidiana.png', //

  // Vazio Infinito
  'Sombra Sem Nome': 'sombraSemNome.png',
  'Avatar Quebrado': 'avatarQuebrado.png',
  'Herói Corrompido': 'heroiCorrompido.png',
  'Devorador do Fim': 'devoradorFim.png',
  'Colecionador de Memórias': 'colecionadorMemorias.png', //
  'Guardião do Limite': 'guardiaoLimite.png', // FOTO

  // Bosses
  'Rei Goblin': 'reiGoblin.png',
  'Lorde dos Ossos': 'lordeOssos.png',
  'Colosso das Minas': 'colossoMinas.png',
  'Rainha das Aranhas': 'rainhaAranhas.png',
  'Leviatã Menor': 'leviataMenor.png',
  'Sacerdote Abissal': 'sacerdoteAbissal.png',
  'Arquimago Fraturado': 'arquimagoFraturado.png',
  'Biblioteca Viva': 'bibliotecaViva.png',
  'Titã de Engrenagens': 'titaEngrenagens.png', // 
  'Núcleo Rúnico': 'nucleoRunico.png', //
  'Dragão de Cinzas': 'dragaoCinzas.png', //
  'General Infernal': 'generalInfernal.png', //
  'Avatar do Vazio': 'avatarVazio.png', //
  'O Anti-Herói': 'antiHeroi.png', //

  // Bosses especiais
  'Guardião do Pergaminho': 'guardiaoPergaminho.png',
  'Caçador de Relíquias': 'cacadorReliquias.png',
  'Eco do Herói Antigo': 'ecoHeroiAntigo.png',
  'Ferreiro do Fim': 'ferreiroFim.png',
  'Oráculo Despedaçado': 'oraculoDespedacado.png',
  'Comandante das Máquinas': 'comandanteMaquinas.png',
  'Serafim Quebrado': 'serafimQuebrado.png',
  'Devorador de Relíquias': 'devoradorReliquias.png',
  'Duque do Vazio': 'duqueVazio.png',
  'Arauto da Forja Eterna': 'arautoForjaEterna.png',
  'Guardião do Eclipse': 'guardiaoEclipse.png',
  'O Rei Afogado': 'reiAfogado.png',
  'O Vigia da Cripta': 'vigiaCripta.png',
  'Escavador Cego': 'escavadorCego.png',
  'Devorador de Túneis': 'devoradorTuneis.png',

  'Arauto da Maré': 'arautoMare.png',
  'Guardião Coralino': 'guardiaoCoralino.png',

  'Mestre das Runas': 'mestreRunas.png',
  'Sentinela de Mana': 'sentinelaMana.png',

  'Executor Hidráulico': 'executorHidraulico.png',
  'Titã de Vapor': 'titaVapor.png',

  'Tirano Vulcânico': 'tiranoVulcanico.png',
  'O Último Incêndio': 'ultimoIncendio.png',

  'O Fim dos Tempos': 'fimTempos.png',
  'A Última Sombra': 'ultimaSombra.png',
  'O Inominável': 'inominavel.png',
};

function getEnemyBaseName(enemyName) {
  const cleanName = String(enemyName || '')
    .replace(/\s+Nv\.\s*\d+$/i, '')
    .trim();

  return Object.keys(enemyImageByName).find((name) => name === cleanName) || '';
}

function getEnemyImagePath(enemyName) {
  const baseName = getEnemyBaseName(enemyName);
  const fileName = baseName ? enemyImageByName[baseName] : '';

  if (!fileName) return '';

  return `${enemyImageBasePath}${fileName}`;
}

const gearImageBasePath = 'assets/equipamentos/';

const gearImageByBaseName = {
  Espada: 'espada.png',
  Machado: 'machado.png',
  Lança: 'lanca.png',
  Foice: 'foice.png',
  Sabre: 'sabre.png',
  Katana: 'katana.png',
  Tridente: 'tridente.png',
  Martelo: 'martelo.png',
  Adaga: 'adaga.png',

  Cajado: 'cajado.png',
  Varinha: 'varinha.png',
  Orbe: 'orbe.png',
  'Livro Mágico': 'livro.png',
  'Cristal Arcano': 'cristal.png',
  'Tomo Antigo': 'tomo.png',

  Elmo: 'elmo.png',
  Capacete: 'capacete.png',
  Máscara: 'mascara.png',
  'Coroa Quebrada': 'coroa.png',

  Peitoral: 'peitoral.png',
  Cota: 'cota.png',
  Couraça: 'couraca.png',
  'Manto Pesado': 'mantoP.png',

  Grevas: 'grevas.png',
  'Botas Leves': 'botas.png',
  'Botas do Vento': 'botasVento.png',

  Colar: 'colar.png',
  Pingente: 'pingente.png',
  Amuleto: 'amuleto.png',
  Medalhão: 'medalhao.png',

  'Pulseira Rúnica': 'pulseiraRunica.png',
  'Bracelete Antigo': 'braceleteAntigo.png',

  'Anel do Roubo de Vida': 'anelRouboVida.png',
  'Anel da Fúria': 'anelFuria.png',
  'Anel da Precisão': 'anelPrecisao.png',
  'Anel do Eco Arcano': 'anelEcoArcano.png',
  'Anel do Caçador': 'anelCacador.png',

  'Bola de Fogo': 'bolaDeFogo.png',
  'Raio Congelante': 'raioCongelo.png',
  'Descarga Estática': 'raio.png',
  'Veneno corrosivo': 'veneno.png',
  'Tufão': 'tufao.png',

  // Equipamentos míticos — coloque as imagens nesta pasta com estes nomes.
  'Espada Corta-Mundo': 'espadaCortaMundo.png',
  'Machado Quebra-Realidade': 'machadoQuebraRealidade.png',
  'Lança do Último Céu': 'lancaUltimoCeu.png',
  'Foice do Eclipse': 'foiceEclipse.png',
  'Katana da Fenda': 'katanaFenda.png',

  'Cajado da Tempestade Eterna': 'cajadoTempestadeEterna.png',
  'Orbe do Vazio Vivo': 'orbeVazioVivo.png',
  'Tomo do Primeiro Arcano': 'tomoPrimeiroArcano.png',
  'Cristal do Cosmos Partido': 'cristalCosmosPartido.png',
  'Grimório das Mil Vozes': 'grimorioMilVozes.png',

  'Elmo da Imortalidade': 'elmoImortalidade.png',
  'Coroa do Rei Ausente': 'coroaReiAusente.png',
  'Máscara do Sem-Rosto': 'mascaraSemRosto.png',
  'Capacete do Titã Celeste': 'capaceteTitaCeleste.png',
  'Diadema da Aurora Morta': 'diademaAuroraMorta.png',

  'Couraça do Colosso Astral': 'couracaColossoAstral.png',
  'Manto do Último Guardião': 'mantoUltimoGuardiao.png',
  'Peitoral do Dragão Primordial': 'peitoralDragaoPrimordial.png',
  'Armadura da Noite Infinita': 'armaduraNoiteInfinita.png',
  'Cota do Juramento Antigo': 'cotaJuramentoAntigo.png',

  'Botas de Voo': 'botasVoo.png',
  'Grevas do Relâmpago': 'grevasRelampago.png',
  'Passos do Andarilho Eterno': 'passosAndarilhoEterno.png',
  'Botas da Travessia Estelar': 'botasTravessiaEstelar.png',
  'Grevas do Horizonte Partido': 'grevasHorizontePartido.png',

  'Colar da Estrela Morta': 'colarEstrelaMorta.png',
  'Medalhão do Sol Negro': 'medalhaoSolNegro.png',
  'Amuleto do Coração Cósmico': 'amuletoCoracaoCosmico.png',
  'Pingente da Lua Esquecida': 'pingenteLuaEsquecida.png',
  'Gargantilha do Destino Selado': 'gargantilhaDestinoSelado.png',

  'Bracelete do Tempo Partido': 'braceleteTempoPartido.png',
  'Pulseira da Forja Eterna': 'pulseiraForjaEterna.png',
  'Bracelete das Correntes Astrais': 'braceleteCorrentesAstrais.png',
  'Pulseira do Juramento Rúnico': 'pulseiraJuramentoRunico.png',
  'Algema do Rei Demônio': 'algemaReiDemonio.png',

  'Anel do Rei Ausente': 'anelReiAusente.png',
  'Anel do Eclipse Arcano': 'anelEclipseArcano.png',
  'Anel da Segunda Alma': 'anelSegundaAlma.png',
  'Anel do Olho Infinito': 'anelOlhoInfinito.png',
  'Anel da Coroa Quebrada': 'anelCoroaQuebrada.png',

  'Chama Corta-Mundo': 'chamaCortaMundo.png',
  'Raio do Deus Antigo': 'raioDeusAntigo.png',
  'Vórtice do Fim': 'vorticeFim.png',
  'Tempestade de Mil Sóis': 'tempestadeMilSois.png',
  'Julgamento do Vazio': 'julgamentoVazio.png',
};

const shopCatalog = [
  {
    id: 'potion',
    name: 'Poção de Vida',
    description: 'Restaura 25% da vida máxima.',
    image: `${itemImageBasePath}pocaoPequena.png`,
    icon: '🧪',
    cost: 42,
    type: 'heal',
    healPercent: 0.25,
    minHeal: 55,
  },
  {
    id: 'superPotion',
    name: 'Super Poção',
    description: 'Restaura 55% da vida máxima.',
    image: `${itemImageBasePath}pocaoMaior.png`,
    icon: '💗',
    cost: 95,
    type: 'heal',
    healPercent: 0.55,
    minHeal: 140,
  },
  {
    id: 'elixir',
    name: 'Elixir do Herói',
    description: 'Restaura toda a vida. Ideal para emergências.',
    image: `${itemImageBasePath}elixirHeroi.png`,
    icon: '🏺',
    cost: 240,
    type: 'fullHeal',
  },
  {
    id: 'trainingScroll',
    name: 'Pergaminho de Treino',
    shopName: 'Pergaminho',
    description: 'Concede 1 ponto de habilidade.',
    image: `${itemImageBasePath}pergaminhoTreino.png`,
    icon: '📜',
    cost: 180,
    type: 'skillPoint',
  },
  {
    id: 'furyPotion',
    name: 'Poção da Fúria',
    shopName: 'Fúria',
    description: '+35% ataque por 5 lutas.',
    image: `${itemImageBasePath}pocaoFuria.png`,
    icon: '🔥',
    cost: 210,
    type: 'buff',
    buff: 'fury',
    duration: 5,
  },
  {
    id: 'stonePotion',
    name: 'Poção da Resistência',
    shopName: 'Resistência',
    description: '+25% defesa por 5 lutas.',
    image: `${itemImageBasePath}pocaoResistencia.png`,
    icon: '🛡️',
    cost: 190,
    type: 'buff',
    buff: 'stone',
    duration: 5,
  },
  {
    id: 'windPotion',
    name: 'Poção do Ímpeto',
    shopName: 'Ímpeto',
    description: '+25% agilidade por 5 lutas.',
    image: `${itemImageBasePath}pocaoImpeto.png`,
    icon: '⚡',
    cost: 195,
    type: 'buff',
    buff: 'wind',
    duration: 5,
  },
  {
    id: 'arcanePotion',
    name: 'Poção Arcana',
    shopName: 'Magia',
    description: '+30% magia por 5 lutas.',
    image: `${itemImageBasePath}pocaoArcana.png`,
    icon: '🔮',
    cost: 205,
    type: 'buff',
    buff: 'arcane',
    duration: 5,
  },
  {
    id: 'fortuneIncense',
    name: 'Incenso da Fortuna',
    shopName: 'Fortuna',
    description: '+40% moedas por 8 lutas. Contra bosses, o bônus sobe para +80%.',
    image: `${itemImageBasePath}incensoFortuna.png`,
    icon: '🪙',
    cost: 185,
    type: 'buff',
    buff: 'fortune',
    duration: 8,
  },
  {
    id: 'arcaneBomb',
    name: 'Bomba Arcana',
    shopName: 'Bomba',
    description: 'Causa dano imediato ao monstro atual.',
    image: `${itemImageBasePath}bombaArcana.png`,
    icon: '💣',
    cost: 160,
    type: 'damageMonster',
    damagePercent: 0.28,
    powerMultiplier: 1.35,
  },
  {
    id: 'bossScroll',
    name: 'Pergaminho de Boss',
    shopName: 'Boss',
    description: 'Invoca um boss especial.',
    image: `${itemImageBasePath}pergaminhoBoss.png`,
    icon: '📜',
    cost: 420,
    type: 'specialBoss',
  },
  {
    id: 'mythicFragment',
    name: 'Fragmento Mítico',
    shopName: 'Fragmento',
    description: 'Material raro deixado por bosses especiais. Usado para manter e melhorar equipamentos míticos.',
    image: `${itemImageBasePath}fragmentoMitico.png`,
    icon: '💠',
    cost: 0,
    type: 'material',
  },
];

const gearSlots = {
  physicalWeapon: 'Arma Física',
  magicWeapon: 'Arma Mágica',

  helmet: 'Capacete',
  chest: 'Tronco',
  boots: 'Botas',

  necklace: 'Colar',
  bracelet: 'Bracelete',
  ring: 'Anel',

  spell: 'Magia',
};

const gearSlotGroups = {
  weapons: {
    title: 'Armas',
    slots: ['physicalWeapon', 'magicWeapon'],
  },
  armor: {
    title: 'Armaduras',
    slots: ['helmet', 'chest', 'boots'],
  },
  utility: {
    title: 'Utilitários',
    slots: ['necklace', 'bracelet', 'ring', 'spell'],
  },
};

const gearNames = {
  physicalWeapon: [
    'Espada',
    'Machado',
    'Lança',
    'Foice',
    'Sabre',
    'Katana',
    'Tridente',
    'Martelo',
    'Adaga',
  ],

  magicWeapon: [
    'Cajado',
    'Varinha',
    'Orbe',
    'Livro Mágico',
    'Cristal Arcano',
    'Tomo Antigo',
  ],

  helmet: [
    'Elmo',
    'Capacete',
    'Máscara',
    'Coroa Quebrada',
  ],

  chest: [
    'Peitoral',
    'Cota',
    'Couraça',
    'Manto Pesado',
  ],

  boots: [
    'Grevas',
    'Botas Leves',
    'Botas do Vento',
  ],

  necklace: [
    'Colar',
    'Pingente',
    'Amuleto',
    'Medalhão',
  ],

  bracelet: [
    'Pulseira Rúnica',
    'Bracelete Antigo',
  ],

  ring: [
    'Anel do Roubo de Vida',
    'Anel da Fúria',
    'Anel da Precisão',
    'Anel do Eco Arcano',
    'Anel do Caçador',
  ],

  spell: [
    'Bola de Fogo',
    'Raio Congelante',
    'Descarga Estática',
    'Veneno corrosivo',
    'Tufão',
  ],
};

const ringEffectByName = {
  'Anel do Roubo de Vida': {
    description: 'Chance de roubar vida ao causar dano.',
    statsByRarity: {
      common: { lifeStealChance: 4, lifeStealAmountPercent: 8 },
      uncommon: { lifeStealChance: 5, lifeStealAmountPercent: 10 },
      rare: { lifeStealChance: 7, lifeStealAmountPercent: 12 },
      epic: { lifeStealChance: 9, lifeStealAmountPercent: 15 },
      legendary: { lifeStealChance: 12, lifeStealAmountPercent: 18 },
    },
  },

  'Anel da Fúria': {
    description: 'Aumenta o dano quando o herói está com pouca vida.',
    statsByRarity: {
      common: { furyPower: 6 },
      uncommon: { furyPower: 9 },
      rare: { furyPower: 12 },
      epic: { furyPower: 16 },
      legendary: { furyPower: 22 },
    },
  },

  'Anel da Precisão': {
    description: 'Reduz a chance do inimigo esquivar dos seus ataques.',
    statsByRarity: {
      common: { precision: 4 },
      uncommon: { precision: 6 },
      rare: { precision: 9 },
      epic: { precision: 12 },
      legendary: { precision: 16 },
    },
  },

  'Anel do Eco Arcano': {
    description: 'Chance de repetir parte do dano mágico causado.',
    statsByRarity: {
      common: { magicEchoChance: 4, magicEchoDamagePercent: 15 },
      uncommon: { magicEchoChance: 6, magicEchoDamagePercent: 20 },
      rare: { magicEchoChance: 8, magicEchoDamagePercent: 25 },
      epic: { magicEchoChance: 11, magicEchoDamagePercent: 30 },
      legendary: { magicEchoChance: 14, magicEchoDamagePercent: 35 },
    },
  },

  'Anel do Caçador': {
    description: 'Aumenta o dano contra bosses.',
    statsByRarity: {
      common: { bossDamagePercent: 7 },
      uncommon: { bossDamagePercent: 10 },
      rare: { bossDamagePercent: 14 },
      epic: { bossDamagePercent: 19 },
      legendary: { bossDamagePercent: 25 },
    },
  },
};

function getRingBaseName(baseName) {
  return Object.keys(ringEffectByName).find((ringName) =>
    baseName.startsWith(ringName)
  );
}

function getRingStatCap(stat) {
  const caps = {
    lifeStealChance: 20,
    lifeStealAmountPercent: 28,
    furyPower: 40,
    precision: 28,
    magicEchoChance: 22,
    magicEchoDamagePercent: 50,
    bossDamagePercent: 45,
  };

  return caps[stat] || null;
}

function normalizeSpecialGearStats(item) {
  if (!item || !item.stats) return;

  Object.keys(item.stats).forEach((stat) => {
    const cap = getRingStatCap(stat);

    if (cap !== null) {
      item.stats[stat] = clamp(item.stats[stat], 0, cap);
    }
  });
}

const relicCatalog = {
  forge: {
    name: 'Relíquia da Forja',
    description: '+3% de dano geral por nível.',
    baseCost: 2,
    costGrowth: 1,
  },
  hunter: {
    name: 'Relíquia do Caçador',
    description: '+1% de chance de drop por nível.',
    baseCost: 2,
    costGrowth: 1,
  },
  merchant: {
    name: 'Relíquia do Mercador',
    description: `+4% de ganhos de ${coinIconHtml()} por nível.`,
    baseCost: 2,
    costGrowth: 1,
  },
  vitality: {
    name: 'Relíquia da Vitalidade',
    description: '+12 de vida máxima inicial por nível.',
    baseCost: 2,
    costGrowth: 1,
  },
  bossHunter: {
    name: 'Relíquia do Exterminador',
    description: '+5% de dano contra bosses por nível.',
    baseCost: 3,
    costGrowth: 2,
  },
  scholar: {
    name: 'Relíquia do Sábio',
    description: '+5% de XP ganho por nível.',
    baseCost: 3,
    costGrowth: 2,
  },
  wanderer: {
    name: 'Relíquia do Andarilho',
    description: '+8% de progresso offline por nível.',
    baseCost: 2,
    costGrowth: 1,
  },
  luck: {
    name: 'Relíquia da Sorte Antiga',
    description: '+0.45% de chance de épico/lendário por nível.',
    baseCost: 3,
    costGrowth: 2,
  },
};

function toRoman(number) {
  const romans = ['', 'I', 'II', 'III', 'IV', 'V'];
  return romans[number] || number;
}

function getPrestigeTitle(count) {
  if (count <= 0) return 'Sem Prestígio';

  const tiers = [
    { max: 5, name: 'Herói Renascido' },
    { max: 10, name: 'Alma Ascendente' },
    { max: 15, name: 'Campeão Eterno' },
    { max: 20, name: 'Guardião do Infinito' },
    { max: 25, name: 'Senhor da Masmorra' },
    { max: 30, name: 'Lenda Imortal' },
  ];

  let previousMax = 0;

  for (const tier of tiers) {
    if (count <= tier.max) {
      return `${tier.name} ${toRoman(count - previousMax)}`;
    }

    previousMax = tier.max;
  }

  return `Avatar do Infinito ${count - 30}`;
}

const initialState = {
  version: 2,
  player: {
    name: 'Herói',
    maxHp: 120,
    hp: 120,
    attack: 18,
    defense: 7,
    agility: 12,
    critChance: 10,
    xp: 0,
    level: 1,
    nextLevelXp: 100,
    coins: 0,
    skillPoints: 0,
    victories: 0,
    bossesDefeated: 0,
    monstersSinceBoss: 0,
    recoveryGrace: {
      battles: 0,
      checkpointStage: 1,
      deaths: 0,
    },
    specialBossesDefeated: 0,
    mythicPity: 0,
    bossesSinceMythicRift: 0,
    stage: 1,
    magic: 14,
    magicChance: 18,
    activeWeaponSlot: 'physicalWeapon',
    buffs: {
      fury: 0,
      stone: 0,
      wind: 0,
      arcane: 0,
      fortune: 0,
    },
  },
  prestige: {
    count: 0,
    points: 0,
    totalPoints: 0,
    xpMultiplier: 1,
    coinMultiplier: 1,
    dropBonus: 0,
    epicLegendaryBonus: 0,
    bossDamageBonus: 0,
    offlineMultiplier: 1,
    highestStage: 1,
    highestBosses: 0,
    relics: {
      forge: 0,
      hunter: 0,
      merchant: 0,
      vitality: 0,
      bossHunter: 0,
      scholar: 0,
      wanderer: 0,
      luck: 0,
    },
  },
  ui: {
    skillSpendAmount: 1,
    autoUse: {
      heal: false,
      fury: false,
      stone: false,
      wind: false,
      arcane: false,
    },
    appliedStats: {
      attack: 0,
      defense: 0,
      agility: 0,
      hp: 0,
      magic: 0,
    },
    skillBalanceVersion: 0,
  },
  monster: null,
  shop: {
    active: false,
    type: 'consumables',
    items: [],
    encountersLeft: 0,
  },
  mythicRift: {
    active: false,
    chance: 0,
    sourceBoss: '',
  },
  inventory: {
    items: [],
    gear: [],
  },
  equipment: {
    physicalWeapon: null,
    magicWeapon: null,

    helmet: null,
    chest: null,
    boots: null,

    necklace: null,
    bracelet: null,
    ring: null,

    spell: null,
  },
  prestigeRush: {
    version: 2,
    active: false,
    recordStage: 1,
    targetStage: 1,
    totalBosses: 0,
    bossesRemaining: 0,
    bossesDefeated: 0,
    startStage: 1,
    starterKitGranted: false,
    gearRewards: 0,
    consumableRewards: 0,
    milestoneCrates: 0,
  },
  autoAttack: false,
  autoInterval: null,
  actionInProgress: false,
  currentTurn: 'player',
  activeInventoryTab: 'items',
  lastSaveAt: Date.now(),
  // Marca o instante exato em que a aba ficou oculta ou a página foi fechada.
  // Diferente de lastSaveAt, este valor não é sobrescrito por salvamentos em segundo plano.
  offlineStartedAt: null,
};

const gameState = structuredCloneSafe(initialState);

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatCompactNumber(value, decimals = 1) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value ?? 0);
  }

  const abs = Math.abs(number);
  const units = [
    { value: 1_000_000_000_000, suffix: 't' },
    { value: 1_000_000_000, suffix: 'b' },
    { value: 1_000_000, suffix: 'm' },
    { value: 1_000, suffix: 'k' },
  ];

  for (const unit of units) {
    if (abs >= unit.value) {
      const compact = number / unit.value;
      const fractionDigits = Math.abs(compact) >= 10 ? 0 : decimals;

      return compact
        .toFixed(fractionDigits)
        .replace('.', ',')
        .replace(/,0$/, '') + unit.suffix;
    }
  }

  return Math.round(number).toLocaleString('pt-BR');
}

function coinIconHtml() {
  return `
    <img
      class="coin-icon"
      src="${escapeAttr(coinImagePath)}"
      alt="Moeda"
      loading="lazy"
      decoding="async"
      onerror="this.hidden=true;"
    />
  `;
}

function formatMoney(value) {
  return `<span class="money-inline">${coinIconHtml()}<span>${formatCompactNumber(value)}</span></span>`;
}

function formatMoneyText(value) {
  return `💰 ${formatCompactNumber(value)}`;
}

function formatSignedMoney(value) {
  return `<span class="money-inline money-positive"><span>+</span>${coinIconHtml()}<span>${formatCompactNumber(value)}</span></span>`;
}

function formatSignedMoneyText(value) {
  return `+💰 ${formatCompactNumber(value)}`;
}

function formatDisplayValue(value) {
  if (typeof value === 'number') {
    return formatCompactNumber(value);
  }

  return String(value ?? '-');
}

const damageAffinityLimits = {
  min: 0.72,
  max: 1.28,
  weakAt: 1.10,
  resistAt: 0.90,
};

function getSafeResistanceMultiplier(monster, primaryType, fallbackType = primaryType) {
  const rawValue =
    monster?.resist?.[primaryType] ??
    monster?.resist?.[fallbackType] ??
    1;

  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue)) return 1;

  return clamp(
    parsedValue,
    damageAffinityLimits.min,
    damageAffinityLimits.max
  );
}

function getDamageAffinityInfo(monster, damageType) {
  const multiplier = getSafeResistanceMultiplier(monster, damageType);
  const physical = getSafeResistanceMultiplier(monster, 'physical');
  const magic = getSafeResistanceMultiplier(monster, 'magic');

  const otherMultiplier = damageType === 'physical' ? magic : physical;
  const percentDiff = Math.round(Math.abs(multiplier - 1) * 100);

  const isBestOption = multiplier >= otherMultiplier + 0.06;

  if (multiplier >= damageAffinityLimits.weakAt) {
    return {
      className: 'weak',
      label: 'Vulnerável',
      detail: `+${percentDiff}% dano`,
      multiplier,
    };
  }

  if (multiplier <= damageAffinityLimits.resistAt) {
    return {
      className: 'resistant',
      label: 'Resiste',
      detail: `-${percentDiff}% dano`,
      multiplier,
    };
  }

  if (isBestOption) {
    return {
      className: 'best',
      label: 'Melhor opção',
      detail: multiplier > 1 ? `+${percentDiff}% dano` : 'mais eficiente',
      multiplier,
    };
  }

  return {
    className: 'neutral',
    label: 'Normal',
    detail: 'dano comum',
    multiplier,
  };
}

function getRecommendedDamageType(monster) {
  const physical = getSafeResistanceMultiplier(monster, 'physical');
  const magic = getSafeResistanceMultiplier(monster, 'magic');

  if (physical >= magic + 0.06) return 'Melhor: Físico';
  if (magic >= physical + 0.06) return 'Melhor: Mágico';

  return 'Ambos funcionam';
}

function affinityItemHtml(icon, title, info) {
  return `
    <div class="monster-affinity-item ${info.className}" title="${escapeAttr(info.detail)}">
      <span class="affinity-icon">${icon}</span>
      <div>
        <strong>${title}</strong>
        <small>${info.label} • ${info.detail}</small>
      </div>
    </div>
  `;
}

function percent(current, total) {
  if (!total || total <= 0) return 0;
  return clamp((current / total) * 100, 0, 100);
}

function uid(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getRarity() {
  const bonus = getTotalEpicLegendaryBonus();

  const adjustedRarities = [
    {
      ...getRarityById('common'),
      chance: Math.max(20, getRarityById('common').chance - bonus * 1.25),
    },
    {
      ...getRarityById('uncommon'),
      chance: Math.max(18, getRarityById('uncommon').chance - bonus * 0.65),
    },
    {
      ...getRarityById('rare'),
      chance: getRarityById('rare').chance,
    },
    {
      ...getRarityById('epic'),
      chance: getRarityById('epic').chance + bonus,
    },
    {
      ...getRarityById('legendary'),
      chance: getRarityById('legendary').chance + bonus * 0.35,
    },
  ];

  const totalChance = adjustedRarities.reduce((sum, rarity) => sum + rarity.chance, 0);
  let roll = Math.random() * totalChance;

  for (const rarity of adjustedRarities) {
    roll -= rarity.chance;
    if (roll <= 0) return rarity;
  }

  return adjustedRarities[0];
}

function getBossRarity() {
  const roll = randomBetween(1, 100);

  if (roll <= 55) return getRarityById('rare');
  if (roll <= 90) return getRarityById('epic');
  return getRarityById('legendary');
}

function getRarityById(id) {
  return rarities.find((rarity) => rarity.id === id) || rarities[0];
}

function getActiveEquipmentItems() {
  const equipment = gameState.equipment;
  const activeWeaponSlot = gameState.player.activeWeaponSlot || 'physicalWeapon';

  return Object.entries(equipment)
    .filter(([slot, item]) => {
      if (!item) return false;

      if (slot === 'physicalWeapon' || slot === 'magicWeapon') {
        return slot === activeWeaponSlot;
      }

      return true;
    })
    .map(([, item]) => item);
}

function getEquipmentBonus(stat) {
  return getActiveEquipmentItems().reduce((total, item) => {
    if (!item || !item.stats) return total;
    return total + (item.stats[stat] || 0);
  }, 0);
}

function getRelicLevel(id) {
  return gameState.prestige?.relics?.[id] || 0;
}

function getSoftCappedXpBonus(percent, cap = 45) {
  const safePercent = Math.max(0, percent || 0);

  return cap * (safePercent / (safePercent + cap));
}

function getTotalXpMultiplier() {
  const prestigeMultiplier = gameState.prestige.xpMultiplier || 1;
  const scholarBonus = getRelicLevel('scholar') * 0.04;

  const rawGearXpPercent = getEquipmentBonus('xpPercent');
  const gearXpBonus = getSoftCappedXpBonus(rawGearXpPercent, 45) / 100;

  return prestigeMultiplier + scholarBonus + gearXpBonus;
}

function getTotalCoinMultiplier() {
  return (gameState.prestige.coinMultiplier || 1) + getRelicLevel('merchant') * 0.04;
}

function getTotalDropBonus() {
  return (gameState.prestige.dropBonus || 0) + getRelicLevel('hunter') * 1;
}

function getTotalEpicLegendaryBonus() {
  return (gameState.prestige.epicLegendaryBonus || 0) + getRelicLevel('luck') * 0.45;
}

function getTotalBossDamageMultiplier() {
  return 1 + (gameState.prestige.bossDamageBonus || 0) + getRelicLevel('bossHunter') * 0.05;
}

function getTotalDamageMultiplier() {
  return 1 + getRelicLevel('forge') * 0.03;
}

function getTotalOfflineMultiplier() {
  return (gameState.prestige.offlineMultiplier || 1) + getRelicLevel('wanderer') * 0.08;
}

function getPrestigeHpBonus() {
  return getRelicLevel('vitality') * 12;
}

function getXpReward(amount) {
  return Math.max(1, Math.floor(amount * getTotalXpMultiplier()));
}

function getFortuneCoinBonus(monster = null) {
  if ((Number(gameState.player?.buffs?.fortune) || 0) <= 0) return 0;
  if (!monster) return 0;
  return monster.isBoss ? 0.80 : 0.40;
}

function getFortuneCoinBonusPercent(monster = null) {
  return Math.round(getFortuneCoinBonus(monster) * 100);
}

function getCoinReward(amount, monster = null) {
  const totalMultiplier = getTotalCoinMultiplier() * (1 + getFortuneCoinBonus(monster));
  return Math.max(0, Math.floor(amount * totalMultiplier));
}

function getDisplayedMonsterCoinReward(monster = gameState.monster) {
  if (!monster) return 0;
  return getCoinReward(monster.coinReward || 0, monster);
}

function renderMonsterCoinReward(monster = gameState.monster) {
  const reward = getDisplayedMonsterCoinReward(monster);
  const fortunePercent = getFortuneCoinBonusPercent(monster);

  if (fortunePercent > 0) {
    return `
      <span class="monster-coin-reward is-fortune">+ ${formatCompactNumber(reward)}</span>
      <small class="monster-coin-reward-bonus">Incenso da Fortuna: +${fortunePercent}% moedas</small>
    `;
  }

  return `<span class="monster-coin-reward">+ ${formatCompactNumber(reward)}</span>`;
}

function getNextLevelXpForLevel(level) {
  const safeLevel = Math.max(1, level);

  if (safeLevel <= 1) return 100;

  return Math.floor(
    85 +
    Math.pow(safeLevel, 1.65) * 38 +
    safeLevel * 24
  );
}

function getLevelUpBonuses(level) {
  const tier = Math.floor(level / 10);
  const skillPointBase = 1 + Math.floor(level / 25);

  return {
    maxHp: 16 + tier * 3,
    attack: 2 + Math.floor(tier / 2),
    defense: 1 + Math.floor(tier / 3),
    agility: level % 4 === 0 ? 1 + Math.floor(tier / 4) : 0,
    skillPoints: level % 5 === 0 ? skillPointBase + 2 : skillPointBase,
  };
}

function getMaxStageForPlayer() {
  const player = gameState.player;
  const prestige = gameState.prestige;

  const levelLimit = player.level * 3;
  const prestigeBonus = (prestige.count || 0) * 15;
  const bossBonus = Math.floor((player.bossesDefeated || 0) / 10) * 5;

  // Depois de um prestígio, o antigo recorde continua liberado.
  // A Marcha dos Bosses serve para retornar até ele, não para lutar contra um teto artificial.
  const returnFloor = (prestige.count || 0) > 0
    ? Math.max(1, Number(prestige.highestStage) || 1)
    : 1;

  return Math.max(1, levelLimit + prestigeBonus + bossBonus, returnFloor);
}

function normalizeProgressionAfterBalance(showLog = false) {
  const player = gameState.player;

  player.nextLevelXp = getNextLevelXpForLevel(player.level);

  const maxStage = getMaxStageForPlayer();

  if (player.stage > maxStage) {
    const oldStage = player.stage;
    player.stage = maxStage;

    if (showLog) {
      log(
        `Balanceamento aplicado: você voltou do Andar ${oldStage} para o limite atual do Andar ${maxStage}.`,
        'system-important',
        true
      );
    }
  }
}

function healOnLevelUp() {
  const maxHp = getPlayerMaxHp();
  const missingHp = maxHp - gameState.player.hp;
  const healAmount = Math.max(
    25,
    Math.round(missingHp * 0.35)
  );

  gameState.player.hp = Math.min(maxHp, gameState.player.hp + healAmount);

  return healAmount;
}

function advanceStage(amount = 1) {
  const player = gameState.player;
  const maxStage = getMaxStageForPlayer();
  const previousStage = player.stage;

  player.stage = Math.min(maxStage, player.stage + amount);

  return player.stage > previousStage;
}

function calculatePrestigeRushTarget(recordStage) {
  const record = Math.max(1, Math.floor(Number(recordStage) || 1));
  if (record <= 2) return 1;

  const ratio = clamp(Number(gameConfig.prestigeRushReturnRatio) || 0.75, 0.55, 0.90);
  const roundTo = record >= 100 ? 10 : 5;
  const rawTarget = Math.floor((record * ratio) / roundTo) * roundTo;
  const minimumGap = Math.min(
    Math.max(5, Math.floor(record * 0.10)),
    Math.max(5, Number(gameConfig.prestigeRushMinimumGap) || 20)
  );
  const maximumTarget = Math.max(1, record - minimumGap);

  return clamp(Math.max(1, rawTarget), 1, maximumTarget);
}

function calculatePrestigeRushBossCount(targetStage, startStage = 1) {
  const distance = Math.max(0, Number(targetStage) - Number(startStage || 1));
  if (distance <= 0) return 0;

  return clamp(
    Math.ceil(distance / (gameConfig.prestigeRushStageStep || 18)),
    gameConfig.prestigeRushMinBosses || 8,
    gameConfig.prestigeRushMaxBosses || 45
  );
}

function addPrestigeRushGear(item) {
  if (!item) return false;

  gameState.inventory.gear.unshift(item);
  const current = gameState.equipment[item.slot];

  if (!current || getGearScore(item) > getGearScore(current)) {
    gameState.equipment[item.slot] = item;
  }

  return true;
}

function getPrestigeRushRewardSlot() {
  const slots = Object.keys(gearSlots);
  const missing = slots.find((slot) => !gameState.equipment?.[slot]);
  if (missing) return missing;

  return slots
    .slice()
    .sort((a, b) => {
      const itemA = gameState.equipment?.[a];
      const itemB = gameState.equipment?.[b];
      const levelA = Number(itemA?.level) || 0;
      const levelB = Number(itemB?.level) || 0;
      if (levelA !== levelB) return levelA - levelB;
      return getGearScore(itemA) - getGearScore(itemB);
    })[0] || 'physicalWeapon';
}

function createPrestigeRushGear(slot, rarityId = 'rare', levelReference = gameState.player.stage) {
  const targetLevel = Math.max(
    6,
    Number(levelReference) || 1,
    Math.round((gameState.player.stage || 1) * 0.92)
  );

  return createGear(targetLevel, true, { slot, rarityId });
}

function grantPrestigeRushStarterKit(targetStage, { silent = false } = {}) {
  const rush = gameState.prestigeRush || {};
  if (rush.starterKitGranted) return { gear: 0, consumables: 0 };

  const kitLevel = Math.max(8, Math.round((Number(targetStage) || 1) * 0.18));
  const importantSlots = new Set(['physicalWeapon', 'magicWeapon', 'chest']);
  let gearCount = 0;

  Object.keys(gearSlots).forEach((slot) => {
    const rarityId = importantSlots.has(slot) ? 'rare' : 'uncommon';
    const item = createPrestigeRushGear(slot, rarityId, kitLevel);
    if (addPrestigeRushGear(item)) gearCount += 1;
  });

  const supplies = {
    potion: 6,
    superPotion: 3,
    elixir: 1,
    furyPotion: 1,
    stonePotion: 1,
    windPotion: 1,
    arcanePotion: 1,
    fortuneIncense: 1,
    arcaneBomb: 2,
  };

  let consumableCount = 0;
  Object.entries(supplies).forEach(([itemId, quantity]) => {
    if (!shopCatalog.some((item) => item.id === itemId)) return;
    addConsumable(itemId, quantity);
    consumableCount += quantity;
  });

  rush.starterKitGranted = true;
  rush.gearRewards = (Number(rush.gearRewards) || 0) + gearCount;
  rush.consumableRewards = (Number(rush.consumableRewards) || 0) + consumableCount;
  normalizePlayerHp();

  if (!silent) {
    showAchievementNotice({
      title: 'Kit de Retorno recebido',
      subtitle: `Preparação para o Andar ${formatCompactNumber(targetStage)}`,
      message: `${gearCount} equipamentos preencheram seus slots e ${consumableCount} consumíveis foram enviados ao inventário.`,
      type: 'rush',
    });

    log(
      `Kit de Retorno: ${gearCount} equipamentos e ${consumableCount} consumíveis recebidos antes da Marcha dos Bosses.`,
      'system-important',
      true
    );
  }

  return { gear: gearCount, consumables: consumableCount };
}

function grantPrestigeRushBossRewards(monster, { silent = false, orderOverride = null } = {}) {
  if (!monster?.prestigeRushBoss) return { gear: 0, consumables: 0, crate: 0 };

  const rush = ensurePrestigeRushState();
  const order = Math.max(1, Number(orderOverride) || Number(rush.bossesDefeated) || 1);
  const milestoneEvery = Math.max(2, Number(gameConfig.prestigeRushMilestoneEvery) || 5);
  const isMilestone = order % milestoneEvery === 0;
  const buffCycle = ['furyPotion', 'stonePotion', 'windPotion', 'arcanePotion', 'fortuneIncense'];
  let consumableCount = 0;
  let gearCount = 0;

  const addSupply = (itemId, quantity) => {
    if (!quantity || !shopCatalog.some((item) => item.id === itemId)) return;
    addConsumable(itemId, quantity);
    consumableCount += quantity;
  };

  addSupply('potion', 2);
  if (order % 2 === 0) addSupply('superPotion', 1);
  if (order % 3 === 0) addSupply(buffCycle[(Math.floor(order / 3) - 1) % buffCycle.length], 1);

  const hasMissingSlot = Object.keys(gearSlots).some((slot) => !gameState.equipment?.[slot]);
  if (hasMissingSlot || order % 3 === 0 || isMilestone) {
    const slot = getPrestigeRushRewardSlot();
    const rarityId = order % 10 === 0 ? 'epic' : isMilestone ? 'rare' : 'uncommon';
    const gear = createPrestigeRushGear(slot, rarityId, Math.max(monster.level || 1, gameState.player.stage));
    if (addPrestigeRushGear(gear)) gearCount += 1;
  }

  if (isMilestone) {
    addSupply('elixir', 1);
    addSupply('fortuneIncense', 1);
    addSupply('superPotion', 1);
    rush.milestoneCrates = (Number(rush.milestoneCrates) || 0) + 1;
  }

  rush.gearRewards = (Number(rush.gearRewards) || 0) + gearCount;
  rush.consumableRewards = (Number(rush.consumableRewards) || 0) + consumableCount;
  normalizePlayerHp();

  if (!silent) {
    const parts = [];
    if (gearCount) parts.push(`${gearCount} equipamento direcionado`);
    if (consumableCount) parts.push(`${consumableCount} consumível(is)`);

    log(
      `Suprimentos da Marcha — Boss ${order}/${rush.totalBosses}: ${parts.join(' e ') || 'recompensa registrada'}.`,
      isMilestone ? 'system-important' : 'reward',
      isMilestone
    );

    if (isMilestone) {
      showAchievementNotice({
        title: 'Baú de Suprimentos',
        subtitle: `Marco ${order}/${rush.totalBosses}`,
        message: `Você recebeu ${gearCount} equipamento e ${consumableCount} consumíveis para continuar a marcha.`,
        type: 'rush',
      });
    }
  }

  return { gear: gearCount, consumables: consumableCount, crate: isMilestone ? 1 : 0 };
}

function grantPrestigeRushCompletionCache({ silent = false } = {}) {
  const rush = gameState.prestigeRush || {};
  const supplies = {
    superPotion: 3,
    elixir: 2,
    furyPotion: 1,
    stonePotion: 1,
    windPotion: 1,
    arcanePotion: 1,
    fortuneIncense: 2,
    arcaneBomb: 2,
  };
  let consumableCount = 0;
  let gearCount = 0;

  Object.entries(supplies).forEach(([itemId, quantity]) => {
    if (!shopCatalog.some((item) => item.id === itemId)) return;
    addConsumable(itemId, quantity);
    consumableCount += quantity;
  });

  for (let index = 0; index < 2; index += 1) {
    const slot = getPrestigeRushRewardSlot();
    const gear = createPrestigeRushGear(slot, 'epic', gameState.player.stage + 8 + index * 2);
    if (addPrestigeRushGear(gear)) gearCount += 1;
  }

  rush.gearRewards = (Number(rush.gearRewards) || 0) + gearCount;
  rush.consumableRewards = (Number(rush.consumableRewards) || 0) + consumableCount;
  rush.milestoneCrates = (Number(rush.milestoneCrates) || 0) + 1;
  normalizePlayerHp();

  if (!silent) {
    showAchievementNotice({
      title: 'Marcha concluída',
      subtitle: `Ponto de retorno: Andar ${formatCompactNumber(gameState.player.stage)}`,
      message: `Baú final: ${gearCount} equipamentos épicos e ${consumableCount} consumíveis. Seu antigo recorde continua no Andar ${formatCompactNumber(rush.recordStage || gameState.prestige.highestStage)}.`,
      type: 'rush',
    });
  }

  return { gear: gearCount, consumables: consumableCount };
}

function ensurePrestigeRushState() {
  const savedRushState = gameState.prestigeRush || {};
  const previousVersion = Math.max(1, Number(savedRushState.version) || 1);

  gameState.prestigeRush = {
    ...structuredCloneSafe(initialState.prestigeRush),
    ...savedRushState,
  };

  const rush = gameState.prestigeRush;
  rush.recordStage = Math.max(
    1,
    Number(rush.recordStage) || 1,
    Number(gameState.prestige?.highestStage) || 1,
    Number(rush.targetStage) || 1
  );

  if (previousVersion < 2) {
    const oldTarget = Math.max(1, Number(rush.targetStage) || rush.recordStage);
    const balancedTarget = calculatePrestigeRushTarget(rush.recordStage);
    const oldExactReturn = oldTarget >= Math.floor(rush.recordStage * 0.95);

    if (oldExactReturn) {
      rush.targetStage = balancedTarget;

      if (gameState.player.stage >= balancedTarget) {
        gameState.player.stage = balancedTarget;
        rush.active = false;
        rush.bossesRemaining = 0;
      } else if (rush.active) {
        const remaining = calculatePrestigeRushBossCount(balancedTarget, gameState.player.stage);
        rush.totalBosses = Math.max(Number(rush.bossesDefeated) || 0, 0) + remaining;
        rush.bossesRemaining = remaining;
      }

      const equippedCount = Object.values(gameState.equipment || {}).filter(Boolean).length;
      if (equippedCount < 5 && (rush.totalBosses > 0 || gameState.player.stage >= balancedTarget)) {
        grantPrestigeRushStarterKit(balancedTarget, { silent: true });
      }
    }

    rush.version = 2;
  }

  rush.targetStage = Math.max(1, Number(rush.targetStage) || calculatePrestigeRushTarget(rush.recordStage));
  rush.totalBosses = Math.max(0, Number(rush.totalBosses) || 0);
  rush.bossesRemaining = clamp(Number(rush.bossesRemaining) || 0, 0, rush.totalBosses || 0);
  rush.bossesDefeated = clamp(Number(rush.bossesDefeated) || 0, 0, rush.totalBosses || 0);
  rush.gearRewards = Math.max(0, Number(rush.gearRewards) || 0);
  rush.consumableRewards = Math.max(0, Number(rush.consumableRewards) || 0);
  rush.milestoneCrates = Math.max(0, Number(rush.milestoneCrates) || 0);
  rush.active = Boolean(rush.active && rush.bossesRemaining > 0 && gameState.player.stage < rush.targetStage);

  return rush;
}

function startPrestigeBossRush(recordStage = gameState.prestige.highestStage || 1) {
  const safeRecord = Math.max(1, Math.floor(Number(recordStage) || 1));
  const safeTarget = calculatePrestigeRushTarget(safeRecord);
  const totalBosses = calculatePrestigeRushBossCount(safeTarget, gameState.player.stage);

  gameState.prestigeRush = {
    version: 2,
    active: totalBosses > 0 && safeTarget > gameState.player.stage,
    recordStage: safeRecord,
    targetStage: safeTarget,
    totalBosses,
    bossesRemaining: totalBosses,
    bossesDefeated: 0,
    startStage: gameState.player.stage,
    starterKitGranted: false,
    gearRewards: 0,
    consumableRewards: 0,
    milestoneCrates: 0,
  };

  return gameState.prestigeRush;
}

function getPrestigeRushStageGain() {
  const rush = ensurePrestigeRushState();
  if (!rush.active) return 1;

  const distance = Math.max(0, rush.targetStage - gameState.player.stage);
  if (distance <= 0) return 0;

  return Math.max(1, Math.ceil(distance / Math.max(1, rush.bossesRemaining)));
}

function getBossStageAdvanceAmount(monster = gameState.monster) {
  return monster?.prestigeRushBoss ? getPrestigeRushStageGain() : 1;
}

function resolvePrestigeRushBossVictory(monster) {
  if (!monster?.prestigeRushBoss) return false;

  const rush = ensurePrestigeRushState();
  rush.bossesDefeated = Math.min(rush.totalBosses, rush.bossesDefeated + 1);
  rush.bossesRemaining = Math.max(0, rush.totalBosses - rush.bossesDefeated);

  const completed = rush.bossesRemaining <= 0 || gameState.player.stage >= rush.targetStage;

  if (completed) {
    gameState.player.stage = Math.min(getMaxStageForPlayer(), rush.targetStage);
    rush.active = false;
    rush.bossesRemaining = 0;
    gameState.player.monstersSinceBoss = 0;

    log(
      `Marcha concluída! Você alcançou o ponto de retorno no Andar ${gameState.player.stage}. O antigo recorde permanece no Andar ${rush.recordStage}; agora os encontros normais voltaram.`,
      'system-important',
      true
    );
    return true;
  }

  log(
    `Marcha dos Bosses: ${rush.bossesDefeated}/${rush.totalBosses} vencidos. Próximo salto rumo ao ponto de retorno no Andar ${rush.targetStage}.`,
    'boss',
    true
  );
  return false;
}

function getMandatoryBossTarget() {
  return gameConfig.mandatoryBossEvery || 5;
}

function getMonstersSinceLastBoss() {
  return gameState.player.monstersSinceBoss || 0;
}

function getMonstersUntilMandatoryBoss() {
  return Math.max(0, getMandatoryBossTarget() - getMonstersSinceLastBoss());
}

function shouldSpawnMandatoryBoss() {
  return getMonstersUntilMandatoryBoss() <= 0;
}

function createNextEncounter() {
  const rush = ensurePrestigeRushState();

  if (rush.active) {
    const monster = createMonster(true);
    monster.prestigeRushBoss = true;
    monster.mandatoryBoss = false;
    monster.rushOrder = rush.bossesDefeated + 1;
    monster.rushTotal = rush.totalBosses;
    return monster;
  }

  const mandatoryBoss = shouldSpawnMandatoryBoss();
  const monster = createMonster(mandatoryBoss);

  if (mandatoryBoss) {
    monster.mandatoryBoss = true;
  }

  return monster;
}

function getPlayerMaxHp() {
  return gameState.player.maxHp + getPrestigeHpBonus() + getEquipmentBonus('maxHp');
}

function getPlayerAttack() {
  let value = gameState.player.attack + getEquipmentBonus('attack');

  if (gameState.player.buffs?.fury > 0) {
    value *= 1.35;
  }

  if (gameState.player.activeWeaponSlot === 'physicalWeapon') {
    value *= 1 + getActiveForgeEffect('attackPercent') / 100;
  }

  return Math.round(value * getTotalDamageMultiplier());
}

function getPlayerMagic() {
  let value = gameState.player.magic + getEquipmentBonus('magic');

  if (gameState.player.buffs?.arcane > 0) {
    value *= 1.3;
  }

  if (gameState.player.activeWeaponSlot === 'magicWeapon') {
    value *= 1 + getActiveForgeEffect('magicPercent') / 100;
  }

  return Math.round(value);
}

function getPlayerMagicChance() {
  const base = gameState.player.magicChance || 0;
  const bonus = getEquipmentBonus('magicChance') + getActiveForgeEffect('magicChance');
  return clamp(base + bonus, 0, 90);
}

function getPlayerMagicDamageMultiplier() {
  return 1 + ((getEquipmentBonus('magicDamagePercent') + getActiveForgeEffect('magicDamagePercent')) / 100);
}

function getPlayerSpellDamageMultiplier() {
  return (gameConfig.spellDamageMultiplier || 1.85)
    * getPlayerMagicDamageMultiplier()
    * (1 + getActiveForgeEffect('spellDamagePercent') / 100);
}

function isMagicWeaponActive() {
  return gameState.player.activeWeaponSlot === 'magicWeapon' && Boolean(gameState.equipment?.magicWeapon);
}

function getPlayerXpBonusPercent() {
  return getEquipmentBonus('xpPercent');
}

function getPlayerDefense() {
  let value = gameState.player.defense + getEquipmentBonus('defense');

  if (gameState.player.buffs?.stone > 0) {
    value *= 1.25;
  }

  value *= 1 + getActiveForgeEffect('defensePercent') / 100;
  return Math.round(value);
}

function getPlayerAgility() {
  let value = gameState.player.agility + getEquipmentBonus('agility');

  if (gameState.player.buffs?.wind > 0) {
    value *= 1.25;
  }

  value *= 1 + getActiveForgeEffect('agilityPercent') / 100;
  return Math.round(value);
}

function getPlayerCritChance() {
  let bonus = getEquipmentBonus('critChance') + getActiveForgeEffect('critChance');
  const mark = getActiveForgeMark();
  if (isForgeBiomeMarkActive(mark)) bonus += Number(mark.effects?.biomeCritChance) || 0;
  return clamp(gameState.player.critChance + bonus, 5, 70);
}

function getPlayerPower() {
  return Math.floor(
    getPlayerMaxHp() / 5 +
    getPlayerAttack() * 3.2 +
    getPlayerMagic() * 3 +
    getPlayerDefense() * 2.6 +
    getPlayerAgility() * 2 +
    getPlayerCritChance() * 1.4
  );
}


function getActiveBuffCount() {
  const buffs = gameState.player.buffs || {};
  return ['fury', 'stone', 'wind', 'arcane']
    .filter((buff) => Number(buffs[buff]) > 0)
    .length;
}

function getOverloadProfile(monster = gameState.monster) {
  const count = monster?.isBoss ? getActiveBuffCount() : 0;
  const tiers = [
    { attack: 0, defense: 0, agility: 0, crit: 0, label: 'Observando' },
    { attack: 0.07, defense: 0.03, agility: 0.03, crit: 1, label: 'Alerta I' },
    { attack: 0.16, defense: 0.09, agility: 0.07, crit: 4, label: 'Sobrecarga I' },
    { attack: 0.29, defense: 0.17, agility: 0.12, crit: 8, label: 'Sobrecarga II' },
    { attack: 0.45, defense: 0.28, agility: 0.18, crit: 13, label: 'Sobrecarga máxima' },
  ];

  return { count, ...(tiers[count] || tiers[tiers.length - 1]) };
}

function ensureMonsterCombatRules(monster = gameState.monster) {
  if (!monster) return null;

  monster.combatRules = {
    healingRageStacks: 0,
    echoes: {},
    ...(monster.combatRules || {}),
  };

  monster.combatRules.healingRageStacks = clamp(
    Number(monster.combatRules.healingRageStacks) || 0,
    0,
    gameConfig.healingRageMaxStacks || 5
  );
  monster.combatRules.echoes ||= {};

  return monster.combatRules;
}

function getHealingRageProfile(monster = gameState.monster) {
  if (!monster?.isBoss) {
    return { stacks: 0, attack: 0, defense: 0, agility: 0, crit: 0 };
  }

  const rules = ensureMonsterCombatRules(monster);
  const stacks = rules?.healingRageStacks || 0;

  return {
    stacks,
    attack: stacks * 0.10,
    defense: stacks * 0.065,
    agility: stacks * 0.035,
    crit: stacks * 2.5,
  };
}

function getEffectiveMonsterAttack(monster = gameState.monster) {
  if (!monster) return 0;
  const overload = getOverloadProfile(monster);
  const rage = getHealingRageProfile(monster);
  return Math.max(1, Math.round(monster.attack * (1 + overload.attack + rage.attack)));
}

function getEffectiveMonsterDefense(monster = gameState.monster) {
  if (!monster) return 0;
  const overload = getOverloadProfile(monster);
  const rage = getHealingRageProfile(monster);
  return Math.max(0, Math.round(monster.defense * (1 + overload.defense + rage.defense)));
}

function getEffectiveMonsterAgility(monster = gameState.monster) {
  if (!monster) return 0;
  const overload = getOverloadProfile(monster);
  const rage = getHealingRageProfile(monster);
  return Math.max(1, Math.round(monster.agility * (1 + overload.agility + rage.agility)));
}

function getEffectiveMonsterCritChance(monster = gameState.monster) {
  if (!monster) return 8;
  const overload = getOverloadProfile(monster);
  const rage = getHealingRageProfile(monster);
  return clamp((monster.isBoss ? 15 : 8) + overload.crit + rage.crit, 3, 55);
}

function getMonsterCombatStats(monster = gameState.monster) {
  return {
    hp: monster?.hp || 0,
    attack: getEffectiveMonsterAttack(monster),
    defense: getEffectiveMonsterDefense(monster),
    agility: getEffectiveMonsterAgility(monster),
    critChance: getEffectiveMonsterCritChance(monster),
    isBoss: Boolean(monster?.isBoss),
    specialBoss: Boolean(monster?.specialBoss),
  };
}

function getEchoAttackDescriptor(damageType) {
  if (damageType === 'magic') {
    const spell = gameState.equipment?.spell;
    return {
      key: `spell:${spell?.uid || spell?.name || 'arcane'}`,
      family: 'magic',
      label: spell?.name || 'Magia equipada',
    };
  }

  if (damageType === 'magicWeapon') {
    const weapon = gameState.equipment?.magicWeapon;
    return {
      key: `magicWeapon:${weapon?.uid || weapon?.name || 'magic'}`,
      family: 'magic',
      label: weapon?.name || 'Arma Mágica',
    };
  }

  const weapon = gameState.equipment?.physicalWeapon;
  return {
    key: `physical:${weapon?.uid || weapon?.name || 'physical'}`,
    family: 'physical',
    label: weapon?.name || 'Arma Física',
  };
}

function getEchoResistanceMultiplier(monster, damageType) {
  if (!monster?.isBoss) return 1;

  const rules = ensureMonsterCombatRules(monster);
  if (!rules) return 1;

  const descriptor = getEchoAttackDescriptor(damageType);
  const stacks = clamp(Number(rules.echoes?.[descriptor.key]?.stacks) || 0, 0, gameConfig.echoResistanceMaxStacks || 5);
  return clamp(1 - stacks * (gameConfig.echoResistancePerStack || 0.08), 0.60, 1);
}

function registerEchoAdaptation(monster, damageType, extraStacks = 0) {
  if (!monster?.isBoss) return;

  const rules = ensureMonsterCombatRules(monster);
  if (!rules) return;

  const descriptor = getEchoAttackDescriptor(damageType);
  const maxStacks = gameConfig.echoResistanceMaxStacks || 5;

  Object.entries(rules.echoes).forEach(([key, echo]) => {
    if (key !== descriptor.key && echo?.stacks > 0) {
      echo.stacks = Math.max(0, echo.stacks - 1);
    }
  });

  const current = rules.echoes[descriptor.key] || {
    stacks: 0,
    family: descriptor.family,
    label: descriptor.label,
  };

  current.stacks = clamp((current.stacks || 0) + 1 + Math.max(0, Number(extraStacks) || 0), 0, maxStacks);
  current.family = descriptor.family;
  current.label = descriptor.label;
  rules.echoes[descriptor.key] = current;

  if ([2, 4, 5].includes(current.stacks)) {
    const reduction = Math.round(current.stacks * (gameConfig.echoResistancePerStack || 0.08) * 100);
    log(`Eco Adaptativo: ${monster.name} aprendeu a resistir a ${descriptor.label} (${reduction}% de redução no próximo golpe igual).`, 'boss', true);
  }
}

function getEchoSummary(monster = gameState.monster) {
  if (!monster?.isBoss) return [];

  const rules = ensureMonsterCombatRules(monster);
  if (!rules) return [];

  return Object.values(rules.echoes)
    .filter((echo) => (echo?.stacks || 0) > 0)
    .sort((a, b) => (b.stacks || 0) - (a.stacks || 0))
    .slice(0, 3)
    .map((echo) => ({
      ...echo,
      reduction: Math.round((echo.stacks || 0) * (gameConfig.echoResistancePerStack || 0.08) * 100),
    }));
}

async function applyEnemyResponseToHealing(healed, item) {
  const monster = gameState.monster;
  if (!monster?.isBoss || monster.hp <= 0 || healed <= 0) return;

  const rules = ensureMonsterCombatRules(monster);
  rules.healingRageStacks = clamp(
    (rules.healingRageStacks || 0) + 1,
    0,
    gameConfig.healingRageMaxStacks || 5
  );

  const missingHp = Math.max(0, monster.maxHp - monster.hp);
  const recoveryRate = 0.035 + rules.healingRageStacks * 0.009;
  const recovered = Math.min(missingHp, Math.max(0, Math.round(monster.maxHp * recoveryRate)));

  if (recovered > 0) {
    await showMythicEffectActivation(
      'Fúria de Cura',
      `+${formatCompactNumber(recovered)} HP`,
      'monster',
      () => {
        if (gameState.monster === monster) {
          monster.hp = Math.min(monster.maxHp, monster.hp + recovered);
        }
      }
    );
  }

  log(
    `${monster.name} reagiu à sua cura${recovered > 0 ? `, recuperou ${formatCompactNumber(recovered)} HP` : ''} e alcançou Fúria de Cura ${rules.healingRageStacks}/${gameConfig.healingRageMaxStacks || 5}.`,
    'boss',
    true
  );
}

function normalizePlayerHp() {
  const maxHp = getPlayerMaxHp();
  gameState.player.hp = clamp(gameState.player.hp, 0, maxHp);
}

const dungeonBiomes = [
  {
    id: 'catacombs',
    name: 'Catacumbas Úmidas',
    minStage: 1,
    maxStage: 30,
    theme: 'undead',
    preferredDrops: ['sword', 'dagger', 'helmet', 'chest'],
    enemies: [
      { name: 'Slime Ácido', icon: '🟢', type: 'Criatura', hp: 0.95, attack: 0.85, defense: 0.75, agility: 0.85, resist: { physical: 1, magic: 1.05 } },
      { name: 'Goblin Ladrão', icon: '👺', type: 'Humanoide', hp: 1, attack: 1.02, defense: 0.88, agility: 1.18, resist: { physical: 1, magic: 1 } },
      { name: 'Lobo da Névoa', icon: '🐺', type: 'Fera', hp: 1.04, attack: 1.08, defense: 0.8, agility: 1.25, resist: { physical: 1, magic: 1 } },
      { name: 'Esqueleto Antigo', icon: '💀', type: 'Morto-vivo', hp: 1.12, attack: 1, defense: 1.08, agility: 0.78, resist: { physical: 0.95, magic: 1.1 } },
      { name: 'Orc Guerreiro', icon: '🔨', type: 'Brutamontes', hp: 1.28, attack: 1.18, defense: 1.12, agility: 0.7, resist: { physical: 0.95, magic: 1.05 } },
      { name: 'Lesma Necrótica', icon: '🐌', type: 'Molusco', hp: 1.22, attack: 0.88, defense: 1.18, agility: 0.58, resist: { physical: 1.18, magic: 0.72 } },
    ],
  },

  {
    id: 'abandonedMines',
    name: 'Minas Abandonadas',
    minStage: 31,
    maxStage: 80,
    theme: 'earth',
    preferredDrops: ['hammer', 'axe', 'chest', 'helmet'],
    enemies: [
      { name: 'Golem de Pedra', icon: '🪨', type: 'Construto', hp: 1.35, attack: 1.08, defense: 1.35, agility: 0.55, resist: { physical: 0.85, magic: 1.15 } },
      { name: 'Morcego Ferrugento', icon: '🦇', type: 'Fera', hp: 0.86, attack: 0.95, defense: 0.7, agility: 1.55, resist: { physical: 1, magic: 1 } },
      { name: 'Mineiro Amaldiçoado', icon: '⛏️', type: 'Morto-vivo', hp: 1.12, attack: 1.16, defense: 1.05, agility: 0.85, resist: { physical: 1, magic: 1.08 } },
      { name: 'Aranha das Minas', icon: '🕷️', type: 'Inseto', hp: 0.95, attack: 1.02, defense: 0.88, agility: 1.35, resist: { physical: 1.05, magic: 0.95 } },
      { name: 'Rato das Profundezas', icon: '🐀', type: 'Fera', hp: 0.72, attack: 1.18, defense: 0.55, agility: 1.45, resist: { physical: 0.95, magic: 1.08 } },
      { name: 'Elemental de Carvão', icon: '🪨', type: 'Elemental', hp: 1.15, attack: 1.08, defense: 1.28, agility: 0.62, resist: { physical: 0.88, magic: 1.18 } },// Trocar foto
    ],
  },

  {
    id: 'sunkenTemple',
    name: 'Templo Submerso',
    minStage: 81,
    maxStage: 150,
    theme: 'water',
    preferredDrops: ['trident', 'spear', 'orb', 'necklace'],
    enemies: [
      { name: 'Guarda Abissal', icon: '🔱', type: 'Aquático', hp: 1.18, attack: 1.14, defense: 1.02, agility: 1.02, resist: { physical: 1, magic: 0.95, trident: 1.2 } },
      { name: 'Sereia Corrompida', icon: '🧜', type: 'Arcano', hp: 0.95, attack: 1.25, defense: 0.82, agility: 1.12, resist: { physical: 1.1, magic: 0.8 } },
      { name: 'Caranguejo Colossal', icon: '🦀', type: 'Fera', hp: 1.4, attack: 1, defense: 1.35, agility: 0.58, resist: { physical: 0.9, magic: 1.1 } },
      { name: 'Cavaleiro das Marés', icon: '🌊', type: 'Humanoide', hp: 1.08, attack: 1.22, defense: 1.05, agility: 0.88, resist: { physical: 0.92, magic: 1.12 } },//
      { name: 'Anêmona Carnívora', icon: '🌺', type: 'Planta', hp: 1.28, attack: 1.16, defense: 0.95, agility: 0.48, resist: { physical: 1.08, magic: 0.88 } },//
      { name: 'Profeta das Profundezas', icon: '🔮', type: 'Cultista', hp: 0.96, attack: 1.32, defense: 0.72, agility: 0.82, resist: { physical: 1.15, magic: 0.78 } },//
    ],
  },

  {
    id: 'brokenTower',
    name: 'Torre Arcana Quebrada',
    minStage: 151,
    maxStage: 300,
    theme: 'arcane',
    preferredDrops: ['staff', 'wand', 'orb', 'book', 'crystal', 'spell'],
    enemies: [
      { name: 'Mago Fraturado', icon: '🧙', type: 'Arcano', hp: 0.92, attack: 1.32, defense: 0.82, agility: 0.98, resist: { physical: 1.15, magic: 0.72 } },
      { name: 'Sentinela Rúnico', icon: '🛡️', type: 'Construto Arcano', hp: 1.25, attack: 1.08, defense: 1.22, agility: 0.78, resist: { physical: 0.9, magic: 0.85 } },
      { name: 'Livro Vivo', icon: '📖', type: 'Arcano', hp: 0.85, attack: 1.2, defense: 0.72, agility: 1.25, resist: { physical: 1.2, magic: 0.7 } },
      { name: 'Cristal Mágico', icon: '🔮', type: 'Cristal', hp: 1.1, attack: 1.25, defense: 1.05, agility: 0.55, resist: { physical: 1.15, magic: 0.65 } },
      { name: 'Mago Sombrio', icon: '🧙', type: 'Arcano', hp: 0.9, attack: 1.34, defense: 0.82, agility: 0.95, resist: { physical: 1.12, magic: 0.82 } },
      { name: 'Mão do Feiticeiro', icon: '✋', type: 'Aberração', hp: 0.74, attack: 1.26, defense: 0.52, agility: 1.38, resist: { physical: 1.1, magic: 0.82 } },//
    ],
  },

  {
    id: 'mechanicArcane',
    name: 'Torre Autômata',
    minStage: 301,
    maxStage: 520,
    theme: 'machine',
    preferredDrops: ['hammer', 'crystal', 'bracelet', 'spell'],
    enemies: [
      { name: 'Golem de Engrenagens', icon: '⚙️', type: 'Mecânico', hp: 1.35, attack: 1.12, defense: 1.25, agility: 0.75, resist: { physical: 0.85, magic: 1.1 } },
      { name: 'Drone Arcano', icon: '🛸', type: 'Mecânico', hp: 0.92, attack: 1.15, defense: 0.82, agility: 1.55, resist: { physical: 1.05, magic: 0.95 } },
      { name: 'Armadura Vazia', icon: '🛡️', type: 'Armadura Viva', hp: 1.18, attack: 1.05, defense: 1.32, agility: 0.72, resist: { physical: 0.9, magic: 1.08 } },
      { name: 'Rato de Cobre', icon: '🐀', type: 'Fera', hp: 0.82, attack: 1.12, defense: 0.88, agility: 1.32, resist: { physical: 0.9, magic: 1.14 } },
      { name: 'Cão de Aço', icon: '🐺', type: 'Constructo', hp: 1.05, attack: 1.24, defense: 1.22, agility: 0.82, resist: { physical: 0.84, magic: 1.16 } },
      { name: 'Autômato Duelista', icon: '🤖', type: 'Constructo', hp: 0.92, attack: 1.36, defense: 1.04, agility: 1.18, resist: { physical: 0.88, magic: 1.12 } },
    ],
  },

  {
    id: 'ashHell',
    name: 'Inferno de Cinzas',
    minStage: 521,
    maxStage: 900,
    theme: 'fire',
    preferredDrops: ['katana', 'scythe', 'saber', 'ring'],
    enemies: [
      { name: 'Demônio de Cinzas', icon: '👹', type: 'Demônio', hp: 1.2, attack: 1.35, defense: 0.95, agility: 1.05, resist: { physical: 1, magic: 0.9 } },
      { name: 'Dragão Carbonizado', icon: '🐉', type: 'Dragão', hp: 1.55, attack: 1.38, defense: 1.12, agility: 0.82, resist: { physical: 0.95, magic: 0.85 } },
      { name: 'Cavaleiro Queimado', icon: '🔥', type: 'Humanoide', hp: 1.25, attack: 1.18, defense: 1.22, agility: 0.92, resist: { physical: 0.95, magic: 1.05 } },
      { name: 'Lobo de Fuligem', icon: '🐺', type: 'Fera', hp: 0.9, attack: 1.28, defense: 0.78, agility: 1.26, resist: { physical: 1.08, magic: 0.88 } },
      { name: 'Anjo Caído das Brasas', icon: '🪽', type: 'Celestial', hp: 1.18, attack: 1.38, defense: 0.96, agility: 1.08, resist: { physical: 1.1, magic: 0.78 } },
      { name: 'Golem de Obsidiana', icon: '🗿', type: 'Constructo', hp: 1.42, attack: 1.14, defense: 1.48, agility: 0.42, resist: { physical: 0.78, magic: 1.12 } },
    ],
  },

  {
    id: 'infiniteVoid',
    name: 'Vazio Infinito',
    minStage: 901,
    maxStage: 3000,
    theme: 'void',
    preferredDrops: ['orb', 'crystal', 'book', 'ring', 'spell'],
    enemies: [
      { name: 'Sombra Sem Nome', icon: '🌑', type: 'Vazio', hp: 1.12, attack: 1.28, defense: 0.9, agility: 1.35, resist: { physical: 1, magic: 0.9 } },
      { name: 'Avatar Quebrado', icon: '👤', type: 'Avatar', hp: 1.35, attack: 1.35, defense: 1.15, agility: 1.1, resist: { physical: 0.95, magic: 0.95 } },
      { name: 'Herói Corrompido', icon: '🗡️', type: 'Eco Sombrio', hp: 1.4, attack: 1.42, defense: 1.12, agility: 1.16, resist: { physical: 1, magic: 1 } },
      { name: 'Devorador do Fim', icon: '🕳️', type: 'Entidade', hp: 1.7, attack: 1.45, defense: 1.25, agility: 0.9, resist: { physical: 0.9, magic: 0.9 } },
      { name: 'Colecionador de Memórias', icon: '🧠', type: 'Aberração', hp: 1.6, attack: 1.44, defense: 1.01, agility: 0.94, resist: { physical: 1.16, magic: 0.76 } },
      { name: 'Guardião do Limite', icon: '🛡️', type: 'Sentinela', hp: 1.95, attack: 1.68, defense: 1.38, agility: 0.96, resist: { physical: 0.86, magic: 0.92 } }, 
    ],
  },
];

const bossPools = {
  catacombs: [
    { name: 'Rei Goblin', icon: '👑', type: 'Boss Goblin', hp: 1.35, attack: 1.22, defense: 1.05, agility: 0.95, resist: { physical: 1, magic: 1 } },
    { name: 'Lorde dos Ossos', icon: '💀', type: 'Boss Morto-vivo', hp: 1.45, attack: 1.18, defense: 1.2, agility: 0.75, resist: { physical: 0.95, magic: 1.1 } },
    { name: 'O Rei Afogado', icon: '👑', type: 'Boss Morto-vivo', hp: 1.75, attack: 1.42, defense: 1.28, agility: 0.72, resist: { physical: 0.92, magic: 0.82 } },
    { name: 'O Vigia da Cripta', icon: '👁️', type: 'Boss Humanoide', hp: 1.55, attack: 1.58, defense: 1.12, agility: 0.96, resist: { physical: 0.86, magic: 1.08 } },
  ],

  abandonedMines: [
    { name: 'Colosso das Minas', icon: '🪨', type: 'Boss Construto', hp: 1.75, attack: 1.2, defense: 1.45, agility: 0.55, resist: { physical: 0.82, magic: 1.18 } },
    { name: 'Rainha das Aranhas', icon: '🕷️', type: 'Boss Fera', hp: 1.35, attack: 1.25, defense: 1, agility: 1.28, resist: { physical: 1, magic: 1 } },
    { name: 'Escavador Cego', icon: '⛏️', type: 'Boss Sentinela', hp: 1.68, attack: 1.46, defense: 1.34, agility: 0.64, resist: { physical: 0.82, magic: 1.12 } },
    { name: 'Devorador de Túneis', icon: '🪱', type: 'Boss Besta', hp: 1.86, attack: 1.38, defense: 1.18, agility: 0.78, resist: { physical: 1.08, magic: 0.84 } },
  ],

  sunkenTemple: [
    { name: 'Leviatã Menor', icon: '🐍', type: 'Boss Aquático', hp: 1.65, attack: 1.3, defense: 1.12, agility: 0.95, resist: { physical: 1, magic: 0.9, trident: 1.25 } },
    { name: 'Sacerdote Abissal', icon: '🔱', type: 'Boss Arcano', hp: 1.3, attack: 1.45, defense: 0.95, agility: 1.08, resist: { physical: 1.1, magic: 0.75 } },
    { name: 'Arauto da Maré', icon: '🌊', type: 'Boss Aquático', hp: 1.62, attack: 1.54, defense: 1.08, agility: 0.92, resist: { physical: 1.08, magic: 0.82 } },
    { name: 'Guardião Coralino', icon: '🪸', type: 'Boss Aquático', hp: 1.82, attack: 1.34, defense: 1.46, agility: 0.58, resist: { physical: 0.84, magic: 1.1 } },
  ],

  brokenTower: [
    { name: 'Arquimago Fraturado', icon: '🧙', type: 'Boss Arcano', hp: 1.4, attack: 1.55, defense: 0.95, agility: 1.05, resist: { physical: 1.15, magic: 0.65 } },
    { name: 'Biblioteca Viva', icon: '📚', type: 'Boss Arcano', hp: 1.55, attack: 1.35, defense: 1.05, agility: 0.82, resist: { physical: 1.12, magic: 0.7 } },
    { name: 'Mestre das Runas', icon: '🔯', type: 'Boss Arcano', hp: 1.58, attack: 1.62, defense: 1.02, agility: 0.88, resist: { physical: 1.12, magic: 0.78 } },
    { name: 'Sentinela de Mana', icon: '🛡️', type: 'Boss Arcano', hp: 1.72, attack: 1.44, defense: 1.26, agility: 0.74, resist: { physical: 0.9, magic: 0.82 } },
  ],

  mechanicArcane: [
    { name: 'Titã de Engrenagens', icon: '⚙️', type: 'Boss Mecânico', hp: 1.8, attack: 1.28, defense: 1.4, agility: 0.7, resist: { physical: 0.82, magic: 1.1 } },
    { name: 'Núcleo Rúnico', icon: '🔮', type: 'Boss Híbrido', hp: 1.5, attack: 1.48, defense: 1.2, agility: 0.88, resist: { physical: 1.05, magic: 0.7 } },
    { name: 'Executor Hidráulico', icon: '⚙️', type: 'Boss Mecânico', hp: 1.76, attack: 1.52, defense: 1.38, agility: 0.68, resist: { physical: 0.84, magic: 1.14 } },
    { name: 'Titã de Vapor', icon: '♨️', type: 'Boss Mecânico', hp: 1.94, attack: 1.48, defense: 1.52, agility: 0.54, resist: { physical: 0.8, magic: 1.08 } },
  ],

  ashHell: [
    { name: 'Dragão de Cinzas', icon: '🐉', type: 'Boss Dragão', hp: 1.8, attack: 1.48, defense: 1.18, agility: 0.86, resist: { physical: 0.95, magic: 0.85 } },
    { name: 'General Infernal', icon: '🔥', type: 'Boss Demônio', hp: 1.55, attack: 1.52, defense: 1.12, agility: 1.05, resist: { physical: 1, magic: 0.9 } },
    { name: 'Tirano Vulcânico', icon: '🌋', type: 'Boss Vulcânico', hp: 1.88, attack: 1.64, defense: 1.24, agility: 0.76, resist: { physical: 0.9, magic: 0.78 } },
    { name: 'O Último Incêndio', icon: '🔥', type: 'Boss Elemental', hp: 1.64, attack: 1.78, defense: 0.96, agility: 1.02, resist: { physical: 1.12, magic: 0.74 } },
  ],

  infiniteVoid: [
    { name: 'Avatar do Vazio', icon: '🌌', type: 'Boss Entidade', hp: 1.9, attack: 1.6, defense: 1.25, agility: 1.05, resist: { physical: 0.9, magic: 0.9 } },
    { name: 'O Fim dos Tempos', icon: '🗡️', type: 'Boss Tempo', hp: 1.75, attack: 1.7, defense: 1.22, agility: 1.18, resist: { physical: 1, magic: 1 } },
    { name: 'A Última Sombra', icon: '🌑', type: 'Boss Sombra', hp: 1.7, attack: 1.72, defense: 1.08, agility: 1.12, resist: { physical: 1.14, magic: 0.76 } },
    { name: 'O Inominável', icon: '🕳️', type: 'Boss Entidade', hp: 1.98, attack: 1.68, defense: 1.34, agility: 0.86, resist: { physical: 0.88, magic: 0.72 } },
  ],
};

const specialBossPool = [
  { name: 'Guardião do Pergaminho', icon: '📜', type: 'Boss Especial', hp: 1.7, attack: 1.45, defense: 1.15, agility: 1.05, resist: { physical: 1, magic: 1 } },
  { name: 'Caçador de Relíquias', icon: '💎', type: 'Boss Especial', hp: 1.45, attack: 1.55, defense: 1, agility: 1.28, resist: { physical: 1.05, magic: 0.95 } },
  { name: 'Eco do Herói Antigo', icon: '👤', type: 'Boss Especial', hp: 1.6, attack: 1.6, defense: 1.18, agility: 1.12, resist: { physical: 1, magic: 1 } },
  { name: 'Ferreiro do Fim', icon: '🔨', type: 'Boss Especial da Forja', hp: 1.75, attack: 1.48, defense: 1.28, agility: 0.92, resist: { physical: 0.92, magic: 1.05 } },
  { name: 'Oráculo Despedaçado', icon: '👁️', type: 'Boss Especial Arcano', hp: 1.42, attack: 1.68, defense: 0.95, agility: 1.18, resist: { physical: 1.12, magic: 0.78 } },
  { name: 'Comandante das Máquinas', icon: '⚙️', type: 'Boss Especial Mecânico', hp: 1.65, attack: 1.52, defense: 1.32, agility: 0.82, resist: { physical: 0.86, magic: 1.08 } },
  { name: 'Serafim Quebrado', icon: '🪽', type: 'Boss Especial Celestial', hp: 1.55, attack: 1.58, defense: 1.1, agility: 1.2, resist: { physical: 1, magic: 0.9 } },
  { name: 'Devorador de Relíquias', icon: '🧿', type: 'Boss Especial Relicário', hp: 1.7, attack: 1.5, defense: 1.12, agility: 1.05, resist: { physical: 0.95, magic: 0.95 } },
  { name: 'Duque do Vazio', icon: '🌌', type: 'Boss Especial do Vazio', hp: 1.82, attack: 1.62, defense: 1.18, agility: 1.08, resist: { physical: 0.9, magic: 0.88 } },
  { name: 'Arauto da Forja Eterna', icon: '🔥', type: 'Boss Especial da Forja', hp: 1.68, attack: 1.56, defense: 1.22, agility: 0.98, resist: { physical: 0.9, magic: 1 } },
  { name: 'Guardião do Eclipse', icon: '🌘', type: 'Boss Especial Mítico', hp: 1.78, attack: 1.6, defense: 1.2, agility: 1.02, resist: { physical: 0.95, magic: 0.9 } },
];

function getBossPoolForBiome(biomeId, specialBoss = false) {
  if (specialBoss) return specialBossPool;
  return bossPools[biomeId] || bossPools.catacombs;
}

function getDungeonBiome(stage = gameState.player.stage) {
  return dungeonBiomes.find((biome) => stage >= biome.minStage && stage <= biome.maxStage)
    || dungeonBiomes[dungeonBiomes.length - 1];
}

function getUnlockedBiomes(stage = gameState.player.stage) {
  return dungeonBiomes.filter((biome) => stage >= biome.minStage);
}

function getBiomeIndex(biomeOrId) {
  const biomeId = typeof biomeOrId === 'string' ? biomeOrId : biomeOrId?.id;
  return Math.max(0, dungeonBiomes.findIndex((biome) => biome.id === biomeId));
}

function getPreviousBiomeCandidates(stage = gameState.player.stage, currentBiome = getDungeonBiome(stage)) {
  const currentIndex = getBiomeIndex(currentBiome);

  if (currentIndex <= 0) {
    return [];
  }

  // Regra nova: só o bioma imediatamente anterior pode aparecer fora do seu território.
  // Ex.: Catacumbas aparecem raramente nas Minas, mas nunca do Templo em diante.
  return [
    {
      biome: dungeonBiomes[currentIndex - 1],
      weight: 1,
    },
  ];
}

function pickWeightedBiomeEntry(entries) {
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);

  if (totalWeight <= 0) {
    return entries[entries.length - 1]?.biome || getDungeonBiome();
  }

  let roll = Math.random() * totalWeight;

  for (const entry of entries) {
    roll -= entry.weight;

    if (roll <= 0) {
      return entry.biome;
    }
  }

  return entries[entries.length - 1]?.biome || getDungeonBiome();
}

function getEnemyBiomeForStage(stage = gameState.player.stage) {
  const currentBiome = getDungeonBiome(stage);
  const currentIndex = getBiomeIndex(currentBiome);

  if (currentIndex <= 0) {
    return currentBiome;
  }

  const previousBiomeEntries = getPreviousBiomeCandidates(stage, currentBiome);

  if (!previousBiomeEntries.length) {
    return currentBiome;
  }

  const previousBiomeChance = currentIndex === 1 ? 14 : 10;

  if (randomBetween(1, 100) <= previousBiomeChance) {
    return pickWeightedBiomeEntry(previousBiomeEntries);
  }

  return currentBiome;
}


function getDeathRecoveryGraceInfo() {
  const grace = gameState.player.recoveryGrace || {};
  const battlesLeft = Number(grace.battles) || 0;

  if (battlesLeft <= 0) {
    return {
      active: false,
      hpMultiplier: 1,
      attackMultiplier: 1,
      defenseMultiplier: 1,
      agilityMultiplier: 1,
      rewardMultiplier: 1,
    };
  }

  const deaths = clamp(Number(grace.deaths) || 1, 1, 4);
  const strength = 1 + (deaths - 1) * 0.18;

  return {
    active: true,
    hpMultiplier: clamp(0.86 - deaths * 0.035, 0.70, 0.86),
    attackMultiplier: clamp(0.80 - deaths * 0.055, 0.56, 0.80),
    defenseMultiplier: clamp(0.90 - deaths * 0.025, 0.78, 0.90),
    agilityMultiplier: clamp(0.92 - deaths * 0.025, 0.82, 0.92),
    rewardMultiplier: clamp(0.98 - strength * 0.025, 0.88, 0.98),
  };
}

function getBiomeEntryReliefInfo(stage = gameState.player.stage, currentBiome = getDungeonBiome(stage)) {
  const currentIndex = getBiomeIndex(currentBiome);

  if (currentIndex <= 0) {
    return {
      active: false,
      hpMultiplier: 1,
      attackMultiplier: 1,
      defenseMultiplier: 1,
      agilityMultiplier: 1,
    };
  }

  const stagesInsideBiome = Math.max(0, stage - currentBiome.minStage);
  const reliefWindow = 12;

  if (stagesInsideBiome >= reliefWindow) {
    return {
      active: false,
      hpMultiplier: 1,
      attackMultiplier: 1,
      defenseMultiplier: 1,
      agilityMultiplier: 1,
    };
  }

  const t = stagesInsideBiome / reliefWindow;

  return {
    active: true,
    hpMultiplier: 0.88 + t * 0.12,
    attackMultiplier: 0.82 + t * 0.18,
    defenseMultiplier: 0.90 + t * 0.10,
    agilityMultiplier: 0.92 + t * 0.08,
  };
}

function applyMonsterBalanceModifiers(monster, context = {}) {
  const recovery = getDeathRecoveryGraceInfo();
  const entryRelief = getBiomeEntryReliefInfo(context.stage, context.currentBiome);
  const isPreviousBiomeEnemy = context.enemyBiome?.id && context.currentBiome?.id && context.enemyBiome.id !== context.currentBiome.id;
  const oldBiomeMultiplier = isPreviousBiomeEnemy ? 0.88 : 1;

  const hpMultiplier = recovery.hpMultiplier * entryRelief.hpMultiplier * oldBiomeMultiplier;
  const attackMultiplier = recovery.attackMultiplier * entryRelief.attackMultiplier * oldBiomeMultiplier;
  const defenseMultiplier = recovery.defenseMultiplier * entryRelief.defenseMultiplier;
  const agilityMultiplier = recovery.agilityMultiplier * entryRelief.agilityMultiplier;
  const rewardMultiplier = recovery.rewardMultiplier;

  monster.maxHp = Math.max(1, Math.round(monster.maxHp * hpMultiplier));
  monster.hp = monster.maxHp;
  monster.attack = Math.max(1, Math.round(monster.attack * attackMultiplier));
  monster.defense = Math.max(0, Math.round(monster.defense * defenseMultiplier));
  monster.agility = Math.max(1, Math.round(monster.agility * agilityMultiplier));
  monster.xpReward = Math.max(1, Math.round(monster.xpReward * rewardMultiplier));
  monster.coinReward = Math.max(0, Math.round(monster.coinReward * rewardMultiplier));

  monster.balanceModifiers = {
    deathRecovery: recovery.active,
    biomeEntryRelief: entryRelief.active,
    previousBiomeEnemy: isPreviousBiomeEnemy,
  };

  return monster;
}

function activateDeathRecoveryGrace(previousStage, checkpointStage) {
  const previousGrace = gameState.player.recoveryGrace || {};
  const sameCheckpoint = previousGrace.checkpointStage === checkpointStage;
  const deaths = sameCheckpoint
    ? clamp((previousGrace.deaths || 0) + 1, 1, 4)
    : 1;

  gameState.player.recoveryGrace = {
    battles: clamp(8 + deaths * 2, 8, 14),
    checkpointStage,
    deaths,
    previousStage,
  };
}

function tickDeathRecoveryGraceAfterWin(monster) {
  const grace = gameState.player.recoveryGrace;

  if (!grace || grace.battles <= 0) return;

  grace.battles = Math.max(0, grace.battles - 1);

  if (grace.battles === 0) {
    grace.deaths = 0;
    log('A masmorra voltou ao ritmo normal. Os inimigos não estão mais enfraquecidos pelo checkpoint.', 'system', true);
  } else if (monster?.isBoss) {
    grace.battles = Math.max(0, grace.battles - 1);
  }
}

function createMonster(isBoss = false, specialBoss = false) {
  const player = gameState.player;
  const currentBiome = getDungeonBiome(player.stage);
  const enemyBiome = isBoss ? currentBiome : getEnemyBiomeForStage(player.stage);
  const templatePool = isBoss
    ? getBossPoolForBiome(currentBiome.id, specialBoss)
    : enemyBiome.enemies;
  const template = templatePool[randomBetween(0, templatePool.length - 1)];
  const effectiveStage = Math.max(1, Math.min(player.stage, getMaxStageForPlayer()));
  const currentBiomeIndex = getBiomeIndex(currentBiome);

  let level;
  let maxHp;
  let attack;
  let defense;
  let agility;
  let xpReward;
  let coinReward;

  if (isBoss) {
    // Escala fixa: nenhum atributo do herói participa desta conta.
    const biomeThreat = 1 + currentBiomeIndex * 0.16 + Math.floor(effectiveStage / 300) * 0.08;
    level = Math.max(5, Math.round(effectiveStage * 0.62 + currentBiomeIndex * 9 + 6));

    const hpCurve = 300 + effectiveStage * 45 + Math.pow(effectiveStage, 1.22) * 8;
    const attackCurve = 18 + effectiveStage * 4 + Math.pow(effectiveStage, 1.12) * 1.25;
    const defenseCurve = 8 + effectiveStage * 1.55 + Math.pow(effectiveStage, 1.08) * 0.55;
    const agilityCurve = 10 + effectiveStage * 2.8 + Math.pow(effectiveStage, 1.05) * 0.45;

    maxHp = Math.max(1, Math.round(hpCurve * template.hp * biomeThreat));
    attack = Math.max(1, Math.round(attackCurve * template.attack * biomeThreat));
    defense = Math.max(0, Math.round(defenseCurve * template.defense * biomeThreat));
    agility = Math.max(1, Math.round(agilityCurve * template.agility * biomeThreat));
    xpReward = Math.round((140 + effectiveStage * 35 + Math.pow(effectiveStage, 1.10) * 9) * biomeThreat);
    coinReward = Math.round((80 + effectiveStage * 20 + Math.pow(effectiveStage, 1.08) * 6) * biomeThreat);
  } else {
    const stagePressure = Math.floor(effectiveStage / 12);
    const levelVariance = randomBetween(-1, 1);
    level = Math.max(1, player.level + stagePressure + levelVariance);

    const biomeScaling = 1 + Math.floor(effectiveStage / 300) * 0.08;
    const base = 72 + level * 16 + effectiveStage * 1.2;
    const playerOffense = Math.max(getPlayerAttack(), getPlayerMagic());
    const playerDefense = getPlayerDefense();
    const playerMaxHp = getPlayerMaxHp();
    const playerAgility = getPlayerAgility();
    const adaptation = clamp((player.level - 35) / 55, 0, 1);

    const baseHp = Math.round(base * template.hp * biomeScaling);
    const adaptiveHp = Math.round(
      playerOffense * 2.85 *
      (0.82 + template.hp * 0.12) *
      (1 + currentBiomeIndex * 0.045)
    );

    const baseAttack = Math.round((8 + level * 1.72 + effectiveStage * 0.20) * template.attack * biomeScaling);
    const targetIncomingDamage = Math.round(playerMaxHp * 0.052 + playerDefense * 0.22);
    const adaptiveAttack = Math.round(targetIncomingDamage * template.attack * 0.78);
    const attackSoftCap = Math.round(playerDefense * 0.42 + playerMaxHp * 0.092);

    const baseDefense = Math.round((3 + level * 0.82 + effectiveStage * 0.13) * template.defense * biomeScaling);
    const adaptiveDefense = Math.round(playerOffense * 0.095 * template.defense);

    const baseAgility = Math.round((7 + level * 0.34 + effectiveStage * 0.045) * template.agility * biomeScaling);
    const adaptiveAgility = Math.round(playerAgility * 0.34 * template.agility);

    maxHp = Math.round(baseHp * (1 - adaptation) + Math.max(baseHp, adaptiveHp) * adaptation);
    attack = Math.min(
      attackSoftCap,
      Math.round(baseAttack * (1 - adaptation) + Math.max(baseAttack, adaptiveAttack) * adaptation)
    );
    defense = Math.round(baseDefense * (1 - adaptation) + Math.max(baseDefense, adaptiveDefense) * adaptation);
    agility = Math.round(baseAgility * (1 - adaptation) + Math.max(baseAgility, adaptiveAgility) * adaptation);
    xpReward = Math.round((45 + level * 18 + effectiveStage * 3) * biomeScaling);
    coinReward = Math.round((18 + level * 8.5 + effectiveStage * 2.4) * biomeScaling);
  }

  const monster = {
    id: uid('monster'),
    name: isBoss ? template.name : `${template.name} Nv. ${level}`,
    icon: template.icon,
    image: template.image || getEnemyImagePath(template.name),
    type: template.type,
    biomeId: currentBiome.id,
    biomeName: currentBiome.name,
    enemyBiomeId: enemyBiome.id,
    enemyBiomeName: enemyBiome.name,
    scalingStage: effectiveStage,
    scalingSource: isBoss ? 'stage-biome' : 'adaptive',
    level,
    isBoss,
    specialBoss,
    resist: template.resist || { physical: 1, magic: 1 },
    maxHp,
    attack,
    defense,
    agility,
    xpReward,
    coinReward,
  };

  if (specialBoss) {
    monster.type = `${monster.type} • Mítico`;
    monster.maxHp = Math.round(monster.maxHp * 1.48);
    monster.attack = Math.round(monster.attack * 1.22);
    monster.defense = Math.round(monster.defense * 1.12);
    monster.agility = Math.round(monster.agility * 1.06);
    monster.xpReward = Math.round(monster.xpReward * 1.35);
    monster.coinReward = Math.round(monster.coinReward * 1.28);
  }

  monster.hp = monster.maxHp;
  ensureMonsterCombatRules(monster);

  // Bosses permanecem fixos pelo andar/bioma, inclusive após derrota do herói.
  if (isBoss) return monster;

  return applyMonsterBalanceModifiers(monster, {
    stage: player.stage,
    currentBiome,
    enemyBiome,
  });
}

function getShopItemPool() {
  const stage = gameState.player.stage || 1;
  const prestige = gameState.prestige.count || 0;

  const allowedIds = [
    'potion',
    'superPotion',
    'furyPotion',
    'stonePotion',
    'windPotion',
    'arcanePotion',
  ];

  if (stage >= 8) {
    allowedIds.push('trainingScroll');
  }

  if (stage >= 15 || prestige >= 1) {
    allowedIds.push('arcaneBomb');
  }

  if (stage >= 18 || prestige >= 1) {
    allowedIds.push('fortuneIncense');
  }

  if (stage >= 25 || prestige >= 1) {
    allowedIds.push('elixir');
  }

  // Boss especial não aparece mais na loja normal.
  // Agora ele surge como Fenda Mítica rara após bosses comuns.

  return shopCatalog.filter((item) => allowedIds.includes(item.id));
}

function getTrainingScrollSkillPoints() {
  const levelBonus = Math.floor((gameState.player.level || 1) / 40);
  const stageBonus = Math.floor((gameState.player.stage || 1) / 250);

  return clamp(1 + levelBonus + stageBonus, 1, 8);
}

function getShopItemWeight(item) {
  const weights = {
    potion: 18,
    superPotion: 11,
    elixir: gameState.player.stage >= 120 ? 2 : 1,
    trainingScroll: 6,
    furyPotion: 8,
    stonePotion: 8,
    windPotion: 8,
    arcanePotion: 8,
    fortuneIncense: 5,
    arcaneBomb: 5,
    bossScroll: 1,
  };

  return weights[item.id] || 5;
}

function getShopItemCostMultiplier(item) {
  const powerMultipliers = {
    potion: 0.75,
    superPotion: 0.9,
    elixir: 1.85,
    trainingScroll: 1.05 + getTrainingScrollSkillPoints() * 0.12,
    furyPotion: 0.95,
    stonePotion: 0.9,
    windPotion: 0.9,
    arcanePotion: 0.95,
    fortuneIncense: 1.08,
    arcaneBomb: 1.05,
    bossScroll: 2.4,
  };

  return powerMultipliers[item.id] || 1;
}

function pickWeightedShopItem(pool) {
  const totalWeight = pool.reduce((sum, item) => sum + getShopItemWeight(item), 0);
  let roll = Math.random() * totalWeight;

  for (let index = 0; index < pool.length; index += 1) {
    roll -= getShopItemWeight(pool[index]);

    if (roll <= 0) {
      return index;
    }
  }

  return Math.max(0, pool.length - 1);
}

function getScaledShopItemCost(item) {
  const stage = gameState.player.stage || 1;
  const level = gameState.player.level || 1;

  const progressScale =
    1 +
    stage * 0.055 +
    level * 0.018 +
    Math.pow(stage, 0.92) * 0.045;

  return Math.max(
    1,
    Math.floor(item.cost * progressScale * getShopItemCostMultiplier(item))
  );
}

function createShopItems() {
  const pool = getShopItemPool();
  const amount = randomBetween(2, 3);
  const items = [];

  while (items.length < amount && pool.length) {
    const index = pickWeightedShopItem(pool);
    const item = { ...pool.splice(index, 1)[0] };
    item.cost = getScaledShopItemCost(item);
    items.push(item);
  }

  return items;
}

function isSpecialShop(type = gameState.shop.type) {
  return type === 'blacksmith' || type === 'arcaneSmith';
}

function getShopDurationLimit(type = gameState.shop.type) {
  return isSpecialShop(type)
    ? gameConfig.specialShopKeepBattles
    : gameConfig.shopKeepBattles;
}

function updateSpecialShopControls() {
  if (!elements.shopStayControls) return;

  const specialActive = gameState.shop.active && gameState.shop.items.length && isSpecialShop();
  elements.shopStayControls.hidden = !specialActive;

  if (!specialActive) return;

  const maximum = getShopDurationLimit();
  const remaining = Math.max(0, Number(gameState.shop.encountersLeft) || maximum);
  const label = remaining === 1 ? '1 batalha restante' : `${remaining} batalhas restantes`;

  if (elements.shopStayText) {
    elements.shopStayText.textContent = label;
  }

  if (elements.shopStayProgress) {
    elements.shopStayProgress.style.width = `${Math.max(0, Math.min(100, (remaining / maximum) * 100))}%`;
  }
}

function getShopMerchantMeta(type = gameState.shop.type) {
  return forgeMerchantCatalog[type] || forgeMerchantCatalog.consumables;
}

function resetShopVisualState() {
  document.body.classList.remove('forge-shop-active', 'forge-shop-physical', 'forge-shop-arcane');
  if (elements.shopCard) {
    elements.shopCard.classList.remove('merchant-consumables', 'merchant-blacksmith', 'merchant-arcane-smith', 'merchant-active');
  }
  if (elements.shopMerchantVisual) {
    elements.shopMerchantVisual.hidden = true;
    elements.shopMerchantVisual.innerHTML = '';
  }
  if (elements.shopTitle) elements.shopTitle.textContent = 'Loja';
  if (elements.shopStayControls) elements.shopStayControls.hidden = true;
}

function updateShopMessage(prefix = 'Loja aberta') {
  if (!gameState.shop.active || !gameState.shop.items.length) return;

  const maximum = getShopDurationLimit();
  const left = Math.max(0, Number(gameState.shop.encountersLeft) || maximum);
  const meta = getShopMerchantMeta();

  if (isSpecialShop()) {
    const battleText = left === 1 ? '1 batalha' : `${left} batalhas`;
    elements.shopStatus.textContent = `${meta.status} • ${battleText} para partir`;
    elements.shopMessage.textContent = `${prefix}. Leia as três opções com calma: o ferreiro só irá embora quando você sair ou após ${battleText}.`;
    updateSpecialShopControls();
    return;
  }

  const enemyText = left === 1 ? '1 inimigo' : `${left} inimigos`;
  elements.shopStatus.textContent = `${meta.status} • ${enemyText}`;
  elements.shopMessage.textContent = `${prefix}. Disponível por mais ${enemyText}.`;
  updateSpecialShopControls();
}

function closeShop(message = 'O vendedor foi embora. Derrote monstros para encontrar outra loja.') {
  gameState.shop.active = false;
  gameState.shop.type = 'consumables';
  gameState.shop.items = [];
  gameState.shop.encountersLeft = 0;

  elements.shopStatus.textContent = 'Nenhuma loja';
  elements.shopMessage.textContent = message;
  resetShopVisualState();
  updateSpecialShopControls();

  if (typeof hideFloatingTooltip === 'function') hideFloatingTooltip();
}

function tickShopDurationAfterBattle() {
  if (!gameState.shop.active || !gameState.shop.items.length) return;

  const maximum = getShopDurationLimit();
  gameState.shop.encountersLeft = Math.max(
    0,
    (Number(gameState.shop.encountersLeft) || maximum) - 1
  );

  if (gameState.shop.encountersLeft <= 0) {
    closeShop(
      isSpecialShop()
        ? `O ferreiro aguardou ${maximum} batalhas e precisou seguir viagem.`
        : `O comerciante esperou por ${maximum} inimigos e foi embora.`
    );
    return;
  }

  updateShopMessage(
    isSpecialShop()
      ? 'O ferreiro continua trabalhando e aguardando sua decisão'
      : 'O comerciante ainda está esperando'
  );
}

function rollMerchantType(force = false) {
  const physicalSmithAvailable = canAffordForgeMerchant('blacksmith');
  const arcaneSmithAvailable = canAffordForgeMerchant('arcaneSmith');
  const choices = [
    { type: 'consumables', weight: force ? 45 : 58 },
    ...(physicalSmithAvailable ? [{ type: 'blacksmith', weight: force ? 35 : 27 }] : []),
    ...(arcaneSmithAvailable ? [{ type: 'arcaneSmith', weight: force ? 20 : 15 }] : []),
  ];
  const total = choices.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of choices) {
    roll -= entry.weight;
    if (roll <= 0) return entry.type;
  }
  return 'consumables';
}

function maybeOpenShop(force = false) {
  const shouldOpen = force || randomBetween(1, 100) <= 38;

  if (!shouldOpen) {
    if (gameState.shop.active && gameState.shop.items.length) {
      updateShopMessage('O comerciante ainda está esperando');
      return;
    }

    elements.shopStatus.textContent = 'Nenhuma loja';
    elements.shopMessage.textContent = 'Continue derrotando monstros para encontrar um comerciante.';
    return;
  }

  if (gameState.shop.active && gameState.shop.items.length) {
    if (!isSpecialShop()) {
      gameState.shop.encountersLeft = getShopDurationLimit();
    }

    updateShopMessage(
      isSpecialShop()
        ? 'O ferreiro manteve a oficina aberta enquanto você continuou explorando'
        : force
          ? 'O boss convenceu o comerciante a permanecer'
          : 'O comerciante decidiu esperar mais'
    );
    return;
  }

  const type = rollMerchantType(force);
  const items = type === 'consumables' ? createShopItems() : createForgeOffers(type);
  const specialShopIsUseful = !isSpecialShop(type)
    || items.some((offer) => (Number(gameState.player?.coins) || 0) >= (Number(offer.cost) || 0));

  if (!items.length || !specialShopIsUseful) {
    gameState.shop.type = 'consumables';
    gameState.shop.items = createShopItems();
  } else {
    gameState.shop.type = type;
    gameState.shop.items = items;
  }

  gameState.shop.active = true;
  gameState.shop.encountersLeft = getShopDurationLimit(gameState.shop.type);
  const meta = getShopMerchantMeta();
  updateShopMessage(force ? `${meta.icon} Boss derrotado: comerciante garantido` : `${meta.icon} ${meta.title} apareceu`);

  const duration = getShopDurationLimit(gameState.shop.type);
  log(
    isSpecialShop()
      ? `${meta.icon} ${meta.title} montou a oficina. Ele ficará por até ${duration} batalhas ou até você clicar em Sair da loja.`
      : `${meta.icon} ${meta.title} apareceu e ficará disponível por mais ${duration} inimigos.`,
    'shop',
    true
  );
}

function getAvailableGearNamesForStage(slot, stage = gameState.player.stage) {
  const pools = {
    physicalWeapon: [
      { minStage: 1, names: ['Espada', 'Machado', 'Lança', 'Martelo', 'Adaga'] },
      { minStage: 31, names: ['Foice', 'Sabre'] },
      { minStage: 81, names: ['Tridente'] },
      { minStage: 151, names: ['Katana'] },
    ],

    magicWeapon: [
      { minStage: 1, names: ['Cajado', 'Varinha'] },
      { minStage: 31, names: ['Cristal Arcano'] },
      { minStage: 81, names: ['Orbe'] },
      { minStage: 151, names: ['Livro Mágico', 'Tomo Antigo'] },
    ],

    helmet: [
      { minStage: 1, names: ['Elmo', 'Capacete'] },
      { minStage: 31, names: ['Máscara'] },
      { minStage: 151, names: ['Coroa Quebrada'] },
    ],

    chest: [
      { minStage: 1, names: ['Peitoral', 'Cota'] },
      { minStage: 31, names: ['Couraça'] },
      { minStage: 151, names: ['Manto Pesado'] },
    ],

    boots: [
      { minStage: 1, names: ['Grevas', 'Botas Leves'] },
      { minStage: 31, names: ['Botas do Vento'] },
    ],

    necklace: [
      { minStage: 1, names: ['Colar', 'Pingente'] },
      { minStage: 31, names: ['Amuleto'] },
      { minStage: 81, names: ['Medalhão'] },
    ],

    bracelet: [
      { minStage: 1, names: ['Bracelete Antigo'] },
      { minStage: 31, names: ['Pulseira Rúnica'] },
    ],

    ring: [
      { minStage: 1, names: ['Anel da Precisão'] },
      { minStage: 31, names: ['Anel do Roubo de Vida', 'Anel da Fúria'] },
      { minStage: 81, names: ['Anel do Eco Arcano'] },
      { minStage: 151, names: ['Anel do Caçador'] },
    ],

    spell: [
      { minStage: 1, names: ['Bola de Fogo'] },
      { minStage: 31, names: ['Raio Congelante', 'Descarga Estática'] },
      { minStage: 81, names: ['Veneno corrosivo'] },
      { minStage: 151, names: ['Tufão'] },
    ],
  };

  const availableGroups = pools[slot]?.filter((group) => stage >= group.minStage) || [];

  const availableNames = availableGroups.flatMap((group) => group.names);

  return availableNames.length ? availableNames : gearNames[slot] || ['Item'];
}

function getEquippedGearLevel(slot) {
  const item = gameState.equipment?.[slot];
  return Number(item?.level) || 0;
}

function getGearSlotCatchUpNeed(slot, stage = gameState.player.stage) {
  const equippedLevel = getEquippedGearLevel(slot);

  if (!equippedLevel) return 2.2;

  const expectedLevel = Math.max(1, Math.round(stage * 0.72));
  const gap = expectedLevel - equippedLevel;

  if (gap >= 70) return 5.5;
  if (gap >= 45) return 4.2;
  if (gap >= 25) return 2.8;
  if (gap >= 12) return 1.6;

  return 1;
}

function getRandomGearSlotForBiome(biome) {
  const stage = gameState.player.stage || 1;

  const possibleSlots = [
    'physicalWeapon',
    'magicWeapon',
    'helmet',
    'chest',
    'boots',
    'necklace',
    'bracelet',
    'ring',
    'spell',
  ];

  const unlockedSlots = possibleSlots.filter((slot) =>
    getAvailableGearNamesForStage(slot, stage).length > 0
  );

  const baseWeights = {
    physicalWeapon: 2.2,
    magicWeapon: 2,
    spell: 1.6,
    helmet: 1.15,
    chest: 1.35,
    boots: 1.1,
    necklace: 0.9,
    bracelet: 0.9,
    ring: 0.9,
  };

  const preferredSlotByDrop = {
    sword: 'physicalWeapon',
    dagger: 'physicalWeapon',
    hammer: 'physicalWeapon',
    axe: 'physicalWeapon',
    spear: 'physicalWeapon',
    trident: 'physicalWeapon',
    katana: 'physicalWeapon',
    scythe: 'physicalWeapon',
    saber: 'physicalWeapon',
    staff: 'magicWeapon',
    wand: 'magicWeapon',
    orb: 'magicWeapon',
    book: 'magicWeapon',
    crystal: 'magicWeapon',
    spell: 'spell',
    helmet: 'helmet',
    chest: 'chest',
    boots: 'boots',
    necklace: 'necklace',
    bracelet: 'bracelet',
    ring: 'ring',
  };

  const preferredSlots = new Set(
    (biome?.preferredDrops || [])
      .map((drop) => preferredSlotByDrop[drop])
      .filter(Boolean)
  );

  const entries = unlockedSlots.map((slot) => {
    let weight = baseWeights[slot] || 1;

    if (preferredSlots.has(slot)) {
      weight *= 1.55;
    }

    if (slot === 'physicalWeapon' || slot === 'magicWeapon' || slot === 'spell') {
      weight *= getGearSlotCatchUpNeed(slot, stage);
    }

    return { slot, weight };
  });

  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const entry of entries) {
    roll -= entry.weight;

    if (roll <= 0) {
      return entry.slot;
    }
  }

  return entries[entries.length - 1]?.slot || unlockedSlots[0];
}

const mythicGearNames = {
  physicalWeapon: [
    'Espada Corta-Mundo',
    'Machado Quebra-Realidade',
    'Lança do Último Céu',
    'Foice do Eclipse',
    'Katana da Fenda',
  ],
  magicWeapon: [
    'Cajado da Tempestade Eterna',
    'Orbe do Vazio Vivo',
    'Tomo do Primeiro Arcano',
    'Cristal do Cosmos Partido',
    'Grimório das Mil Vozes',
  ],
  helmet: [
    'Elmo da Imortalidade',
    'Coroa do Rei Ausente',
    'Máscara do Sem-Rosto',
    'Capacete do Titã Celeste',
    'Diadema da Aurora Morta',
  ],
  chest: [
    'Couraça do Colosso Astral',
    'Manto do Último Guardião',
    'Peitoral do Dragão Primordial',
    'Armadura da Noite Infinita',
    'Cota do Juramento Antigo',
  ],
  boots: [
    'Botas de Voo',
    'Grevas do Relâmpago',
    'Passos do Andarilho Eterno',
    'Botas da Travessia Estelar',
    'Grevas do Horizonte Partido',
  ],
  necklace: [
    'Colar da Estrela Morta',
    'Medalhão do Sol Negro',
    'Amuleto do Coração Cósmico',
    'Pingente da Lua Esquecida',
    'Gargantilha do Destino Selado',
  ],
  bracelet: [
    'Bracelete do Tempo Partido',
    'Pulseira da Forja Eterna',
    'Bracelete das Correntes Astrais',
    'Pulseira do Juramento Rúnico',
    'Algema do Rei Demônio',
  ],
  ring: [
    'Anel do Rei Ausente',
    'Anel do Eclipse Arcano',
    'Anel da Segunda Alma',
    'Anel do Olho Infinito',
    'Anel da Coroa Quebrada',
  ],
  spell: [
    'Chama Corta-Mundo',
    'Raio do Deus Antigo',
    'Vórtice do Fim',
    'Tempestade de Mil Sóis',
    'Julgamento do Vazio',
  ],
};

function isMythicGear(item) {
  return item?.rarity === 'mythic' || item?.mythic === true;
}

function getMythicGearName(slot) {
  const names = mythicGearNames[slot] || gearNames[slot] || ['Artefato Mítico'];
  return names[randomBetween(0, names.length - 1)];
}

function getWeakestGearSlotForMythic(stage = gameState.player.stage) {
  const slots = [
    'physicalWeapon',
    'magicWeapon',
    'spell',
    'chest',
    'helmet',
    'boots',
    'ring',
    'necklace',
    'bracelet',
  ];

  const expectedLevel = Math.max(1, Math.round(stage * 0.82));

  return slots
    .map((slot) => {
      const current = gameState.equipment?.[slot];
      const currentLevel = Number(current?.level) || 0;
      const scorePenalty = current ? Math.max(0, expectedLevel - currentLevel) : expectedLevel * 1.25;
      const combatWeight = ['physicalWeapon', 'magicWeapon', 'spell'].includes(slot) ? 1.35 : 1;

      return {
        slot,
        weight: scorePenalty * combatWeight,
      };
    })
    .sort((a, b) => b.weight - a.weight)[0]?.slot || 'physicalWeapon';
}

function getSpecialBossThematicSlots(monster) {
  const name = monster?.name || '';

  if (name.includes('Pergaminho') || name.includes('Oráculo')) return ['spell', 'magicWeapon', 'bracelet'];
  if (name.includes('Relíquias') || name.includes('Caçador')) return ['ring', 'necklace', 'bracelet', 'boots'];
  if (name.includes('Eco') || name.includes('Eclipse')) return [getWeakestGearSlotForMythic(), 'physicalWeapon', 'magicWeapon'];
  if (name.includes('Ferreiro') || name.includes('Forja')) return ['physicalWeapon', 'chest', 'helmet'];
  if (name.includes('Máquinas')) return ['chest', 'bracelet', 'physicalWeapon'];
  if (name.includes('Serafim')) return ['boots', 'helmet', 'spell'];
  if (name.includes('Vazio')) return ['magicWeapon', 'ring', 'spell'];

  return [getWeakestGearSlotForMythic(), 'physicalWeapon', 'magicWeapon'];
}

function getSpecialBossMythicSlot(monster) {
  if (randomBetween(1, 100) <= 55) {
    return getWeakestGearSlotForMythic();
  }

  const slots = getSpecialBossThematicSlots(monster);
  return slots[randomBetween(0, slots.length - 1)] || getWeakestGearSlotForMythic();
}

function applyMythicSpecialStats(stats, slot, baseName) {
  if (slot === 'physicalWeapon') {
    stats.doubleStrikeChance = randomBetween(7, 13);
    stats.doubleStrikeDamagePercent = randomBetween(45, 70);
  }

  if (slot === 'magicWeapon' || slot === 'spell') {
    stats.doubleMagicChance = randomBetween(7, 13);
    stats.doubleMagicDamagePercent = randomBetween(45, 75);
  }

  if (slot === 'helmet') {
    stats.deathWardChance = randomBetween(3, 7);
    stats.maxHp = Math.round((stats.maxHp || 0) * 1.18);
  }

  if (slot === 'chest') {
    stats.damageReductionPercent = randomBetween(4, 8);
    stats.defense = Math.round((stats.defense || 0) * 1.14);
  }

  if (slot === 'boots') {
    stats.firstStrikeChance = randomBetween(5, 10);
    stats.agility = Math.round((stats.agility || 0) * 1.16);
  }

  if (slot === 'necklace') {
    stats.xpPercent = Math.max(stats.xpPercent || 0, randomBetween(14, 24));
    stats.mythicFindChance = randomBetween(2, 5);
  }

  if (slot === 'bracelet') {
    stats.mythicForgePower = randomBetween(8, 16);
  }

  if (slot === 'ring') {
    // O anel mítico é forte, mas não invalida os anéis especiais: ele mistura bônus médios,
    // enquanto os anéis antigos continuam melhores quando o jogador quer um efeito focado.
    stats.lifeStealChance = randomBetween(5, 8);
    stats.precision = randomBetween(8, 14);
    stats.bossDamagePercent = randomBetween(8, 16);
  }

  if (baseName.includes('Imortalidade')) {
    stats.deathWardChance = Math.max(stats.deathWardChance || 0, 7);
  }

  if (baseName.includes('Voo')) {
    stats.firstStrikeChance = Math.max(stats.firstStrikeChance || 0, 9);
  }
}

function createMythicGear(monsterLevel, monster = null, forcedSlot = '') {
  const slot = forcedSlot || getSpecialBossMythicSlot(monster);
  return createGear(monsterLevel, true, {
    rarityId: 'mythic',
    slot,
    mythic: true,
  });
}

function getMythicRewardChoiceSlots(monster) {
  const preferredSlots = [
    getWeakestGearSlotForMythic(),
    ...getSpecialBossThematicSlots(monster),
    'physicalWeapon',
    'magicWeapon',
    'spell',
    'chest',
    'helmet',
    'boots',
    'ring',
    'necklace',
    'bracelet',
  ];

  return [...new Set(preferredSlots)].slice(0, 3);
}

function createMythicRewardChoices(monster, count = 3) {
  const slots = getMythicRewardChoiceSlots(monster);
  const choices = [];

  while (choices.length < count) {
    const slot = slots[choices.length] || getSpecialBossMythicSlot(monster);
    choices.push(createMythicGear(monster.level, monster, slot));
  }

  return choices;
}

function getMythicDropChance(monster) {
  const stage = gameState.player.stage || 1;
  const pity = gameState.player.mythicPity || 0;
  const luckBonus = getEquipmentBonus('mythicFindChance') || 0;

  return clamp(
    26 + Math.floor(stage / 120) * 2 + pity * 9 + luckBonus,
    22,
    62
  );
}

function getSpecialBossMythicFragments(monster) {
  const stageBonus = Math.floor((gameState.player.stage || 1) / 160);
  const bossBonus = monster?.name?.includes('Relíquias') ? 1 : 0;

  return clamp(randomBetween(1, 2) + stageBonus + bossBonus, 1, 6);
}

function addMythicFragments(amount) {
  addConsumable('mythicFragment', amount);
}

function getMythicFragmentQuantity() {
  return getConsumableQuantity('mythicFragment');
}

function getMythicUpgradeFragmentCost(item) {
  if (!isMythicGear(item)) return 0;

  const upgrades = Math.max(0, (item.level || 1) - (item.mythicBaseLevel || item.level || 1));
  const baseCost = gameConfig.mythicUpgradeFragmentBaseCost || 5;
  const maxCost = gameConfig.mythicUpgradeFragmentMaxCost || 50;

  // Mítico é para ser uma decisão rara: as primeiras melhorias já custam caro
  // e o preço sobe rápido conforme o mesmo item é lapidado.
  return clamp(
    baseCost + Math.floor(upgrades * 1.4) + Math.floor(upgrades / 4) * 2,
    baseCost,
    maxCost
  );
}

function spendMythicFragments(amount) {
  for (let i = 0; i < amount; i += 1) {
    removeConsumable('mythicFragment');
  }
}

function maybeAwardSpecialBossRewards(monster) {
  if (!monster?.specialBoss) return;

  gameState.player.specialBossesDefeated = (gameState.player.specialBossesDefeated || 0) + 1;
  gameState.player.mythicPity = (gameState.player.mythicPity || 0) + 1;

  const fragments = getSpecialBossMythicFragments(monster);
  addMythicFragments(fragments);

  const chance = getMythicDropChance(monster);
  const guaranteed = gameState.player.mythicPity >= 4;
  const droppedMythic = guaranteed || randomBetween(1, 100) <= chance;
  const pityProgress = Math.min(gameState.player.mythicPity, 4);

  log(
    `${monster.name} deixou ${fragments} Fragmento(s) Mítico(s).`,
    'reward',
    true
  );

  if (!droppedMythic) {
    log(
      `Nenhum item Mítico apareceu desta vez. Chance atual: ${chance}%. Garantia: ${pityProgress}/4.`,
      'system',
      true
    );

    showAchievementNotice({
      title: 'Boss especial derrotado',
      subtitle: monster.name,
      message: `Você recebeu +${fragments} Fragmento(s) Mítico(s). Nenhum item Mítico apareceu desta vez. Chance atual: ${chance}%. Garantia: ${pityProgress}/4.`,
      type: 'fragment',
    });
    return;
  }

  const choices = createMythicRewardChoices(monster, 3);
  gameState.player.mythicPity = 0;

  log(
    `RECOMPENSA MÍTICA: escolha 1 entre 3 itens Míticos deixados por ${monster.name}.`,
    'reward',
    true
  );

  showAchievementNotice({
    title: 'Boss especial derrotado',
    subtitle: monster.name,
    message: `Você recebeu +${fragments} Fragmento(s) Mítico(s). Um item Mítico apareceu — escolha 1 entre 3 opções.`,
    type: 'mythic',
  });

  openMythicChoiceModal(monster, choices);
}

function createGear(monsterLevel, bossDrop = false, options = {}) {
  const rarity = options.rarityId
    ? getRarityById(options.rarityId)
    : bossDrop
      ? getBossRarity()
      : getRarity();

  const biome = getDungeonBiome(gameState.player.stage);
  const slot = options.slot || getRandomGearSlotForBiome(biome);
  const namePool = getAvailableGearNamesForStage(slot, gameState.player.stage);

  const isMythic = rarity.id === 'mythic' || options.mythic === true;
  const baseName = isMythic
    ? getMythicGearName(slot)
    : namePool[randomBetween(0, namePool.length - 1)];

  const stageTargetLevel = Math.round((gameState.player.stage || 1) * (isMythic ? 0.92 : 0.78));
  const heroTargetLevel = Math.round((gameState.player.level || 1) * (isMythic ? 1.18 : 1.06));
  const catchUpTargetLevel = Math.max(monsterLevel, stageTargetLevel, heroTargetLevel);
  const level = Math.max(1, catchUpTargetLevel + randomBetween(isMythic ? 6 : bossDrop ? 0 : -2, isMythic ? 14 : bossDrop ? 5 : 3));
  const power = Math.max(1, Math.round((level + 3) * rarity.multiplier));

  const stats = {};

  if (slot === 'physicalWeapon') {
    stats.attack = Math.max(2, Math.round(power * (isMythic ? 1.72 : 1.5)));

    if (rarity.id === 'epic' || rarity.id === 'legendary' || rarity.id === 'mythic') {
      stats.critChance = randomBetween(isMythic ? 6 : 3, isMythic ? 12 : 8);
    }
  }

  if (slot === 'magicWeapon') {
    stats.magic = Math.max(2, Math.round(power * (isMythic ? 1.72 : 1.5)));
    stats.magicChance = randomBetween(isMythic ? 5 : 2, isMythic ? 10 : 6);

    if (rarity.id === 'epic' || rarity.id === 'legendary' || rarity.id === 'mythic') {
      stats.magicDamagePercent = randomBetween(isMythic ? 14 : 6, isMythic ? 26 : 16);
    }
  }

  if (slot === 'helmet') {
    stats.maxHp = Math.max(14, Math.round(power * (isMythic ? 6.4 : 5.2)));
  }

  if (slot === 'chest') {
    stats.defense = Math.max(2, Math.round(power * (isMythic ? 1.45 : 1.25)));
    stats.maxHp = Math.max(8, Math.round(power * (isMythic ? 3.1 : 2.5)));
  }

  if (slot === 'boots') {
    stats.agility = Math.max(2, Math.round(power * (isMythic ? 1.22 : 1)));
  }

  if (slot === 'necklace') {
    stats.xpPercent = randomBetween(isMythic ? 14 : 4, isMythic ? 24 : 12);
  }

  if (slot === 'bracelet') {
    const possibleStats = ['attack', 'magic', 'defense', 'agility', 'maxHp'];
    const chosen = possibleStats[randomBetween(0, possibleStats.length - 1)];

    if (chosen === 'maxHp') {
      stats[chosen] = Math.max(10, Math.round(power * (isMythic ? 5 : 4)));
    } else {
      stats[chosen] = Math.max(2, Math.round(power * (isMythic ? 1.35 : 1.1)));
    }
  }

  if (slot === 'ring') {
    if (isMythic) {
      stats.precision = randomBetween(10, 16);
    } else {
      applyRingSpecialStats(stats, baseName, rarity.id);
    }
  }

  if (slot === 'spell') {
    stats.magic = Math.max(2, Math.round(power * (isMythic ? 1.45 : 1.2)));
    stats.magicChance = randomBetween(isMythic ? 8 : 4, isMythic ? 14 : 10);
    stats.magicDamagePercent = randomBetween(isMythic ? 18 : 5, isMythic ? 32 : 18);
  }

  if (isMythic) {
    applyMythicSpecialStats(stats, slot, baseName);
  }

  return {
    uid: uid(isMythic ? 'mythic' : 'gear'),
    name: isMythic ? baseName : `${baseName} ${rarity.name}`,
    slot,
    rarity: rarity.id,
    level,
    mythic: isMythic,
    mythicBaseLevel: isMythic ? level : undefined,
    stats,
    value: Math.max(12, Math.round(power * (isMythic ? 14 : 6))),
  };
}

function applyRingSpecialStats(stats, baseName, rarityId) {
  const ringBaseName = getRingBaseName(baseName);

  if (!ringBaseName) {
    stats.precision = 4;
    return;
  }

  const ringConfig = ringEffectByName[ringBaseName];
  const rarityStats = ringConfig.statsByRarity[rarityId] || ringConfig.statsByRarity.common;

  Object.keys(stats).forEach((key) => {
    delete stats[key];
  });

  Object.assign(stats, rarityStats);
}

function getGearScore(item) {
  if (!item || !item.stats) return 0;

  return (
    (item.stats.attack || 0) * 3.2 +
    (item.stats.magic || 0) * 3.1 +
    (item.stats.defense || 0) * 2.6 +
    (item.stats.agility || 0) * 2 +
    (item.stats.maxHp || 0) * 0.22 +
    (item.stats.critChance || 0) * 2.1 +
    (item.stats.magicChance || 0) * 1.8 +
    (item.stats.magicDamagePercent || 0) * 1.7 +
    (item.stats.xpPercent || 0) * 1.2 +

    (item.stats.lifeStealChance || 0) * 2.2 +
    (item.stats.lifeStealAmountPercent || 0) * 1.4 +
    (item.stats.furyPower || 0) * 1.8 +
    (item.stats.precision || 0) * 1.8 +
    (item.stats.magicEchoChance || 0) * 2.1 +
    (item.stats.magicEchoDamagePercent || 0) * 1.2 +
    (item.stats.bossDamagePercent || 0) * 1.7 +
    (item.stats.doubleStrikeChance || 0) * 2.5 +
    (item.stats.doubleStrikeDamagePercent || 0) * 1.3 +
    (item.stats.doubleMagicChance || 0) * 2.6 +
    (item.stats.doubleMagicDamagePercent || 0) * 1.35 +
    (item.stats.deathWardChance || 0) * 2.4 +
    (item.stats.damageReductionPercent || 0) * 2.1 +
    (item.stats.firstStrikeChance || 0) * 1.8 +
    (item.stats.mythicFindChance || 0) * 3 +
    (item.stats.mythicForgePower || 0) * 2
  );
}

function getRarityCostMultiplier(rarityId) {
  const multipliers = {
    common: 1,
    uncommon: 1.35,
    rare: 1.9,
    epic: 2.8,
    legendary: 4,
    mythic: 4.85,
  };

  return multipliers[rarityId] || 1;
}

function getForgePower(item) {
  const player = gameState.player;
  const prestige = gameState.prestige;

  const itemLevel = item?.level || 1;
  const stage = player.stage || 1;
  const bosses = player.bossesDefeated || 0;
  const prestigeCount = prestige.count || 0;

  const stageBonus = Math.floor(stage / 20) * 0.12;
  const bossBonus = Math.floor(bosses / 10) * 0.10;
  const prestigeBonus = prestigeCount * 0.08;
  const itemLevelBonus = Math.floor(itemLevel / 10) * 0.06;
  const mythicForgeBonus = (getEquipmentBonus('mythicForgePower') || 0) / 100;

  return clamp(
    1 + stageBonus + bossBonus + prestigeBonus + itemLevelBonus + mythicForgeBonus,
    1,
    5
  );
}

function getGearUpgradeCost(item) {
  if (!item) return 0;

  const rarityMultiplier = getRarityCostMultiplier(item.rarity);
  const level = item.level || 1;

  const prestigeDiscount = Math.min(0.20, (gameState.prestige.count || 0) * 0.018);
  const bossDiscount = Math.min(0.16, Math.floor((gameState.player.bossesDefeated || 0) / 20) * 0.018);
  const discountMultiplier = 1 - prestigeDiscount - bossDiscount;

  const itemPower = Math.max(1, getGearScore(item));
  const stageFactor = 1 + Math.min(3.2, (gameState.player.stage || 1) / 180);
  const baseCost = 95 + level * 38 + Math.pow(level, 1.18) * 12 + itemPower * (5.2 + level * 0.32);
  const normalCost = Math.max(
    35,
    Math.round(baseCost * rarityMultiplier * stageFactor * discountMultiplier)
  );

  if (isMythicGear(item)) {
    return Math.max(
      120,
      Math.round(normalCost * (gameConfig.mythicUpgradeCoinCostMultiplier || 0.55))
    );
  }

  return normalCost;
}

function getStatUpgradeAmount(stat, item) {
  const rarity = getRarityById(item.rarity);
  const forgePower = getForgePower(item);
  const level = item.level || 1;

  if (stat === 'attack') {
    return Math.max(
      2,
      Math.round((2.2 + level * 0.12) * rarity.multiplier * forgePower)
    );
  }

  if (stat === 'magic') {
    return Math.max(
      2,
      Math.round((2.1 + level * 0.12) * rarity.multiplier * forgePower)
    );
  }

  if (stat === 'defense') {
    return Math.max(
      2,
      Math.round((1.8 + level * 0.10) * rarity.multiplier * forgePower)
    );
  }

  if (stat === 'agility') {
    return Math.max(
      1,
      Math.round((1.4 + level * 0.08) * rarity.multiplier * forgePower)
    );
  }

  if (stat === 'maxHp') {
    return Math.max(
      12,
      Math.round((10 + level * 0.7) * rarity.multiplier * forgePower)
    );
  }

  if (stat === 'critChance') {
    return clamp(
      Math.round(rarity.multiplier * forgePower * 0.45),
      1,
      3
    );
  }

  if (stat === 'lifeStealChance') return 1;
  if (stat === 'lifeStealAmountPercent') return 1;

  if (stat === 'furyPower') return 1;
  if (stat === 'precision') return 1;

  if (stat === 'magicEchoChance') return 1;
  if (stat === 'magicEchoDamagePercent') return 2;

  if (stat === 'bossDamagePercent') return 2;

  if (stat === 'doubleStrikeChance') return 1;
  if (stat === 'doubleStrikeDamagePercent') return 2;
  if (stat === 'doubleMagicChance') return 1;
  if (stat === 'doubleMagicDamagePercent') return 2;
  if (stat === 'deathWardChance') return 1;
  if (stat === 'damageReductionPercent') return 1;
  if (stat === 'firstStrikeChance') return 1;
  if (stat === 'mythicFindChance') return 1;
  if (stat === 'mythicForgePower') return 2;

  if (stat === 'xpPercent') return 1;
  if (stat === 'magicChance') return 1;
  if (stat === 'magicDamagePercent') return 2;

  return Math.max(
    1,
    Math.round(rarity.multiplier * forgePower)
  );
}


function getMythicUpgradeGainMultiplier(stat) {
  const mainStats = ['attack', 'magic'];
  const survivalStats = ['defense', 'maxHp'];
  const speedStats = ['agility'];
  const damagePercentStats = [
    'magicDamagePercent',
    'bossDamagePercent',
    'doubleStrikeDamagePercent',
    'doubleMagicDamagePercent',
    'damageReductionPercent',
  ];
  const specialChanceStats = [
    'critChance',
    'magicChance',
    'lifeStealChance',
    'lifeStealAmountPercent',
    'furyPower',
    'precision',
    'magicEchoChance',
    'magicEchoDamagePercent',
    'doubleStrikeChance',
    'doubleMagicChance',
    'deathWardChance',
    'firstStrikeChance',
    'mythicFindChance',
    'mythicForgePower',
    'xpPercent',
  ];

  if (mainStats.includes(stat)) return 3.15;
  if (survivalStats.includes(stat)) return 2.75;
  if (speedStats.includes(stat)) return 2.35;
  if (damagePercentStats.includes(stat)) return 1.8;
  if (specialChanceStats.includes(stat)) return 1.25;

  return 2.2;
}

function applyMythicUpgradeGain(stat, amount, item) {
  if (!isMythicGear(item)) return amount;

  const multiplier = getMythicUpgradeGainMultiplier(stat);
  return Math.max(amount + 1, Math.round(amount * multiplier));
}

function getForgeUpgradeGains(item) {
  const previewItem = {
    ...item,
    level: (item.level || 1) + 1,
  };

  const gains = {};

  Object.keys(item.stats || {}).forEach((stat) => {
    gains[stat] = applyMythicUpgradeGain(stat, getStatUpgradeAmount(stat, previewItem), item);
  });

  return gains;
}

function getForgeUpgradePreview(item) {
  const gains = getForgeUpgradeGains(item);
  return formatStats(gains);
}

async function upgradeEquippedGear(slot) {
  const equippedItem = gameState.equipment[slot];

  if (!equippedItem) {
    log('Não há equipamento nesse espaço para melhorar.', 'system');
    return;
  }

  const cost = getGearUpgradeCost(equippedItem);
  const fragmentCost = getMythicUpgradeFragmentCost(equippedItem);

  if (gameState.player.coins < cost) {
    log(`Saldo insuficiente. Você precisa de ${formatMoney(cost)} para melhorar este equipamento.`, 'shop', true);
    return;
  }

  if (fragmentCost > 0 && getMythicFragmentQuantity() < fragmentCost) {
    log(
      `Este item Mítico precisa de ${fragmentCost} Fragmento(s) Mítico(s) para ser melhorado. Você tem ${getMythicFragmentQuantity()}.`,
      'shop',
      true
    );
    return;
  }

  const item = gameState.inventory.gear.find((gear) => gear.uid === equippedItem.uid) || equippedItem;
  const applyUpgrade = () => {
    item.level += 1;
    const gains = getForgeUpgradeGains(item);

    Object.entries(gains).forEach(([stat, amount]) => {
      item.stats[stat] += amount;
    });

    normalizeSpecialGearStats(item);
    item.value += Math.round(cost * (isMythicGear(item) ? 0.55 : 0.35));
    gameState.equipment[slot] = item;

    return gains;
  };

  // Reserva o custo para impedir duas melhorias com os mesmos recursos.
  gameState.player.coins -= cost;
  if (fragmentCost > 0) spendMythicFragments(fragmentCost);
  updateStats();

  let gains = {};

  if (isMythicGear(item)) {
    await showMythicEffectActivation(
      'Forja Mítica',
      `-${fragmentCost} Fragmento(s)`,
      'player',
      () => {
        gains = applyUpgrade();
      }
    );
  } else {
    gains = applyUpgrade();
    updateStats();
  }

  const fragmentText = fragmentCost > 0 ? ` e ${fragmentCost} Fragmento(s) Mítico(s)` : '';

  log(
    `Forja concluída! ${formatGearName(item)} subiu para o nível ${item.level} usando ${formatMoney(cost)}${fragmentText}. Ganhos: ${formatStats(gains)}.`,
    'equip',
    true
  );

  updateStats();
}

function addConsumable(itemId, quantity = 1) {
  const catalogItem = shopCatalog.find((item) => item.id === itemId);
  if (!catalogItem) return;

  const existing = gameState.inventory.items.find((item) => item.id === itemId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    gameState.inventory.items.push({
      id: itemId,
      quantity,
    });
  }
}

function addGear(item) {
  gameState.inventory.gear.unshift(item);
  const current = gameState.equipment[item.slot];
  if (!current || getGearScore(item) > getGearScore(current)) {
    equipGear(item.uid, true);
  } else {
    log(`Você encontrou ${formatGearName(item)}, mas guardou no inventário.`, 'reward', true);
  }
}

function removeConsumable(itemId) {
  const index = gameState.inventory.items.findIndex((item) => item.id === itemId);
  if (index < 0) return;

  gameState.inventory.items[index].quantity -= 1;
  if (gameState.inventory.items[index].quantity <= 0) {
    gameState.inventory.items.splice(index, 1);
  }
}

function getConsumableQuantity(itemId) {
  return gameState.inventory.items.find((item) => item.id === itemId)?.quantity || 0;
}

function getHealingAmount(item) {
  const maxHp = getPlayerMaxHp();
  const missingHp = Math.max(0, maxHp - gameState.player.hp);

  if (item.type === 'fullHeal') {
    return Math.min(missingHp, Math.max(1, Math.round(missingHp)));
  }

  const percentHeal = item.healPercent
    ? Math.round(maxHp * item.healPercent)
    : item.healAmount || 0;

  const baseHealing = Math.max(item.minHeal || 0, percentHeal);
  return Math.min(missingHp, Math.max(1, Math.round(baseHealing)));
}

const pendingHeroSupportConsumables = [];
let processingHeroSupportConsumables = false;
let heroSupportPhaseActive = false;

function getPendingHeroSupportCount(itemId) {
  return pendingHeroSupportConsumables.filter((queuedId) => queuedId === itemId).length;
}

function queueHeroSupportConsumable(itemId) {
  const item = shopCatalog.find((catalogItem) => catalogItem.id === itemId);
  if (!item) return false;

  const availableQuantity = getConsumableQuantity(itemId) - getPendingHeroSupportCount(itemId);
  if (availableQuantity <= 0) {
    log(`Você não tem outra unidade de ${item.name} disponível para preparar.`, 'shop', true);
    return false;
  }

  pendingHeroSupportConsumables.push(itemId);
  log(`${item.name} preparada para o próximo turno do herói.`, 'shop', true);
  updateStats();
  return true;
}

async function applyHeroSupportConsumableNow(itemId, source = 'manual') {
  const item = shopCatalog.find((catalogItem) => catalogItem.id === itemId);
  if (!item || getConsumableQuantity(itemId) <= 0) return false;

  if (item.type === 'heal' || item.type === 'fullHeal') {
    if (gameState.player.hp >= getPlayerMaxHp()) return false;

    removeConsumable(itemId);
    updateStats();

    let healed = 0;

    await showHeroPotionVisual(item, item.shopName || item.name, () => {
      const hpBefore = gameState.player.hp;
      const maxHp = getPlayerMaxHp();

      gameState.player.hp = Math.min(maxHp, gameState.player.hp + getHealingAmount(item));
      healed = Math.max(0, gameState.player.hp - hpBefore);
    });

    if (healed > 0) {
      await applyEnemyResponseToHealing(healed, item);
    }

    log(
      source === 'auto'
        ? `Uso automático: ${item.name} recuperou ${formatCompactNumber(healed)} HP.`
        : item.type === 'fullHeal'
          ? `Você usou ${item.name} e restaurou toda a vida.`
          : `Você usou ${item.name} e recuperou ${formatCompactNumber(healed)} HP.`,
      'shop',
      true
    );

    return healed > 0;
  }

  if (item.type === 'buff') {
    if ((gameState.player.buffs?.[item.buff] || 0) > 0) return false;

    removeConsumable(itemId);
    updateStats();

    await showHeroPotionVisual(item, item.shopName || item.name, () => {
      gameState.player.buffs[item.buff] = Math.max(
        gameState.player.buffs[item.buff] || 0,
        item.duration || 3
      );
      updateStats();
    });

    log(
      item.buff === 'fortune'
        ? (source === 'auto'
            ? `Automação: ${item.name} ativado por ${item.duration || 8} lutas. Ganho de moedas aumentado em +40% e em bosses +80%.`
            : `${item.name} ativado por ${item.duration || 8} lutas. Ganho de moedas aumentado em +40% e em bosses +80%.`)
        : (source === 'auto'
            ? `Automação: ${item.name} usada por ${item.duration || 5} lutas.`
            : `${item.name} ativada por ${item.duration || 3} lutas.`),
      'shop',
      true
    );

    return true;
  }

  return false;
}

async function processPendingHeroSupportConsumables() {
  if (processingHeroSupportConsumables) return;

  processingHeroSupportConsumables = true;

  try {
    // Usa shift em loop para também pegar itens clicados enquanto outra animação está rodando.
    while (pendingHeroSupportConsumables.length > 0) {
      const itemId = pendingHeroSupportConsumables.shift();
      await applyHeroSupportConsumableNow(itemId, 'manual');
    }
  } finally {
    processingHeroSupportConsumables = false;
  }
}

async function runHeroPreAttackSupportPhase() {
  heroSupportPhaseActive = true;

  try {
    // Ações manuais têm prioridade. Assim a cura automática não gasta outra poção à toa.
    await processPendingHeroSupportConsumables();
    await autoUseEmergencyHealing();
    await refreshAutoBuffPotions();

    // Captura também qualquer poção clicada enquanto as animações acima aconteciam.
    await processPendingHeroSupportConsumables();
    await waitForCardEffects();
  } finally {
    heroSupportPhaseActive = false;
  }
}

async function autoUseEmergencyHealing() {
  if (!gameState.ui?.autoUse?.heal) return false;

  const maxHp = getPlayerMaxHp();
  const hpPercent = maxHp > 0 ? gameState.player.hp / maxHp : 0;
  let itemId = '';

  if (gameState.player.hp <= 0 && getConsumableQuantity('elixir') > 0) {
    itemId = 'elixir';
  } else if (gameState.player.hp <= 0 && getConsumableQuantity('superPotion') > 0) {
    itemId = 'superPotion';
  } else if (hpPercent <= 0.12 && getConsumableQuantity('elixir') > 0) {
    itemId = 'elixir';
  } else if (hpPercent <= 0.28 && getConsumableQuantity('superPotion') > 0) {
    itemId = 'superPotion';
  } else if (hpPercent <= 0.40 && getConsumableQuantity('potion') > 0) {
    itemId = 'potion';
  }

  if (!itemId) return false;

  return applyHeroSupportConsumableNow(itemId, 'auto');
}


function getBuffAutoUseItemId(key) {
  const map = {
    fury: 'furyPotion',
    stone: 'stonePotion',
    wind: 'windPotion',
    arcane: 'arcanePotion',
  };

  return map[key] || '';
}

function getConsumableVisualColor(item) {
  const colors = {
    potion: 'rgba(99, 220, 145, 0.96)',
    superPotion: 'rgba(255, 116, 166, 0.96)',
    elixir: 'rgba(247, 201, 85, 0.98)',
    furyPotion: 'rgba(255, 138, 53, 0.98)',
    stonePotion: 'rgba(180, 170, 150, 0.96)',
    windPotion: 'rgba(110, 225, 255, 0.96)',
    arcanePotion: 'rgba(155, 119, 255, 0.98)',
    fortuneIncense: 'rgba(255, 216, 107, 0.98)',
    arcaneBomb: 'rgba(255, 93, 103, 0.98)',
  };

  return colors[item?.id] || 'rgba(155, 119, 255, 0.98)';
}

function showHeroPotionVisual(item, label = '', onApply = null) {
  // Poções, curas e buffs pertencem ao herói e sempre iluminam o card do herói.
  // A fila global garante que isso nunca se sobreponha ao golpe recebido ou ao ataque.
  const displayCard = document.querySelector('.hero-card');

  if (!displayCard || !item) {
    if (typeof onApply === 'function') onApply();
    return Promise.resolve();
  }

  const runPotionVisual = () => {
    const color = getConsumableVisualColor(item);
    displayCard.style.setProperty('--potion-color', color);
    displayCard.style.setProperty(
      '--potion-color-soft',
      color.replace('0.98', '0.24').replace('0.96', '0.24')
    );

    pulseCombatCard(displayCard, 'combat-card-potion', 900);

    const center = getCombatTargetCenter(displayCard);
    const visual = document.createElement('div');
    visual.className = 'potion-use-indicator-screen';
    visual.style.setProperty('--potion-x', `${center.x}px`);
    visual.style.setProperty('--potion-y', `${center.y}px`);
    visual.style.setProperty('--potion-color', color);

    const safeLabel = escapeAttr(label || item.name || 'Poção');
    visual.innerHTML = item.image
      ? `
        <img src="${escapeAttr(item.image)}" alt="${safeLabel}" loading="lazy" decoding="async" onerror="this.hidden=true; this.nextElementSibling.hidden=false;" />
        <span hidden>${item.icon || '🧪'}</span>
        <strong>${safeLabel}</strong>
      `
      : `<span>${item.icon || '🧪'}</span><strong>${safeLabel}</strong>`;

    document.body.appendChild(visual);
  };

  return queueCardEffect(displayCard, runPotionVisual, 1050, 100, {
    apply: onApply,
    // A poção só altera o HP/buff depois que a animação principal terminou.
    applyDelay: 950,
  });
}

function showLifeStealVisual(amount, onApply = null) {
  // O roubo de vida cura o herói, portanto o feedback acontece no card do herói.
  // Ele só é chamado depois de um ataque realmente acertar e causar dano.
  const displayCard = document.querySelector('.hero-card');

  if (!displayCard) {
    if (typeof onApply === 'function') onApply();
    return Promise.resolve();
  }

  const runLifeStealVisual = () => {
    pulseCombatCard(displayCard, 'combat-card-heal', 780);

    const center = getCombatTargetCenter(displayCard);
    const visual = document.createElement('div');
    visual.className = 'life-steal-indicator-screen';
    visual.style.setProperty('--life-x', `${center.x}px`);
    visual.style.setProperty('--life-y', `${center.y}px`);
    visual.innerHTML = `<span>💚</span><strong>+${amount} HP</strong><small>Roubo de vida</small>`;

    document.body.appendChild(visual);
  };

  return queueCardEffect(displayCard, runLifeStealVisual, 1000, 100, {
    apply: onApply,
    // A cura entra somente ao final da animação de roubo de vida.
    applyDelay: 900,
  });
}

async function tryUseAutoBuffPotion(key, reason = 'auto') {
  if (key === 'heal') return false;
  if (!gameState.ui?.autoUse?.[key]) return false;

  const itemId = getBuffAutoUseItemId(key);
  if (!itemId || getConsumableQuantity(itemId) <= 0) return false;

  const item = shopCatalog.find((catalogItem) => catalogItem.id === itemId);
  if (!item || item.type !== 'buff') return false;
  if ((gameState.player.buffs?.[item.buff] || 0) > 0) return false;

  return applyHeroSupportConsumableNow(itemId, 'auto');
}

async function refreshAutoBuffPotions() {
  for (const key of ['fury', 'stone', 'wind', 'arcane']) {
    await tryUseAutoBuffPotion(key, 'auto');
  }
}

function getRandomConsumableDrop(monster) {
  const roll = randomBetween(1, 100);

  if (monster?.isBoss) {
    if (roll <= 35) return 'superPotion';
    if (roll <= 58) return 'furyPotion';
    if (roll <= 76) return 'stonePotion';
    if (roll <= 90) return 'windPotion';
    if (roll <= 97) return 'arcaneBomb';
    return 'elixir';
  }

  if (roll <= 58) return 'potion';
  if (roll <= 72) return 'superPotion';
  if (roll <= 82) return 'furyPotion';
  if (roll <= 90) return 'stonePotion';
  if (roll <= 97) return 'windPotion';
  return 'arcaneBomb';
}

function maybeDropConsumable(monster) {
  const chance = monster?.isBoss ? 65 : 18;

  if (randomBetween(1, 100) > chance) return;

  const itemId = getRandomConsumableDrop(monster);
  const item = shopCatalog.find((catalogItem) => catalogItem.id === itemId);

  if (!item) return;

  addConsumable(itemId);
  log(`Drop extra: você encontrou ${item.name}.`, 'reward');
}

function formatStats(stats) {
  const labels = {
    attack: 'Ataque',
    magic: 'Magia',
    defense: 'Defesa',
    agility: 'Agilidade',
    maxHp: 'Vida',
    critChance: 'Crítico',
    xpPercent: 'XP',
    magicChance: 'Chance de Magia',
    magicDamagePercent: 'Dano Mágico',

    lifeStealChance: 'Chance de Roubo de Vida',
    lifeStealAmountPercent: 'Vida Roubada',
    furyPower: 'Fúria',
    precision: 'Precisão',
    magicEchoChance: 'Chance de Eco Arcano',
    magicEchoDamagePercent: 'Dano do Eco Arcano',
    bossDamagePercent: 'Dano contra Boss',
    doubleStrikeChance: 'Chance de Golpe Duplo',
    doubleStrikeDamagePercent: 'Dano do Golpe Duplo',
    doubleMagicChance: 'Chance de Magia Dupla',
    doubleMagicDamagePercent: 'Dano da Magia Dupla',
    deathWardChance: 'Proteção contra Morte',
    damageReductionPercent: 'Redução de Dano',
    firstStrikeChance: 'Iniciativa',
    mythicFindChance: 'Achado Mítico',
    mythicForgePower: 'Forja Mítica',
  };

  const percentStats = [
    'xpPercent',
    'magicChance',
    'magicDamagePercent',
    'lifeStealChance',
    'lifeStealAmountPercent',
    'furyPower',
    'precision',
    'magicEchoChance',
    'magicEchoDamagePercent',
    'bossDamagePercent',
    'doubleStrikeChance',
    'doubleStrikeDamagePercent',
    'doubleMagicChance',
    'doubleMagicDamagePercent',
    'deathWardChance',
    'damageReductionPercent',
    'firstStrikeChance',
    'mythicFindChance',
    'mythicForgePower',
  ];

  return Object.entries(stats)
    .map(([key, value]) => {
      const label = labels[key] || key;
      const suffix = percentStats.includes(key) ? '%' : '';

      const formattedValue = percentStats.includes(key)
        ? formatCompactNumber(value, 1)
        : formatCompactNumber(value);

      return `+${formattedValue}${suffix} ${label}`;
    })

    .join(' • ');
}

function getMythicSpecialEffectSummary(item) {
  const stats = item?.stats || {};

  if (stats.doubleStrikeChance) {
    return `Golpe Duplo: ${formatCompactNumber(stats.doubleStrikeChance, 1)}% de chance de causar outro golpe com ${formatCompactNumber(stats.doubleStrikeDamagePercent || 50, 1)}% do dano.`;
  }

  if (stats.doubleMagicChance) {
    return `Magia Dupla: ${formatCompactNumber(stats.doubleMagicChance, 1)}% de chance de repetir magia com ${formatCompactNumber(stats.doubleMagicDamagePercent || 50, 1)}% do dano.`;
  }

  if (stats.deathWardChance) {
    return `Proteção contra Morte: ${formatCompactNumber(stats.deathWardChance, 1)}% de chance de salvar o herói de uma queda fatal.`;
  }

  if (stats.damageReductionPercent) {
    return `Redução de Dano: diminui ${formatCompactNumber(stats.damageReductionPercent, 1)}% do dano recebido.`;
  }

  if (stats.firstStrikeChance) {
    return `Iniciativa: ${formatCompactNumber(stats.firstStrikeChance, 1)}% de chance de agir antes do inimigo.`;
  }

  if (stats.mythicFindChance) {
    return `Achado Mítico: +${formatCompactNumber(stats.mythicFindChance, 1)}% de chance de encontrar itens míticos.`;
  }

  if (stats.mythicForgePower) {
    return `Forja Mítica: +${formatCompactNumber(stats.mythicForgePower, 1)}% de força ao melhorar equipamentos míticos.`;
  }

  if (stats.lifeStealChance || stats.precision || stats.bossDamagePercent) {
    return 'Anel Mítico: combina roubo de vida, precisão e dano contra bosses.';
  }

  return 'Poder Mítico: efeito raro exclusivo de boss especial.';
}

function escapeAttr(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function getGearFallbackIcon(slot) {
  const icons = {
    physicalWeapon: '⚔️',
    magicWeapon: '🔮',
    helmet: '🪖',
    chest: '🛡️',
    boots: '🥾',
    necklace: '📿',
    bracelet: '💫',
    ring: '💍',
    spell: '✨',
  };

  return icons[slot] || '🎒';
}

function getGearBaseName(item) {
  if (!item?.name) return '';

  return Object.keys(gearImageByBaseName)
    .sort((a, b) => b.length - a.length)
    .find((name) => item.name.startsWith(name)) || '';
}

function getGearImagePath(item) {
  if (!item) return '';

  const baseName = getGearBaseName(item);

  if (baseName) {
    return `${gearImageBasePath}${gearImageByBaseName[baseName]}`;
  }

  return `${gearImageBasePath}${item.slot}.png`;
}

function gearImageTag(item) {
  const fallbackIcon = escapeAttr(getGearFallbackIcon(item?.slot));
  const imagePath = getGearImagePath(item);
  const itemName = escapeAttr(item?.name || 'Equipamento');

  const forgeMark = item?.forgeMark;
  return `
    <span class="gear-image-frame ${forgeMark ? `has-forge-mark forge-tone-${escapeAttr(forgeMark.tone || 'forge')}` : ''}">
      <img
        class="gear-image"
        src="${escapeAttr(imagePath)}"
        alt="${itemName}"
        loading="lazy"
        decoding="async"
        onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
      />
      <span class="gear-fallback-icon" hidden>${fallbackIcon}</span>
      ${forgeMark ? `<span class="forge-mark-emblem" title="${escapeAttr(forgeMark.name)}">${escapeAttr(forgeMark.icon || '⚒️')}</span>` : ''}
    </span>
  `;
}


const spellVisualByBaseName = {
  'Bola de Fogo': {
    className: 'fire',
    label: 'Fogo',
    emoji: '🔥',
    color: 'rgba(255, 138, 53, 0.95)',
    softColor: 'rgba(255, 138, 53, 0.30)',
  },
  'Raio Congelante': {
    className: 'ice',
    label: 'Gelo',
    emoji: '❄️',
    color: 'rgba(103, 215, 255, 0.95)',
    softColor: 'rgba(103, 215, 255, 0.30)',
  },
  'Descarga Estática': {
    className: 'lightning',
    label: 'Raio',
    emoji: '⚡',
    color: 'rgba(247, 201, 85, 0.98)',
    softColor: 'rgba(247, 201, 85, 0.30)',
  },
  'Veneno corrosivo': {
    className: 'poison',
    label: 'Veneno',
    emoji: '☠️',
    color: 'rgba(99, 220, 145, 0.98)',
    softColor: 'rgba(99, 220, 145, 0.28)',
  },
  'Tufão': {
    className: 'wind',
    label: 'Vento',
    emoji: '🌪️',
    color: 'rgba(255, 255, 255, 0.98)',
    softColor: 'rgba(255, 255, 255, 0.30)',
  },
};

function getActiveSpellItem() {
  return gameState.equipment?.spell || null;
}

function getSpellBaseName(spellItem = getActiveSpellItem()) {
  const itemName = spellItem?.name || '';
  const directBaseName = getGearBaseName(spellItem);

  return Object.keys(spellVisualByBaseName)
    .sort((a, b) => b.length - a.length)
    .find((name) => itemName.startsWith(name) || itemName.includes(name))
    || directBaseName;
}

function canUseEquippedSpell() {
  return gameState.player.activeWeaponSlot === 'magicWeapon' && Boolean(getActiveSpellItem());
}

function getSpellVisualInfo(spellItem = getActiveSpellItem()) {
  const baseName = getSpellBaseName(spellItem);

  return {
    baseName,
    ...(spellVisualByBaseName[baseName] || {
      className: 'arcane',
      label: 'Arcano',
      emoji: '✨',
      color: 'rgba(155, 119, 255, 0.98)',
      softColor: 'rgba(155, 119, 255, 0.30)',
    }),
  };
}

function applySpellGlow(card, visualInfo, className, duration = 820) {
  if (!card) return;

  // Brilho e movimento da magia agora pertencem ao mesmo efeito.
  // As duas classes entram e saem juntas, evitando que a animação
  // de brilho reinicie depois que o movimento do card terminar.
  const effectId = `${Date.now()}-${Math.random()}`;

  card.dataset.spellGlowId = effectId;
  card.dataset.combatPulseId = effectId;
  card.style.setProperty('--spell-color', visualInfo.color);
  card.style.setProperty('--spell-color-soft', visualInfo.softColor);

  clearCombatCardEffectClasses(card);
  card.classList.remove(className);
  void card.offsetWidth;
  card.classList.add(className, 'combat-card-magic');

  setTimeout(() => {
    if (card.dataset.spellGlowId !== effectId) return;

    card.classList.remove(className, 'combat-card-magic');
    delete card.dataset.spellGlowId;
    delete card.dataset.combatPulseId;
  }, duration);
}

function showSpellImpact(damage = 0, onApply = null) {
  const spellItem = getActiveSpellItem();
  const monsterCard = document.querySelector('.monster-card');

  if (!spellItem || !monsterCard) {
    if (typeof onApply === 'function') onApply();
    return Promise.resolve();
  }

  const visualInfo = getSpellVisualInfo(spellItem);
  const imagePath = getGearImagePath(spellItem);
  const spellName = escapeAttr(getSpellBaseName(spellItem) || spellItem.name || 'Magia');

  const runSpellVisual = () => {
    const cardRect = monsterCard.getBoundingClientRect();

    applySpellGlow(monsterCard, visualInfo, 'spell-target-glow', 820);

    const impact = document.createElement('div');
    impact.className = `spell-impact-screen spell-impact-${visualInfo.className}`;
    impact.style.setProperty('--spell-color', visualInfo.color);
    impact.style.setProperty('--spell-color-soft', visualInfo.softColor);
    impact.style.setProperty('--spell-x', `${cardRect.left + cardRect.width / 2}px`);
    impact.style.setProperty('--spell-y', `${cardRect.top + cardRect.height * 0.46}px`);

    impact.innerHTML = imagePath
      ? `
        <img
          src="${escapeAttr(imagePath)}"
          alt="${spellName}"
          loading="lazy"
          decoding="async"
          onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
        />
        <span hidden>${visualInfo.emoji}</span>
      `
      : `<span>${visualInfo.emoji}</span>`;

    document.body.appendChild(impact);
  };

  return queueCardEffect(monsterCard, runSpellVisual, 1000, 100, {
    apply: onApply,
    applyDelay: 0,
  });
}

function itemImageTag(item) {
  const fallbackIcon = escapeAttr(item?.icon || '🎒');
  const imagePath = item?.image || '';
  const itemName = escapeAttr(item?.name || 'Item');

  if (!imagePath) {
    return `<span class="item-thumb"><span class="item-fallback-icon">${fallbackIcon}</span></span>`;
  }

  return `
    <span class="item-thumb">
      <img
        class="item-image"
        src="${escapeAttr(imagePath)}"
        alt="${itemName}"
        loading="lazy"
        decoding="async"
        onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
      />
      <span class="item-fallback-icon" hidden>${fallbackIcon}</span>
    </span>
  `;
}

function infoIcon(text) {
  return `<span class="item-info" title="${escapeAttr(text)}" tabindex="0">i</span>`;
}

function getConsumableTooltip(item) {
  if (item.type === 'heal') {
    const percent = Math.round((item.healPercent || 0) * 100);
    return `${item.name}: recupera ${percent}% da vida máxima.`;
  }

  if (item.type === 'fullHeal') {
    return `${item.name}: restaura 100% da vida do herói.`;
  }

  if (item.type === 'skillPoint') {
    const points = getTrainingScrollSkillPoints();
    return `${item.name}: concede +${points} ponto(s) de habilidade no seu nível atual.`;
  }

  if (item.type === 'buff') {
    return `${item.name}: ${item.description}`;
  }

  if (item.type === 'damageMonster') {
    return `${item.name}: causa dano imediato no monstro atual.`;
  }

  if (item.type === 'specialBoss') {
    return `${item.name}: invoca um boss especial.`;
  }

  if (item.type === 'material') {
    return `${item.name}: ${item.description}`;
  }

  return item.description || 'Item consumível.';
}

function getGearTooltip(item) {
  const rarity = getRarityById(item.rarity);
  const slot = gearSlots[item.slot] || item.slot;

  return `${item.name}
Tipo: ${slot}
Raridade: ${rarity.name}
Nível: ${item.level}
Efeito: ${formatStats(item.stats)}
Valor de venda: ${formatMoneyText(item.value)}${item.forgeMark ? `
Marca de Forja: ${getForgeMarkPlainSummary(item.forgeMark)}` : ''}${isMythicGear(item) ? `
Melhoria mítica: +1 nível, ganhos de status maiores.
Custo atual: ${formatMoneyText(getGearUpgradeCost(item))} + ${getMythicUpgradeFragmentCost(item)} Fragmento(s) Mítico(s).
Você tem: ${getMythicFragmentQuantity()} Fragmento(s).` : ''}`;
}

function getGearTooltipHtml(item) {
  const rarity = getRarityById(item.rarity);
  const slot = gearSlots[item.slot] || item.slot;
  const isMythic = isMythicGear(item);
  const stats = formatStats(item.stats || {})
    .split(' • ')
    .filter(Boolean)
    .map((line) => `<span class="gear-tooltip-chip">${escapeAttr(line)}</span>`)
    .join('');

  const upgradeCost = getGearUpgradeCost(item);
  const fragmentCost = getMythicUpgradeFragmentCost(item);
  const fragmentQty = getMythicFragmentQuantity();
  const forgePreview = getForgeUpgradePreview(item);
  const specialEffect = isMythic ? getMythicSpecialEffectSummary(item) : '';

  const upgradeRows = isMythic
    ? `
      <div class="gear-tooltip-row danger"><span>Fragmentos</span><strong>${fragmentCost} necessário(s)</strong></div>
      <div class="gear-tooltip-row"><span>Você tem</span><strong>${fragmentQty} Fragmento(s)</strong></div>
      <div class="gear-tooltip-note">Melhoria mítica: sobe só +1 nível, mas ganha muito mais status. O custo de Fragmentos aumenta a cada melhoria.</div>
    `
    : '';

  return `
    <div class="gear-tooltip-card ${isMythic ? 'is-mythic' : ''}">
      <div class="gear-tooltip-head">
        <strong class="${escapeAttr(rarity.className)}">${escapeAttr(item.name)}</strong>
        <span>${escapeAttr(rarity.name)}</span>
      </div>

      <div class="gear-tooltip-meta">
        <span>${escapeAttr(slot)}</span>
        <span>Nv. ${formatCompactNumber(item.level)}</span>
      </div>

      ${isMythic ? `
        <div class="gear-tooltip-section mythic-power">
          <small>HABILIDADE MÍTICA</small>
          <p>${escapeAttr(specialEffect)}</p>
        </div>
      ` : ''}

      ${item.forgeMark ? getForgeMarkHtml(item.forgeMark) : ''}

      <div class="gear-tooltip-section">
        <small>STATUS ATUAIS</small>
        <div class="gear-tooltip-chips">${stats}</div>
      </div>

      <div class="gear-tooltip-section">
        <small>PRÓXIMA MELHORIA</small>
        <div class="gear-tooltip-row"><span>Moedas</span><strong>${escapeAttr(formatMoneyText(upgradeCost))}</strong></div>
        ${upgradeRows}
        <div class="gear-tooltip-gains">${escapeAttr(forgePreview)}</div>
      </div>

      <div class="gear-tooltip-row muted"><span>Venda</span><strong>${escapeAttr(formatMoneyText(item.value))}</strong></div>
    </div>
  `;
}

function formatGearName(item) {
  const rarity = getRarityById(item.rarity);
  return `<span class="${rarity.className}">${item.name}</span>`;
}

let pendingSaveTimer = null;
let lastDeferredSaveAt = 0;
let autoAttackWasRunningBeforeOffline = false;

function requestSaveGame() {
  const now = Date.now();

  if (pendingSaveTimer) return;

  if (now - lastDeferredSaveAt > 1200) {
    lastDeferredSaveAt = now;
    saveGame({ updateActivityTimestamp: !document.hidden });
    return;
  }

  pendingSaveTimer = window.setTimeout(() => {
    pendingSaveTimer = null;
    lastDeferredSaveAt = Date.now();
    saveGame({ updateActivityTimestamp: !document.hidden });
  }, 900);
}

function saveGame({ updateActivityTimestamp = !document.hidden } = {}) {
  if (pendingSaveTimer) {
    window.clearTimeout(pendingSaveTimer);
    pendingSaveTimer = null;
  }

  // O relógio de atividade só avança enquanto o jogador está realmente na página.
  // Assim, renders, animações e autoataques atrasados não apagam o começo do período offline.
  if (updateActivityTimestamp && !gameState.offlineStartedAt) {
    gameState.lastSaveAt = Date.now();
  }

  const saveData = structuredCloneSafe({
    version: initialState.version,
    player: gameState.player,
    prestige: gameState.prestige,
    monster: gameState.monster,
    shop: gameState.shop,
    mythicRift: gameState.mythicRift,
    inventory: gameState.inventory,
    equipment: gameState.equipment,
    currentTurn: gameState.currentTurn,
    activeInventoryTab: gameState.activeInventoryTab,
    lastSaveAt: gameState.lastSaveAt,
    offlineStartedAt: gameState.offlineStartedAt,
    ui: gameState.ui,
    prestigeRush: gameState.prestigeRush,
  });

  localStorage.setItem(saveKey, JSON.stringify(saveData));
}

function markOfflineStart() {
  if (!gameState.offlineStartedAt) {
    gameState.offlineStartedAt = Date.now();
  }

  saveGame({ updateActivityTimestamp: false });
  return gameState.offlineStartedAt;
}

function getSavedOfflineStartedAt() {
  try {
    const rawSave = localStorage.getItem(saveKey);
    if (!rawSave) return gameState.offlineStartedAt || null;

    const saved = JSON.parse(rawSave);
    return saved?.offlineStartedAt || gameState.offlineStartedAt || null;
  } catch (error) {
    console.warn('Falha ao ler o início do período offline:', error);
    return gameState.offlineStartedAt || null;
  }
}

function resumeOfflineProgressIfNeeded() {
  const offlineStartedAt = getSavedOfflineStartedAt();
  if (!offlineStartedAt) return false;

  // Consome o marcador antes de calcular para impedir processamento duplicado por
  // visibilitychange + focus disparando quase ao mesmo tempo.
  gameState.offlineStartedAt = null;

  const progressed = applyOfflineProgress(offlineStartedAt);
  gameState.lastSaveAt = Date.now();
  saveGame({ updateActivityTimestamp: false });

  if (progressed) {
    updateStats();
  }

  return progressed;
}

function loadGame() {
  const rawSave = localStorage.getItem(saveKey);
  if (!rawSave) return false;

  try {
    const saved = JSON.parse(rawSave);
    if (!saved || saved.version !== initialState.version) return false;

    Object.assign(gameState.player, saved.player || {});

    gameState.player.magic ??= 14;
    gameState.player.magicChance ??= 18;
    gameState.player.activeWeaponSlot ??= 'physicalWeapon';
    gameState.player.monstersSinceBoss ??= 0;
    gameState.player.specialBossesDefeated ??= 0;
    gameState.player.mythicPity ??= 0;
    gameState.player.bossesSinceMythicRift ??= 0;
    gameState.player.recoveryGrace = {
      ...initialState.player.recoveryGrace,
      ...(gameState.player.recoveryGrace || {}),
    };
    gameState.player.buffs ??= { fury: 0, stone: 0, wind: 0, arcane: 0, fortune: 0 };
    gameState.player.buffs.arcane ??= 0;
    gameState.player.buffs.fortune ??= 0;

    gameState.prestige = structuredCloneSafe(initialState.prestige);

    if (saved.prestige) {
      Object.assign(gameState.prestige, saved.prestige);
      gameState.prestige.relics = {
        ...initialState.prestige.relics,
        ...(saved.prestige.relics || {}),
      };
    }
    gameState.monster = saved.monster || null;
    gameState.shop = {
      ...structuredCloneSafe(initialState.shop),
      ...(saved.shop || {}),
    };
    gameState.shop.type ||= 'consumables';
    gameState.shop.encountersLeft = gameState.shop.encountersLeft || 0;
    if (
      gameState.shop.active &&
      isSpecialShop(gameState.shop.type) &&
      gameState.shop.encountersLeft <= gameConfig.shopKeepBattles
    ) {
      gameState.shop.encountersLeft = gameConfig.specialShopKeepBattles;
    }
    gameState.mythicRift = {
      ...structuredCloneSafe(initialState.mythicRift),
      ...(saved.mythicRift || {}),
    };
    gameState.inventory = saved.inventory || structuredCloneSafe(initialState.inventory);

    // Compatibilidade com a tentativa de renomear também os IDs internos.
    // Os nomes visíveis mudaram, mas stonePotion/windPotion e stone/wind
    // precisam continuar estáveis para loja, drops, automação e saves antigos.
    gameState.player.buffs.stone = Math.max(
      Number(gameState.player.buffs.stone) || 0,
      Number(gameState.player.buffs.resistance) || 0
    );
    gameState.player.buffs.wind = Math.max(
      Number(gameState.player.buffs.wind) || 0,
      Number(gameState.player.buffs.haste) || 0
    );
    delete gameState.player.buffs.resistance;
    delete gameState.player.buffs.haste;

    const renamedPotionIds = {
      resistancePotion: 'stonePotion',
      hastePotion: 'windPotion',
    };

    const normalizedConsumables = [];
    (gameState.inventory.items || []).forEach((entry) => {
      const normalizedId = renamedPotionIds[entry?.id] || entry?.id;
      const existing = normalizedConsumables.find((item) => item.id === normalizedId);

      if (existing) {
        existing.quantity += Math.max(0, Number(entry?.quantity) || 0);
      } else if (normalizedId) {
        normalizedConsumables.push({
          ...entry,
          id: normalizedId,
          quantity: Math.max(0, Number(entry?.quantity) || 0),
        });
      }
    });
    gameState.inventory.items = normalizedConsumables;

    (gameState.shop.items || []).forEach((item) => {
      if (renamedPotionIds[item?.id]) item.id = renamedPotionIds[item.id];
      if (item?.buff === 'resistance') item.buff = 'stone';
      if (item?.buff === 'haste') item.buff = 'wind';
    });

    gameState.prestigeRush = {
      ...structuredCloneSafe(initialState.prestigeRush),
      ...(saved.prestigeRush || {}),
    };
    ensureMonsterCombatRules(gameState.monster);
    const savedEquipment = saved.equipment || {};
    gameState.ui = {
      ...structuredCloneSafe(initialState.ui),
      ...(saved.ui || {}),
      autoUse: {
        ...initialState.ui.autoUse,
        ...(saved.ui?.autoUse || {}),
      },
      appliedStats: {
        ...initialState.ui.appliedStats,
        ...(saved.ui?.appliedStats || {}),
      },
      skillBalanceVersion: saved.ui?.skillBalanceVersion || 0,
    };

    gameState.equipment = structuredCloneSafe(initialState.equipment);

    if (savedEquipment.physicalWeapon || savedEquipment.magicWeapon || savedEquipment.helmet) {
      gameState.equipment = {
        ...structuredCloneSafe(initialState.equipment),
        ...savedEquipment,
      };
    } else {
      gameState.equipment.physicalWeapon = savedEquipment.weapon || null;
      gameState.equipment.chest = savedEquipment.armor || null;
      gameState.equipment.ring = savedEquipment.ring || null;
    }

    // A migração da Marcha precisa acontecer depois que os equipamentos do save
    // forem restaurados, para o Kit de Retorno equipar os slots corretamente.
    ensurePrestigeRushState();

    gameState.currentTurn = saved.currentTurn || 'player';
    gameState.activeInventoryTab = saved.activeInventoryTab || 'items';
    gameState.lastSaveAt = saved.lastSaveAt || Date.now();
    gameState.offlineStartedAt = saved.offlineStartedAt || null;

    if (gameState.monster?.isBoss && gameState.monster.scalingSource !== 'stage-biome') {
      const previousBoss = gameState.monster;
      const refreshedBoss = createMonster(true, Boolean(previousBoss.specialBoss));
      refreshedBoss.mandatoryBoss = Boolean(previousBoss.mandatoryBoss);
      refreshedBoss.prestigeRushBoss = Boolean(previousBoss.prestigeRushBoss);
      refreshedBoss.rushOrder = previousBoss.rushOrder;
      refreshedBoss.rushTotal = previousBoss.rushTotal;
      gameState.monster = refreshedBoss;
    }

    rebalanceAppliedSkillStatsIfNeeded();
    normalizeProgressionAfterBalance(true);
    ensureMythicRiftState();

    normalizePlayerHp();

    // Saves antigos não possuem offlineStartedAt; nesse caso, lastSaveAt continua
    // servindo como compatibilidade para a primeira abertura após a atualização.
    const offlineReference = saved.offlineStartedAt || saved.lastSaveAt;
    gameState.offlineStartedAt = null;
    applyOfflineProgress(offlineReference);
    gameState.lastSaveAt = Date.now();
    return true;
  } catch (error) {
    console.warn('Falha ao carregar save:', error);
    return false;
  }
}

function applyOfflineProgress(lastSaveAt) {
  if (!lastSaveAt) return false;

  const rawSecondsAway = Math.max(0, Math.floor((Date.now() - lastSaveAt) / 1000));
  const maxOfflineSeconds = gameConfig.offlineMaxMinutes * 60;
  const secondsAway = Math.min(maxOfflineSeconds, rawSecondsAway);

  if (secondsAway < gameConfig.offlineMinSeconds) return false;

  // Mantém os segundos no cálculo. Antes o Math.floor descartava a parte restante
  // do minuto e também deixava o relatório menos preciso.
  const minutes = secondsAway / 60;
  const report = calculateOfflineProgress(minutes);

  if (report.monstersDefeated <= 0) return false;

  const xpGained = gainXp(report.baseXp, false);
  const coinsGained = getCoinReward(report.baseCoins);

  gameState.player.coins += coinsGained;
  gameState.player.victories += report.monstersDefeated;
  gameState.player.bossesDefeated += report.bossesDefeated;

  const rush = ensurePrestigeRushState();
  const rushWasActive = rush.active;
  const rushBossesBefore = Number(rush.bossesDefeated) || 0;
  let rushCompletedOffline = false;
  const stageBeforeOffline = gameState.player.stage;
  const maxOfflineStageGain = Math.max(0, getMaxStageForPlayer() - stageBeforeOffline);
  const actualStagesGained = Math.min(report.stagesGained, maxOfflineStageGain);

  gameState.player.stage += actualStagesGained;

  if (rush.active) {
    rush.bossesDefeated = Math.min(rush.totalBosses, rush.bossesDefeated + report.bossesDefeated);
    rush.bossesRemaining = Math.max(0, rush.totalBosses - rush.bossesDefeated);
    gameState.player.monstersSinceBoss = 0;

    if (rush.bossesRemaining <= 0 || gameState.player.stage >= rush.targetStage) {
      gameState.player.stage = Math.min(getMaxStageForPlayer(), rush.targetStage);
      rush.active = false;
      rush.bossesRemaining = 0;
      rushCompletedOffline = true;
    }
  } else {
    gameState.player.monstersSinceBoss = report.monstersDefeated % getMandatoryBossTarget();
  }

  let gearFound = 0;
  let epicOrLegendaryFound = 0;

  for (let i = 0; i < report.gearDrops; i += 1) {
    const isBossDrop = i < report.bossesDefeated;
    const gear = createGear(gameState.player.level + gameState.player.stage, isBossDrop);

    if (gear.rarity === 'epic' || gear.rarity === 'legendary') {
      epicOrLegendaryFound += 1;
    }

    addGearOffline(gear);
    gearFound += 1;
  }

  if (report.potionsFound > 0) {
    addConsumable('potion', report.potionsFound);
  }

  if (rushWasActive && report.bossesDefeated > 0) {
    const finalOrder = rushBossesBefore + report.bossesDefeated;
    addConsumable('potion', report.bossesDefeated * 2);
    addConsumable('superPotion', Math.floor(report.bossesDefeated / 2));
    addConsumable('elixir', Math.floor(report.bossesDefeated / 5));
    addConsumable('fortuneIncense', Math.floor(report.bossesDefeated / 5));

    const extraGearCount = Math.min(12, Math.max(1, report.bossesDefeated));
    for (let index = 0; index < extraGearCount; index += 1) {
      const slot = getPrestigeRushRewardSlot();
      const order = rushBossesBefore + index + 1;
      const rarityId = order % 10 === 0 ? 'epic' : order % 5 === 0 ? 'rare' : 'uncommon';
      addPrestigeRushGear(createPrestigeRushGear(slot, rarityId, gameState.player.stage));
    }

    rush.gearRewards += extraGearCount;
    rush.consumableRewards += report.bossesDefeated * 2 + Math.floor(report.bossesDefeated / 2) + Math.floor(report.bossesDefeated / 5) * 2;
    rush.milestoneCrates += Math.floor(finalOrder / 5) - Math.floor(rushBossesBefore / 5);

    if (rushCompletedOffline) {
      grantPrestigeRushCompletionCache({ silent: true });
    }
  }

  normalizePlayerHp();

  const offlineHeal = Math.round((getPlayerMaxHp() - gameState.player.hp) * 0.65);
  gameState.player.hp = Math.min(getPlayerMaxHp(), gameState.player.hp + offlineHeal);

  gameState.monster = createNextEncounter();

  const finalReport = {
    ...report,
    secondsAway,
    stagesGained: actualStagesGained,
    xpGained,
    coinsGained,
    gearFound,
    epicOrLegendaryFound,
  };

  if (elements.offlineMessage) {
    elements.offlineMessage.textContent =
      `Offline: +${formatCompactNumber(xpGained)} XP, ${formatSignedMoneyText(coinsGained)} e ${formatCompactNumber(report.monstersDefeated)} monstros derrotados.`;
  }

  showOfflineModal(finalReport);

  log(
    `Progresso offline: +${formatCompactNumber(xpGained)} XP, +${formatMoney(coinsGained)} e ${formatCompactNumber(report.monstersDefeated)} monstros derrotados.`,
    'offline',
    true
  );
  return true;
}

function calculateOfflineProgress(minutes) {
  const player = gameState.player;

  const power = Math.max(1, getPlayerPower());
  const dungeonDifficulty = Math.max(60, 70 + player.stage * 24 + player.level * 7);

  const efficiency = clamp(power / dungeonDifficulty, 0.35, 1.25);
  const offlineMultiplier = typeof getTotalOfflineMultiplier === 'function'
    ? clamp(getTotalOfflineMultiplier(), 0.7, 1.8)
    : 1;

  const estimatedBattles = Math.floor(
    ((minutes * 60) / gameConfig.offlineBattleSeconds) * efficiency * offlineMultiplier
  );

  const monstersDefeated = clamp(
    Math.max(1, estimatedBattles),
    1,
    gameConfig.offlineMaxBattles || 70
  );

  const rush = ensurePrestigeRushState();
  const bossesDefeated = rush.active
    ? Math.min(rush.bossesRemaining, monstersDefeated)
    : Math.min(5, Math.floor(monstersDefeated / getMandatoryBossTarget()));
  const stagesGained = rush.active
    ? Math.min(
        Math.max(0, rush.targetStage - player.stage),
        Math.ceil(
          Math.max(0, rush.targetStage - player.stage) *
          (bossesDefeated / Math.max(1, rush.bossesRemaining))
        )
      )
    : bossesDefeated;

  const estimatedLevel = player.level + Math.floor(stagesGained / 2);
  const rewardLevel = Math.max(player.level, estimatedLevel);

  const baseMonsterXp = 28 + rewardLevel * 13 + player.stage * 4;
  const baseMonsterCoins = 8 + rewardLevel * 5 + player.stage * 2;

  const baseBossXp = baseMonsterXp * 2.2;
  const baseBossCoins = baseMonsterCoins * 2.4;

  const offlineRewardRate = gameConfig.offlineRewardRate || 0.45;

  const baseXp = Math.floor(
    (monstersDefeated * baseMonsterXp + bossesDefeated * baseBossXp) * offlineRewardRate
  );

  const baseCoins = Math.floor(
    (monstersDefeated * baseMonsterCoins + bossesDefeated * baseBossCoins) * offlineRewardRate
  );

  const dropBonus = typeof getTotalDropBonus === 'function'
    ? getTotalDropBonus()
    : 0;

  const dropChance = clamp(
    14 + Math.min(10, player.stage) + dropBonus * 0.7,
    4,
    42
  );

  const expectedDrops = Math.floor(monstersDefeated * (dropChance / 100) * 0.55);
  const luckyDrop = randomBetween(1, 100) <= dropChance ? 1 : 0;

  const gearDrops = clamp(
    expectedDrops + luckyDrop + bossesDefeated,
    0,
    gameConfig.offlineGearDropCap
  );

  const potionsFound = Math.min(3, Math.floor(monstersDefeated / 35));

  return {
    minutes,
    monstersDefeated,
    bossesDefeated,
    stagesGained,
    baseXp,
    baseCoins,
    gearDrops,
    potionsFound,
  };
}

function addGearOffline(item) {
  gameState.inventory.gear.unshift(item);

  const current = gameState.equipment[item.slot];

  if (!current || getGearScore(item) > getGearScore(current)) {
    gameState.equipment[item.slot] = item;
  }
}

function formatOfflineTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return seconds > 0
      ? `${hours} h ${minutes} min ${seconds} s`
      : `${hours} h ${minutes} min`;
  }

  if (minutes > 0) {
    return seconds > 0
      ? `${minutes} min ${seconds} s`
      : `${minutes} min`;
  }

  return `${seconds} s`;
}

function showOfflineModal(report) {
  if (!elements.offlineModal || !elements.offlineSummary) return;

  const secondsAway = report.secondsAway ?? Math.round((report.minutes || 0) * 60);
  const xpGained = Math.max(0, Number(report.xpGained) || 0);
  const coinsGained = Math.max(0, Number(report.coinsGained) || 0);
  const monstersDefeated = Math.max(0, Number(report.monstersDefeated) || 0);
  const bossesDefeated = Math.max(0, Number(report.bossesDefeated) || 0);
  const stagesGained = Math.max(0, Number(report.stagesGained) || 0);
  const gearFound = Math.max(0, Number(report.gearFound) || 0);
  const specialGearFound = Math.max(0, Number(report.epicOrLegendaryFound) || 0);
  const potionsFound = Math.max(0, Number(report.potionsFound) || 0);

  elements.offlineSummary.innerHTML = `
    <section class="offline-time-hero" aria-label="Tempo total fora">
      <div class="offline-time-icon" aria-hidden="true">⏱</div>
      <div class="offline-time-copy">
        <span>Você ficou fora por</span>
        <strong>${formatOfflineTime(secondsAway)}</strong>
        <small>Todo esse período foi considerado no cálculo abaixo.</small>
      </div>
      <div class="offline-time-status">
        <span class="offline-status-dot" aria-hidden="true"></span>
        Progresso calculado
      </div>
    </section>

    <section class="offline-primary-rewards" aria-label="Principais recompensas">
      <article class="offline-reward-card offline-reward-xp">
        <div class="offline-reward-icon" aria-hidden="true">✦</div>
        <div class="offline-reward-copy">
          <span>Experiência ganha</span>
          <strong>+${xpGained.toLocaleString('pt-BR')} XP</strong>
          <small>Progresso aplicado ao seu herói</small>
        </div>
      </article>

      <article class="offline-reward-card offline-reward-coins">
        <div class="offline-reward-icon offline-coin-mark" aria-hidden="true">
          ${coinIconHtml()}
        </div>
        <div class="offline-reward-copy">
          <span>Moedas ganhas</span>
          <strong>+${formatCompactNumber(coinsGained)}</strong>
          <small>Adicionadas diretamente ao seu saldo</small>
        </div>
      </article>
    </section>

    <section class="offline-results-section" aria-label="Resumo da expedição">
      <div class="offline-section-heading">
        <div>
          <span>Resumo da expedição</span>
          <h3>O que aconteceu na masmorra</h3>
        </div>
        <strong>${monstersDefeated + bossesDefeated} confrontos vencidos</strong>
      </div>

      <div class="offline-results-grid">
        <article class="offline-result-card offline-result-monsters">
          <div class="offline-result-icon" aria-hidden="true">⚔️</div>
          <div>
            <span>Monstros derrotados</span>
            <strong>${monstersDefeated.toLocaleString('pt-BR')}</strong>
          </div>
        </article>

        <article class="offline-result-card offline-result-bosses ${bossesDefeated > 0 ? 'has-reward' : ''}">
          <div class="offline-result-icon" aria-hidden="true">👑</div>
          <div>
            <span>Bosses derrotados</span>
            <strong>${bossesDefeated.toLocaleString('pt-BR')}</strong>
          </div>
        </article>

        <article class="offline-result-card offline-result-stages ${stagesGained > 0 ? 'has-reward' : ''}">
          <div class="offline-result-icon" aria-hidden="true">🗺️</div>
          <div>
            <span>Andares avançados</span>
            <strong>+${stagesGained.toLocaleString('pt-BR')}</strong>
          </div>
        </article>

        <article class="offline-result-card offline-result-gear ${gearFound > 0 ? 'has-reward' : ''}">
          <div class="offline-result-icon" aria-hidden="true">🛡️</div>
          <div>
            <span>Equipamentos</span>
            <strong>${gearFound.toLocaleString('pt-BR')}</strong>
          </div>
        </article>

        <article class="offline-result-card offline-result-special ${specialGearFound > 0 ? 'has-special-reward' : ''}">
          <div class="offline-result-icon" aria-hidden="true">💎</div>
          <div>
            <span>Épicos/Lendários</span>
            <strong>${specialGearFound.toLocaleString('pt-BR')}</strong>
          </div>
        </article>

        <article class="offline-result-card offline-result-potions ${potionsFound > 0 ? 'has-reward' : ''}">
          <div class="offline-result-icon" aria-hidden="true">🧪</div>
          <div>
            <span>Poções encontradas</span>
            <strong>${potionsFound.toLocaleString('pt-BR')}</strong>
          </div>
        </article>
      </div>
    </section>
  `;

  elements.offlineModal.hidden = false;
}
function closeOfflineModal() {
  if (!elements.offlineModal) return;
  elements.offlineModal.hidden = true;
}

function ensureLogNoticeStack() {
  let stack = document.getElementById('game-log-notice-stack');

  if (!stack) {
    stack = document.createElement('div');
    stack.id = 'game-log-notice-stack';
    document.body.appendChild(stack);
  }

  return stack;
}

function getLogNoticeIcon(type = 'system') {
  const icons = {
    damage: '⚔️',
    reward: '✨',
    drop: '🎒',
    shop: '🛒',
    boss: '👑',
    death: '💀',
    offline: '🌙',
    equip: '🛡️',
    buy: '🛒',
    level: '⬆️',
    'system-important': '⚠️',
    system: '✦',
  };

  return icons[type] || icons.system;
}

function getLogNoticeTitle(type = 'system') {
  const titles = {
    damage: 'Combate',
    reward: 'Recompensa',
    drop: 'Drop',
    shop: 'Loja',
    boss: 'Boss',
    death: 'Derrota',
    offline: 'Offline',
    equip: 'Equipamento',
    buy: 'Compra',
    level: 'Nível',
    'system-important': 'Aviso',
    system: 'Sistema',
  };

  return titles[type] || titles.system;
}

const logNoticeCooldowns = new Map();
const maxLogNoticesOnScreen = 2;
const logNoticeCooldownWindowMs = 1400;

function getPlainLogNoticeText(message) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = String(message || '');

  return (wrapper.textContent || wrapper.innerText || String(message || ''))
    .replace(/\s+/g, ' ')
    .trim();
}

function shouldSuppressLogNotice(message, type = 'system', important = false) {
  const plainText = getPlainLogNoticeText(message);

  // A partir daqui, notificação é só para evento realmente importante.
  // Mensagens comuns continuam podendo existir internamente via log(), mas não viram DOM/animacão.
  if (!important) return true;

  // Combate acontece o tempo todo no automático. O feedback visual do card já cobre isso.
  if (type === 'damage') return true;

  const routinePatterns = [
    /material de melhoria/i,
    /você derrotou .*\+.*xp/i,
    /roubo de vida/i,
    /eco arcano/i,
    /golpe duplo/i,
    /magia dupla/i,
    /iniciativa mítica/i,
    /auto ataque ligado/i,
    /save carregado/i,
    /você encontrou .*nv\./i,
    /loja ainda aberta/i,
    /sua vida já está cheia/i,
  ];

  if (routinePatterns.some((pattern) => pattern.test(plainText))) return true;

  if (/mas guardou no inventário/i.test(plainText) && !/mítico|épico|lendário/i.test(plainText)) {
    return true;
  }

  // Tipos que podem aparecer como toast quando marcados como importantes.
  const allowedTypes = new Set([
    'boss',
    'death',
    'drop',
    'level',
    'offline',
    'shop',
    'buy',
    'equip',
    'system-important',
    'reward',
  ]);

  if (!allowedTypes.has(type)) {
    return !/fenda|prestígio|checkpoint|balanceamento|masmorra|limite|proteção mítica/i.test(plainText);
  }

  // Recompensa só aparece quando é algo especial, não a cada luta vencida.
  if (type === 'reward') {
    return !/mítico|fragmento|drop|nível|equipamento|equipado|proteção|relíquia|prestígio|escolheu|vendeu|épico|lendário/i.test(plainText);
  }

  return false;
}

function getLogNoticeKey(message, type = 'system', important = false) {
  const plainText = getPlainLogNoticeText(message);

  return [
    type,
    important ? '1' : '0',
    plainText.slice(0, 160),
  ].join('|');
}

function getLogNoticeDuration(type = 'system', important = false) {
  // As notificações ficam tempo suficiente para leitura, sem travar a tela.
  if (type === 'death' || type === 'boss' || type === 'system-important') return 7000;
  if (important || type === 'offline' || type === 'level' || type === 'drop') return 5200;

  return 3600;
}

function pruneLogNoticeCooldowns(now = Date.now()) {
  if (logNoticeCooldowns.size <= 80) return;

  for (const [key, timestamp] of logNoticeCooldowns.entries()) {
    if (now - timestamp > 12000 || logNoticeCooldowns.size > 80) {
      logNoticeCooldowns.delete(key);
    }
  }
}

function scheduleLogNoticeDismiss(notice, duration) {
  if (!notice) return;

  if (notice.dismissTimer) {
    window.clearTimeout(notice.dismissTimer);
  }

  notice.dismissTimer = window.setTimeout(() => dismissLogNotice(notice), duration);
}

function updateLogNoticeCount(notice) {
  const count = Number(notice.dataset.count || 1);
  const countBadge = notice.querySelector('.game-log-notice-count');

  if (!countBadge) return;

  countBadge.textContent = `x${count}`;
  countBadge.hidden = count <= 1;
}

function bumpExistingLogNotice(notice, duration, stack, latestMessage = '') {
  const count = Number(notice.dataset.count || 1) + 1;
  notice.dataset.count = String(count);
  notice.dataset.leaving = 'false';
  notice.classList.remove('is-leaving');
  updateLogNoticeCount(notice);

  const messageNode = notice.querySelector('.game-log-notice-body p');
  if (messageNode && latestMessage) {
    messageNode.textContent = getPlainLogNoticeText(latestMessage);
  }

  if (stack.firstElementChild !== notice) {
    stack.prepend(notice);
  }

  scheduleLogNoticeDismiss(notice, duration);
}

function trimLogNoticeStack(stack) {
  if (!stack) return;

  while (stack.childElementCount > maxLogNoticesOnScreen) {
    const lastNotice = stack.lastElementChild;
    if (!lastNotice) break;

    if (lastNotice.dismissTimer) {
      window.clearTimeout(lastNotice.dismissTimer);
      lastNotice.dismissTimer = null;
    }

    lastNotice.remove();
  }
}

function showLogNotice(message, type = 'system', important = false) {
  const cleanMessage = String(message || '').trim();
  const plainMessage = getPlainLogNoticeText(cleanMessage);

  if (!plainMessage) return;
  if (shouldSuppressLogNotice(cleanMessage, type, important)) return;

  const stack = ensureLogNoticeStack();
  const duration = getLogNoticeDuration(type, important);
  const noticeKey = getLogNoticeKey(cleanMessage, type, important);
  const now = Date.now();
  const lastShownAt = logNoticeCooldowns.get(noticeKey) || 0;
  const existingNotice = Array.from(stack.children).find((child) =>
    child.dataset.noticeKey === noticeKey && child.dataset.leaving !== 'true'
  );

  pruneLogNoticeCooldowns(now);

  if (existingNotice) {
    bumpExistingLogNotice(existingNotice, duration, stack, cleanMessage);
    logNoticeCooldowns.set(noticeKey, now);
    trimLogNoticeStack(stack);
    return;
  }

  // Anti-lag: se uma mensagem igual acabou de sair da tela, não recria instantaneamente.
  if (now - lastShownAt < logNoticeCooldownWindowMs) return;

  const notice = document.createElement('div');
  notice.className = `game-log-notice ${type}${important ? ' important' : ''}`;
  notice.dataset.noticeKey = noticeKey;
  notice.dataset.count = '1';
  notice.innerHTML = `
    <div class="game-log-notice-icon">${getLogNoticeIcon(type)}</div>
    <div class="game-log-notice-body">
      <div class="game-log-notice-head">
        <strong>${escapeAttr(getLogNoticeTitle(type))}</strong>
        <span class="game-log-notice-count" hidden>x1</span>
      </div>
      <p></p>
    </div>
  `;

  notice.querySelector('.game-log-notice-body p').textContent = plainMessage;
  notice.addEventListener('click', () => dismissLogNotice(notice));
  stack.prepend(notice);
  logNoticeCooldowns.set(noticeKey, now);
  scheduleLogNoticeDismiss(notice, duration);
  trimLogNoticeStack(stack);
}

function dismissLogNotice(notice, delay = 180) {
  if (!notice) return;

  if (notice.dismissTimer) {
    window.clearTimeout(notice.dismissTimer);
    notice.dismissTimer = null;
  }

  if (delay <= 0) {
    notice.remove();
    return;
  }

  if (notice.dataset.leaving === 'true') return;

  notice.dataset.leaving = 'true';
  notice.classList.add('is-leaving');

  window.setTimeout(() => {
    notice.remove();
  }, delay);
}

function log(message, type = 'system', important = false) {
  showLogNotice(message, type, important);
}

function getMonsterImage(monster) {
  if (!monster) return '';

  if (monster.image) {
    return monster.image;
  }

  return getEnemyImagePath(monster.name);
}

function renderMonsterPortrait(monster) {
  const portrait = elements.monsterPortrait;
  if (!portrait) return;

  if (!monster) {
    if (portrait.dataset.renderKey !== 'empty') {
      portrait.dataset.renderKey = 'empty';
      portrait.innerHTML = '';
      portrait.textContent = '👹';
    }
    return;
  }

  const imagePath = getMonsterImage(monster);
  const renderKey = `${monster.name}|${imagePath || monster.icon || '👹'}`;

  // Evita recriar a imagem do inimigo a cada updateStats().
  // Isso reduz bastante travamento quando o automático fica ligado por muito tempo.
  if (portrait.dataset.renderKey === renderKey) return;

  portrait.dataset.renderKey = renderKey;
  portrait.innerHTML = '';

  if (!imagePath) {
    portrait.textContent = monster.icon || '👹';
    return;
  }

  const image = document.createElement('img');
  image.className = 'monster-image';
  image.src = imagePath;
  image.alt = monster.name;
  image.loading = 'lazy';
  image.decoding = 'async';

  image.addEventListener('error', () => {
    portrait.dataset.renderKey = `fallback|${monster.name}`;
    portrait.innerHTML = '';
    portrait.textContent = monster.icon || '👹';
  });

  portrait.appendChild(image);
}


function applyBiomeTheme(biome) {
  const safeBiome = biome || getDungeonBiome(gameState.player.stage);
  const biomeClassPrefix = 'biome-';
  const body = document.body;

  [...body.classList].forEach((className) => {
    if (className.startsWith(biomeClassPrefix)) {
      body.classList.remove(className);
    }
  });

  body.classList.add(`${biomeClassPrefix}${safeBiome.id}`);
  body.dataset.biome = safeBiome.id;
  body.dataset.biomeName = safeBiome.name;
}

function updateStats() {
  normalizeProgressionAfterBalance(false);
  normalizePlayerHp();

  const player = gameState.player;
  const monster = gameState.monster;
  const maxHp = getPlayerMaxHp();

  if (elements.heroLevel) {
    elements.heroLevel.textContent = `Nível ${player.level}`;
  }

  const currentStageBiome = getDungeonBiome(player.stage);

  applyBiomeTheme(currentStageBiome);
  elements.stageDisplay.textContent = formatCompactNumber(player.stage);

  if (elements.biomeDisplay) {
    elements.biomeDisplay.textContent = currentStageBiome.name;
  }

  elements.prestigeTitle.textContent = getPrestigeTitle(gameState.prestige.count);
  elements.prestigePoints.textContent = formatCompactNumber(gameState.prestige.points);
  if (elements.coinDisplay) {
    elements.coinDisplay.textContent = formatCompactNumber(player.coins);
  }
  elements.skillPointsDisplay.textContent = `${formatCompactNumber(player.skillPoints)} pontos`;
  if (elements.playerPower) {
    elements.playerPower.textContent = `Nível ${player.level}`;
  }

  elements.playerHpBar.style.width = `${percent(player.hp, maxHp)}%`;
  elements.playerXpBar.style.width = `${percent(player.xp, player.nextLevelXp)}%`;
  elements.playerHpText.textContent = `${formatCompactNumber(player.hp)} / ${formatCompactNumber(maxHp)}`;
  elements.playerXpText.textContent = `${formatCompactNumber(player.xp)} / ${formatCompactNumber(player.nextLevelXp)}`;

  elements.monsterName.textContent = monster ? monster.name : '—';
  elements.monsterLevel.textContent = monster ? `Nv. ${monster.level}` : 'Nv. 1';
  elements.monsterTypeBadge.textContent = monster
    ? monster.prestigeRushBoss
      ? `${monster.type} • Marcha dos Bosses`
      : monster.isBoss
        ? `${monster.type} • Escala do Andar ${monster.scalingStage || player.stage}`
        : monster.type
    : 'Aguardando inimigo...';

  renderMonsterPortrait(monster);
  elements.monsterHpBar.style.width = monster ? `${percent(monster.hp, monster.maxHp)}%` : '0%';
  elements.monsterHpText.textContent = monster ? `${formatCompactNumber(monster.hp)} / ${formatCompactNumber(monster.maxHp)}` : '0 / 0';

  renderPlayerStats();
  renderMonsterStats();
  renderEquipment();
  renderShop();
  renderInventory();
  if (elements.gearModal && !elements.gearModal.hidden) {
    renderGearModal();
  }
  renderMythicRiftIndicator();
  updateTurnDisplay();
  updateButtons();
  renderSkillControls();

  requestSaveGame();
}

function getAutoUseLabel(key) {
  const labels = {
    heal: 'Cura',
    fury: 'Fúria',
    stone: 'Resistência',
    wind: 'Ímpeto',
    arcane: 'Magia',
  };

  return labels[key] || key;
}

function renderAutomationPanel() {
  const autoUse = gameState.ui.autoUse;
  const bombCount = getConsumableQuantity('arcaneBomb');
  const bombItem = shopCatalog.find((catalogItem) => catalogItem.id === 'arcaneBomb');
  const bombImage = bombItem?.image || '';

  // A bomba pode ser usada também durante o automático; ela só precisa existir e haver monstro vivo.
  const canUseBomb = bombCount > 0 && gameState.monster && gameState.monster.hp > 0 && gameState.player.hp > 0;
  elements.heroAutomation.innerHTML = `
    <div class="section-mini-header">
      <h4>Automação</h4>
      <p>Cura usa só em emergência. Buffs usam agora e renovam ao acabar.</p>
    </div>

    <div class="toggle-chip-grid">
      ${Object.entries(autoUse).map(([key, enabled]) => `
        <label class="toggle-chip ${enabled ? 'active' : ''}">
          <input type="checkbox" data-auto-use="${key}" ${enabled ? 'checked' : ''}>
          <span>${getAutoUseLabel(key)}</span>
        </label>
      `).join('')}
    </div>

    <div class="hero-quick-actions">
      <button
        type="button"
        class="hero-bomb-button"
        data-use-hero-bomb
        ${canUseBomb ? '' : 'disabled'}
        title="Usa uma Bomba Arcana no monstro atual, inclusive durante o automático."
        aria-label="Usar Bomba Arcana. Você possui ${bombCount}."
      >
        <span class="hero-bomb-visual">
          ${bombImage ? `
            <img
              class="hero-bomb-image"
              src="${escapeAttr(bombImage)}"
              alt="Bomba Arcana"
              loading="lazy"
              decoding="async"
              onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
            />
            <span class="hero-bomb-fallback" hidden>${bombItem?.icon || '💣'}</span>
          ` : `<span class="hero-bomb-fallback">${bombItem?.icon || '💣'}</span>`}
        </span>
        <span class="hero-bomb-copy">
          <span class="hero-bomb-title">Bomba Arcana</span>
        </span>
        <strong class="hero-bomb-count">x${bombCount}</strong>
      </button>
    </div>
  `;

  elements.heroAutomation
    .querySelectorAll('input[data-auto-use]')
    .forEach((input) => {
      input.addEventListener('change', (event) => {
        const key = event.currentTarget.dataset.autoUse;
        const enabled = event.currentTarget.checked;
        gameState.ui.autoUse[key] = enabled;

        // Ativar a automação apenas prepara o efeito. A poção será usada
        // no começo do próximo turno do herói, nunca durante o turno inimigo.
        updateStats();
      });
    });

  const bombButton = elements.heroAutomation.querySelector('[data-use-hero-bomb]');
  if (bombButton) {
    bombButton.addEventListener('click', () => void useConsumable('arcaneBomb'));
  }
}

function renderActiveBuffsPanel() {
  if (!elements.activeBuffsPanel) return;

  const activeBuffs = getActiveBuffVisuals();
  const heroCard = elements.activeBuffsPanel.closest('.hero-card');

  Object.keys(buffVisualCatalog).forEach((key) => {
    heroCard?.classList.toggle(`has-buff-${key}`, activeBuffs.some((buff) => buff.key === key));
  });
  heroCard?.classList.toggle('has-active-buffs', activeBuffs.length > 0);

  if (activeBuffs.length === 0) {
    elements.activeBuffsPanel.hidden = true;
    elements.activeBuffsPanel.innerHTML = '';
    visualStatMemory.buffs = {};
    return;
  }

  elements.activeBuffsPanel.hidden = false;
  elements.activeBuffsPanel.innerHTML = `
    <div class="active-buffs-heading">
      <div>
        <span class="active-buffs-kicker">✨ Efeitos ativos</span>
        <strong>Buffs do herói</strong>
      </div>
      <small>O relógio conta batalhas vencidas.</small>
    </div>
    <div class="active-buffs-grid">
      ${activeBuffs.map((buff) => {
        const progress = clamp(buff.remaining / buff.maximum, 0, 1);
        const previous = Number(visualStatMemory.buffs[buff.key]) || 0;
        const stateClass = buff.remaining > previous
          ? 'buff-just-activated'
          : buff.remaining < previous
            ? 'buff-duration-ticked'
            : '';

        return `
          <article
            class="active-buff-card buff-${buff.key} ${stateClass}"
            style="--buff-color:${buff.color}; --buff-progress:${Math.round(progress * 360)}deg;"
            title="${escapeAttr(buff.name)}: ${buff.bonusLabel}. Restam ${buff.remaining} luta(s)."
          >
            <span class="active-buff-icon" aria-hidden="true">${buff.icon}</span>
            <div class="active-buff-copy">
              <strong>${escapeAttr(buff.name)}</strong>
              <small>${escapeAttr(buff.bonusLabel)}</small>
            </div>
            <div class="active-buff-clock" aria-label="${buff.remaining} lutas restantes">
              <div>
                <strong>${buff.remaining}</strong>
                <small>lutas</small>
              </div>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;

  visualStatMemory.buffs = Object.fromEntries(
    activeBuffs.map((buff) => [buff.key, buff.remaining])
  );
}

function renderPlayerStats() {
  const stats = [
    { key: 'attack', icon: '💥', label: 'Ataque', numericValue: getPlayerAttack() },
    { key: 'magic', icon: '🔮', label: 'Magia', numericValue: getPlayerMagic() },
    { key: 'defense', icon: '🛡️', label: 'Defesa', numericValue: getPlayerDefense() },
    { key: 'agility', icon: '⚡', label: 'Agilidade', numericValue: getPlayerAgility() },
    { key: 'crit', icon: '🎯', label: 'Crítico', numericValue: getPlayerCritChance(), suffix: '%' },
  ];

  elements.playerStats.innerHTML = stats.map(({ key, icon, label, numericValue, suffix = '' }) => {
    const displayValue = `${formatCompactNumber(numericValue)}${suffix}`;
    const safeValue = escapeAttr(displayValue);
    const buff = getBuffVisualForStat(key);
    const buffClass = buff ? `is-buffed buff-${buff.key}` : '';
    const buffStyle = buff ? `style="--stat-buff-color:${buff.color};"` : '';

    return `
      <div class="stat-card hero-stat-card hero-stat-${key} ${buffClass}" ${buffStyle}>
        <div class="hero-stat-main">
          <span class="stat-icon">${icon}</span>
          <span class="hero-stat-copy">
            <span class="hero-stat-label">${label}</span>
            ${buff ? `<small class="hero-stat-buff-tag">${buff.icon} ${escapeAttr(buff.shortBonus)}</small>` : ''}
          </span>
        </div>

        <strong
          class="hero-stat-value"
          data-player-stat-value="${key}"
          title="${safeValue}"
        >${safeValue}</strong>
      </div>
    `;
  }).join('');

  stats.forEach(({ key, numericValue, suffix = '' }) => {
    const valueElement = elements.playerStats.querySelector(`[data-player-stat-value="${key}"]`);
    const previousValue = visualStatMemory.player[key];

    if (Number.isFinite(previousValue) && previousValue !== numericValue) {
      animateDisplayedNumber(valueElement, previousValue, numericValue, {
        suffix,
        duration: 820,
        formatter: (value) => formatCompactNumber(Math.round(value)),
      });
    }

    visualStatMemory.player[key] = numericValue;
  });

  renderActiveBuffsPanel();
  renderAutomationPanel();
}

const skillSpendOptions = [1, 5, 10, 'max'];

const skillMeta = {
  attack: { label: 'Ataque', icon: '💥', statGain: 2, suffix: '' },
  defense: { label: 'Defesa', icon: '🛡️', statGain: 2, suffix: '' },
  agility: { label: 'Agilidade', icon: '⚡', statGain: 2, suffix: '' },
  hp: { label: 'Vida', icon: '❤️', statGain: 16, suffix: ' HP' },
  magic: { label: 'Magia', icon: '🔮', statGain: 2, suffix: '' },
};

function getSkillPointMultiplier(level = gameState.player.level) {
  if (level >= 180) return 3.35;
  if (level >= 120) return 2.75;
  if (level >= 80) return 2.25;
  if (level >= 40) return 1.5;

  return 1;
}

function getSkillStatGain(stat, points = 1, level = gameState.player.level) {
  const meta = skillMeta[stat];
  if (!meta) return 0;

  return Math.max(0, points) * Math.round(meta.statGain * getSkillPointMultiplier(level));
}

function getOldSkillStatGain(stat, points = 1) {
  const meta = skillMeta[stat];
  if (!meta) return 0;

  return Math.max(0, points) * meta.statGain;
}

function rebalanceAppliedSkillStatsIfNeeded() {
  if ((gameState.ui.skillBalanceVersion || 0) >= 1) return;

  const appliedStats = gameState.ui.appliedStats || {};
  let changed = false;

  Object.keys(skillMeta).forEach((stat) => {
    const points = appliedStats[stat] || 0;
    if (points <= 0) return;

    const oldGain = getOldSkillStatGain(stat, points);
    const newGain = getSkillStatGain(stat, points, gameState.player.level);
    const delta = newGain - oldGain;

    if (!delta) return;
    changed = true;

    if (stat === 'hp') {
      gameState.player.maxHp += delta;
      gameState.player.hp += delta;
      return;
    }

    gameState.player[stat] += delta;
  });

  gameState.ui.skillBalanceVersion = 1;

  if (changed) {
    log('Balanceamento aplicado: seus pontos de habilidade antigos foram recalculados pela nova regra de nível.', 'system', true);
  }
}

function getSkillGainText(stat, points = 1) {
  const meta = skillMeta[stat];
  if (!meta) return '';

  return `+${formatCompactNumber(getSkillStatGain(stat, points))}${meta.suffix}`;
}

function getCurrentSkillSpendAmount() {
  const selected = gameState.ui.skillSpendAmount;

  if (selected === 'max') {
    return Math.max(0, gameState.player.skillPoints);
  }

  return Math.min(selected, gameState.player.skillPoints);
}

function renderSkillControls() {
  const spendAmount = getCurrentSkillSpendAmount();
  const spendLabel = gameState.ui.skillSpendAmount === 'max' ? 'Max' : `+${spendAmount}`;

  elements.skillAmountButtons.innerHTML = skillSpendOptions.map((option) => `
    <button
      type="button"
      class="amount-chip ${gameState.ui.skillSpendAmount === option ? 'active' : ''}"
      data-skill-amount="${option}"
      title="Gastar ${option === 'max' ? 'todos os pontos' : `${option} ponto(s)`} por clique"
    >
      ${option === 'max' ? 'Max' : option}
    </button>
  `).join('');

  elements.skillList.innerHTML = Object.entries(skillMeta).map(([stat, meta]) => {
    const pointsSpent = gameState.ui.appliedStats[stat] || 0;
    const nextGain = getSkillGainText(stat, spendAmount);
    const perPointGain = getSkillGainText(stat, 1);

    return `
      <div class="skill-row clean-skill-row">
        <div class="skill-row-info">
          <strong>${meta.icon} ${meta.label}</strong>
          <small>${formatCompactNumber(pointsSpent)} pts aplicados</small>
        </div>

        <div class="skill-row-action">
          <span class="skill-next-gain" title="Cada ponto concede ${perPointGain}.">${nextGain}</span>

          <button
            type="button"
            class="skill-apply-button clean-skill-button"
            data-skill-stat="${stat}"
            ${gameState.player.skillPoints <= 0 ? 'disabled' : ''}
            title="Gasta ${spendAmount} ponto(s). Cada ponto concede ${perPointGain}."
          >
            ${spendLabel}
          </button>
        </div>
      </div>
    `;
  }).join('');

  elements.skillAmountButtons
    .querySelectorAll('[data-skill-amount]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const raw = button.dataset.skillAmount;
        gameState.ui.skillSpendAmount = raw === 'max' ? 'max' : Number(raw);
        renderSkillControls();
      });
    });

  elements.skillList
    .querySelectorAll('[data-skill-stat]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        spendSkillPoints(button.dataset.skillStat);
      });
    });
}

function syncBossVisualState(monster = gameState.monster) {
  const card = elements.monsterPortrait?.closest('.monster-card');
  if (!card) return;

  const overload = getOverloadProfile(monster);
  const rage = getHealingRageProfile(monster);
  const echoes = getEchoSummary(monster);

  card.classList.toggle('boss-encounter', Boolean(monster?.isBoss));
  card.classList.toggle('boss-special-encounter', Boolean(monster?.specialBoss));
  card.classList.toggle('boss-overloaded', Boolean(monster?.isBoss && overload.count > 0));
  card.classList.toggle('boss-healing-rage', Boolean(monster?.isBoss && rage.stacks > 0));
  card.classList.toggle('boss-echo-adapted', Boolean(monster?.isBoss && echoes.length > 0));
  card.classList.toggle('boss-rush-encounter', Boolean(monster?.prestigeRushBoss));
}

function renderReactionSegments(value, max, className = '') {
  return Array.from({ length: max }, (_, index) => (
    `<i class="${index < value ? `active ${className}` : ''}"></i>`
  )).join('');
}

function renderMonsterStats() {
  elements.monsterStats.innerHTML = '';
  const monster = gameState.monster;
  if (!monster) {
    visualStatMemory.monsterId = '';
    visualStatMemory.monster = {};
    syncBossVisualState(null);
    return;
  }

  const physicalAffinity = getDamageAffinityInfo(monster, 'physical');
  const magicAffinity = getDamageAffinityInfo(monster, 'magic');

  const affinityPanel = document.createElement('div');
  affinityPanel.className = 'monster-affinity-panel';
  affinityPanel.innerHTML = `
    <div class="monster-affinity-header">
      <span>🧭 Fraqueza / Resistência</span>
      <strong>${getRecommendedDamageType(monster)}</strong>
    </div>
    <div class="monster-affinity-grid">
      ${affinityItemHtml('⚔️', 'Físico', physicalAffinity)}
      ${affinityItemHtml('🔮', 'Mágico', magicAffinity)}
    </div>
  `;
  elements.monsterStats.appendChild(affinityPanel);

  const overload = getOverloadProfile(monster);
  const rage = getHealingRageProfile(monster);

  if (monster.isBoss) {
    const echoes = getEchoSummary(monster);
    const rulesPanel = document.createElement('div');
    rulesPanel.className = 'combat-rules-panel boss-reaction-panel';
    rulesPanel.innerHTML = `
      <div class="boss-reaction-heading">
        <div>
          <span class="boss-reaction-kicker">👑 Boss do Andar ${formatCompactNumber(monster.scalingStage || gameState.player.stage)}</span>
          <strong>Reações de combate</strong>
        </div>
        <span class="boss-scaling-badge">Força fixa pelo bioma</span>
      </div>

      <div class="boss-reaction-meter-grid">
        <div class="boss-reaction-meter ${overload.count > 0 ? 'is-danger' : ''}">
          <div><span>⚡ Sobrecarga</span><strong>${overload.count}/4</strong></div>
          <div class="reaction-segments">${renderReactionSegments(overload.count, 4, 'overload')}</div>
          <small>Seus buffs também fortalecem o boss.</small>
        </div>

        <div class="boss-reaction-meter ${rage.stacks > 0 ? 'is-danger' : ''}">
          <div><span>🩸 Fúria de Cura</span><strong>${rage.stacks}/${gameConfig.healingRageMaxStacks || 5}</strong></div>
          <div class="reaction-segments">${renderReactionSegments(rage.stacks, gameConfig.healingRageMaxStacks || 5, 'rage')}</div>
          <small>Curar restaura o boss e aumenta seus atributos.</small>
        </div>
      </div>

      ${(() => {
        const activeMark = getActiveForgeMark();
        const effects = activeMark?.effects || {};
        const pressureLines = [];
        if (effects.echoExtraStacks) pressureLines.push(`+${effects.echoExtraStacks} carga extra de Eco por acerto`);
        if (effects.enemyDefenseBoostPercent) pressureLines.push(`+${effects.enemyDefenseBoostPercent}% Defesa efetiva para o boss`);
        if (!pressureLines.length) return '';
        return `<div class="boss-forge-pressure forge-tone-${escapeAttr(activeMark.tone || 'unstable')}"><span>${escapeAttr(activeMark.icon || '⚒️')} Sua forja alimenta a reação</span><strong>${pressureLines.map(escapeAttr).join(' • ')}</strong></div>`;
      })()}

      <div class="boss-echo-panel ${echoes.length ? 'has-echo' : ''}">
        <div class="boss-echo-title">
          <span>🔁 Eco Adaptativo</span>
          <strong>${echoes.length ? 'Aprendendo seus golpes' : 'Sem resistência aprendida'}</strong>
        </div>
        <div class="boss-echo-list">
          ${echoes.length
            ? echoes.map((echo) => `
                <span class="boss-echo-chip">
                  <b>${escapeAttr(echo.label)}</b>
                  <em>-${echo.reduction}% dano</em>
                </span>
              `).join('')
            : '<small>Repetir a mesma arma fará o boss adaptar sua defesa.</small>'}
        </div>
      </div>
    `;
    elements.monsterStats.appendChild(rulesPanel);
  }

  const reactionBonuses = {
    attack: Math.round((overload.attack + rage.attack) * 100),
    defense: Math.round((overload.defense + rage.defense) * 100),
    agility: Math.round((overload.agility + rage.agility) * 100),
    crit: Math.round((overload.crit + rage.crit) * 10) / 10,
  };

  const stats = [
    { key: 'attack', icon: '💥', label: 'Ataque', numericValue: getEffectiveMonsterAttack(monster), reactionBonus: reactionBonuses.attack, bonusSuffix: '%' },
    { key: 'defense', icon: '🛡️', label: 'Defesa', numericValue: getEffectiveMonsterDefense(monster), reactionBonus: reactionBonuses.defense, bonusSuffix: '%' },
    { key: 'agility', icon: '⚡', label: 'Agilidade', numericValue: getEffectiveMonsterAgility(monster), reactionBonus: reactionBonuses.agility, bonusSuffix: '%' },
    ...(monster.isBoss ? [{ key: 'crit', icon: '🎯', label: 'Crítico', numericValue: getEffectiveMonsterCritChance(monster), suffix: '%', reactionBonus: reactionBonuses.crit, bonusSuffix: ' pts' }] : []),
    { key: 'xp', icon: '✨', label: 'XP', numericValue: monster.xpReward },
    { key: 'coins', icon: coinIconHtml(), label: 'Recompensa', valueHtml: renderMonsterCoinReward(monster), title: `+${formatCompactNumber(getDisplayedMonsterCoinReward(monster))}` },
    { key: 'family', icon: '👥', label: 'Família', value: monster.type },
  ];

  const sameMonster = visualStatMemory.monsterId === String(monster.id || monster.name);
  if (!sameMonster) {
    visualStatMemory.monsterId = String(monster.id || monster.name);
    visualStatMemory.monster = {};
  }

  stats.forEach(({ key, icon, label, numericValue, suffix = '', value, valueHtml, title, reactionBonus = 0, bonusSuffix = '' }) => {
    const card = document.createElement('div');
    const isNumeric = Number.isFinite(numericValue);
    const displayValue = valueHtml || (isNumeric ? `${formatCompactNumber(numericValue)}${suffix}` : escapeAttr(value ?? '-'));
    const safeTitle = escapeAttr(title || displayValue || '-');
    const hasReactionBonus = monster.isBoss && Number(reactionBonus) > 0 && ['attack', 'defense', 'agility', 'crit'].includes(key);
    const hasFortuneBonus = key === 'coins' && getFortuneCoinBonusPercent(monster) > 0;

    card.className = `stat-card monster-stat-card monster-stat-${key}${hasReactionBonus ? ' has-reaction-bonus' : ''}${hasFortuneBonus ? ' has-fortune-bonus' : ''}`;
    card.innerHTML = `
      <div class="monster-stat-main">
        <span class="stat-icon">${icon}</span>
        <span class="monster-stat-label">${label}</span>
      </div>
      <span class="monster-stat-value-wrap">
        <strong
          class="monster-stat-value"
          ${isNumeric ? `data-monster-stat-value="${key}"` : ''}
          title="${safeTitle}"
        >${displayValue}</strong>
        ${hasReactionBonus ? `<small class="monster-reaction-bonus">▲ +${reactionBonus}${bonusSuffix}</small>` : ''}
      </span>
    `;
    elements.monsterStats.appendChild(card);

    if (isNumeric) {
      const valueElement = card.querySelector(`[data-monster-stat-value="${key}"]`);
      const previousValue = visualStatMemory.monster[key];

      if (sameMonster && Number.isFinite(previousValue) && previousValue !== numericValue) {
        animateDisplayedNumber(valueElement, previousValue, numericValue, {
          suffix,
          duration: 880,
          formatter: (animatedValue) => formatCompactNumber(Math.round(animatedValue)),
        });
      }

      visualStatMemory.monster[key] = numericValue;
    }
  });

  syncBossVisualState(monster);
}

function renderEquipment() {
  elements.equipmentSummary.innerHTML = '';

  Object.values(gearSlotGroups).forEach((group) => {
    const groupBox = document.createElement('div');
    groupBox.className = 'equipment-group';

    groupBox.innerHTML = `<h4>${group.title}</h4>`;

    const slotsGrid = document.createElement('div');
    slotsGrid.className = 'equipment-slots-grid';

    group.slots.forEach((slot) => {
      const label = gearSlots[slot];
      const item = gameState.equipment[slot];
      const row = document.createElement('div');

      const isWeapon = slot === 'physicalWeapon' || slot === 'magicWeapon';
      const isActiveWeapon = gameState.player.activeWeaponSlot === slot;

      row.className = `equipment-slot ${item ? 'has-item' : 'is-empty'} ${isActiveWeapon ? 'active-weapon' : ''}${item?.forgeMark ? ` has-forge-mark forge-tone-${item.forgeMark.tone || 'forge'}` : ''}`;
      row.dataset.equipmentSlot = slot;
      if (item?.rarity) row.dataset.rarity = item.rarity;

      if (!item) {
        row.innerHTML = `
          <div class="gear-image-frame empty">
            <span class="gear-fallback-icon">${getGearFallbackIcon(slot)}</span>
          </div>

          <div class="gear-card-body">
            <span class="gear-slot-label">${label}</span>
            <strong class="gear-empty-name">Vazio</strong>
          </div>
        `;
      } else {
        const cost = getGearUpgradeCost(item);
        const forgePreview = getForgeUpgradePreview(item);
        const rarity = getRarityById(item.rarity);

        const mythicFragmentCost = getMythicUpgradeFragmentCost(item);
        const mythicFragmentLine = mythicFragmentCost > 0
          ? `
Fragmentos Míticos: ${mythicFragmentCost} necessário(s) • você tem ${getMythicFragmentQuantity()}`
          : '';

        const tooltip = `${getGearTooltip(item)}
Melhorar: ${formatMoneyText(cost)}${mythicFragmentLine}
Ganho na próxima melhoria: ${forgePreview}`;
        row.dataset.tooltip = tooltip;
        row.dataset.tooltipHtml = getGearTooltipHtml(item);

        row.innerHTML = `
          ${gearImageTag(item)}

          <div class="gear-card-body">
            <div class="gear-slot-label">
              ${label}${isWeapon && isActiveWeapon ? ' • Ativa' : ''}
            </div>

            <strong class="gear-item-name">
              ${formatGearName(item)}
            </strong>

            <div class="gear-item-meta">
              Nv. ${item.level} • ${rarity.name}
            </div>
            ${item.forgeMark ? `<div class="equipment-forge-mark forge-tone-${escapeAttr(item.forgeMark.tone || 'forge')}"><span>${escapeAttr(item.forgeMark.icon || '⚒️')}</span><strong>${escapeAttr(item.forgeMark.name)}</strong></div>` : ''}
          </div>

          <div class="gear-actions">
            ${isWeapon
            ? `<button type="button" class="mini-button" data-active-weapon="${slot}" ${isActiveWeapon ? 'disabled' : ''}>Usar</button>`
            : ''
          }

            <button type="button" class="mini-button" data-upgrade-slot="${slot}">
              Melhorar
            </button>
          </div>
        `;

        const upgradeButton = row.querySelector('[data-upgrade-slot]');
        const fragmentCost = getMythicUpgradeFragmentCost(item);
        upgradeButton.disabled = gameState.player.coins < cost || getMythicFragmentQuantity() < fragmentCost;
        upgradeButton.addEventListener('click', () => void upgradeEquippedGear(slot));

        const activeWeaponButton = row.querySelector('[data-active-weapon]');
        if (activeWeaponButton) {
          activeWeaponButton.addEventListener('click', () => {
            gameState.player.activeWeaponSlot = slot;
            log(`${gearSlots[slot]} agora está ativa.`, 'equip', true);
            updateStats();
          });
        }
      }

      slotsGrid.appendChild(row);
    });

    groupBox.appendChild(slotsGrid);
    elements.equipmentSummary.appendChild(groupBox);
  });
}


function renderForgeShop(shopType) {
  const slot = getForgeSmithSlot(shopType);
  const weapon = gameState.equipment?.[slot];
  const meta = getShopMerchantMeta(shopType);

  if (!weapon) {
    elements.shopItemsContainer.innerHTML = `<div class="empty-state">Equipe uma ${gearSlots[slot]} para receber uma oferta de forja.</div>`;
    return;
  }

  const currentMark = weapon.forgeMark;
  const biome = getDungeonBiome(gameState.player.stage);
  elements.shopItemsContainer.className = 'shop-items forge-shop-items';
  elements.shopItemsContainer.innerHTML = `
    <div class="forge-current-weapon ${currentMark ? `has-mark forge-tone-${escapeAttr(currentMark.tone || 'forge')}` : ''}">
      <div class="forge-current-media">${gearImageTag(weapon)}</div>
      <div class="forge-current-copy">
        <small>ARMA NA BIGORNA</small>
        <strong>${formatGearName(weapon)}</strong>
        <span>${gearSlots[slot]} • Nv. ${formatCompactNumber(weapon.level)}</span>
        ${currentMark
          ? `<div class="forge-current-mark"><b>${escapeAttr(currentMark.icon || '⚒️')} ${escapeAttr(currentMark.name)}</b><em>Será substituída ao escolher outra marca.</em></div>`
          : '<div class="forge-current-mark empty"><b>Sem Marca de Forja</b><em>A primeira técnica ficará gravada nesta arma.</em></div>'}
      </div>
      <div class="forge-current-biome"><small>BIOMA ATUAL</small><strong>${escapeAttr(biome.name)}</strong></div>
    </div>

    <div class="forge-choice-heading">
      <div><small>ESCOLHA UMA ÚNICA MARCA</small><strong>Qual direção esta arma seguirá?</strong></div>
      <span>Escolha quando estiver pronto</span>
    </div>

    <div class="forge-offer-grid"></div>
  `;

  const grid = elements.shopItemsContainer.querySelector('.forge-offer-grid');
  gameState.shop.items.forEach((offer) => {
    const category = getForgeCategoryMeta(offer.category);
    const card = document.createElement('article');
    card.className = `forge-offer-card forge-tone-${offer.mark.tone || 'forge'} forge-category-${offer.category}`;
    card.innerHTML = `
      <div class="forge-offer-topline">
        <span>${category.icon} ${category.label}</span>
        <b>${offer.mark.icon || '⚒️'}</b>
      </div>
      <strong class="forge-offer-name">${escapeAttr(offer.mark.name)}</strong>
      <p>${escapeAttr(offer.mark.description)}</p>
      <div class="forge-offer-effects">
        ${(offer.mark.summary || []).map((line) => `<span>${escapeAttr(line)}</span>`).join('')}
      </div>
      <div class="forge-offer-drawback"><small>CONSEQUÊNCIA</small><strong>${escapeAttr(offer.mark.drawback || 'Sem desvantagem direta.')}</strong></div>
      <div class="forge-offer-meters">
        ${renderForgeMeter('Poder', offer.power)}
        ${renderForgeMeter('Versatilidade', offer.versatility)}
        ${renderForgeMeter('Risco', offer.risk, 'risk')}
      </div>
      <button type="button" data-forge-offer="${escapeAttr(offer.id)}">
        Forjar • ${formatMoney(offer.cost)}
      </button>
    `;
    const button = card.querySelector('[data-forge-offer]');
    button.disabled = gameState.player.coins < offer.cost;
    button.addEventListener('click', () => applyForgeOffer(offer.id));
    grid.appendChild(card);
  });
}

function renderShop() {
  elements.shopItemsContainer.innerHTML = '';
  elements.shopItemsContainer.className = 'shop-items';
  resetShopVisualState();

  if (!gameState.shop.active || !gameState.shop.items.length) {
    elements.shopItemsContainer.innerHTML = '<div class="empty-state">Nenhum comerciante aberto no momento.</div>';
    if (!gameState.shop.active) elements.shopStatus.textContent = 'Nenhuma loja';
    return;
  }

  const type = gameState.shop.type || 'consumables';
  const meta = getShopMerchantMeta(type);
  if (elements.shopTitle) elements.shopTitle.textContent = meta.title;
  if (elements.shopCard) elements.shopCard.classList.add('merchant-active', meta.className);
  if (elements.shopMerchantVisual) {
    elements.shopMerchantVisual.hidden = false;
    elements.shopMerchantVisual.innerHTML = `
      <span class="shop-merchant-emblem">${meta.icon}</span>
      <div><small>ENCONTRO DE COMERCIANTE</small><strong>${escapeAttr(meta.title)}</strong><p>${escapeAttr(meta.status)}</p></div>
    `;
  }

  updateShopMessage(meta.title);
  updateSpecialShopControls();

  if (type === 'blacksmith' || type === 'arcaneSmith') {
    document.body.classList.add('forge-shop-active', type === 'arcaneSmith' ? 'forge-shop-arcane' : 'forge-shop-physical');
    renderForgeShop(type);
    return;
  }

  gameState.shop.items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'shop-item';
    card.dataset.tooltip = getConsumableTooltip(item);

    card.innerHTML = `
      <div class="item-content">
        ${itemImageTag(item)}
        <div class="item-text">
          <strong class="item-name-line">${item.shopName || item.name}</strong>
        </div>
      </div>

      <button type="button" data-buy="${item.id}">${formatMoney(item.cost)}</button>
    `;

    const button = card.querySelector('button');
    button.disabled = gameState.player.coins < item.cost;
    button.addEventListener('click', () => buyShopItem(item.id));
    elements.shopItemsContainer.appendChild(card);
  });
}

function renderInventory() {
  const totalItems =
    gameState.inventory.items.reduce((sum, item) => sum + item.quantity, 0) + gameState.inventory.gear.length;
  elements.inventoryCount.textContent = `${formatCompactNumber(totalItems)} itens`;

  elements.tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === gameState.activeInventoryTab);
  });

  elements.inventoryItemsContainer.innerHTML = '';

  if (gameState.activeInventoryTab === 'items') {
    renderConsumables();
  } else {
    renderGearInventory();
  }
}

function renderConsumables() {
  if (!gameState.inventory.items.length) {
    elements.inventoryItemsContainer.innerHTML = '<div class="empty-state">Você ainda não tem poções ou consumíveis.</div>';
    return;
  }

  gameState.inventory.items.forEach((entry) => {
    const item = shopCatalog.find((catalogItem) => catalogItem.id === entry.id);
    if (!item) return;

    const row = document.createElement('div');
    row.className = 'inventory-item';
    row.dataset.tooltip = getConsumableTooltip(item);

    row.innerHTML = `
      <div class="item-content">
        ${itemImageTag(item)}
        <div class="item-text">
          <strong class="item-name-line">${item.name} ×${entry.quantity}</strong>
        </div>
      </div>

      <div class="item-actions">
        <button type="button" data-use="${item.id}" ${item.type === 'material' ? 'disabled' : ''}>
          ${item.type === 'material' ? 'Material' : 'Usar'}
        </button>
      </div>
    `;

    const button = row.querySelector('[data-use]');
    if (item.type !== 'material') {
      button.addEventListener('click', () => void useConsumable(item.id));
    }
    elements.inventoryItemsContainer.appendChild(row);
  });
}

function renderGearInventory() {
  const totalGear = gameState.inventory.gear.length;

  if (!totalGear) {
    elements.inventoryItemsContainer.innerHTML = '<div class="empty-state">Nenhum equipamento encontrado ainda.</div>';
    return;
  }

  const equippedItems = Object.values(gameState.equipment).filter(Boolean);
  const equippedUids = getEquippedGearUids();
  const journeyGearCount = gameState.inventory.gear.filter((item) => !equippedUids.has(item.uid)).length;

  elements.inventoryItemsContainer.innerHTML = `
    <div class="empty-state gear-preview">
      <div>
        Você tem <strong>${formatCompactNumber(totalGear)}</strong> equipamentos guardados.
        <br>
        <small>Equipados: ${formatCompactNumber(equippedItems.length)} • Jornada: ${formatCompactNumber(journeyGearCount)}</small>
      </div>
      <button type="button" id="open-gear-modal-button">Abrir equipamentos</button>
    </div>
  `;

  if (equippedItems.length) {
    equippedItems.forEach((item) => {
      const row = document.createElement('div');
      row.className = `inventory-item${item?.forgeMark ? ` has-forge-mark forge-tone-${item.forgeMark.tone || 'forge'}` : ''}`;
      if (item?.rarity) row.dataset.rarity = item.rarity;
      row.dataset.tooltip = getGearTooltip(item);
      row.dataset.tooltipHtml = getGearTooltipHtml(item);
      row.innerHTML = `
        <div>
          <strong class="item-name-line">
            ${formatGearName(item)}
          </strong>
          <p>Equipado • ${gearSlots[item.slot]} • Nv. ${item.level} • ${formatStats(item.stats)}</p>
          ${item.forgeMark ? `<div class="inventory-forge-mark forge-tone-${escapeAttr(item.forgeMark.tone || 'forge')}">${escapeAttr(item.forgeMark.icon || '⚒️')} ${escapeAttr(item.forgeMark.name)}</div>` : ''}
        </div>
      `;
      elements.inventoryItemsContainer.appendChild(row);
    });
  }

  const openButton = document.getElementById('open-gear-modal-button');
  openButton.addEventListener('click', openGearModal);
}

function openGearModal() {
  renderGearModal();
  elements.gearModal.hidden = false;
}

function closeGearModal() {
  elements.gearModal.hidden = true;
}

function createGearModalRow(item, equipped = false) {
  const rarity = getRarityById(item.rarity);

  const row = document.createElement('div');
  row.className = `gear-modal-item${item?.forgeMark ? ` has-forge-mark forge-tone-${item.forgeMark.tone || 'forge'}` : ''}`;
  row.dataset.rarity = rarity.id;
  row.dataset.equipped = equipped ? 'true' : 'false';
  row.dataset.tooltip = getGearTooltip(item);
  row.dataset.tooltipHtml = getGearTooltipHtml(item);

  row.innerHTML = `
    <div class="gear-modal-item-main">
      <div class="gear-modal-item-media">
        ${gearImageTag(item)}
      </div>

      <div class="gear-modal-item-text">
        <div class="gear-modal-item-topline">
          <strong class="gear-modal-item-name">
            ${formatGearName(item)}
          </strong>

          <div class="gear-modal-badges">
            <span class="gear-modal-rarity">${rarity.name}</span>
            ${equipped ? '<span class="gear-modal-equipped-badge">Equipado</span>' : ''}
            ${item.forgeMark ? `<span class="gear-modal-forge-badge forge-tone-${escapeAttr(item.forgeMark.tone || 'forge')}">${escapeAttr(item.forgeMark.icon || '⚒️')} ${escapeAttr(item.forgeMark.name)}</span>` : ''}
          </div>
        </div>

        <p class="gear-modal-item-meta">
          <span>${gearSlots[item.slot]}</span>
          <span>•</span>
          <span>Nv. ${item.level}</span>
        </p>

        <p class="gear-modal-item-stats">
          ${formatStats(item.stats)}
        </p>
      </div>
    </div>

    <div class="gear-modal-item-actions">
      <button type="button" data-equip="${item.uid}" ${equipped ? 'disabled' : ''}>
        ${equipped ? 'Equipado' : 'Equipar'}
      </button>
      <button type="button" data-sell="${item.uid}" class="mini-button">
        Vender ${formatMoney(item.value)}
      </button>
    </div>
  `;

  row.querySelector('[data-equip]')?.addEventListener('click', () => equipGear(item.uid));
  row.querySelector('[data-sell]')?.addEventListener('click', () => sellGear(item.uid));

  return row;
}

function renderGearModal() {
  elements.gearModalList.innerHTML = '';

  if (elements.sellUnequippedGearButton) {
    elements.sellUnequippedGearButton.disabled = getUnequippedGearItems().length === 0;
  }

  if (!gameState.inventory.gear.length) {
    elements.gearModalList.innerHTML = '<div class="empty-state">Nenhum equipamento encontrado ainda.</div>';
    return;
  }

  const equippedItems = gameState.inventory.gear.filter((item) => gameState.equipment[item.slot]?.uid === item.uid);
  const unequippedItems = gameState.inventory.gear.filter((item) => gameState.equipment[item.slot]?.uid !== item.uid);

  const equippedSection = document.createElement('section');
  equippedSection.className = 'gear-modal-section';
  equippedSection.innerHTML = `
    <div class="gear-modal-section-header">
      <h3>Equipados</h3>
      <p>O que seu herói está usando agora.</p>
    </div>
    <div class="gear-modal-section-list"></div>
  `;

  const equippedList = equippedSection.querySelector('.gear-modal-section-list');

  if (equippedItems.length) {
    equippedItems.forEach((item) => {
      equippedList.appendChild(createGearModalRow(item, true));
    });
  } else {
    equippedList.innerHTML = '<div class="empty-state">Nada equipado no momento.</div>';
  }

  const unequippedSection = document.createElement('section');
  unequippedSection.className = 'gear-modal-section';
  unequippedSection.innerHTML = `
    <div class="gear-modal-section-header">
      <h3>Ganhos na jornada</h3>
      <p>Equipamentos guardados para equipar, comparar ou vender.</p>
    </div>
    <div class="gear-modal-section-list"></div>
  `;

  const unequippedList = unequippedSection.querySelector('.gear-modal-section-list');

  if (unequippedItems.length) {
    unequippedItems.forEach((item) => {
      unequippedList.appendChild(createGearModalRow(item, false));
    });
  } else {
    unequippedList.innerHTML = '<div class="empty-state">Nada por aqui.</div>';
  }

  elements.gearModalList.appendChild(equippedSection);
  elements.gearModalList.appendChild(unequippedSection);
}

function renderPrestigeRushStatus() {
  if (!elements.prestigeRushBanner) return;

  const rush = ensurePrestigeRushState();
  elements.prestigeRushBanner.hidden = !rush.active;

  if (!rush.active) return;

  const completed = rush.bossesDefeated || 0;
  const total = Math.max(1, rush.totalBosses || 1);
  const progress = clamp((completed / total) * 100, 0, 100);
  const nextJump = getPrestigeRushStageGain();

  elements.prestigeRushTitle.textContent = 'Marcha dos Bosses';
  elements.prestigeRushText.textContent = `Cada boss entrega suprimentos. A próxima vitória avança cerca de ${nextJump} andar${nextJump === 1 ? '' : 'es'} rumo a aproximadamente 75% do antigo recorde.`;
  elements.prestigeRushProgress.style.width = `${progress}%`;
  elements.prestigeRushCount.textContent = `${rush.bossesRemaining} / ${rush.totalBosses}`;
  elements.prestigeRushTarget.textContent = `Retorno: Andar ${rush.targetStage} • Recorde: ${rush.recordStage}`;
  if (elements.prestigeRushGear) elements.prestigeRushGear.textContent = formatCompactNumber(rush.gearRewards || 0);
  if (elements.prestigeRushConsumables) elements.prestigeRushConsumables.textContent = formatCompactNumber(rush.consumableRewards || 0);
  if (elements.prestigeRushCrates) elements.prestigeRushCrates.textContent = formatCompactNumber(rush.milestoneCrates || 0);
}

function updateTurnDisplay() {
  const current = gameState.currentTurn === 'monster' ? 'Monstro' : 'Jogador';
  const rush = ensurePrestigeRushState();
  const bossProgress = rush.active
    ? `Marcha: ${rush.bossesRemaining} boss(es) restante(s)`
    : gameState.monster?.isBoss
      ? 'Boss em combate'
      : `Boss em ${getMonstersUntilMandatoryBoss()} inimigo(s)`;

  elements.turnDisplay.textContent = `🛡️ Turno: ${current}`;
  const recoveryText = gameState.player.recoveryGrace?.battles > 0
    ? ` • Recuperação: ${gameState.player.recoveryGrace.battles} luta(s)`
    : '';

  elements.autoStatus.textContent = `Auto: ${gameState.autoAttack ? 'ligado' : 'desligado'} • ${bossProgress}${recoveryText}`;
  renderPrestigeRushStatus();
}

function updateButtons() {
  const dead = gameState.player.hp <= 0;
  const busy = gameState.actionInProgress || isCardEffectSequenceBusy();
  const bossAlreadyInCombat = Boolean(gameState.monster?.isBoss);

  elements.attackButton.disabled = dead || busy || !gameState.monster;
  elements.nextButton.disabled = dead || busy;
  elements.bossButton.disabled = dead || busy || bossAlreadyInCombat || gameState.player.victories < 5;
  elements.continueButton.disabled = !dead;
  elements.autoButton.disabled = dead;

  elements.skillButtons.forEach((button) => {
    button.disabled = gameState.player.skillPoints <= 0;
  });

  elements.bossButton.title = bossAlreadyInCombat
    ? 'Já existe um boss em combate.'
    : gameState.player.victories < 5
      ? 'Derrote pelo menos 5 monstros para chamar um boss manual.'
      : `Enfrentar um boss forte. Boss obrigatório em ${getMonstersUntilMandatoryBoss()} inimigo(s).`;
}

function getCombatTargetCenter(target) {
  const rect = target.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height * 0.45,
  };
}

let globalCardEffectQueue = Promise.resolve();
let pendingCardEffectCount = 0;

function waitForEffect(milliseconds = 0) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, milliseconds)));
}

function isCardEffectSequenceBusy() {
  return pendingCardEffectCount > 0;
}

function clearAllCardEffectVisuals() {
  document
    .querySelectorAll(
      '.combat-indicator-screen, .spell-impact-screen, .potion-use-indicator-screen, .life-steal-indicator-screen, .mythic-effect-activation'
    )
    .forEach((entry) => entry.remove());

  document.querySelectorAll('.hero-card, .monster-card').forEach((card) => {
    clearCombatCardEffectClasses(card);
    card.classList.remove('spell-target-glow', 'card-effect-running');
    delete card.dataset.combatPulseId;
    delete card.dataset.spellGlowId;
  });
}

/**
 * Fila GLOBAL de iluminação/animações.
 * Não é mais uma fila por card: herói e inimigo compartilham a mesma sequência,
 * então nenhum brilho, ícone, poção ou habilidade pode sobrepor outro.
 *
 * options.apply é executado durante a animação, nunca antes dela começar.
 */
function queueCardEffect(target, callback, duration = 900, gap = 90, options = {}) {
  const settings = options && typeof options === 'object' ? options : {};
  const applyEffect = typeof settings.apply === 'function' ? settings.apply : null;
  const defaultApplyDelay = Math.round(duration * 0.62);
  const applyDelay = clamp(
    Number.isFinite(settings.applyDelay) ? settings.applyDelay : defaultApplyDelay,
    0,
    duration
  );

  pendingCardEffectCount += 1;
  if (typeof updateButtons === 'function') updateButtons();

  const scheduled = globalCardEffectQueue
    .catch(() => { })
    .then(async () => {
      clearAllCardEffectVisuals();

      if (target) {
        target.classList.add('card-effect-running');
      }

      try {
        await Promise.resolve(callback?.());

        if (applyEffect) {
          // Com delay zero, aplica no mesmo ciclo em que o efeito aparece no card.
          if (applyDelay > 0) {
            await waitForEffect(applyDelay);
          }

          await Promise.resolve(applyEffect());
          updateStats();

          await waitForEffect(Math.max(0, duration - applyDelay));
        } else {
          await waitForEffect(duration);
        }
      } finally {
        clearAllCardEffectVisuals();
      }

      await waitForEffect(gap);
    })
    .finally(() => {
      pendingCardEffectCount = Math.max(0, pendingCardEffectCount - 1);
      if (typeof updateButtons === 'function') updateButtons();
    });

  globalCardEffectQueue = scheduled.catch(() => { });
  return scheduled;
}

async function waitForCardEffects() {
  // Se outra ação entrar enquanto aguardamos, espera também a nova cauda da fila.
  while (true) {
    const snapshot = globalCardEffectQueue;
    await snapshot.catch(() => { });

    if (snapshot === globalCardEffectQueue) {
      return;
    }
  }
}

function clearCombatCardEffectClasses(target) {
  if (!target) return;

  target.classList.remove(
    'combat-card-action',
    'combat-card-cast',
    'combat-card-hit',
    'combat-card-dodge',
    'combat-card-critical',
    'combat-card-magic',
    'combat-card-arcane-hit',
    'combat-card-mythic',
    'combat-card-heal',
    'combat-card-potion'
  );
}

function pulseCombatCard(target, flashClass, duration = 720, queued = false) {
  if (!target) return Promise.resolve();

  const runPulse = () => {
    const pulseId = `${Date.now()}-${Math.random()}`;

    target.dataset.combatPulseId = pulseId;
    clearCombatCardEffectClasses(target);

    void target.offsetWidth;
    target.classList.add(flashClass);

    setTimeout(() => {
      if (target.dataset.combatPulseId !== pulseId) return;

      target.classList.remove(flashClass);
      delete target.dataset.combatPulseId;
    }, duration);
  };

  if (queued) {
    return queueCardEffect(target, runPulse, duration, 100);
  }

  runPulse();
  return Promise.resolve();
}

function showCombatIndicator(targetSide, resultType, onApply = null, impactItem = null) {
  const target =
    targetSide === 'player'
      ? document.querySelector('.hero-card')
      : document.querySelector('.monster-card');

  if (!target) {
    if (typeof onApply === 'function') onApply();
    return Promise.resolve();
  }

  const icons = {
    playerHit: '⚔️',
    magicWeaponHit: '🔮',
    arcaneBombHit: '💣',
    playerMiss: '💨',
    enemyHit: '💥',
    playerDodge: '💨',
    critical: '⚡',
    mythicHit: '✦',
  };

  const isDodge = resultType === 'playerMiss' || resultType === 'playerDodge';
  const isCritical = resultType === 'critical';
  const isArcaneBasic =
    resultType === 'magicWeaponHit' ||
    resultType === 'arcaneBombHit' ||
    resultType === 'mythicHit';

  const flashClass = isDodge
    ? 'combat-card-dodge'
    : isCritical
      ? 'combat-card-critical'
      : isArcaneBasic
        ? 'combat-card-arcane-hit'
        : 'combat-card-hit';

  const visualDuration = isCritical ? 1050 : 900;
  const pulseDuration = isCritical ? 820 : 720;

  const runCombatVisual = () => {
    pulseCombatCard(target, flashClass, pulseDuration);

    const center = getCombatTargetCenter(target);
    const indicator = document.createElement('div');

    const fallbackIcon = icons[resultType] || '✦';
    const useImpactImage = targetSide === 'monster' && !isDodge && Boolean(impactItem);
    const impactImagePath = useImpactImage
      ? impactItem.image || getGearImagePath(impactItem)
      : '';
    const impactName = escapeAttr(impactItem?.name || 'Equipamento usado no ataque');

    indicator.className = `combat-indicator-screen ${resultType}${useImpactImage ? ' has-impact-image' : ''}`;
    indicator.dataset.targetSide = targetSide;
    indicator.style.setProperty('--combat-x', `${center.x}px`);
    indicator.style.setProperty('--combat-y', `${center.y}px`);

    // Somente os danos recebidos pelo inimigo usam a imagem do equipamento.
    // Os ataques do inimigo contra o herói e as esquivas mantêm seus emojis originais.
    if (useImpactImage && impactImagePath) {
      indicator.innerHTML = `
        <img
          class="combat-impact-image"
          src="${escapeAttr(impactImagePath)}"
          alt="${impactName}"
          loading="eager"
          decoding="async"
          onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
        />
        <span class="combat-impact-fallback" hidden>${fallbackIcon}</span>
      `;
    } else {
      indicator.textContent = fallbackIcon;
    }

    document.body.appendChild(indicator);
  };

  // Todos os lados usam a MESMA fila global. Nenhum efeito do inimigo
  // substitui mais o anterior e nenhum efeito do herói ocorre em paralelo.
  return queueCardEffect(target, runCombatVisual, visualDuration, 90, {
    apply: onApply,
    applyDelay: 0,
  });
}

function showMythicEffectActivation(title, detail = '', targetSide = 'monster', onApply = null) {
  const target =
    targetSide === 'player'
      ? document.querySelector('.hero-card')
      : document.querySelector('.monster-card');

  if (!target) {
    if (typeof onApply === 'function') onApply();
    return Promise.resolve();
  }

  const runMythicVisual = () => {
    const center = getCombatTargetCenter(target);
    const badge = document.createElement('div');

    badge.className = 'mythic-effect-activation';
    badge.style.setProperty('--mythic-effect-x', `${center.x}px`);
    badge.style.setProperty('--mythic-effect-y', `${center.y}px`);
    badge.innerHTML = `
      <span>✦</span>
      <strong>${escapeAttr(title)}</strong>
      ${detail ? `<small>${escapeAttr(detail)}</small>` : ''}
    `;

    document.body.appendChild(badge);
    pulseCombatCard(target, 'combat-card-mythic', 760);
  };

  return queueCardEffect(target, runMythicVisual, 1150, 100, {
    apply: onApply,
    applyDelay: typeof onApply === 'function' ? 0 : 820,
  });
}

function getCombatDodgeChance(attacker, defender, attackerSide = 'player') {
  const precision = attacker.precision || 0;
  const attackerAgility = Math.max(1, Number(attacker.agility) || 1);
  const defenderAgility = Math.max(1, Number(defender.agility) || 1);
  const agilityDiffRatio = (defenderAgility - attackerAgility) / Math.max(attackerAgility, defenderAgility, 1);

  // Antes, qualquer inimigo com agilidade alta batia sempre no teto de 28%.
  // Agora a esquiva depende da diferença real entre as agilidades.
  const baseChance = 8 + agilityDiffRatio * 18 - precision;
  const maxChance = attackerSide === 'player' ? 20 : 24;

  return clamp(baseChance, 3, maxChance);
}

async function dealDamage(attacker, defender, attackerLabel, defenderLabel, attackerSide = 'player', damageType = 'physical') {
  const defenderSide = attackerSide === 'player' ? 'monster' : 'player';
  const dodgeChance = getCombatDodgeChance(attacker, defender, attackerSide);
  const criticalChance = attacker.critChance ?? 8;

  if (randomBetween(1, 100) <= dodgeChance) {
    await showCombatIndicator(
      attackerSide === 'player' ? 'monster' : 'player',
      attackerSide === 'player' ? 'playerMiss' : 'playerDodge'
    );

    log(`${defenderLabel} esquivou do ataque de ${attackerLabel}.`, 'damage');

    if (attackerSide === 'player') {
      resetForgeCombo(defender, getForgeMarkForDamageType(damageType));
    }

    return {
      damage: 0,
      dodged: true,
      critical: false,
      damageType,
    };
  }

  const variation = randomBetween(-3, 4);
  const isMagicWeaponAttack = attackerSide === 'player' && damageType === 'magicWeapon';
  const isSpellCast = attackerSide === 'player' && damageType === 'magic';
  const isMagicalDamage = damageType === 'magic' || damageType === 'magicWeapon';

  let basePower = isMagicalDamage
    ? attacker.magic || attacker.attack || 1
    : attacker.attack || 1;

  if (isSpellCast) {
    basePower = Math.round(basePower * getPlayerSpellDamageMultiplier());
  }

  let weaponDamageKey = isMagicalDamage ? 'magic' : damageType;

  if (attackerSide === 'player' && damageType === 'physical') {
    const activeSlot = gameState.player.activeWeaponSlot || 'physicalWeapon';
    const activeWeapon = gameState.equipment?.[activeSlot];
    const weaponName = activeWeapon?.name?.toLowerCase() || '';

    if (weaponName.includes('tridente')) {
      weaponDamageKey = 'trident';
    }
  }

  const resistance = getSafeResistanceMultiplier(defender, weaponDamageKey, damageType);
  const echoMultiplier = attackerSide === 'player'
    ? getEchoResistanceMultiplier(defender, damageType)
    : 1;
  let furyMultiplier = 1;

  if (attackerSide === 'player' && attacker.furyPower) {
    const hpPercent = gameState.player.hp / getPlayerMaxHp();

    if (hpPercent <= 0.35) furyMultiplier += attacker.furyPower / 100;
    if (hpPercent <= 0.18) furyMultiplier += attacker.furyPower / 100;
  }

  let bossDamageMultiplier = 1;

  if (attackerSide === 'player' && defender.isBoss) {
    bossDamageMultiplier += (getEquipmentBonus('bossDamagePercent') || 0) / 100;
  }

  const forgeMark = attackerSide === 'player' ? getForgeMarkForDamageType(damageType) : null;
  const forgeMultiplier = attackerSide === 'player' ? getForgeDamageMultiplier(forgeMark, defender, damageType) : 1;

  const defenseReductionRate = attackerSide === 'monster' ? 0.42 : 0.65;
  const minimumDamageRate = attackerSide === 'monster' ? 0.18 : 0.07;
  let effectiveDefenderDefense = attackerSide === 'player'
    ? getEffectiveMonsterDefense(defender)
    : (defender.defense || 0);

  if (attackerSide === 'player' && forgeMark) {
    const enemyDefenseBoost = getForgeEffectForDamageType(damageType, 'enemyDefenseBoostPercent');
    const armorPen = clamp(getForgeEffectForDamageType(damageType, 'armorPenPercent'), 0, 65);
    effectiveDefenderDefense *= 1 + enemyDefenseBoost / 100;
    effectiveDefenderDefense *= 1 - armorPen / 100;
  }

  const defenseReduction = effectiveDefenderDefense * defenseReductionRate;
  const minimumDamage = Math.max(1, Math.round(basePower * minimumDamageRate));
  const damageReductionMultiplier = attackerSide === 'monster'
    ? clamp(1 - ((defender.damageReductionPercent || 0) / 100), 0.65, 1)
    : 1;

  const rawDamage = Math.max(
    minimumDamage,
    Math.round(
      (basePower - defenseReduction + variation) *
      resistance *
      furyMultiplier *
      bossDamageMultiplier *
      forgeMultiplier *
      damageReductionMultiplier *
      echoMultiplier
    )
  );

  const isCritical = randomBetween(1, 100) <= criticalChance;
  let damage = isCritical ? Math.round(rawDamage * 1.75) : rawDamage;

  if (attackerSide === 'monster' && (defender.damageReductionPercent || 0) > 0) {
    await showMythicEffectActivation(
      'Redução Mítica',
      `-${formatCompactNumber(defender.damageReductionPercent, 1)}% dano`,
      'player'
    );
  }

  if (attackerSide === 'monster') {
    const defenderMaxHp = getPlayerMaxHp();
    const maxHitRate = attacker.isBoss
      ? (attacker.specialBoss ? (gameConfig.specialBossHitCap || 0.38) : (gameConfig.bossHitCap || 0.30))
      : 0.105;
    const maxHitDamage = Math.max(1, Math.round(defenderMaxHp * maxHitRate));
    damage = Math.min(damage, maxHitDamage);
  }

  let totalDamage = damage;
  const applyMainDamage = () => {
    defender.hp = Math.max(0, defender.hp - damage);
    if (defenderSide === 'player') normalizePlayerHp();
  };

  if (isSpellCast) {
    await showSpellImpact(damage, applyMainDamage);
  } else {
    const resultType = isCritical
      ? 'critical'
      : isMagicWeaponAttack
        ? 'magicWeaponHit'
        : attackerSide === 'player'
          ? 'playerHit'
          : 'enemyHit';

    const impactItem = attackerSide === 'player'
      ? isMagicWeaponAttack
        ? gameState.equipment?.magicWeapon
        : gameState.equipment?.physicalWeapon
      : null;

    await showCombatIndicator(defenderSide, resultType, applyMainDamage, impactItem);
  }

  const damageLabel = damageType === 'magic'
    ? 'magia'
    : damageType === 'magicWeapon'
      ? 'ataque mágico'
      : 'dano físico';

  if (isCritical) {
    log(`CRÍTICO! ${attackerLabel} causou ${formatCompactNumber(damage)} de ${damageLabel} em ${defenderLabel}.`, 'damage', true);
  } else {
    log(`${attackerLabel} causou ${formatCompactNumber(damage)} de ${damageLabel} em ${defenderLabel}.`, 'damage');
  }

  if (attackerSide === 'player' && totalDamage > 0 && forgeMark) {
    defender.forgeTriggeredMarks ||= {};
    if (!defender.forgeTriggeredMarks[forgeMark.id]) {
      defender.forgeTriggeredMarks[forgeMark.id] = true;
      const activeDetail = isForgeBiomeMarkActive(forgeMark, defender)
        ? `Bônus de ${forgeMark.effects.biomeDamagePercent}% no bioma`
        : (forgeMark.summary || [])[0] || 'Marca ativada';
      void showForgeEffectActivation(forgeMark, activeDetail, defenderSide);
    }
  }

  if (
    attackerSide === 'player' &&
    damageType === 'magic' &&
    attacker.magicEchoChance &&
    defender.hp > 0 &&
    randomBetween(1, 100) <= attacker.magicEchoChance
  ) {
    const echoPercent = attacker.magicEchoDamagePercent || 15;
    const echoDamage = Math.max(1, Math.round(damage * (echoPercent / 100)));

    await showMythicEffectActivation(
      'Eco Arcano',
      `+${formatCompactNumber(echoDamage)} dano`,
      defenderSide,
      () => {
        defender.hp = Math.max(0, defender.hp - echoDamage);
      }
    );

    totalDamage += echoDamage;
    log(`Eco Arcano: o dano mágico ecoou e causou mais ${formatCompactNumber(echoDamage)} de dano.`, 'damage', true);
  }

  if (attackerSide === 'player' && defender.hp > 0) {
    const canDoubleStrike =
      (damageType === 'physical' || damageType === 'magicWeapon') &&
      attacker.doubleStrikeChance;
    const canDoubleMagic = damageType === 'magic' && attacker.doubleMagicChance;

    if (canDoubleStrike && randomBetween(1, 100) <= attacker.doubleStrikeChance) {
      const extraPercent = attacker.doubleStrikeDamagePercent || 55;
      const extraDamage = Math.max(1, Math.round(damage * (extraPercent / 100)));

      await showMythicEffectActivation(
        'Golpe Duplo',
        `+${formatCompactNumber(extraDamage)} dano`,
        defenderSide,
        () => {
          defender.hp = Math.max(0, defender.hp - extraDamage);
        }
      );

      totalDamage += extraDamage;
      log(`Golpe Duplo Mítico: mais ${formatCompactNumber(extraDamage)} de dano.`, 'damage', true);
    }

    if (canDoubleMagic && defender.hp > 0 && randomBetween(1, 100) <= attacker.doubleMagicChance) {
      const extraPercent = attacker.doubleMagicDamagePercent || 60;
      const extraDamage = Math.max(1, Math.round(damage * (extraPercent / 100)));

      await showSpellImpact(extraDamage, () => {
        defender.hp = Math.max(0, defender.hp - extraDamage);
      });

      await showMythicEffectActivation(
        'Magia Dupla',
        `+${formatCompactNumber(extraDamage)} dano`,
        defenderSide
      );

      totalDamage += extraDamage;
      log(`Magia Dupla Mítica: a magia repetiu e causou mais ${formatCompactNumber(extraDamage)} de dano.`, 'damage', true);
    }
  }

  if (attackerSide === 'player' && defender.hp > 0 && forgeMark?.effects?.forgeDoubleHitChance) {
    if (randomBetween(1, 100) <= forgeMark.effects.forgeDoubleHitChance) {
      const extraPercent = forgeMark.effects.forgeDoubleHitDamagePercent || 55;
      const extraDamage = Math.max(1, Math.round(damage * (extraPercent / 100)));
      await showForgeEffectActivation(
        forgeMark,
        `Segundo impacto: +${formatCompactNumber(extraDamage)} dano`,
        defenderSide,
        () => { defender.hp = Math.max(0, defender.hp - extraDamage); }
      );
      totalDamage += extraDamage;
      log(`${forgeMark.name}: a Marca de Forja repetiu parte do golpe e causou mais ${formatCompactNumber(extraDamage)} de dano.`, 'damage', true);
    }
  }

  if (attackerSide === 'player' && totalDamage > 0) {
    advanceForgeCombo(defender, forgeMark);
    registerEchoAdaptation(defender, damageType, forgeMark?.effects?.echoExtraStacks || 0);
  }

  if (attackerSide === 'player' && totalDamage > 0 && attacker.lifeStealChance) {
    if (randomBetween(1, 100) <= attacker.lifeStealChance) {
      const stealPercent = attacker.lifeStealAmountPercent || 8;
      const requestedHeal = Math.max(1, Math.round(totalDamage * (stealPercent / 100)));
      const healed = Math.min(requestedHeal, Math.max(0, getPlayerMaxHp() - gameState.player.hp));

      if (healed > 0) {
        await showLifeStealVisual(healed, () => {
          gameState.player.hp = Math.min(getPlayerMaxHp(), gameState.player.hp + healed);
        });

        log(`Roubo de vida: você recuperou ${formatCompactNumber(healed)} HP.`, 'reward', true);
      }
    }
  }


  return {
    damage: totalDamage,
    dodged: false,
    critical: isCritical,
    damageType,
  };
}

function getPlayerCombatStats() {
  return {
    hp: gameState.player.hp,
    attack: getPlayerAttack(),
    magic: getPlayerMagic(),
    magicChance: getPlayerMagicChance(),
    defense: getPlayerDefense(),
    agility: getPlayerAgility(),
    critChance: getPlayerCritChance(),

    precision: getEquipmentBonus('precision'),

    lifeStealChance: getEquipmentBonus('lifeStealChance') + getActiveForgeEffect('lifeStealChance'),
    lifeStealAmountPercent: getEquipmentBonus('lifeStealAmountPercent') + getActiveForgeEffect('lifeStealAmountPercent'),

    furyPower: getEquipmentBonus('furyPower'),

    magicEchoChance: getEquipmentBonus('magicEchoChance'),
    magicEchoDamagePercent: getEquipmentBonus('magicEchoDamagePercent'),

    doubleStrikeChance: getEquipmentBonus('doubleStrikeChance'),
    doubleStrikeDamagePercent: getEquipmentBonus('doubleStrikeDamagePercent'),
    doubleMagicChance: getEquipmentBonus('doubleMagicChance'),
    doubleMagicDamagePercent: getEquipmentBonus('doubleMagicDamagePercent'),
    damageReductionPercent: getEquipmentBonus('damageReductionPercent'),
    deathWardChance: getEquipmentBonus('deathWardChance'),
    firstStrikeChance: getEquipmentBonus('firstStrikeChance'),
  };
}

async function startTurn() {
  if (
    document.hidden ||
    gameState.offlineStartedAt ||
    gameState.actionInProgress ||
    isCardEffectSequenceBusy() ||
    !gameState.monster ||
    gameState.player.hp <= 0
  ) return;

  gameState.actionInProgress = true;

  try {
    const monster = gameState.monster;
    const playerCombat = getPlayerCombatStats();

    if (monster.isBoss) {
      const bossMultiplier = getTotalBossDamageMultiplier();
      playerCombat.attack = Math.round(playerCombat.attack * bossMultiplier);
      playerCombat.magic = Math.round(playerCombat.magic * bossMultiplier);
    }

    const monsterCombat = getMonsterCombatStats(monster);

    let playerFirst = getPlayerAgility() >= getEffectiveMonsterAgility(monster);

    if (!playerFirst && playerCombat.firstStrikeChance) {
      playerFirst = randomBetween(1, 100) <= playerCombat.firstStrikeChance;

      if (playerFirst) {
        await showMythicEffectActivation('Iniciativa', 'você começa o turno', 'player');
        log('Iniciativa Mítica: você agiu antes do inimigo.', 'system', true);
      }
    }

    const order = playerFirst ? ['player', 'monster'] : ['monster', 'player'];
    await executeTurnOrder(order, playerCombat, monsterCombat);
  } catch (error) {
    console.error('Erro durante o turno:', error);
    gameState.actionInProgress = false;
    clearAllCardEffectVisuals();
    updateStats();
  }
}

async function executeTurnOrder(order, playerCombat, monsterCombat) {
  const actor = order.shift();

  if (!actor) {
    await waitForCardEffects();
    gameState.currentTurn = 'player';
    gameState.actionInProgress = false;
    updateStats();
    return;
  }

  gameState.currentTurn = actor;
  updateTurnDisplay();
  updateStats();

  const actionDelay = actor === 'monster'
    ? gameConfig.enemyTurnDelay
    : gameConfig.turnDelay;

  await waitForEffect(actionDelay);

  // Caso a aba tenha sido ocultada durante a animação, encerra o turno sem
  // continuar alterando o save enquanto o progresso offline está sendo contado.
  if (document.hidden || gameState.offlineStartedAt) {
    gameState.actionInProgress = false;
    return;
  }

  if (!gameState.monster || gameState.player.hp <= 0) {
    gameState.actionInProgress = false;
    updateStats();
    return;
  }

  if (actor === 'player') {
    // Toda cura, poção e buff acontece no começo do turno do herói,
    // depois do golpe inimigo terminar e antes do herói atacar.
    await runHeroPreAttackSupportPhase();

    if (!gameState.monster || gameState.player.hp <= 0) {
      gameState.actionInProgress = false;
      updateStats();
      return;
    }

    const refreshedPlayerCombat = getPlayerCombatStats();
    if (gameState.monster.isBoss) {
      const bossMultiplier = getTotalBossDamageMultiplier();
      refreshedPlayerCombat.attack = Math.round(refreshedPlayerCombat.attack * bossMultiplier);
      refreshedPlayerCombat.magic = Math.round(refreshedPlayerCombat.magic * bossMultiplier);
    }

    Object.assign(playerCombat, refreshedPlayerCombat);
    playerCombat.hp = gameState.player.hp;
    monsterCombat.hp = gameState.monster.hp;

    const castSpell =
      canUseEquippedSpell() &&
      randomBetween(1, 100) <= getPlayerMagicChance();

    const damageType = castSpell
      ? 'magic'
      : isMagicWeaponActive()
        ? 'magicWeapon'
        : 'physical';

    await dealDamage(
      playerCombat,
      gameState.monster,
      'Você',
      gameState.monster.name,
      'player',
      damageType
    );
  } else if (gameState.monster.hp > 0) {
    Object.assign(monsterCombat, getMonsterCombatStats(gameState.monster));
    monsterCombat.hp = gameState.monster.hp;

    const result = await dealDamage(
      monsterCombat,
      gameState.player,
      gameState.monster.name,
      'você',
      'monster',
      'physical'
    );

    if (result.damage > 0) {
      // O golpe inimigo termina por completo. Cura e buffs só serão processados
      // quando o próximo ator for o herói, antes do ataque dele.
      await waitForCardEffects();
      normalizePlayerHp();
    }
  }

  // Inclui ações manuais que tenham sido colocadas na fila durante o turno.
  await waitForCardEffects();
  updateStats();

  if (await checkBattleEnd()) {
    gameState.actionInProgress = false;
    updateStats();
    return;
  }

  await waitForEffect(gameConfig.afterTurnDelay);
  return executeTurnOrder(order, playerCombat, monsterCombat);
}

async function checkBattleEnd() {
  const player = gameState.player;
  const monster = gameState.monster;

  if (!monster) return false;

  if (monster.hp <= 0) {
    await winBattle(monster);
    return true;
  }

  if (player.hp <= 0) {
    const deathWardChance = getEquipmentBonus('deathWardChance') || 0;

    if (deathWardChance > 0 && randomBetween(1, 100) <= deathWardChance) {
      const restoredHp = Math.max(1, Math.round(getPlayerMaxHp() * 0.18));

      await showMythicEffectActivation(
        'Proteção Mítica',
        `+${formatCompactNumber(restoredHp)} HP`,
        'player',
        () => {
          player.hp = restoredHp;
        }
      );

      log(`Proteção Mítica: a morte foi evitada e você voltou com ${formatCompactNumber(restoredHp)} HP.`, 'reward', true);
      return false;
    }

    stopAutoAttack();
    log('Você foi derrotado. Clique em Continuar para recuperar a vida e tentar de novo.', 'system', true);
    return true;
  }

  return false;
}

async function winBattle(monster) {
  const player = gameState.player;
  const xpRewardBase = monster.xpReward;
  const coinRewardBase = monster.coinReward;
  const xpGained = getXpReward(xpRewardBase);
  const coinsGained = getCoinReward(coinRewardBase, monster);

  player.coins += coinsGained;
  player.victories += 1;

  let triedToAdvanceStage = false;
  let didAdvanceStage = false;
  let stagesAdvanced = 0;
  let prestigeRushCompleted = false;

  if (monster.isBoss) {
    player.bossesDefeated += 1;
    player.monstersSinceBoss = 0;

    const stageBeforeBoss = player.stage;
    const stageGain = getBossStageAdvanceAmount(monster);

    triedToAdvanceStage = stageGain > 0;
    didAdvanceStage = stageGain > 0 ? advanceStage(stageGain) : false;
    stagesAdvanced = Math.max(0, player.stage - stageBeforeBoss);

    if (monster.prestigeRushBoss) {
      prestigeRushCompleted = resolvePrestigeRushBossVictory(monster);
    } else if (didAdvanceStage && stagesAdvanced > 0) {
      log(`O boss abriu o caminho para o Andar ${player.stage}.`, 'boss', true);
    }
  } else {
    player.monstersSinceBoss = getMonstersSinceLastBoss() + 1;
  }

  if (triedToAdvanceStage && !didAdvanceStage && !monster.prestigeRushBoss) {
    log(
      'Você atingiu o limite atual da masmorra. Suba o nível do herói, derrote mais bosses ou faça prestígio para liberar andares mais altos.',
      'system',
      true
    );
  }

  log(`Você derrotou ${monster.name}: +${formatCompactNumber(xpGained)} XP e +${formatMoney(coinsGained)}.`, 'reward', true);
  gainXp(xpRewardBase);

  const normalDropChance = clamp(
    28 + Math.min(18, player.stage * 2) + getTotalDropBonus(),
    5,
    80
  );

  const dropChance = monster.isBoss ? 100 : normalDropChance;

  if (randomBetween(1, 100) <= dropChance) {
    addGear(createGear(monster.level, monster.isBoss));
  }

  if (monster.prestigeRushBoss) {
    grantPrestigeRushBossRewards(monster);
    if (prestigeRushCompleted) {
      grantPrestigeRushCompletionCache();
    }
  }

  maybeAwardSpecialBossRewards(monster);
  if (!monster.prestigeRushBoss) {
    maybeSpawnMythicRiftAfterBoss(monster);
  }
  maybeDropConsumable(monster);
  tickDeathRecoveryGraceAfterWin(monster);

  tickShopDurationAfterBattle();
  maybeOpenShop(monster.isBoss);

  if (typeof tickBattleBuffs === 'function') {
    await tickBattleBuffs();
  }

  gameState.monster = createNextEncounter();
  gameState.currentTurn = 'player';

  if (gameState.monster.prestigeRushBoss) {
    const rush = ensurePrestigeRushState();
    log(
      `Marcha dos Bosses: ${gameState.monster.name} bloqueia o caminho. ${rush.bossesRemaining} boss(es) até o ponto de retorno no Andar ${rush.targetStage}.`,
      'boss',
      true
    );
  } else if (gameState.monster.mandatoryBoss) {
    log(
      `Boss obrigatório apareceu: ${gameState.monster.name}! Derrote-o para avançar na masmorra.`,
      'boss',
      true
    );
  }
}

async function tickBattleBuffs() {
  const buffs = gameState.player.buffs;
  if (!buffs) return;

  Object.keys(buffs).forEach((buff) => {
    if (buffs[buff] > 0) {
      buffs[buff] -= 1;
    }
  });

  // A renovação automática será feita na fase de suporte do próximo turno do herói.
}

function gainXp(amount, showLog = true) {
  const player = gameState.player;
  const finalAmount = getXpReward(amount);

  player.xp += finalAmount;

  while (player.xp >= player.nextLevelXp) {
    player.xp -= player.nextLevelXp;
    levelUp(showLog);
  }

  return finalAmount;
}

function levelUp(showLog = true) {
  const player = gameState.player;

  player.level += 1;

  const bonuses = getLevelUpBonuses(player.level);

  player.maxHp += bonuses.maxHp;
  player.attack += bonuses.attack;
  player.defense += bonuses.defense;
  player.agility += bonuses.agility;
  player.skillPoints += bonuses.skillPoints;

  const levelHealAmount = healOnLevelUp();
  player.nextLevelXp = getNextLevelXpForLevel(player.level);

  if (showLog) {
    const agilityText = bonuses.agility > 0 ? `, +${bonuses.agility} Agilidade` : '';

    log(
      `Nível ${player.level}! +${bonuses.maxHp} Vida, +${bonuses.attack} Ataque, +${bonuses.defense} Defesa${agilityText}, +${bonuses.skillPoints} pontos de habilidade e recuperou ${levelHealAmount} HP.`,
      'reward',
      true
    );
  }
}

function getDeathCheckpointStage(currentStage) {
  const checkpointInterval = 10;
  const safeStage = Math.max(1, Number(currentStage) || 1);

  if (safeStage < checkpointInterval) return 1;

  return Math.max(
    1,
    Math.floor(safeStage / checkpointInterval) * checkpointInterval
  );
}

function continueAfterDeath() {
  const player = gameState.player;

  if (player.hp > 0) return;

  const previousStage = player.stage;
  const checkpointStage = getDeathCheckpointStage(previousStage);

  player.stage = checkpointStage;
  player.hp = getPlayerMaxHp();
  activateDeathRecoveryGrace(previousStage, checkpointStage);

  gameState.monster = createNextEncounter();
  gameState.currentTurn = 'player';
  gameState.actionInProgress = false;

  if (checkpointStage < previousStage) {
    log(
      `Você caiu na dungeon e voltou do Andar ${previousStage} para o checkpoint do Andar ${checkpointStage}. Os próximos inimigos ficaram enfraquecidos por ${gameState.player.recoveryGrace.battles} lutas.`,
      'death',
      true
    );
  } else {
    log(
      `Você caiu na dungeon no checkpoint do Andar ${checkpointStage}. Vida recuperada e os próximos inimigos ficaram enfraquecidos por ${gameState.player.recoveryGrace.battles} lutas.`,
      'death',
      true
    );
  }

  updateStats();
}

function leaveCurrentShop() {
  if (!gameState.shop.active) return;

  const meta = getShopMerchantMeta();
  closeShop(`Você encerrou o encontro com ${meta.title}. Continue explorando para encontrar outro comerciante.`);
  log(`🚪 Você saiu da loja de ${meta.title}.`, 'shop', true);
  updateStats();
}

function buyShopItem(itemId) {
  hideFloatingTooltip();

  if ((gameState.shop.type || 'consumables') !== 'consumables') return;
  const item = gameState.shop.items.find((entry) => entry.id === itemId);
  if (!item) return;

  if (gameState.player.coins < item.cost) {
    log('Saldo insuficiente para comprar este item.', 'shop');
    return;
  }

  gameState.player.coins -= item.cost;
  addConsumable(item.id);
  gameState.shop.items = gameState.shop.items.filter((entry) => entry.id !== itemId);

  log(`Você comprou ${item.name}.`, 'shop', true);

  if (!gameState.shop.items.length) {
    gameState.shop.active = false;
    gameState.shop.encountersLeft = 0;
    elements.shopStatus.textContent = 'Nenhuma loja';
    elements.shopMessage.textContent = 'Você comprou todos os itens disponíveis.';
  }

  hideFloatingTooltip();
  updateStats();
}

async function useConsumable(itemId) {
  const item = shopCatalog.find((catalogItem) => catalogItem.id === itemId);
  if (!item) return;

  if (getConsumableQuantity(itemId) <= 0) {
    log(`Você não tem ${item.name} no inventário.`, 'shop', true);
    updateStats();
    return;
  }

  if (item.type === 'material') return;

  if (item.type === 'heal' || item.type === 'fullHeal') {
    if (gameState.player.hp >= getPlayerMaxHp()) {
      log('Sua vida já está cheia.', 'shop');
      return;
    }

    if (gameState.actionInProgress) {
      queueHeroSupportConsumable(itemId);
      return;
    }

    await applyHeroSupportConsumableNow(itemId, 'manual');
    return;
  }

  if (item.type === 'skillPoint') {
    const points = getTrainingScrollSkillPoints();
    gameState.player.skillPoints += points;
    removeConsumable(itemId);
    log(`Você leu ${item.name} e ganhou ${points} ponto(s) de habilidade.`, 'shop', true);
    updateStats();
    return;
  }

  if (item.type === 'buff') {
    if ((gameState.player.buffs?.[item.buff] || 0) > 0) {
      log(`${item.name} já está ativa.`, 'shop');
      return;
    }

    if (gameState.actionInProgress) {
      queueHeroSupportConsumable(itemId);
      return;
    }

    await applyHeroSupportConsumableNow(itemId, 'manual');
    return;
  }

  if (item.type === 'damageMonster') {
    const combatWasRunning = gameState.actionInProgress;

    if (!gameState.monster || gameState.monster.hp <= 0) {
      log('Não há monstro para usar este item agora.', 'shop', true);
      return;
    }

    const targetMonster = gameState.monster;
    const percentDamage = Math.round(targetMonster.maxHp * (item.damagePercent || 0.25));
    const powerDamage = Math.round(getPlayerPower() * (item.powerMultiplier || 1.25));
    const damage = Math.max(1, Math.min(percentDamage, powerDamage));

    removeConsumable(itemId);
    updateStats();

    let applied = false;

    await showCombatIndicator('monster', 'arcaneBombHit', () => {
      if (gameState.monster !== targetMonster || targetMonster.hp <= 0) return;
      targetMonster.hp = Math.max(0, targetMonster.hp - damage);
      applied = true;
    }, item);

    if (!applied) {
      addConsumable(itemId, 1);
      log('A Bomba Arcana não encontrou o alvo e voltou ao inventário.', 'shop', true);
      updateStats();
      return;
    }

    log(`${item.name} causou ${formatCompactNumber(damage)} de dano em ${targetMonster.name}.`, 'damage', true);

    await waitForCardEffects();

    // Durante um turno ativo, o próprio fluxo de combate resolve vitória/morte.
    // Fazer isso aqui também poderia avançar para outro monstro no meio do turno.
    if (!combatWasRunning && await checkBattleEnd()) {
      gameState.actionInProgress = false;
    }

    updateStats();
    return;
  }

  if (item.type === 'specialBoss') {
    if (gameState.actionInProgress || isCardEffectSequenceBusy() || gameState.player.hp <= 0) {
      log('Você não pode invocar um boss especial agora.', 'shop', true);
      return;
    }

    gameState.monster = createMonster(true, true);
    gameState.currentTurn = 'player';
    removeConsumable(itemId);
    log(`Boss especial invocado: ${gameState.monster.name}!`, 'boss', true);
    updateStats();
  }
}

function equipGear(uidToEquip, silent = false) {
  const item = gameState.inventory.gear.find((entry) => entry.uid === uidToEquip);
  if (!item) return;

  gameState.equipment[item.slot] = item;
  normalizePlayerHp();

  if (!silent) {
    log(`Equipado: ${formatGearName(item)} (${formatStats(item.stats)}).`, 'reward', true);
  } else {
    log(`Novo equipamento equipado automaticamente: ${formatGearName(item)}.`, 'reward', true);
  }

  updateStats();
}

function getEquippedGearUids() {
  return new Set(
    Object.values(gameState.equipment)
      .filter(Boolean)
      .map((item) => item.uid)
  );
}

function getUnequippedGearItems() {
  const equippedUids = getEquippedGearUids();

  return gameState.inventory.gear.filter((item) => !equippedUids.has(item.uid));
}

function sellUnequippedGear() {
  const unequippedItems = getUnequippedGearItems();

  if (!unequippedItems.length) {
    log('Não há equipamentos não equipados para vender.', 'shop', true);
    return;
  }

  const totalValue = unequippedItems.reduce((sum, item) => sum + (item.value || 0), 0);
  const totalItems = unequippedItems.length;

  const confirmSell = confirm(
    `Vender ${totalItems} equipamento(s) não equipado(s) por ${formatMoneyText(totalValue)}?`
  );

  if (!confirmSell) return;

  const equippedUids = getEquippedGearUids();

  gameState.inventory.gear = gameState.inventory.gear.filter((item) =>
    equippedUids.has(item.uid)
  );

  gameState.player.coins += totalValue;

  log(
    `Venda automática: ${totalItems} equipamento(s) vendidos por ${formatMoney(totalValue)}.`,
    'shop',
    true
  );

  normalizePlayerHp();
  renderGearModal();
  updateStats();
}

function sellGear(uidToSell) {
  const index = gameState.inventory.gear.findIndex((entry) => entry.uid === uidToSell);
  if (index < 0) return;

  const item = gameState.inventory.gear[index];
  const equipped = gameState.equipment[item.slot]?.uid === item.uid;

  if (equipped) {
    gameState.equipment[item.slot] = null;
  }

  gameState.player.coins += item.value;
  gameState.inventory.gear.splice(index, 1);
  normalizePlayerHp();
  log(`Você vendeu ${formatGearName(item)} por ${formatMoney(item.value)}.`, 'shop', true);
  updateStats();
}

function spendSkillPoints(stat) {
  if (gameState.player.skillPoints <= 0) return;

  const meta = skillMeta[stat];
  if (!meta) return;

  const amount = getCurrentSkillSpendAmount();
  if (amount <= 0) return;

  const gain = getSkillStatGain(stat, amount);

  switch (stat) {
    case 'attack':
      gameState.player.attack += gain;
      break;
    case 'defense':
      gameState.player.defense += gain;
      break;
    case 'agility':
      gameState.player.agility += gain;
      break;
    case 'hp':
      gameState.player.maxHp += gain;
      gameState.player.hp += gain;
      break;
    case 'magic':
      gameState.player.magic += gain;
      break;
    default:
      return;
  }

  gameState.player.skillPoints -= amount;
  gameState.ui.appliedStats[stat] = (gameState.ui.appliedStats[stat] || 0) + amount;

  log(
    `Habilidade: ${amount} ponto(s) gastos em ${meta.label}, concedendo +${formatCompactNumber(gain)}${meta.suffix}.`,
    'reward'
  );

  normalizePlayerHp();
  updateStats();
}

function calculatePrestigeReward() {
  const player = gameState.player;
  const prestigeCount = gameState.prestige.count;

  const stage = player.stage;
  const bosses = player.bossesDefeated;

  const stageMilestones = Math.floor(stage / 10);
  const bossMilestones = Math.floor(bosses / 10);

  const canPrestige = stage >= 10 && bossMilestones >= 1;

  const basePoints = Math.floor(stage / 5);
  const stagePoints = stageMilestones * 2;
  const bossPoints = bossMilestones * 5;

  const points = basePoints + stagePoints + bossPoints;

  const skillPointsReward =
    8 +
    (prestigeCount + 1) * 3 +
    stageMilestones * 2 +
    bossMilestones * 6;

  return {
    canPrestige,
    stage,
    bosses,
    bossMilestones,
    nextBossMilestone: (bossMilestones + 1) * 10,
    points,
    skillPointsReward,

    xpBonus: 0.05 + stageMilestones * 0.06 + bossMilestones * 0.08,
    coinBonus: stageMilestones * 0.02 + bossMilestones * 0.04,
    dropBonus: stageMilestones * 0.5 + bossMilestones * 1.2,
    epicLegendaryBonus: stageMilestones * 0.18 + bossMilestones * 0.25,
    bossDamageBonus: stageMilestones * 0.015 + bossMilestones * 0.04,
    offlineBonus: stageMilestones * 0.03 + bossMilestones * 0.05,
  };
}

function formatBonusPercent(value) {
  return `+${Math.round(value * 100)}%`;
}

function formatFlatPercent(value) {
  return `+${value.toFixed(1)}%`;
}

function getRelicCost(id) {
  const relic = relicCatalog[id];
  const level = getRelicLevel(id);

  return relic.baseCost + level * relic.costGrowth;
}

const PRESTIGE_CONFIRMATION_DELAY = 5000;
let prestigeConfirmationTimer = null;
let prestigeConfirmationDeadline = 0;

function clearPrestigeConfirmationCountdown() {
  if (prestigeConfirmationTimer) {
    clearInterval(prestigeConfirmationTimer);
    prestigeConfirmationTimer = null;
  }

  prestigeConfirmationDeadline = 0;
}

function showPrestigeMainView() {
  clearPrestigeConfirmationCountdown();

  if (elements.prestigeMainView) {
    elements.prestigeMainView.hidden = false;
  }

  if (elements.prestigeConfirmationView) {
    elements.prestigeConfirmationView.hidden = true;
  }

  if (elements.confirmPrestigeButton) {
    elements.confirmPrestigeButton.disabled = true;
    elements.confirmPrestigeButton.textContent = 'Confirmar em 5s';
  }

  if (elements.prestigeCountdownText) {
    elements.prestigeCountdownText.textContent = 'Aguarde 5 segundos';
  }

  if (elements.prestigeCountdownBar) {
    elements.prestigeCountdownBar.style.width = '0%';
  }
}

function openPrestigeModal() {
  showPrestigeMainView();
  renderPrestigeModal();
  elements.prestigeModal.hidden = false;
}

function closePrestigeModal() {
  clearPrestigeConfirmationCountdown();
  showPrestigeMainView();
  elements.prestigeModal.hidden = true;
}

function renderPrestigeModal() {
  const reward = calculatePrestigeReward();
  const prestige = gameState.prestige;
  const nextTitle = getPrestigeTitle(prestige.count + 1);
  const currentBalance = formatCompactNumber(prestige.points);

  if (elements.prestigeModalBalance) {
    elements.prestigeModalBalance.textContent = currentBalance;
  }

  if (elements.prestigeRelicBalance) {
    elements.prestigeRelicBalance.textContent = currentBalance;
  }

  if (elements.prestigeReviewButton) {
    elements.prestigeReviewButton.disabled = !reward.canPrestige;
  }

  elements.prestigeSummary.innerHTML = `
    ${reward.canPrestige
      ? ''
      : `<div class="prestige-warning prestige-summary-full">
          <strong>Prestígio ainda bloqueado</strong>
          <span>Chegue ao Andar 10 e derrote pelo menos 10 bosses para liberar o renascimento.</span>
        </div>`
    }

    <section class="prestige-identity-card prestige-summary-full">
      <div>
        <span class="prestige-summary-label">Evolução do título</span>
        <strong>${getPrestigeTitle(prestige.count)}</strong>
      </div>
      <span class="prestige-title-arrow">→</span>
      <div class="prestige-next-title">
        <span class="prestige-summary-label">Após o prestígio</span>
        <strong>${nextTitle}</strong>
      </div>
    </section>

    <section class="prestige-reward-card prestige-summary-featured">
      <span class="prestige-summary-label">Recompensa principal</span>
      <strong>🔮 +${formatCompactNumber(reward.points)}</strong>
      <small>essências adicionadas ao seu saldo</small>
    </section>

    <section class="prestige-reward-card">
      <span class="prestige-summary-label">Novo começo preparado</span>
      <strong>+${formatCompactNumber(reward.skillPointsReward)} pontos</strong>
      <small>Kit completo de equipamentos e consumíveis • retorno aproximado ao Andar ${formatCompactNumber(calculatePrestigeRushTarget(reward.stage))}</small>
    </section>

    <section class="prestige-run-card">
      <span class="prestige-summary-label">Jornada atual</span>
      <div class="prestige-run-stats">
        <div><strong>Andar ${formatCompactNumber(reward.stage)}</strong><span>alcançado</span></div>
        <div><strong>${formatCompactNumber(reward.bosses)}</strong><span>bosses derrotados</span></div>
        <div><strong>${reward.bossMilestones}</strong><span>marcos de 10 bosses</span></div>
      </div>
    </section>

    <section class="prestige-permanent-card prestige-summary-full">
      <div class="prestige-permanent-heading">
        <div>
          <span class="prestige-summary-label">Ganhos permanentes deste prestígio</span>
          <strong>Bônus que continuarão após o renascimento</strong>
        </div>
      </div>
      <div class="prestige-bonus-grid">
        <div><span>XP</span><strong>${formatBonusPercent(reward.xpBonus)}</strong></div>
        <div><span>${coinIconHtml()} Moedas</span><strong>${formatBonusPercent(reward.coinBonus)}</strong></div>
        <div><span>Chance de drop</span><strong>${formatFlatPercent(reward.dropBonus)}</strong></div>
        <div><span>Épico/Lendário</span><strong>${formatFlatPercent(reward.epicLegendaryBonus)}</strong></div>
        <div><span>Dano contra boss</span><strong>${formatBonusPercent(reward.bossDamageBonus)}</strong></div>
        <div><span>Progresso offline</span><strong>${formatBonusPercent(reward.offlineBonus)}</strong></div>
      </div>
    </section>
  `;

  renderRelicList();
}

function renderPrestigeConfirmation() {
  const reward = calculatePrestigeReward();
  const prestige = gameState.prestige;

  if (elements.prestigeConfirmationSummary) {
    elements.prestigeConfirmationSummary.innerHTML = `
      <div class="prestige-confirmation-loss">
        <span>Será reiniciado</span>
        <strong>Andar, nível, inventário e equipamentos da jornada atual</strong>
      </div>
      <div class="prestige-confirmation-gain">
        <span>Você receberá</span>
        <strong>🔮 +${formatCompactNumber(reward.points)} essências</strong>
      </div>
      <div class="prestige-confirmation-keep">
        <span>Será preservado</span>
        <strong>${getPrestigeTitle(prestige.count + 1)}, relíquias e todos os bônus permanentes</strong>
      </div>
    `;
  }
}

function updatePrestigeConfirmationCountdown() {
  const remaining = Math.max(0, prestigeConfirmationDeadline - Date.now());
  const seconds = Math.ceil(remaining / 1000);
  const progress = clamp((1 - remaining / PRESTIGE_CONFIRMATION_DELAY) * 100, 0, 100);

  if (elements.prestigeCountdownBar) {
    elements.prestigeCountdownBar.style.width = `${progress}%`;
  }

  if (remaining > 0) {
    if (elements.prestigeCountdownText) {
      elements.prestigeCountdownText.textContent = `Aguarde ${seconds} segundo${seconds === 1 ? '' : 's'}`;
    }

    if (elements.confirmPrestigeButton) {
      elements.confirmPrestigeButton.disabled = true;
      elements.confirmPrestigeButton.textContent = `Confirmar em ${seconds}s`;
    }

    return;
  }

  clearPrestigeConfirmationCountdown();

  if (elements.prestigeCountdownBar) {
    elements.prestigeCountdownBar.style.width = '100%';
  }

  if (elements.prestigeCountdownText) {
    elements.prestigeCountdownText.textContent = 'Confirmação liberada';
  }

  if (elements.confirmPrestigeButton) {
    elements.confirmPrestigeButton.disabled = false;
    elements.confirmPrestigeButton.textContent = 'Confirmar Prestígio';
    elements.confirmPrestigeButton.focus({ preventScroll: true });
  }
}

function openPrestigeConfirmation() {
  const reward = calculatePrestigeReward();

  if (!reward.canPrestige) {
    log('Você precisa chegar ao Andar 10 e derrotar pelo menos 10 bosses para fazer prestígio.', 'system', true);
    renderPrestigeModal();
    return;
  }

  renderPrestigeConfirmation();

  if (elements.prestigeMainView) {
    elements.prestigeMainView.hidden = true;
  }

  if (elements.prestigeConfirmationView) {
    elements.prestigeConfirmationView.hidden = false;
  }

  if (elements.confirmPrestigeButton) {
    elements.confirmPrestigeButton.disabled = true;
    elements.confirmPrestigeButton.textContent = 'Confirmar em 5s';
  }

  prestigeConfirmationDeadline = Date.now() + PRESTIGE_CONFIRMATION_DELAY;
  updatePrestigeConfirmationCountdown();
  prestigeConfirmationTimer = setInterval(updatePrestigeConfirmationCountdown, 100);
}

function cancelPrestigeConfirmation() {
  showPrestigeMainView();
  renderPrestigeModal();

  if (elements.prestigeReviewButton && !elements.prestigeReviewButton.disabled) {
    elements.prestigeReviewButton.focus({ preventScroll: true });
  }
}

function renderRelicList() {
  elements.relicList.innerHTML = '';

  Object.entries(relicCatalog).forEach(([id, relic]) => {
    const level = getRelicLevel(id);
    const cost = getRelicCost(id);
    const canBuy = gameState.prestige.points >= cost;

    const card = document.createElement('div');
    card.className = 'relic-card';

    card.innerHTML = `
      <div>
        <strong>${relic.name}</strong>
        <p>${relic.description}</p>
      </div>

      <footer>
        <span class="relic-level">Nv. ${level}</span>
        <button type="button" data-relic="${id}" ${canBuy ? '' : 'disabled'}>
          Comprar ${cost}
        </button>
      </footer>
    `;

    card.querySelector('[data-relic]').addEventListener('click', () => buyRelic(id));
    elements.relicList.appendChild(card);
  });
}

function buyRelic(id) {
  const cost = getRelicCost(id);

  if (gameState.prestige.points < cost) {
    log('Essências insuficientes para comprar esta relíquia.', 'system', true);
    return;
  }

  gameState.prestige.points -= cost;
  gameState.prestige.relics[id] += 1;

  log(`${relicCatalog[id].name} evoluiu para o nível ${gameState.prestige.relics[id]}.`, 'system-important', true);

  renderPrestigeModal();
  updateStats();
}

function confirmPrestige() {
  if (
    !elements.prestigeConfirmationView ||
    elements.prestigeConfirmationView.hidden ||
    !elements.confirmPrestigeButton ||
    elements.confirmPrestigeButton.disabled
  ) {
    return;
  }

  const reward = calculatePrestigeReward();

  if (!reward.canPrestige) {
    log('Você precisa chegar ao Andar 10 e derrotar pelo menos 10 bosses para fazer prestígio.', 'system', true);
    renderPrestigeModal();
    return;
  }

  const prestige = gameState.prestige;

  prestige.count += 1;
  prestige.points += reward.points;
  prestige.totalPoints += reward.points;

  prestige.xpMultiplier += reward.xpBonus;
  prestige.coinMultiplier += reward.coinBonus;
  prestige.dropBonus += reward.dropBonus;
  prestige.epicLegendaryBonus += reward.epicLegendaryBonus;
  prestige.bossDamageBonus += reward.bossDamageBonus;
  prestige.offlineMultiplier += reward.offlineBonus;

  prestige.highestStage = Math.max(prestige.highestStage, reward.stage);
  prestige.highestBosses = Math.max(prestige.highestBosses, reward.bosses);

  resetRunAfterPrestige(reward.skillPointsReward);

  closePrestigeModal();

  log(
    `Prestígio realizado! Novo título: ${getPrestigeTitle(prestige.count)}. Você ganhou ${reward.points} essências e começou com ${reward.skillPointsReward} pontos de habilidade.`,
    'system-important',
    true
  );

  updateStats();
}

function resetRunAfterPrestige(startSkillPoints = 0) {
  const preservedPrestige = structuredCloneSafe(gameState.prestige);
  const recordStage = Math.max(1, preservedPrestige.highestStage || 1);

  stopAutoAttack();
  Object.assign(gameState, structuredCloneSafe(initialState));

  gameState.prestige = preservedPrestige;
  gameState.currentTurn = 'player';
  gameState.activeInventoryTab = 'items';
  gameState.player.skillPoints = startSkillPoints;

  addStarterItemsIfNeeded(false);
  const rush = startPrestigeBossRush(recordStage);
  grantPrestigeRushStarterKit(rush.targetStage);
  gameState.monster = createNextEncounter();

  if (rush.active) {
    log(
      `Marcha dos Bosses iniciada: ${rush.totalBosses} bosses levarão você ao ponto de retorno no Andar ${rush.targetStage}, antes do antigo recorde no Andar ${rush.recordStage}.`,
      'system-important',
      true
    );
  }

  saveGame();
}

function findNextMonster() {
  if (gameState.player.hp <= 0 || gameState.actionInProgress || isCardEffectSequenceBusy()) return;

  gameState.monster = createNextEncounter();
  gameState.currentTurn = 'player';

  if (gameState.shop.active && gameState.shop.items.length) {
    updateShopMessage(gameState.monster.prestigeRushBoss ? 'Loja aberta durante a Marcha dos Bosses' : gameState.monster.mandatoryBoss ? 'Loja ainda aberta durante o boss obrigatório' : 'Loja ainda aberta');
  } else if (gameState.monster.prestigeRushBoss) {
    elements.shopMessage.textContent = 'Marcha dos Bosses ativa. Somente bosses aparecerão até o ponto de retorno da jornada.';
  } else if (gameState.monster.mandatoryBoss) {
    elements.shopMessage.textContent = 'Boss obrigatório em combate. Vença para avançar na masmorra.';
  } else {
    elements.shopMessage.textContent = 'Derrote monstros para encontrar uma loja aleatória.';
  }

  if (gameState.monster.prestigeRushBoss) {
    const rush = ensurePrestigeRushState();
    log(`Marcha dos Bosses: ${gameState.monster.name} apareceu (${rush.bossesRemaining} restante(s)).`, 'boss', true);
  } else if (gameState.monster.mandatoryBoss) {
    log(`Boss obrigatório encontrado: ${gameState.monster.name}!`, 'boss', true);
  } else {
    log(`Você encontrou ${gameState.monster.name}.`, 'system', true);
  }

  updateStats();
}

function summonBoss() {
  if (
    gameState.player.victories < 5 ||
    gameState.actionInProgress ||
    isCardEffectSequenceBusy() ||
    gameState.player.hp <= 0
  ) return;

  gameState.monster = createMonster(true);
  gameState.monster.mandatoryBoss = false;
  gameState.currentTurn = 'player';

  if (gameState.shop.active && gameState.shop.items.length) {
    updateShopMessage('Loja ainda aberta durante o boss');
  } else {
    elements.shopMessage.textContent = 'Boss em combate. Vença para abrir uma loja garantida.';
  }

  log(`Boss invocado: ${gameState.monster.name}!`, 'damage', true);
  updateStats();
}

function startAutoAttack() {
  if (gameState.autoAttack) return;

  gameState.autoAttack = true;
  elements.autoButton.classList.add('active');
  elements.autoButton.textContent = '⏸️ Parar Auto';

  gameState.autoInterval = setInterval(() => {
    if (gameState.player.hp <= 0) {
      stopAutoAttack();
      return;
    }

    startTurn();
  }, gameConfig.autoAttackDelay);

  log('Auto ataque ligado.', 'system');
  updateStats();
}

function stopAutoAttack() {
  gameState.autoAttack = false;
  elements.autoButton.classList.remove('active');
  elements.autoButton.textContent = '▶️ Iniciar Auto';

  if (gameState.autoInterval) {
    clearInterval(gameState.autoInterval);
    gameState.autoInterval = null;
  }

  updateTurnDisplay();
}

function resetGame() {
  const confirmed = window.confirm('Tem certeza que deseja apagar o progresso do Idle RPG?');
  if (!confirmed) return;

  stopAutoAttack();
  localStorage.removeItem(saveKey);

  Object.assign(gameState, structuredCloneSafe(initialState));
  gameState.monster = createNextEncounter();
  if (elements.battleLog) {
    elements.battleLog.innerHTML = '';
  }
  log('Jogo resetado. Uma nova jornada começou.', 'system', true);
  updateStats();
}


function ensureAchievementNoticeStack() {
  let stack = document.getElementById('achievement-notice-stack');

  if (!stack) {
    stack = document.createElement('div');
    stack.id = 'achievement-notice-stack';
    document.body.appendChild(stack);
  }

  return stack;
}

function showAchievementNotice({ title = 'Aviso', subtitle = '', message = '', type = 'default' } = {}) {
  const stack = ensureAchievementNoticeStack();
  const notice = document.createElement('div');
  notice.className = `achievement-notice ${type}`;

  notice.innerHTML = `
    <div class="achievement-notice-icon">${type === 'mythic' ? '🌌' : type === 'fragment' ? '💠' : type === 'rush' ? '🎒' : '✨'}</div>
    <div class="achievement-notice-body">
      <strong>${escapeAttr(title)}</strong>
      ${subtitle ? `<span>${escapeAttr(subtitle)}</span>` : ''}
      <p>${escapeAttr(message)}</p>
    </div>
    <button type="button" class="achievement-notice-ok">Ok</button>
  `;

  notice.querySelector('.achievement-notice-ok')?.addEventListener('click', () => {
    notice.remove();
  });

  stack.appendChild(notice);
}

function ensureMythicChoiceModal() {
  let modal = document.getElementById('mythic-choice-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mythic-choice-modal';
    modal.className = 'modal-backdrop mythic-choice-backdrop';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="modal-card mythic-choice-modal-card">
        <div class="modal-header">
          <div>
            <span class="eyebrow">Recompensa Mítica</span>
            <h2>Escolha 1 item Mítico</h2>
            <p>Você pode ficar com apenas uma opção. Passe o mouse em cima dos itens para ver os efeitos especiais.</p>
          </div>
        </div>
        <div id="mythic-choice-list" class="mythic-choice-list"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  return modal;
}

function createMythicChoiceCard(item, index) {
  const card = document.createElement('button');
  const specialEffect = getMythicSpecialEffectSummary(item);

  card.type = 'button';
  card.className = 'gear-modal-item mythic-choice-card';
  card.dataset.tooltip = getGearTooltip(item);
  card.dataset.tooltipHtml = getGearTooltipHtml(item);
  card.dataset.choiceIndex = String(index);
  card.dataset.rarity = 'mythic';

  card.innerHTML = `
    <span class="mythic-choice-aura" aria-hidden="true"></span>

    <div class="mythic-choice-image-area">
      ${gearImageTag(item)}
    </div>

    <div class="mythic-choice-info">
      <strong class="rarity-mythic">${escapeAttr(item.name)}</strong>
      <p>${escapeAttr(specialEffect)}</p>
    </div>

    <span class="mythic-choice-action">Escolher</span>
  `;

  return card;
}

function openMythicChoiceModal(monster, choices) {
  const modal = ensureMythicChoiceModal();
  const list = modal.querySelector('#mythic-choice-list');
  if (!list) return;

  list.innerHTML = '';

  choices.forEach((item, index) => {
    const card = createMythicChoiceCard(item, index);
    card.addEventListener('click', () => {
      const selected = choices[index];
      hideFloatingTooltip();
      addGear(selected);
      modal.hidden = true;
      list.innerHTML = '';
      log(`Você escolheu ${formatGearName(selected)}. As outras opções Míticas desapareceram.`, 'reward', true);
      showAchievementNotice({
        title: 'Item Mítico escolhido',
        subtitle: selected.name,
        message: 'As outras 2 opções foram perdidas. O item escolhido foi enviado para seus equipamentos.',
        type: 'mythic',
      });
      saveGame();
      updateStats();
    });
    list.appendChild(card);
  });

  modal.hidden = false;
}

function getMythicRiftChance() {
  const since = Math.max(0, gameState.player.bossesSinceMythicRift || 0);
  return clamp(
    (gameConfig.mythicRiftBaseChance ?? 5) + since * (gameConfig.mythicRiftChanceGain ?? 3),
    0,
    100
  );
}

function ensureMythicRiftState() {
  gameState.mythicRift ??= {
    active: false,
    chance: 0,
    sourceBoss: '',
  };
}

function maybeSpawnMythicRiftAfterBoss(monster) {
  if (!monster?.isBoss || monster.specialBoss) return;

  ensureMythicRiftState();

  if (gameState.mythicRift.active) {
    renderMythicRiftIndicator();
    return;
  }

  const since = Math.max(0, gameState.player.bossesSinceMythicRift || 0) + 1;
  gameState.player.bossesSinceMythicRift = since;

  const chance = getMythicRiftChance();
  const guaranteed = since >= (gameConfig.mythicRiftGuaranteeBosses ?? 5);
  const opened = guaranteed || randomBetween(1, 100) <= chance;

  if (!opened) {
    return;
  }

  gameState.mythicRift = {
    active: true,
    chance,
    sourceBoss: monster.name,
  };
  gameState.player.bossesSinceMythicRift = 0;

  log('Uma Fenda Mítica surgiu discretamente na dungeon. Clique nela quando quiser chamar um boss especial.', 'boss', true);
  renderMythicRiftIndicator();
}

function ensureMythicRiftIndicator() {
  let indicator = document.getElementById('mythic-rift-indicator');

  if (!indicator) {
    indicator = document.createElement('button');
    indicator.id = 'mythic-rift-indicator';
    indicator.type = 'button';
    indicator.className = 'mythic-rift-indicator';
    indicator.addEventListener('click', invokeMythicRiftBoss);
    document.body.appendChild(indicator);
  }

  return indicator;
}

function renderMythicRiftIndicator() {
  ensureMythicRiftState();
  const indicator = ensureMythicRiftIndicator();

  if (!gameState.mythicRift.active) {
    indicator.hidden = true;
    return;
  }

  indicator.hidden = false;
  indicator.title = 'Clique para invocar um boss especial';
  indicator.innerHTML = `
    <span class="mythic-rift-orb" aria-hidden="true">◈</span>
    <span class="mythic-rift-text">
      <strong>Fenda Mítica</strong>
      <small>Boss especial à espreita</small>
    </span>
  `;
}

function hideMythicRiftIndicator() {
  const indicator = document.getElementById('mythic-rift-indicator');
  if (indicator) indicator.hidden = true;
}

function invokeMythicRiftBoss() {
  ensureMythicRiftState();

  if (!gameState.mythicRift.active) return;

  if (gameState.actionInProgress || isCardEffectSequenceBusy() || gameState.player.hp <= 0) {
    showAchievementNotice({
      title: 'Fenda Mítica instável',
      subtitle: 'Aguarde um instante',
      message: 'Espere o turno terminar para invocar o boss especial.',
      type: 'default',
    });
    return;
  }

  hideFloatingTooltip();
  gameState.monster = createMonster(true, true);
  gameState.currentTurn = 'player';
  gameState.mythicRift.active = false;
  hideMythicRiftIndicator();

  log(`A Fenda Mítica se abriu: ${gameState.monster.name} apareceu!`, 'boss', true);
  showAchievementNotice({
    title: 'Fenda Mítica aberta',
    subtitle: gameState.monster.name,
    message: 'Um boss especial foi invocado.',
    type: 'mythic',
  });

  saveGame();
  updateStats();
}


function ensureFloatingTooltip() {
  let tooltip = document.getElementById('floating-item-tooltip');

  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'floating-item-tooltip';
    document.body.appendChild(tooltip);
  }

  return tooltip;
}

function showFloatingTooltip(content, event, rich = false) {
  if (!content) return;

  const tooltip = ensureFloatingTooltip();
  tooltip.classList.toggle('rich-gear-tooltip', Boolean(rich));

  if (rich) {
    tooltip.innerHTML = content;
  } else {
    tooltip.textContent = content;
  }

  tooltip.classList.add('visible');
  moveFloatingTooltip(event);
}

function moveFloatingTooltip(event) {
  const tooltip = document.getElementById('floating-item-tooltip');
  if (!tooltip || !tooltip.classList.contains('visible')) return;

  const padding = 14;
  const offset = 18;

  let left = event.clientX + offset;
  let top = event.clientY + offset;

  const rect = tooltip.getBoundingClientRect();

  if (left + rect.width + padding > window.innerWidth) {
    left = event.clientX - rect.width - offset;
  }

  if (top + rect.height + padding > window.innerHeight) {
    top = event.clientY - rect.height - offset;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function hideFloatingTooltip() {
  const tooltip = document.getElementById('floating-item-tooltip');
  if (!tooltip) return;

  tooltip.classList.remove('visible', 'rich-gear-tooltip');
  tooltip.dataset.owner = '';
  tooltip.style.left = '-9999px';
  tooltip.style.top = '-9999px';
}

function bindEvents() {
  if (elements.closeOfflineModalButton) {
    elements.closeOfflineModalButton.addEventListener('click', closeOfflineModal);
  }

  if (elements.offlineModal) {
    elements.offlineModal.addEventListener('click', (event) => {
      if (event.target === elements.offlineModal) {
        closeOfflineModal();
      }
    });
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && elements.offlineModal && !elements.offlineModal.hidden) {
      closeOfflineModal();
    }
  });
  elements.attackButton.addEventListener('click', startTurn);

  elements.autoButton.addEventListener('click', () => {
    if (gameState.autoAttack) {
      stopAutoAttack();
    } else {
      startAutoAttack();
    }
  });

  elements.nextButton.addEventListener('click', findNextMonster);
  elements.bossButton.addEventListener('click', summonBoss);
  elements.continueButton.addEventListener('click', continueAfterDeath);
  elements.prestigeButton.addEventListener('click', openPrestigeModal);
  elements.leaveShopButton?.addEventListener('click', leaveCurrentShop);
  elements.closePrestigeModalButton.addEventListener('click', closePrestigeModal);
  elements.prestigeReviewButton.addEventListener('click', openPrestigeConfirmation);
  elements.cancelPrestigeConfirmationButton.addEventListener('click', cancelPrestigeConfirmation);
  elements.confirmPrestigeButton.addEventListener('click', confirmPrestige);

  elements.prestigeModal.addEventListener('click', (event) => {
    if (event.target === elements.prestigeModal) {
      closePrestigeModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || elements.prestigeModal.hidden) return;

    if (elements.prestigeConfirmationView && !elements.prestigeConfirmationView.hidden) {
      cancelPrestigeConfirmation();
      return;
    }

    closePrestigeModal();
  });
  if (elements.clearLogButton && elements.battleLog) {
    elements.clearLogButton.addEventListener('click', () => {
      elements.battleLog.innerHTML = '';
      log('Histórico limpo.', 'system');
    });
  }

  elements.skillButtons.forEach((button) => {
    button.addEventListener('click', () => upgradeStat(button.dataset.stat));
  });

  elements.tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      gameState.activeInventoryTab = button.dataset.tab;
      renderInventory();
      saveGame();
    });
  });

  const persistOfflineStartBeforeLeaving = () => {
    markOfflineStart();
  };

  window.addEventListener('beforeunload', persistOfflineStartBeforeLeaving);
  window.addEventListener('pagehide', persistOfflineStartBeforeLeaving);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      autoAttackWasRunningBeforeOffline = gameState.autoAttack;

      if (gameState.autoAttack) {
        stopAutoAttack();
      }

      markOfflineStart();
      return;
    }

    const shouldResumeAutoAttack = autoAttackWasRunningBeforeOffline;
    autoAttackWasRunningBeforeOffline = false;

    resumeOfflineProgressIfNeeded();

    if (shouldResumeAutoAttack && gameState.player.hp > 0) {
      startAutoAttack();
    }
  });

  document.addEventListener('pointermove', (event) => {
    const item = event.target.closest('.inventory-item[data-tooltip], .shop-item[data-tooltip], .equipment-slot[data-tooltip], .gear-modal-item[data-tooltip]');

    if (!item) {
      hideFloatingTooltip();
      return;
    }

    const tooltip = ensureFloatingTooltip();
    const tooltipContent = item.dataset.tooltipHtml || item.dataset.tooltip || '';
    const richTooltip = Boolean(item.dataset.tooltipHtml);

    if (tooltip.dataset.owner !== tooltipContent || !tooltip.classList.contains('visible')) {
      tooltip.dataset.owner = tooltipContent;
      showFloatingTooltip(tooltipContent, event, richTooltip);
    } else {
      moveFloatingTooltip(event);
    }
  });

  document.addEventListener('pointerout', (event) => {
    const item = event.target.closest('.inventory-item[data-tooltip], .shop-item[data-tooltip], .equipment-slot[data-tooltip], .gear-modal-item[data-tooltip]');
    if (!item) return;

    if (!item.contains(event.relatedTarget)) {
      hideFloatingTooltip();
    }
  });

  window.addEventListener('blur', hideFloatingTooltip);
  window.addEventListener('scroll', hideFloatingTooltip, true);

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-buy], [data-use], .tab-button, .mini-button')) {
      hideFloatingTooltip();
    }
  });

  window.addEventListener('focus', () => {
    if (!document.hidden) {
      resumeOfflineProgressIfNeeded();
    }
  });

  elements.closeGearModalButton.addEventListener('click', closeGearModal);
  elements.sellUnequippedGearButton?.addEventListener('click', sellUnequippedGear);

  elements.gearModal.addEventListener('click', (event) => {
    if (event.target === elements.gearModal) {
      closeGearModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !elements.gearModal.hidden) {
      closeGearModal();
    }
  });
}

function initializeGame() {
  bindEvents();

  const loaded = loadGame();
  ensurePrestigeRushState();
  if (!gameState.monster) {
    gameState.monster = createNextEncounter();
  }

  gameState.autoAttack = false;
  gameState.autoInterval = null;
  gameState.actionInProgress = false;
  gameState.player.magic ??= 14;
  gameState.player.magicChance ??= 18;
  gameState.player.activeWeaponSlot ??= 'physicalWeapon';
  gameState.player.buffs ??= { fury: 0, stone: 0, wind: 0, arcane: 0, fortune: 0 };
  gameState.player.buffs.arcane ??= 0;
  gameState.player.buffs.fortune ??= 0;
  ensureMonsterCombatRules(gameState.monster);

  addStarterItemsIfNeeded(loaded);
  closeLoadedUnaffordableForgeShop();
  updateStats();

  if (!loaded) {
    log('Bem-vindo! Derrote monstros para ganhar XP, ouro e equipamentos.', 'system', true);
  } else {
    log('Save carregado com sucesso.', 'system');
  }
}

function addStarterItemsIfNeeded(loaded) {
  if (loaded) return;

  addConsumable('potion', 2);
  const starterWeapon = {
    uid: uid('gear'),
    name: 'Espada Inicial',
    slot: 'physicalWeapon',
    rarity: 'common',
    level: 1,
    stats: { attack: 4 },
    value: 8,
  };

  gameState.inventory.gear.push(starterWeapon);
  gameState.equipment.physicalWeapon = starterWeapon;
}

initializeGame();
