const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
  playerStats: $('#player-stats'),
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
  closePrestigeModalButton: $('#close-prestige-modal-button'),
  confirmPrestigeButton: $('#confirm-prestige-button'),
  prestigeSummary: $('#prestige-summary'),
  relicList: $('#relic-list'),
  clearLogButton: $('#clear-log-button'),
  coinDisplay: $('#coin-display'),
  shopStatus: $('#shop-status'),
  shopMessage: $('#shop-message'),
  shopItemsContainer: $('#shop-items'),
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
};

const saveKey = 'idle-rpg-dungeon-infinita-v2';
// localStorage.removeItem('idle-rpg-dungeon-infinita-v2');

const gameConfig = {
  turnDelay: 650,
  enemyTurnDelay: 850,
  afterTurnDelay: 300,
  autoAttackDelay: 2200,
  importantMessageTime: 5000,

  shopKeepBattles: 2,
  currentBiomeEnemyChance: 72,

  mandatoryBossEvery: 5,
  prestigeCatchUpNearStage: 8,
  prestigeCatchUpMaxStageGain: 6,

  offlineMinSeconds: 60,
  offlineMaxMinutes: 1440,
  offlineBattleSeconds: 45,
  offlineGearDropCap: 14,
};

const rarities = [
  { id: 'common', name: 'Comum', chance: 45, multiplier: 1, className: 'rarity-common' },
  { id: 'uncommon', name: 'Incomum', chance: 27, multiplier: 1.25, className: 'rarity-uncommon' },
  { id: 'rare', name: 'Raro', chance: 17, multiplier: 1.6, className: 'rarity-rare' },
  { id: 'epic', name: 'Épico', chance: 8, multiplier: 2.15, className: 'rarity-epic' },
  { id: 'legendary', name: 'Lendário', chance: 3, multiplier: 3, className: 'rarity-legendary' },
];

// Coloque as imagens dos inimigos nesta pasta, mantendo estes nomes de arquivo.
// Exemplo: assets/inimigos/slime-acido.png
const enemyImageBasePath = 'assets/inimigos/';
const itemImageBasePath = 'assets/itens/';

const enemyImageByName = {
  // Inimigos antigos / Catacumbas
  'Slime Ácido': 'slimeAcido.png',
  'Goblin Ladrão': 'goblinLadrao.png',
  'Lobo da Névoa': 'loboNevoa.png',
  'Esqueleto Antigo': 'esqueletoAntigo.png',
  'Orc Guerreiro': 'orcGuerreiro.png',
  'Mago Sombrio': 'magoSombrio.png',

  // Minas Abandonadas
  'Golem de Pedra': 'golemPedra.png',
  'Morcego Ferrugento': 'morcegoFerrugento.png',
  'Mineiro Amaldiçoado': 'mineiroAmaldicoado.png',
  'Aranha das Minas': 'aranhaMinas.png',

  // Templo Submerso
  'Guarda Abissal': 'guardaAbissal.png',
  'Sereia Corrompida': 'sereiaCorrompida.png',
  'Caranguejo Colossal': 'caranguejoColossal.png',

  // Torre Arcana
  'Mago Fraturado': 'magoFraturado.png',
  'Sentinela Rúnico': 'sentinelaRunico.png',
  'Livro Vivo': 'livroVivo.png',
  'Cristal Mágico': 'cristalMagico.png',

  // Mecânicos / Arcanos
  'Golem de Engrenagens': 'golemEngrenagens.png',
  'Drone Arcano': 'droneArcano.png',
  'Armadura Vazia': 'armaduraVazia.png',

  // Inferno de Cinzas
  'Demônio de Cinzas': 'demonioCinzas.png',
  'Dragão Carbonizado': 'dragaoCarbonizado.png',
  'Cavaleiro Queimado': 'cavaleiroQueimado.png',

  // Vazio Infinito
  'Sombra Sem Nome': 'sombraSemNome.png',
  'Avatar Quebrado': 'avatarQuebrado.png',
  'Herói Corrompido': 'heroiCorrompido.png',
  'Devorador do Fim': 'devoradorFim.png',

  // Bosses
  'Rei Goblin': 'reiGoblin.png',
  'Lorde dos Ossos': 'lordeOssos.png',
  'Colosso das Minas': 'colossoMinas.png',
  'Rainha das Aranhas': 'rainhaAranhas.png',
  'Leviatã Menor': 'leviataMenor.png',
  'Sacerdote Abissal': 'sacerdoteAbissal.png',
  'Arquimago Fraturado': 'arquimagoFraturado.png',
  'Biblioteca Viva': 'bibliotecaViva.png',
  'Titã de Engrenagens': 'titaEngrenagens.png',
  'Núcleo Rúnico': 'nucleoRunico.png',
  'Dragão de Cinzas': 'dragaoCinzas.png',
  'General Infernal': 'generalInfernal.png',
  'Avatar do Vazio': 'avatarVazio.png',
  'Herói Corrompido Supremo': 'heroiCorrompidoSupremo.png',

  // Bosses especiais
  'Guardião do Pergaminho': 'guardiaoPergaminho.png',
  'Caçador de Relíquias': 'cacadorReliquias.png',
  'Eco do Herói Antigo': 'ecoHeroiAntigo.png',
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
    name: 'Poção de Pedra',
    shopName: 'Pedra',
    description: '+25% defesa por 5 lutas.',
    image: `${itemImageBasePath}pocaoPedra.png`,
    icon: '🪨',
    cost: 190,
    type: 'buff',
    buff: 'stone',
    duration: 5,
  },
  {
    id: 'windPotion',
    name: 'Poção do Vento',
    shopName: 'Vento',
    description: '+25% agilidade por 5 lutas.',
    image: `${itemImageBasePath}pocaoVento.png`,
    icon: '💨',
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
    description: '+4% de moedas ganhas por nível.',
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
    stage: 1,
    magic: 14,
    magicChance: 18,
    activeWeaponSlot: 'physicalWeapon',
    buffs: {
      fury: 0,
      stone: 0,
      wind: 0,
      arcane: 0,
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
  },
  monster: null,
  shop: {
    active: false,
    items: [],
    encountersLeft: 0,
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
  autoAttack: false,
  autoInterval: null,
  actionInProgress: false,
  currentTurn: 'player',
  activeInventoryTab: 'items',
  lastSaveAt: Date.now(),
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

function getCoinReward(amount) {
  return Math.max(0, Math.floor(amount * getTotalCoinMultiplier()));
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

  return {
    maxHp: 16 + tier * 3,
    attack: 2 + Math.floor(tier / 2),
    defense: 1 + Math.floor(tier / 3),
    agility: level % 4 === 0 ? 1 + Math.floor(tier / 4) : 0,
    skillPoints: level % 5 === 0 ? 3 : 1,
  };
}

function getMaxStageForPlayer() {
  const player = gameState.player;
  const prestige = gameState.prestige;

  const levelLimit = player.level * 3;
  const prestigeBonus = (prestige.count || 0) * 15;
  const bossBonus = Math.floor((player.bossesDefeated || 0) / 10) * 5;

  return Math.max(1, levelLimit + prestigeBonus + bossBonus);
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

function getPrestigeCatchUpStageGain() {
  const prestige = gameState.prestige || {};
  const player = gameState.player;
  const highestStage = prestige.highestStage || 1;

  if ((prestige.count || 0) <= 0 || highestStage <= player.stage) {
    return 1;
  }

  const distanceToRecord = highestStage - player.stage;
  const nearStage = gameConfig.prestigeCatchUpNearStage || 8;

  if (distanceToRecord <= nearStage) {
    return 1;
  }

  let gain = 2;

  if (distanceToRecord > 90) gain = 6;
  else if (distanceToRecord > 55) gain = 5;
  else if (distanceToRecord > 30) gain = 4;
  else if (distanceToRecord > 15) gain = 3;

  return clamp(gain, 1, gameConfig.prestigeCatchUpMaxStageGain || 6);
}

function getBossStageAdvanceAmount() {
  return getPrestigeCatchUpStageGain();
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

  return Math.round(value * getTotalDamageMultiplier());
}

function getPlayerMagic() {
  let value = gameState.player.magic + getEquipmentBonus('magic');

  if (gameState.player.buffs?.arcane > 0) {
    value *= 1.3;
  }

  return Math.round(value);
}

function getPlayerMagicChance() {
  const base = gameState.player.magicChance || 0;
  const bonus = getEquipmentBonus('magicChance');
  return clamp(base + bonus, 0, 75);
}

function getPlayerMagicDamageMultiplier() {
  return 1 + (getEquipmentBonus('magicDamagePercent') / 100);
}

function getPlayerXpBonusPercent() {
  return getEquipmentBonus('xpPercent');
}

function getPlayerDefense() {
  let value = gameState.player.defense + getEquipmentBonus('defense');

  if (gameState.player.buffs?.stone > 0) {
    value *= 1.25;
  }

  return Math.round(value);
}

function getPlayerAgility() {
  let value = gameState.player.agility + getEquipmentBonus('agility');

  if (gameState.player.buffs?.wind > 0) {
    value *= 1.25;
  }

  return Math.round(value);
}

function getPlayerCritChance() {
  return clamp(gameState.player.critChance + getEquipmentBonus('critChance'), 5, 55);
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
      { name: 'Mago Sombrio', icon: '🧙', type: 'Arcano', hp: 0.9, attack: 1.34, defense: 0.82, agility: 0.95, resist: { physical: 1.12, magic: 0.82 } },
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
    ],
  },

  {
    id: 'mechanicArcane',
    name: 'Família Mecânica/Arcana',
    minStage: 301,
    maxStage: 520,
    theme: 'machine',
    preferredDrops: ['hammer', 'crystal', 'bracelet', 'spell'],
    enemies: [
      { name: 'Golem de Engrenagens', icon: '⚙️', type: 'Mecânico', hp: 1.35, attack: 1.12, defense: 1.25, agility: 0.75, resist: { physical: 0.85, magic: 1.1 } },
      { name: 'Sentinela Rúnico', icon: '🛡️', type: 'Mecânico Arcano', hp: 1.25, attack: 1.18, defense: 1.18, agility: 0.92, resist: { physical: 0.95, magic: 0.85 } },
      { name: 'Drone Arcano', icon: '🛸', type: 'Mecânico', hp: 0.92, attack: 1.15, defense: 0.82, agility: 1.55, resist: { physical: 1.05, magic: 0.95 } },
      { name: 'Armadura Vazia', icon: '🛡️', type: 'Armadura Viva', hp: 1.18, attack: 1.05, defense: 1.32, agility: 0.72, resist: { physical: 0.9, magic: 1.08 } },
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
    ],
  },
];

const bossPools = {
  catacombs: [
    { name: 'Rei Goblin', icon: '👑', type: 'Boss', hp: 1.35, attack: 1.22, defense: 1.05, agility: 0.95, resist: { physical: 1, magic: 1 } },
    { name: 'Lorde dos Ossos', icon: '💀', type: 'Boss Morto-vivo', hp: 1.45, attack: 1.18, defense: 1.2, agility: 0.75, resist: { physical: 0.95, magic: 1.1 } },
  ],

  abandonedMines: [
    { name: 'Colosso das Minas', icon: '🪨', type: 'Boss Construto', hp: 1.75, attack: 1.2, defense: 1.45, agility: 0.55, resist: { physical: 0.82, magic: 1.18 } },
    { name: 'Rainha das Aranhas', icon: '🕷️', type: 'Boss Fera', hp: 1.35, attack: 1.25, defense: 1, agility: 1.28, resist: { physical: 1, magic: 1 } },
  ],

  sunkenTemple: [
    { name: 'Leviatã Menor', icon: '🐍', type: 'Boss Aquático', hp: 1.65, attack: 1.3, defense: 1.12, agility: 0.95, resist: { physical: 1, magic: 0.9, trident: 1.25 } },
    { name: 'Sacerdote Abissal', icon: '🔱', type: 'Boss Arcano', hp: 1.3, attack: 1.45, defense: 0.95, agility: 1.08, resist: { physical: 1.1, magic: 0.75 } },
  ],

  brokenTower: [
    { name: 'Arquimago Fraturado', icon: '🧙', type: 'Boss Arcano', hp: 1.4, attack: 1.55, defense: 0.95, agility: 1.05, resist: { physical: 1.15, magic: 0.65 } },
    { name: 'Biblioteca Viva', icon: '📚', type: 'Boss Arcano', hp: 1.55, attack: 1.35, defense: 1.05, agility: 0.82, resist: { physical: 1.12, magic: 0.7 } },
  ],

  mechanicArcane: [
    { name: 'Titã de Engrenagens', icon: '⚙️', type: 'Boss Mecânico', hp: 1.8, attack: 1.28, defense: 1.4, agility: 0.7, resist: { physical: 0.82, magic: 1.1 } },
    { name: 'Núcleo Rúnico', icon: '🔮', type: 'Boss Arcano', hp: 1.5, attack: 1.48, defense: 1.2, agility: 0.88, resist: { physical: 1.05, magic: 0.7 } },
  ],

  ashHell: [
    { name: 'Dragão de Cinzas', icon: '🐉', type: 'Boss Dragão', hp: 1.8, attack: 1.48, defense: 1.18, agility: 0.86, resist: { physical: 0.95, magic: 0.85 } },
    { name: 'General Infernal', icon: '🔥', type: 'Boss Demônio', hp: 1.55, attack: 1.52, defense: 1.12, agility: 1.05, resist: { physical: 1, magic: 0.9 } },
  ],

  infiniteVoid: [
    { name: 'Avatar do Vazio', icon: '🌌', type: 'Boss Entidade', hp: 1.9, attack: 1.6, defense: 1.25, agility: 1.05, resist: { physical: 0.9, magic: 0.9 } },
    { name: 'Herói Corrompido Supremo', icon: '🗡️', type: 'Boss Espelho', hp: 1.75, attack: 1.7, defense: 1.22, agility: 1.18, resist: { physical: 1, magic: 1 } },
  ],
};

const specialBossPool = [
  { name: 'Guardião do Pergaminho', icon: '📜', type: 'Boss Especial', hp: 1.7, attack: 1.45, defense: 1.15, agility: 1.05, resist: { physical: 1, magic: 1 } },
  { name: 'Caçador de Relíquias', icon: '💎', type: 'Boss Especial', hp: 1.45, attack: 1.55, defense: 1, agility: 1.28, resist: { physical: 1.05, magic: 0.95 } },
  { name: 'Eco do Herói Antigo', icon: '👤', type: 'Boss Especial', hp: 1.6, attack: 1.6, defense: 1.18, agility: 1.12, resist: { physical: 1, magic: 1 } },
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
  const fadeStart = 45;
  const fadeEnd = 140;

  return dungeonBiomes
    .slice(0, currentIndex)
    .map((biome, index) => {
      const distancePastBiome = Math.max(0, stage - biome.maxStage);

      if (distancePastBiome >= fadeEnd) {
        return null;
      }

      const fadeFactor = distancePastBiome <= fadeStart
        ? 1
        : 1 - ((distancePastBiome - fadeStart) / (fadeEnd - fadeStart));

      const distanceFromCurrent = Math.max(1, currentIndex - index);
      const proximityFactor = 1 / distanceFromCurrent;

      return {
        biome,
        weight: Math.max(0.03, fadeFactor * proximityFactor),
      };
    })
    .filter(Boolean);
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
  const previousBiomeEntries = getPreviousBiomeCandidates(stage, currentBiome);

  if (!previousBiomeEntries.length) {
    return currentBiome;
  }

  const previousBiomeChance = clamp(24 - currentIndex * 2.5, 8, 24);

  if (randomBetween(1, 100) > previousBiomeChance) {
    return currentBiome;
  }

  return pickWeightedBiomeEntry(previousBiomeEntries);
}

function createMonster(isBoss = false, specialBoss = false) {
  const player = gameState.player;

  const currentBiome = getDungeonBiome(player.stage);
  const enemyBiome = isBoss
    ? currentBiome
    : getEnemyBiomeForStage(player.stage);

  const templatePool = isBoss
    ? getBossPoolForBiome(currentBiome.id, specialBoss)
    : enemyBiome.enemies;

  const template = templatePool[randomBetween(0, templatePool.length - 1)];

  const effectiveStage = Math.min(player.stage, getMaxStageForPlayer());
  const stagePressure = Math.floor(effectiveStage / 12);
  const levelVariance = randomBetween(isBoss ? 1 : -1, isBoss ? 4 : 1);

  const level = Math.max(1, player.level + stagePressure + levelVariance);

  const biomeScaling = 1 + Math.floor(effectiveStage / 300) * 0.08;
  const bossMultiplier = isBoss ? 1.35 : 1;

  const base = 72 + level * 16 + effectiveStage * 1.2;

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
    level,
    isBoss,
    specialBoss,
    resist: template.resist || { physical: 1, magic: 1 },

    maxHp: Math.round(base * template.hp * bossMultiplier * biomeScaling),
    attack: Math.round((9 + level * 2.05 + effectiveStage * 0.28) * template.attack * bossMultiplier * biomeScaling),
    defense: Math.round((3 + level * 0.9 + effectiveStage * 0.16) * template.defense * biomeScaling),
    agility: Math.round((8 + level * 0.45 + effectiveStage * 0.07) * template.agility * biomeScaling),

    xpReward: Math.round((45 + level * 18 + effectiveStage * 3) * (isBoss ? 2.6 : 1) * biomeScaling),
    coinReward: Math.round((10 + level * 6 + effectiveStage * 1.7) * (isBoss ? 2.7 : 1) * biomeScaling),
  };

  monster.hp = monster.maxHp;
  return monster;
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

  if (stage >= 25 || prestige >= 1) {
    allowedIds.push('elixir');
  }

  if (stage >= 35 || prestige >= 1) {
    allowedIds.push('bossScroll');
  }

  return shopCatalog.filter((item) => allowedIds.includes(item.id));
}

function createShopItems() {
  const pool = getShopItemPool();
  const amount = randomBetween(2, 3);
  const items = [];

  while (items.length < amount && pool.length) {
    const index = randomBetween(0, pool.length - 1);
    const item = { ...pool.splice(index, 1)[0] };
    item.cost = Math.floor(item.cost * (1 + gameState.player.stage * 0.12 + gameState.player.level * 0.025));
    items.push(item);
  }

  return items;
}

function updateShopMessage(prefix = 'Loja aberta') {
  if (!gameState.shop.active || !gameState.shop.items.length) return;

  const left = gameState.shop.encountersLeft || gameConfig.shopKeepBattles;
  const enemyText = left === 1 ? '1 inimigo' : `${left} inimigos`;

  elements.shopStatus.textContent = `Loja aberta • ${enemyText}`;
  elements.shopMessage.textContent = `${prefix}. Disponível por mais ${enemyText}.`;
}

function closeShop(message = 'O vendedor foi embora. Derrote monstros para encontrar outra loja.') {
  gameState.shop.active = false;
  gameState.shop.items = [];
  gameState.shop.encountersLeft = 0;

  elements.shopStatus.textContent = 'Nenhuma loja';
  elements.shopMessage.textContent = message;

  if (typeof hideFloatingTooltip === 'function') {
    hideFloatingTooltip();
  }
}

function tickShopDurationAfterBattle() {
  if (!gameState.shop.active || !gameState.shop.items.length) return;

  gameState.shop.encountersLeft = Math.max(
    0,
    (gameState.shop.encountersLeft || gameConfig.shopKeepBattles) - 1
  );

  if (gameState.shop.encountersLeft <= 0) {
    closeShop('O vendedor esperou por 2 inimigos e foi embora.');
    return;
  }

  updateShopMessage('Loja ainda aberta');
}

function maybeOpenShop(force = false) {
  const shouldOpen = force || randomBetween(1, 100) <= 38;

  if (!shouldOpen) {
    if (gameState.shop.active && gameState.shop.items.length) {
      updateShopMessage('Loja ainda aberta');
      return;
    }

    elements.shopStatus.textContent = 'Nenhuma loja';
    elements.shopMessage.textContent = 'Continue derrotando monstros para encontrar uma loja.';
    return;
  }

  const newItems = createShopItems();
  const currentItems = gameState.shop.active && Array.isArray(gameState.shop.items)
    ? [...gameState.shop.items]
    : [];

  const existingIds = new Set(currentItems.map((item) => item.id));

  newItems.forEach((item) => {
    if (!existingIds.has(item.id)) {
      currentItems.push(item);
      existingIds.add(item.id);
    }
  });

  gameState.shop.active = true;
  gameState.shop.items = currentItems.slice(0, 4);
  gameState.shop.encountersLeft = gameConfig.shopKeepBattles;

  updateShopMessage(force ? 'Boss derrotado: loja garantida' : 'Um vendedor apareceu na dungeon');

  log(
    force
      ? 'Boss derrotado: a loja foi reforçada e ficará aberta por mais 2 inimigos.'
      : 'Uma loja apareceu e ficará aberta por mais 2 inimigos.',
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

  return unlockedSlots[randomBetween(0, unlockedSlots.length - 1)];
}

function createGear(monsterLevel, bossDrop = false) {
  const rarity = bossDrop ? getBossRarity() : getRarity();

  const biome = getDungeonBiome(gameState.player.stage);
  const slot = getRandomGearSlotForBiome(biome);
  const namePool = getAvailableGearNamesForStage(slot, gameState.player.stage);

  const baseName = namePool[randomBetween(0, namePool.length - 1)];
  const level = Math.max(1, monsterLevel + randomBetween(-1, 2));
  const power = Math.max(1, Math.round((level + 3) * rarity.multiplier));

  const stats = {};

  if (slot === 'physicalWeapon') {
    stats.attack = Math.max(2, Math.round(power * 1.5));

    if (rarity.id === 'epic' || rarity.id === 'legendary') {
      stats.critChance = randomBetween(3, 8);
    }
  }

  if (slot === 'magicWeapon') {
    stats.magic = Math.max(2, Math.round(power * 1.5));
    stats.magicChance = randomBetween(2, 6);

    if (rarity.id === 'epic' || rarity.id === 'legendary') {
      stats.magicDamagePercent = randomBetween(6, 16);
    }
  }

  if (slot === 'helmet') {
    stats.maxHp = Math.max(14, Math.round(power * 5.2));
  }

  if (slot === 'chest') {
    stats.defense = Math.max(2, Math.round(power * 1.25));
    stats.maxHp = Math.max(8, Math.round(power * 2.5));
  }

  if (slot === 'boots') {
    stats.agility = Math.max(2, Math.round(power * 1));
  }

  if (slot === 'necklace') {
    stats.xpPercent = randomBetween(4, 12);
  }

  if (slot === 'bracelet') {
    const possibleStats = ['attack', 'magic', 'defense', 'agility', 'maxHp'];
    const chosen = possibleStats[randomBetween(0, possibleStats.length - 1)];

    if (chosen === 'maxHp') {
      stats[chosen] = Math.max(10, Math.round(power * 4));
    } else {
      stats[chosen] = Math.max(2, Math.round(power * 1.1));
    }
  }

  if (slot === 'ring') {
    applyRingSpecialStats(stats, baseName, rarity.id);
  }

  if (slot === 'spell') {
    stats.magic = Math.max(2, Math.round(power * 1.2));
    stats.magicChance = randomBetween(4, 10);
    stats.magicDamagePercent = randomBetween(5, 18);
  }

  return {
    uid: uid('gear'),
    name: `${baseName} ${rarity.name}`,
    slot,
    rarity: rarity.id,
    level,
    stats,
    value: Math.max(12, Math.round(power * 6)),
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
    (item.stats.bossDamagePercent || 0) * 1.7
  );
}

function getRarityCostMultiplier(rarityId) {
  const multipliers = {
    common: 1,
    uncommon: 1.35,
    rare: 1.9,
    epic: 2.8,
    legendary: 4,
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

  return clamp(
    1 + stageBonus + bossBonus + prestigeBonus + itemLevelBonus,
    1,
    5
  );
}

function getGearUpgradeCost(item) {
  if (!item) return 0;

  const rarityMultiplier = getRarityCostMultiplier(item.rarity);
  const level = item.level || 1;

  const prestigeDiscount = Math.min(0.28, (gameState.prestige.count || 0) * 0.025);
  const bossDiscount = Math.min(0.22, Math.floor((gameState.player.bossesDefeated || 0) / 20) * 0.025);
  const discountMultiplier = 1 - prestigeDiscount - bossDiscount;

  const baseCost = 80 + level * 24 + Math.pow(level, 1.12) * 6;

  return Math.max(
    25,
    Math.round(baseCost * rarityMultiplier * discountMultiplier)
  );
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

  if (stat === 'xpPercent') return 1;
  if (stat === 'magicChance') return 1;
  if (stat === 'magicDamagePercent') return 2;

  return Math.max(
    1,
    Math.round(rarity.multiplier * forgePower)
  );
}

function getForgeUpgradeGains(item) {
  const previewItem = {
    ...item,
    level: (item.level || 1) + 1,
  };

  const gains = {};

  Object.keys(item.stats || {}).forEach((stat) => {
    gains[stat] = getStatUpgradeAmount(stat, previewItem);
  });

  return gains;
}

function getForgeUpgradePreview(item) {
  const gains = getForgeUpgradeGains(item);
  return formatStats(gains);
}

function upgradeEquippedGear(slot) {
  const equippedItem = gameState.equipment[slot];

  if (!equippedItem) {
    log('Não há equipamento nesse espaço para melhorar.', 'system');
    return;
  }

  const cost = getGearUpgradeCost(equippedItem);

  if (gameState.player.coins < cost) {
    log(`Moedas insuficientes. Você precisa de ${cost} moedas para melhorar este equipamento.`, 'shop', true);
    return;
  }

  const item = gameState.inventory.gear.find((gear) => gear.uid === equippedItem.uid) || equippedItem;

  gameState.player.coins -= cost;
  item.level += 1;

  const gains = getForgeUpgradeGains(item);

  Object.entries(gains).forEach(([stat, amount]) => {
    item.stats[stat] += amount;
  });

  normalizeSpecialGearStats(item);

  item.value += Math.round(cost * 0.35);
  gameState.equipment[slot] = item;

  log(
    `Forja concluída! ${formatGearName(item)} subiu para o nível ${item.level}. Ganhos: ${formatStats(gains)}.`,
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

  if (item.type === 'fullHeal') {
    return maxHp - gameState.player.hp;
  }

  const percentHeal = item.healPercent
    ? Math.round(maxHp * item.healPercent)
    : item.healAmount || 0;

  return Math.min(
    maxHp - gameState.player.hp,
    Math.max(item.minHeal || 0, percentHeal)
  );
}

function autoUseEmergencyHealing() {
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

  const item = shopCatalog.find((catalogItem) => catalogItem.id === itemId);
  if (!item) return false;

  const hpBefore = gameState.player.hp;

  if (item.type === 'fullHeal') {
    gameState.player.hp = maxHp;
  } else {
    const healAmount = Math.max(1, getHealingAmount(item));
    gameState.player.hp = Math.min(maxHp, gameState.player.hp + healAmount);
  }

  removeConsumable(itemId);

  const healed = gameState.player.hp - hpBefore;

  log(
    `Uso automático: ${item.name} ativada e recuperou ${healed} HP.`,
    'shop',
    true
  );

  return true;
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
  ];

  return Object.entries(stats)
    .map(([key, value]) => {
      const label = labels[key] || key;
      const suffix = percentStats.includes(key) ? '%' : '';

      return `+${value}${suffix} ${label}`;
    })
    .join(' • ');
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

  return `
    <span class="gear-image-frame">
      <img
        class="gear-image"
        src="${escapeAttr(imagePath)}"
        alt="${itemName}"
        loading="lazy"
        decoding="async"
        onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
      />
      <span class="gear-fallback-icon" hidden>${fallbackIcon}</span>
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

function applySpellGlow(card, visualInfo, className) {
  if (!card) return;

  card.style.setProperty('--spell-color', visualInfo.color);
  card.style.setProperty('--spell-color-soft', visualInfo.softColor);

  card.classList.remove(className);
  void card.offsetWidth;
  card.classList.add(className);

  setTimeout(() => {
    card.classList.remove(className);
  }, 900);
}

function showSpellImpact(damage = 0) {
  const spellItem = getActiveSpellItem();
  const monsterCard = document.querySelector('.monster-card');

  if (!spellItem || !monsterCard) return;

  const visualInfo = getSpellVisualInfo(spellItem);
  const imagePath = getGearImagePath(spellItem);
  const spellName = escapeAttr(getSpellBaseName(spellItem) || spellItem.name || 'Magia');
  const cardRect = monsterCard.getBoundingClientRect();

  // O brilho continua no card inteiro, mas a imagem da magia fica fora do fluxo do card.
  // Assim a animação não aumenta a altura do card nem cria espaço vazio no final.
  applySpellGlow(monsterCard, visualInfo, 'spell-target-glow');

  // Remove ícones genéricos de combate para a magia não aparecer junto com espada/raio/etc.
  monsterCard.querySelectorAll('.combat-indicator, .spell-impact').forEach((entry) => entry.remove());
  document.querySelectorAll('.spell-impact-screen').forEach((entry) => entry.remove());
  document
    .querySelectorAll('.combat-indicator-screen[data-target-side="monster"]')
    .forEach((entry) => entry.remove());

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

  setTimeout(() => {
    impact.remove();
  }, 920);
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
    return `${item.name}: concede +1 ponto de habilidade.`;
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
Valor de venda: ${item.value} moedas`;
}

function formatGearName(item) {
  const rarity = getRarityById(item.rarity);
  return `<span class="${rarity.className}">${item.name}</span>`;
}

function saveGame() {
  gameState.lastSaveAt = Date.now();

  const saveData = structuredCloneSafe({
    version: initialState.version,
    player: gameState.player,
    prestige: gameState.prestige,
    monster: gameState.monster,
    shop: gameState.shop,
    inventory: gameState.inventory,
    equipment: gameState.equipment,
    currentTurn: gameState.currentTurn,
    activeInventoryTab: gameState.activeInventoryTab,
    lastSaveAt: gameState.lastSaveAt,
    ui: gameState.ui,
  });

  localStorage.setItem(saveKey, JSON.stringify(saveData));
}

function getSavedLastSaveAt() {
  try {
    const rawSave = localStorage.getItem(saveKey);
    if (!rawSave) return gameState.lastSaveAt || null;

    const saved = JSON.parse(rawSave);
    return saved?.lastSaveAt || gameState.lastSaveAt || null;
  } catch (error) {
    console.warn('Falha ao ler data do save:', error);
    return gameState.lastSaveAt || null;
  }
}

function resumeOfflineProgressIfNeeded() {
  const lastSaveAt = getSavedLastSaveAt();
  const progressed = applyOfflineProgress(lastSaveAt);

  if (progressed) {
    updateStats();
  }
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
    gameState.player.buffs ??= { fury: 0, stone: 0, wind: 0, arcane: 0 };
    gameState.player.buffs.arcane ??= 0;

    gameState.prestige = structuredCloneSafe(initialState.prestige);

    if (saved.prestige) {
      Object.assign(gameState.prestige, saved.prestige);
      gameState.prestige.relics = {
        ...initialState.prestige.relics,
        ...(saved.prestige.relics || {}),
      };
    }
    gameState.monster = saved.monster || null;
    gameState.shop = saved.shop || structuredCloneSafe(initialState.shop);
    gameState.shop.encountersLeft = gameState.shop.encountersLeft || 0;
    gameState.inventory = saved.inventory || structuredCloneSafe(initialState.inventory);
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
    gameState.currentTurn = saved.currentTurn || 'player';
    gameState.activeInventoryTab = saved.activeInventoryTab || 'items';
    gameState.lastSaveAt = saved.lastSaveAt || Date.now();

    normalizeProgressionAfterBalance(true);

    normalizePlayerHp();
    applyOfflineProgress(saved.lastSaveAt);
    return true;
  } catch (error) {
    console.warn('Falha ao carregar save:', error);
    return false;
  }
}

function applyOfflineProgress(lastSaveAt) {
  if (!lastSaveAt) return false;

  const secondsAway = Math.floor((Date.now() - lastSaveAt) / 1000);

  if (secondsAway < gameConfig.offlineMinSeconds) return false;

  const minutes = Math.min(
    gameConfig.offlineMaxMinutes,
    Math.floor(secondsAway / 60)
  );

  const report = calculateOfflineProgress(minutes);

  if (report.monstersDefeated <= 0) return false;

  const xpGained = gainXp(report.baseXp, false);
  const coinsGained = getCoinReward(report.baseCoins);

  gameState.player.coins += coinsGained;
  gameState.player.victories += report.monstersDefeated;
  gameState.player.bossesDefeated += report.bossesDefeated;
  gameState.player.monstersSinceBoss = report.monstersDefeated % getMandatoryBossTarget();
  const stageBeforeOffline = gameState.player.stage;
  const maxOfflineStageGain = Math.max(0, getMaxStageForPlayer() - stageBeforeOffline);
  const actualStagesGained = Math.min(report.stagesGained, maxOfflineStageGain);

  gameState.player.stage += actualStagesGained;

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

  normalizePlayerHp();

  const offlineHeal = Math.round((getPlayerMaxHp() - gameState.player.hp) * 0.65);
  gameState.player.hp = Math.min(getPlayerMaxHp(), gameState.player.hp + offlineHeal);

  gameState.monster = createNextEncounter();

  const finalReport = {
    ...report,
    stagesGained: actualStagesGained,
    xpGained,
    coinsGained,
    gearFound,
    epicOrLegendaryFound,
  };

  elements.offlineMessage.textContent =
    `Offline: +${xpGained} XP, +${coinsGained} moedas e ${report.monstersDefeated} monstros derrotados.`;

  showOfflineModal(finalReport);

  log(
    `Progresso offline: +${xpGained} XP, +${coinsGained} moedas e ${report.monstersDefeated} monstros derrotados.`,
    'offline',
    true
  );
  gameState.lastSaveAt = Date.now();
  saveGame();
  return true;
}

function calculateOfflineProgress(minutes) {
  const player = gameState.player;

  const power = Math.max(1, getPlayerPower());
  const dungeonDifficulty = Math.max(60, 70 + player.stage * 24 + player.level * 7);

  const efficiency = clamp(power / dungeonDifficulty, 0.45, 3.25);
  const offlineMultiplier = typeof getTotalOfflineMultiplier === 'function'
    ? getTotalOfflineMultiplier()
    : 1;

  const estimatedBattles = Math.floor(
    ((minutes * 60) / gameConfig.offlineBattleSeconds) * efficiency * offlineMultiplier
  );

  const monstersDefeated = Math.max(1, estimatedBattles);

  const bossesDefeated = Math.min(10, Math.floor(monstersDefeated / getMandatoryBossTarget()));
  const stageGainPerBoss = getPrestigeCatchUpStageGain();
  const stagesGained = bossesDefeated * stageGainPerBoss;

  const estimatedLevel = player.level + Math.floor(stagesGained / 2);
  const rewardLevel = Math.max(player.level, estimatedLevel);

  const baseMonsterXp = 28 + rewardLevel * 13 + player.stage * 4;
  const baseMonsterCoins = 8 + rewardLevel * 5 + player.stage * 2;

  const baseBossXp = baseMonsterXp * 2.2;
  const baseBossCoins = baseMonsterCoins * 2.4;

  const baseXp = Math.floor(
    monstersDefeated * baseMonsterXp + bossesDefeated * baseBossXp
  );

  const baseCoins = Math.floor(
    monstersDefeated * baseMonsterCoins + bossesDefeated * baseBossCoins
  );

  const dropBonus = typeof getTotalDropBonus === 'function'
    ? getTotalDropBonus()
    : 0;

  const dropChance = clamp(
    28 + Math.min(18, player.stage * 2) + dropBonus,
    5,
    80
  );

  const expectedDrops = Math.floor(monstersDefeated * (dropChance / 100));
  const luckyDrop = randomBetween(1, 100) <= dropChance ? 1 : 0;

  const gearDrops = clamp(
    expectedDrops + luckyDrop + bossesDefeated,
    0,
    gameConfig.offlineGearDropCap
  );

  const potionsFound = Math.floor(monstersDefeated / 20);

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

function formatOfflineTime(minutes) {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${remainingMinutes} min`;
}

function showOfflineModal(report) {
  if (!elements.offlineModal || !elements.offlineSummary) return;

  elements.offlineSummary.innerHTML = `
    <div class="offline-card highlight">
      <strong>Tempo fora</strong>
      <span>${formatOfflineTime(report.minutes)}</span>
    </div>

    <div class="offline-card">
      <strong>XP ganho</strong>
      <span>+${report.xpGained} XP</span>
    </div>

    <div class="offline-card">
      <strong>Moedas ganhas</strong>
      <span>+${report.coinsGained} moedas</span>
    </div>

    <div class="offline-card">
      <strong>Monstros derrotados</strong>
      <span>${report.monstersDefeated} monstros</span>
    </div>

    <div class="offline-card">
      <strong>Bosses derrotados</strong>
      <span>${report.bossesDefeated} bosses</span>
    </div>

    <div class="offline-card">
      <strong>Andares avançados</strong>
      <span>+${report.stagesGained} andares</span>
    </div>

    <div class="offline-card">
      <strong>Equipamentos encontrados</strong>
      <span>${report.gearFound} equipamentos</span>
    </div>

    <div class="offline-card">
      <strong>Épicos/Lendários</strong>
      <span>${report.epicOrLegendaryFound} itens especiais</span>
    </div>

    <div class="offline-card">
      <strong>Poções encontradas</strong>
      <span>${report.potionsFound} poções</span>
    </div>
  `;

  elements.offlineModal.hidden = false;
}

function closeOfflineModal() {
  if (!elements.offlineModal) return;
  elements.offlineModal.hidden = true;
}

function log(message, type = 'system', important = false) {
  const cleanMessage = String(message).replace(/<[^>]*>/g, '');

  const importantTypes = [
    'level',
    'reward',
    'drop',
    'shop',
    'boss',
    'death',
    'offline',
    'equip',
    'buy',
    'system-important',
  ];

  const shouldShowTopMessage = important || importantTypes.includes(type);

  if (elements.offlineMessage && shouldShowTopMessage) {
    elements.offlineMessage.textContent = cleanMessage;
  }

  if (!elements.battleLog) return;

  const entry = document.createElement('p');
  entry.className = `log-entry ${type}${important ? ' important' : ''}`;
  entry.innerHTML = `<span>${message}</span>`;
  elements.battleLog.prepend(entry);

  while (elements.battleLog.childElementCount > 35) {
    elements.battleLog.removeChild(elements.battleLog.lastChild);
  }
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

  portrait.innerHTML = '';

  if (!monster) {
    portrait.textContent = '👹';
    return;
  }

  const imagePath = getMonsterImage(monster);

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

  elements.heroLevel.textContent = `Nível ${player.level}`;

  const currentStageBiome = getDungeonBiome(player.stage);

  applyBiomeTheme(currentStageBiome);
  elements.stageDisplay.textContent = `Andar ${player.stage}`;

  if (elements.biomeDisplay) {
    elements.biomeDisplay.innerHTML = `<span>Bioma atual</span><strong>${escapeAttr(currentStageBiome.name)}</strong>`;
  }

  elements.prestigeTitle.textContent = getPrestigeTitle(gameState.prestige.count);
  elements.prestigePoints.textContent = gameState.prestige.points;
  elements.coinDisplay.textContent = player.coins;
  elements.skillPointsDisplay.textContent = `${player.skillPoints} pontos`;
  elements.playerPower.textContent = `Poder ${getPlayerPower()}`;

  elements.playerHpBar.style.width = `${percent(player.hp, maxHp)}%`;
  elements.playerXpBar.style.width = `${percent(player.xp, player.nextLevelXp)}%`;
  elements.playerHpText.textContent = `${player.hp} / ${maxHp}`;
  elements.playerXpText.textContent = `${player.xp} / ${player.nextLevelXp}`;

  elements.monsterName.textContent = monster ? monster.name : '—';
  elements.monsterLevel.textContent = monster ? `Nv. ${monster.level}` : 'Nv. 1';
  elements.monsterTypeBadge.textContent = monster
    ? `${monster.type}${monster.isBoss ? ' • Recompensa alta' : ''}`
    : 'Aguardando inimigo...';

  renderMonsterPortrait(monster);
  elements.monsterHpBar.style.width = monster ? `${percent(monster.hp, monster.maxHp)}%` : '0%';
  elements.monsterHpText.textContent = monster ? `${monster.hp} / ${monster.maxHp}` : '0 / 0';

  renderPlayerStats();
  renderMonsterStats();
  renderEquipment();
  renderShop();
  renderInventory();
  if (elements.gearModal && !elements.gearModal.hidden) {
    renderGearModal();
  }
  updateTurnDisplay();
  updateButtons();
  renderSkillControls();

  saveGame();
}

function getAutoUseLabel(key) {
  const labels = {
    heal: 'Cura',
    fury: 'Fúria',
    stone: 'Pedra',
    wind: 'Vento',
    arcane: 'Magia',
  };

  return labels[key] || key;
}

function renderAutomationPanel() {
  const autoUse = gameState.ui.autoUse;

  elements.heroAutomation.innerHTML = `
    <div class="section-mini-header">
      <h4>Automação</h4>
      <p>Escolha o que o jogo pode usar sozinho.</p>
    </div>

    <div class="toggle-chip-grid">
      ${Object.entries(autoUse).map(([key, enabled]) => `
        <label class="toggle-chip ${enabled ? 'active' : ''}">
          <input type="checkbox" data-auto-use="${key}" ${enabled ? 'checked' : ''}>
          <span>${getAutoUseLabel(key)}</span>
        </label>
      `).join('')}
    </div>
  `;

  elements.heroAutomation
    .querySelectorAll('input[data-auto-use]')
    .forEach((input) => {
      input.addEventListener('change', (event) => {
        const key = event.currentTarget.dataset.autoUse;
        gameState.ui.autoUse[key] = event.currentTarget.checked;
        renderAutomationPanel();
      });
    });
}

function renderPlayerStats() {
  const stats = [
    { key: 'attack', icon: '💥', label: 'Ataque', value: getPlayerAttack() },
    { key: 'magic', icon: '🔮', label: 'Magia', value: getPlayerMagic() },
    { key: 'defense', icon: '🛡️', label: 'Defesa', value: getPlayerDefense() },
    { key: 'agility', icon: '⚡', label: 'Agilidade', value: getPlayerAgility() },
    { key: 'crit', icon: '🎯', label: 'Crítico', value: `${getPlayerCritChance()}%` },
  ];

  elements.playerStats.innerHTML = stats.map(({ key, icon, label, value }) => {
    const safeValue = escapeAttr(value ?? '-');

    return `
      <div class="stat-card hero-stat-card hero-stat-${key}">
        <div class="hero-stat-main">
          <span class="stat-icon">${icon}</span>
          <span class="hero-stat-label">${label}</span>
        </div>

        <strong class="hero-stat-value" title="${safeValue}">
          ${safeValue}
        </strong>
      </div>
    `;
  }).join('');

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

function getSkillStatGain(stat, points = 1) {
  const meta = skillMeta[stat];
  if (!meta) return 0;

  return Math.max(0, points) * meta.statGain;
}

function getSkillGainText(stat, points = 1) {
  const meta = skillMeta[stat];
  if (!meta) return '';

  return `+${getSkillStatGain(stat, points)}${meta.suffix}`;
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
          <small>${pointsSpent} pts aplicados</small>
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

function renderMonsterStats() {
  elements.monsterStats.innerHTML = '';
  const monster = gameState.monster;
  if (!monster) return;

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

  const stats = [
    { key: 'attack', icon: '💥', label: 'Ataque', value: monster.attack },
    { key: 'defense', icon: '🛡️', label: 'Defesa', value: monster.defense },
    { key: 'agility', icon: '⚡', label: 'Agilidade', value: monster.agility },
    { key: 'xp', icon: '✨', label: 'XP', value: monster.xpReward },
    { key: 'coins', icon: '💰', label: 'Moedas', value: monster.coinReward },
    { key: 'family', icon: '👥', label: 'Família', value: monster.type },
  ];

  stats.forEach(({ key, icon, label, value }) => {
    const card = document.createElement('div');
    const safeValue = escapeAttr(value ?? '-');

    card.className = `stat-card monster-stat-card monster-stat-${key}`;

    card.innerHTML = `
      <div class="monster-stat-main">
        <span class="stat-icon">${icon}</span>
        <span class="monster-stat-label">${label}</span>
      </div>

      <strong class="monster-stat-value" title="${safeValue}">
        ${safeValue}
      </strong>
    `;

    elements.monsterStats.appendChild(card);
  });
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

      row.className = `equipment-slot ${item ? 'has-item' : 'is-empty'} ${isActiveWeapon ? 'active-weapon' : ''}`;

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

        const tooltip = `${getGearTooltip(item)}
Melhorar: ${cost} moedas
Ganho na próxima melhoria: ${forgePreview}`;

        row.innerHTML = `
          ${gearImageTag(item)}

          <div class="gear-card-body">
            <div class="gear-slot-label">
              ${label}${isWeapon && isActiveWeapon ? ' • Ativa' : ''}
            </div>

            <strong class="gear-item-name">
              ${formatGearName(item)}
              ${infoIcon(tooltip)}
            </strong>

            <div class="gear-item-meta">
              Nv. ${item.level} • ${rarity.name}
            </div>
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
        upgradeButton.disabled = gameState.player.coins < cost;
        upgradeButton.addEventListener('click', () => upgradeEquippedGear(slot));

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

function renderShop() {
  elements.shopItemsContainer.innerHTML = '';

  if (!gameState.shop.active || !gameState.shop.items.length) {
    elements.shopItemsContainer.innerHTML = '<div class="empty-state">Nenhuma loja aberta no momento.</div>';
    if (!gameState.shop.active) elements.shopStatus.textContent = 'Nenhuma loja';
    return;
  }

  elements.shopStatus.textContent = 'Loja aberta';

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

      <button type="button" data-buy="${item.id}">${item.cost} moedas</button>
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
  elements.inventoryCount.textContent = `${totalItems} itens`;

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
        <button type="button" data-use="${item.id}">Usar</button>
      </div>
    `;

    const button = row.querySelector('[data-use]');
    button.addEventListener('click', () => useConsumable(item.id));
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

  elements.inventoryItemsContainer.innerHTML = `
    <div class="empty-state gear-preview">
      <div>
        Você tem <strong>${totalGear}</strong> equipamentos guardados.
        Abra a mochila para ver a lista completa sem expandir a página.
      </div>
      <button type="button" id="open-gear-modal-button">Abrir equipamentos</button>
    </div>
  `;

  if (equippedItems.length) {
    equippedItems.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'inventory-item';
      row.innerHTML = `
        <div>
          <strong class="item-name-line">
            ${formatGearName(item)}
            ${infoIcon(getGearTooltip(item))}
          </strong>
          <p>Equipado • ${gearSlots[item.slot]} • Nv. ${item.level} • ${formatStats(item.stats)}</p>
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

function renderGearModal() {
  elements.gearModalList.innerHTML = '';
  if (elements.sellUnequippedGearButton) {
    elements.sellUnequippedGearButton.disabled = getUnequippedGearItems().length === 0;
  }

  if (!gameState.inventory.gear.length) {
    elements.gearModalList.innerHTML = '<div class="empty-state">Nenhum equipamento encontrado ainda.</div>';
    return;
  }

  gameState.inventory.gear.forEach((item) => {
    const rarity = getRarityById(item.rarity);
    const equipped = gameState.equipment[item.slot]?.uid === item.uid;
    const row = document.createElement('div');

    row.className = 'inventory-item';
    row.dataset.rarity = rarity.id;

    row.innerHTML = `
      <div>
        <strong class="item-name-line">
          ${formatGearName(item)} ${equipped ? '✅' : ''}
          ${infoIcon(getGearTooltip(item))}
        </strong>
        <p>${gearSlots[item.slot]} • Nv. ${item.level} • ${formatStats(item.stats)}</p>
      </div>
      <div class="item-actions">
        <button type="button" data-equip="${item.uid}" ${equipped ? 'disabled' : ''}>Equipar</button>
        <button type="button" data-sell="${item.uid}" class="mini-button">Vender ${item.value}</button>
      </div>
    `;

    row.querySelector('[data-equip]').addEventListener('click', () => equipGear(item.uid));
    row.querySelector('[data-sell]').addEventListener('click', () => sellGear(item.uid));

    elements.gearModalList.appendChild(row);
  });
}

function updateTurnDisplay() {
  const current = gameState.currentTurn === 'monster' ? 'Monstro' : 'Jogador';
  const bossProgress = gameState.monster?.isBoss
    ? 'Boss em combate'
    : `Boss em ${getMonstersUntilMandatoryBoss()} inimigo(s)`;

  elements.turnDisplay.textContent = `🛡️ Turno: ${current}`;
  elements.autoStatus.textContent = `Auto: ${gameState.autoAttack ? 'ligado' : 'desligado'} • ${bossProgress}`;
}

function updateButtons() {
  const dead = gameState.player.hp <= 0;
  const busy = gameState.actionInProgress;
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

function pulseCombatCard(target, flashClass, duration = 720) {
  if (!target) return;

  target.classList.remove(
    'combat-card-action',
    'combat-card-cast',
    'combat-card-hit',
    'combat-card-dodge',
    'combat-card-critical',
    'combat-card-magic'
  );

  void target.offsetWidth;
  target.classList.add(flashClass);

  setTimeout(() => {
    target.classList.remove(flashClass);
  }, duration);
}

function showCombatIndicator(targetSide, resultType) {
  const target =
    targetSide === 'player'
      ? document.querySelector('.hero-card')
      : document.querySelector('.monster-card');

  if (!target) return;

  const icons = {
    playerHit: '⚔️',
    playerMiss: '💨',
    enemyHit: '💥',
    playerDodge: '💨',
    critical: '⚡',
  };

  const isDodge = resultType === 'playerMiss' || resultType === 'playerDodge';
  const isCritical = resultType === 'critical';

  const flashClass = isDodge
    ? 'combat-card-dodge'
    : isCritical
      ? 'combat-card-critical'
      : 'combat-card-hit';

  pulseCombatCard(target, flashClass, isCritical ? 820 : 720);

  target.querySelectorAll('.combat-indicator').forEach((indicator) => indicator.remove());

  document
    .querySelectorAll(`.combat-indicator-screen[data-target-side="${targetSide}"]`)
    .forEach((indicator) => indicator.remove());

  const center = getCombatTargetCenter(target);
  const indicator = document.createElement('div');

  indicator.className = `combat-indicator-screen ${resultType}`;
  indicator.dataset.targetSide = targetSide;
  indicator.style.setProperty('--combat-x', `${center.x}px`);
  indicator.style.setProperty('--combat-y', `${center.y}px`);
  indicator.textContent = icons[resultType] || '✦';

  document.body.appendChild(indicator);

  setTimeout(() => {
    indicator.remove();
  }, isCritical ? 820 : 720);
}

function dealDamage(attacker, defender, attackerLabel, defenderLabel, attackerSide = 'player', damageType = 'physical') {
  const defenderSide = attackerSide === 'player' ? 'monster' : 'player';
  // O card de quem lança a ação não anima aqui.
  // Apenas o card que recebe dano, magia, crítico ou esquiva reage visualmente.

  const precision = attacker.precision || 0;
  const dodgeChance = clamp((defender.agility || 0) * 0.9 - precision, 3, 28);
  const criticalChance = attacker.critChance ?? 8;

  if (randomBetween(1, 100) <= dodgeChance) {
    if (typeof showCombatIndicator === 'function') {
      if (attackerSide === 'player') {
        showCombatIndicator('monster', 'playerMiss');
      } else {
        showCombatIndicator('player', 'playerDodge');
      }
    }

    log(`${defenderLabel} esquivou do ataque de ${attackerLabel}.`, 'damage');

    return {
      damage: 0,
      dodged: true,
      critical: false,
      damageType,
    };
  }

  const variation = randomBetween(-3, 4);

  let basePower =
    damageType === 'magic'
      ? attacker.magic || attacker.attack || 1
      : attacker.attack || 1;

  if (attackerSide === 'player' && damageType === 'magic') {
    basePower = Math.round(basePower * getPlayerMagicDamageMultiplier());
  }

  let weaponDamageKey = damageType;

  if (attackerSide === 'player' && damageType === 'physical') {
    const activeSlot = gameState.player.activeWeaponSlot || 'physicalWeapon';
    const activeWeapon = gameState.equipment?.[activeSlot];
    const weaponName = activeWeapon?.name?.toLowerCase() || '';

    if (weaponName.includes('tridente')) {
      weaponDamageKey = 'trident';
    }
  }

  const resistance = getSafeResistanceMultiplier(
    defender,
    weaponDamageKey,
    damageType
  );

  let furyMultiplier = 1;

  if (attackerSide === 'player' && attacker.furyPower) {
    const hpPercent = gameState.player.hp / getPlayerMaxHp();

    if (hpPercent <= 0.35) {
      furyMultiplier += attacker.furyPower / 100;
    }

    if (hpPercent <= 0.18) {
      furyMultiplier += attacker.furyPower / 100;
    }
  }

  let bossDamageMultiplier = 1;

  if (attackerSide === 'player' && defender.isBoss) {
    bossDamageMultiplier += (getEquipmentBonus('bossDamagePercent') || 0) / 100;
  }

  const defenseReductionRate = attackerSide === 'monster' ? 0.42 : 0.65;
  const minimumDamageRate = attackerSide === 'monster' ? 0.18 : 0.07;

  const defenseReduction = (defender.defense || 0) * defenseReductionRate;

  const minimumDamage = Math.max(
    1,
    Math.round(basePower * minimumDamageRate)
  );

  const rawDamage = Math.max(
    minimumDamage,
    Math.round(
      (basePower - defenseReduction + variation) *
      resistance *
      furyMultiplier *
      bossDamageMultiplier
    )
  );

  const isCritical = randomBetween(1, 100) <= criticalChance;
  const damage = isCritical ? Math.round(rawDamage * 1.75) : rawDamage;

  let totalDamage = damage;

  defender.hp = Math.max(0, defender.hp - damage);

  const isPlayerMagicHit = attackerSide === 'player' && damageType === 'magic';

  if (isPlayerMagicHit) {
    const receiverCard = document.querySelector('.monster-card');
    const visualInfo = getSpellVisualInfo();

    receiverCard?.style.setProperty('--spell-color', visualInfo.color);
    receiverCard?.style.setProperty('--spell-color-soft', visualInfo.softColor);

    if (typeof pulseCombatCard === 'function') {
      pulseCombatCard(receiverCard, 'combat-card-magic', 820);
    }

    showSpellImpact(damage);
  }

  // Quando a magia acerta, a animação dela já é o feedback visual.
  // Não mostramos o emoji genérico de ataque/crítico para não duplicar ícones no card.
  if (!isPlayerMagicHit && typeof showCombatIndicator === 'function') {
    if (isCritical) {
      showCombatIndicator(defenderSide, 'critical');
    } else {
      showCombatIndicator(
        defenderSide,
        attackerSide === 'player' ? 'playerHit' : 'enemyHit'
      );
    }
  }

  const damageLabel = damageType === 'magic' ? 'dano mágico' : 'dano físico';

  if (isCritical) {
    log(`CRÍTICO! ${attackerLabel} causou ${damage} de ${damageLabel} em ${defenderLabel}.`, 'damage', true);
  } else {
    log(`${attackerLabel} causou ${damage} de ${damageLabel} em ${defenderLabel}.`, 'damage');
  }

  if (
    attackerSide === 'player' &&
    damageType === 'magic' &&
    attacker.magicEchoChance &&
    defender.hp > 0
  ) {
    if (randomBetween(1, 100) <= attacker.magicEchoChance) {
      const echoPercent = attacker.magicEchoDamagePercent || 15;
      const echoDamage = Math.max(1, Math.round(damage * (echoPercent / 100)));

      defender.hp = Math.max(0, defender.hp - echoDamage);
      totalDamage += echoDamage;

      log(`Eco Arcano: o dano mágico ecoou e causou mais ${echoDamage} de dano.`, 'damage', true);
    }
  }

  if (attackerSide === 'player' && attacker.lifeStealChance) {
    if (randomBetween(1, 100) <= attacker.lifeStealChance) {
      const stealPercent = attacker.lifeStealAmountPercent || 8;
      const healed = Math.max(1, Math.round(totalDamage * (stealPercent / 100)));

      gameState.player.hp = Math.min(getPlayerMaxHp(), gameState.player.hp + healed);

      log(`Roubo de vida: você recuperou ${healed} HP.`, 'reward');
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

    lifeStealChance: getEquipmentBonus('lifeStealChance'),
    lifeStealAmountPercent: getEquipmentBonus('lifeStealAmountPercent'),

    furyPower: getEquipmentBonus('furyPower'),

    magicEchoChance: getEquipmentBonus('magicEchoChance'),
    magicEchoDamagePercent: getEquipmentBonus('magicEchoDamagePercent'),
  };
}

function startTurn() {
  if (gameState.actionInProgress || !gameState.monster || gameState.player.hp <= 0) return;

  gameState.actionInProgress = true;
  const monster = gameState.monster;
  const playerCombat = getPlayerCombatStats();
  if (monster.isBoss) {
    const bossMultiplier = getTotalBossDamageMultiplier();

    playerCombat.attack = Math.round(playerCombat.attack * bossMultiplier);
    playerCombat.magic = Math.round(playerCombat.magic * bossMultiplier);
  }
  const monsterCombat = {
    hp: monster.hp,
    attack: monster.attack,
    defense: monster.defense,
    agility: monster.agility,
    critChance: monster.isBoss ? 13 : 8,
  };

  const playerFirst = getPlayerAgility() >= monster.agility;
  const order = playerFirst ? ['player', 'monster'] : ['monster', 'player'];

  executeTurnOrder(order, playerCombat, monsterCombat);
}

function executeTurnOrder(order, playerCombat, monsterCombat) {
  const actor = order.shift();

  if (!actor) {
    gameState.currentTurn = 'player';
    gameState.actionInProgress = false;
    updateStats();
    return;
  }

  gameState.currentTurn = actor;
  updateTurnDisplay();
  updateStats();

  const actionDelay =
    actor === 'monster'
      ? gameConfig.enemyTurnDelay
      : gameConfig.turnDelay;

  setTimeout(() => {
    if (!gameState.monster || gameState.player.hp <= 0) {
      gameState.actionInProgress = false;
      updateStats();
      return;
    }

    if (actor === 'player') {
      playerCombat.hp = gameState.player.hp;
      monsterCombat.hp = gameState.monster.hp;

      const useMagic = canUseEquippedSpell() && randomBetween(1, 100) <= getPlayerMagicChance();

      dealDamage(
        playerCombat,
        gameState.monster,
        'Você',
        gameState.monster.name,
        'player',
        useMagic ? 'magic' : 'physical'
      );
    } else if (gameState.monster.hp > 0) {
      monsterCombat.hp = gameState.monster.hp;

      const result = dealDamage(
        monsterCombat,
        gameState.player,
        gameState.monster.name,
        'você',
        'monster',
        'physical'
      );

      if (result.damage > 0) {
        normalizePlayerHp();
        autoUseEmergencyHealing();
      }
    }

    updateStats();

    if (checkBattleEnd()) {
      gameState.actionInProgress = false;
      updateStats();
      return;
    }

    setTimeout(
      () => executeTurnOrder(order, playerCombat, monsterCombat),
      gameConfig.afterTurnDelay
    );
  }, actionDelay);
}

function checkBattleEnd() {
  const player = gameState.player;
  const monster = gameState.monster;

  if (!monster) return false;

  if (monster.hp <= 0) {
    winBattle(monster);
    return true;
  }

  if (player.hp <= 0) {
    stopAutoAttack();
    log('Você foi derrotado. Clique em Continuar para recuperar a vida e tentar de novo.', 'system', true);
    return true;
  }

  return false;
}

function winBattle(monster) {
  const player = gameState.player;

  const xpGained = getXpReward(monster.xpReward);
  const coinsGained = getCoinReward(monster.coinReward);

  player.coins += coinsGained;
  player.victories += 1;

  let triedToAdvanceStage = false;
  let didAdvanceStage = false;
  let stagesAdvanced = 0;

  if (monster.isBoss) {
    player.bossesDefeated += 1;
    player.monstersSinceBoss = 0;

    const stageBeforeBoss = player.stage;
    const stageGain = getBossStageAdvanceAmount();

    triedToAdvanceStage = true;
    didAdvanceStage = advanceStage(stageGain);
    stagesAdvanced = Math.max(0, player.stage - stageBeforeBoss);

    if (didAdvanceStage && stagesAdvanced > 1) {
      log(
        `Ritmo de prestígio: você avançou ${stagesAdvanced} andares de uma vez, se aproximando do seu recorde anterior.`,
        'system-important',
        true
      );
    }
  } else {
    player.monstersSinceBoss = getMonstersSinceLastBoss() + 1;
  }

  if (triedToAdvanceStage && !didAdvanceStage) {
    log(
      'Você atingiu o limite atual da masmorra. Suba o nível do herói, derrote mais bosses ou faça prestígio para liberar andares mais altos.',
      'system',
      true
    );
  }

  log(`Você derrotou ${monster.name}: +${xpGained} XP e +${coinsGained} moedas.`, 'reward', true);
  gainXp(monster.xpReward);

  const normalDropChance = clamp(
    28 + Math.min(18, player.stage * 2) + getTotalDropBonus(),
    5,
    80
  );

  const dropChance = monster.isBoss ? 100 : normalDropChance;

  if (randomBetween(1, 100) <= dropChance) {
    addGear(createGear(monster.level, monster.isBoss));
  }

  maybeDropConsumable(monster);

  tickShopDurationAfterBattle();
  maybeOpenShop(monster.isBoss);

  if (typeof tickBattleBuffs === 'function') {
    tickBattleBuffs();
  }

  gameState.monster = createNextEncounter();
  gameState.currentTurn = 'player';

  if (gameState.monster.mandatoryBoss) {
    log(
      `Boss obrigatório apareceu: ${gameState.monster.name}! Derrote-o para avançar na masmorra.`,
      'boss',
      true
    );
  }
}

function tickBattleBuffs() {
  const buffs = gameState.player.buffs;
  if (!buffs) return;

  Object.keys(buffs).forEach((buff) => {
    if (buffs[buff] > 0) {
      buffs[buff] -= 1;
    }
  });
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
  if (currentStage <= 1) return 1;

  const checkpointInterval = 10;

  return Math.max(
    1,
    Math.floor((currentStage - 1) / checkpointInterval) * checkpointInterval
  );
}

function continueAfterDeath() {
  const player = gameState.player;

  if (player.hp > 0) return;

  const previousStage = player.stage;
  const checkpointStage = getDeathCheckpointStage(previousStage);

  player.stage = checkpointStage;
  player.hp = getPlayerMaxHp();

  gameState.monster = createNextEncounter();
  gameState.currentTurn = 'player';
  gameState.actionInProgress = false;

  if (checkpointStage < previousStage) {
    log(
      `Você caiu na dungeon e voltou do Andar ${previousStage} para o checkpoint do Andar ${checkpointStage}. Os inimigos ficaram mais fracos.`,
      'death',
      true
    );
  } else {
    log(
      `Você caiu na dungeon, mas já estava no primeiro checkpoint. Vida recuperada para tentar novamente.`,
      'death',
      true
    );
  }

  updateStats();
}

function buyShopItem(itemId) {
  hideFloatingTooltip();

  const item = gameState.shop.items.find((entry) => entry.id === itemId);
  if (!item) return;

  if (gameState.player.coins < item.cost) {
    log('Moedas insuficientes para comprar este item.', 'shop');
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

function useConsumable(itemId) {
  const item = shopCatalog.find((catalogItem) => catalogItem.id === itemId);
  if (!item) return;

  const maxHp = getPlayerMaxHp();

  if (item.type === 'heal') {
    if (gameState.player.hp >= maxHp) {
      log('Sua vida já está cheia.', 'shop');
      return;
    }

    const healed = getHealingAmount(item);

    gameState.player.hp += healed;
    removeConsumable(itemId);

    log(`Você usou ${item.name} e recuperou ${healed} HP.`, 'shop', true);
  }

  if (item.type === 'fullHeal') {
    if (gameState.player.hp >= maxHp) {
      log('Sua vida já está cheia.', 'shop');
      return;
    }

    gameState.player.hp = maxHp;
    removeConsumable(itemId);

    log(`Você usou ${item.name} e restaurou toda a vida.`, 'shop', true);
  }

  if (item.type === 'skillPoint') {
    gameState.player.skillPoints += 1;
    removeConsumable(itemId);

    log(`Você leu ${item.name} e ganhou 1 ponto de habilidade.`, 'shop', true);
  }

  if (item.type === 'buff') {
    gameState.player.buffs[item.buff] = Math.max(
      gameState.player.buffs[item.buff] || 0,
      item.duration || 3
    );

    removeConsumable(itemId);

    log(`${item.name} ativada por ${item.duration} lutas.`, 'shop', true);
  }

  if (item.type === 'damageMonster') {
    if (!gameState.monster || gameState.monster.hp <= 0) {
      log('Não há monstro para usar este item agora.', 'shop', true);
      return;
    }

    const percentDamage = Math.round(gameState.monster.maxHp * (item.damagePercent || 0.25));
    const powerDamage = Math.round(getPlayerPower() * (item.powerMultiplier || 1.25));
    const damage = Math.max(1, Math.min(percentDamage, powerDamage));

    gameState.monster.hp = Math.max(0, gameState.monster.hp - damage);
    removeConsumable(itemId);

    if (typeof showCombatIndicator === 'function') {
      showCombatIndicator('monster', 'playerHit');
    }

    log(`${item.name} causou ${damage} de dano em ${gameState.monster.name}.`, 'damage', true);

    if (checkBattleEnd()) {
      updateStats();
      return;
    }
  }

  if (item.type === 'specialBoss') {
    if (gameState.actionInProgress || gameState.player.hp <= 0) {
      log('Você não pode invocar um boss especial agora.', 'shop', true);
      return;
    }

    gameState.monster = createMonster(true, true);
    gameState.currentTurn = 'player';
    removeConsumable(itemId);

    log(`Boss especial invocado: ${gameState.monster.name}!`, 'boss', true);
  }

  updateStats();
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
    `Vender ${totalItems} equipamento(s) não equipado(s) por ${totalValue} moedas?`
  );

  if (!confirmSell) return;

  const equippedUids = getEquippedGearUids();

  gameState.inventory.gear = gameState.inventory.gear.filter((item) =>
    equippedUids.has(item.uid)
  );

  gameState.player.coins += totalValue;

  log(
    `Venda automática: ${totalItems} equipamento(s) vendidos por ${totalValue} moedas.`,
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
  log(`Você vendeu ${formatGearName(item)} por ${item.value} moedas.`, 'shop', true);
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
    `Habilidade: ${amount} ponto(s) gastos em ${meta.label}, concedendo +${gain}${meta.suffix}.`,
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

function openPrestigeModal() {
  renderPrestigeModal();
  elements.prestigeModal.hidden = false;
}

function closePrestigeModal() {
  elements.prestigeModal.hidden = true;
}

function renderPrestigeModal() {
  const reward = calculatePrestigeReward();
  const prestige = gameState.prestige;
  const nextTitle = getPrestigeTitle(prestige.count + 1);

  elements.confirmPrestigeButton.disabled = !reward.canPrestige;

  elements.prestigeSummary.innerHTML = `
    ${reward.canPrestige
      ? ''
      : '<div class="prestige-warning">Prestígio liberado apenas a partir do Andar 10.</div>'
    }

    <div class="prestige-card">
      <strong>Título atual</strong>
      <span>${getPrestigeTitle(prestige.count)}</span>
    </div>

    <div class="prestige-card">
      <strong>Próximo título</strong>
      <span>${nextTitle}</span>
    </div>

    <div class="prestige-card">
      <strong>Essências ganhas</strong>
      <span>+${reward.points} essências</span>
    </div>

    <div class="prestige-card">
      <strong>Pontos de habilidade iniciais</strong>
      <span>+${reward.skillPointsReward} pontos</span>
    </div>

    <div class="prestige-card">
      <strong>Andar alcançado</strong>
      <span>Andar ${reward.stage}</span>
    </div>

    <div class="prestige-card">
      <strong>Bosses derrotados</strong>
      <span>${reward.bosses} bosses</span>
    </div>

    <div class="prestige-card">
      <strong>Bônus por bosses</strong>
      <span>${reward.bossMilestones} marco(s) de 10 bosses</span>
    </div>

    <div class="prestige-card">
      <strong>XP permanente</strong>
      <span>${formatBonusPercent(reward.xpBonus)}</span>
    </div>

    <div class="prestige-card">
      <strong>Moedas permanentes</strong>
      <span>${formatBonusPercent(reward.coinBonus)}</span>
    </div>

    <div class="prestige-card">
      <strong>Chance de drop</strong>
      <span>${formatFlatPercent(reward.dropBonus)}</span>
    </div>

    <div class="prestige-card">
      <strong>Épico/Lendário</strong>
      <span>${formatFlatPercent(reward.epicLegendaryBonus)}</span>
    </div>

    <div class="prestige-card">
      <strong>Dano contra boss</strong>
      <span>${formatBonusPercent(reward.bossDamageBonus)}</span>
    </div>

    <div class="prestige-card">
      <strong>Progresso offline</strong>
      <span>${formatBonusPercent(reward.offlineBonus)}</span>
    </div>
  `;

  renderRelicList();
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

  stopAutoAttack();

  Object.assign(gameState, structuredCloneSafe(initialState));

  gameState.prestige = preservedPrestige;
  gameState.monster = createNextEncounter();
  gameState.currentTurn = 'player';
  gameState.activeInventoryTab = 'items';

  gameState.player.skillPoints = startSkillPoints;

  addStarterItemsIfNeeded(false);

  saveGame();
}

function findNextMonster() {
  if (gameState.player.hp <= 0 || gameState.actionInProgress) return;

  gameState.monster = createNextEncounter();
  gameState.currentTurn = 'player';

  if (gameState.shop.active && gameState.shop.items.length) {
    updateShopMessage(gameState.monster.mandatoryBoss ? 'Loja ainda aberta durante o boss obrigatório' : 'Loja ainda aberta');
  } else if (gameState.monster.mandatoryBoss) {
    elements.shopMessage.textContent = 'Boss obrigatório em combate. Vença para avançar na masmorra.';
  } else {
    elements.shopMessage.textContent = 'Derrote monstros para encontrar uma loja aleatória.';
  }

  if (gameState.monster.mandatoryBoss) {
    log(`Boss obrigatório encontrado: ${gameState.monster.name}!`, 'boss', true);
  } else {
    log(`Você encontrou ${gameState.monster.name}.`, 'system', true);
  }

  updateStats();
}

function summonBoss() {
  if (gameState.player.victories < 5 || gameState.actionInProgress || gameState.player.hp <= 0) return;

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

function ensureFloatingTooltip() {
  let tooltip = document.getElementById('floating-item-tooltip');

  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'floating-item-tooltip';
    document.body.appendChild(tooltip);
  }

  return tooltip;
}

function showFloatingTooltip(text, event) {
  if (!text) return;

  const tooltip = ensureFloatingTooltip();
  tooltip.textContent = text;
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

  tooltip.classList.remove('visible');
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
  elements.closePrestigeModalButton.addEventListener('click', closePrestigeModal);
  elements.confirmPrestigeButton.addEventListener('click', confirmPrestige);

  elements.prestigeModal.addEventListener('click', (event) => {
    if (event.target === elements.prestigeModal) {
      closePrestigeModal();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !elements.prestigeModal.hidden) {
      closePrestigeModal();
    }
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

  window.addEventListener('beforeunload', saveGame);

  window.addEventListener('pagehide', saveGame);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      saveGame();
      return;
    }

    resumeOfflineProgressIfNeeded();
  });

  document.addEventListener('pointerover', (event) => {
    const item = event.target.closest('.inventory-item[data-tooltip], .shop-item[data-tooltip]');
    if (!item) return;

    showFloatingTooltip(item.dataset.tooltip, event);
  });

  document.addEventListener('pointermove', (event) => {
    moveFloatingTooltip(event);
  });

  document.addEventListener('pointerout', (event) => {
    const item = event.target.closest('.inventory-item[data-tooltip], .shop-item[data-tooltip]');
    if (!item) return;

    hideFloatingTooltip();
  });

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
  if (!gameState.monster) {
    gameState.monster = createNextEncounter();
  }

  gameState.autoAttack = false;
  gameState.autoInterval = null;
  gameState.actionInProgress = false;
  gameState.player.magic ??= 14;
  gameState.player.magicChance ??= 18;
  gameState.player.activeWeaponSlot ??= 'physicalWeapon';
  gameState.player.buffs ??= { fury: 0, stone: 0, wind: 0, arcane: 0 };
  gameState.player.buffs.arcane ??= 0;

  addStarterItemsIfNeeded(loaded);
  updateStats();

  if (!loaded) {
    log('Bem-vindo! Derrote monstros para ganhar XP, moedas e equipamentos.', 'system', true);
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
