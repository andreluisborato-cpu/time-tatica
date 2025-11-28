
export enum Position {
  GK = 'Goleiro',
  ZAG = 'Zagueiro',
  LE = 'Lateral Esq.',
  LD = 'Lateral Dir.',
  VOL = 'Volante',
  MEI = 'Meia',
  ME = 'Meia Esq.',
  MD = 'Meia Dir.',
  PE = 'Ponta Esq.',
  PD = 'Ponta Dir.',
  ATA = 'Atacante',
  SA = 'Segundo Atacante',
  ALA = 'Ala',
  FIX = 'Fixo',
  PIV = 'Pivô'
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string; // Changed to string to allow flexibility, but we typcially use Position values
  isStarter: boolean;
}

export interface TeamIdentity {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  jerseyUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

export interface TeamData {
  id: string;
  ownerEmail: string; // Simulated auth identifier
  readOnlyEmails: string[]; // List of emails that can view but not edit
  identity: TeamIdentity;
  players: Player[];
  formation: string; // e.g., "4-4-2"
  lineup: Record<string, string | null>; // Position index -> Player ID
  messages: ChatMessage[];
}

export const FORMATIONS: Record<string, { label: string; positions: { top: string; left: string; role: string }[] }> = {
  '4-4-2': {
    label: '4-4-2 Clássico',
    positions: [
      { top: '85%', left: '50%', role: 'GK' },
      { top: '65%', left: '20%', role: 'LE' },
      { top: '65%', left: '40%', role: 'ZAG' },
      { top: '65%', left: '60%', role: 'ZAG' },
      { top: '65%', left: '80%', role: 'LD' },
      { top: '40%', left: '20%', role: 'ME' },
      { top: '40%', left: '40%', role: 'VOL' },
      { top: '40%', left: '60%', role: 'VOL' },
      { top: '40%', left: '80%', role: 'MD' },
      { top: '15%', left: '35%', role: 'ATA' },
      { top: '15%', left: '65%', role: 'ATA' },
    ]
  },
  '4-3-3': {
    label: '4-3-3 Ofensivo',
    positions: [
      { top: '85%', left: '50%', role: 'GK' },
      { top: '70%', left: '20%', role: 'LE' },
      { top: '70%', left: '40%', role: 'ZAG' },
      { top: '70%', left: '60%', role: 'ZAG' },
      { top: '70%', left: '80%', role: 'LD' },
      { top: '45%', left: '30%', role: 'VOL' },
      { top: '40%', left: '50%', role: 'MEI' },
      { top: '45%', left: '70%', role: 'VOL' },
      { top: '15%', left: '20%', role: 'PE' },
      { top: '15%', left: '50%', role: 'ATA' },
      { top: '15%', left: '80%', role: 'PD' },
    ]
  },
  '4-3-3-false9': {
    label: '4-3-3 (Falso 9)',
    positions: [
      { top: '85%', left: '50%', role: 'GK' },
      { top: '70%', left: '20%', role: 'LE' },
      { top: '70%', left: '40%', role: 'ZAG' },
      { top: '70%', left: '60%', role: 'ZAG' },
      { top: '70%', left: '80%', role: 'LD' },
      { top: '45%', left: '30%', role: 'VOL' },
      { top: '45%', left: '50%', role: 'MEI' },
      { top: '45%', left: '70%', role: 'VOL' },
      { top: '15%', left: '20%', role: 'PE' },
      { top: '25%', left: '50%', role: 'SA' },
      { top: '15%', left: '80%', role: 'PD' },
    ]
  },
  '3-5-2': {
    label: '3-5-2 Controle',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '75%', left: '30%', role: 'ZAG' },
      { top: '75%', left: '50%', role: 'ZAG' },
      { top: '75%', left: '70%', role: 'ZAG' },
      { top: '50%', left: '15%', role: 'ALA' },
      { top: '50%', left: '35%', role: 'VOL' },
      { top: '55%', left: '50%', role: 'MEI' },
      { top: '50%', left: '65%', role: 'VOL' },
      { top: '50%', left: '85%', role: 'ALA' },
      { top: '20%', left: '40%', role: 'ATA' },
      { top: '20%', left: '60%', role: 'ATA' },
    ]
  },
  '3-4-3': {
    label: '3-4-3 Ataque Total',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '75%', left: '25%', role: 'ZAG' },
      { top: '75%', left: '50%', role: 'ZAG' },
      { top: '75%', left: '75%', role: 'ZAG' },
      { top: '50%', left: '20%', role: 'ME' },
      { top: '50%', left: '40%', role: 'VOL' },
      { top: '50%', left: '60%', role: 'VOL' },
      { top: '50%', left: '80%', role: 'MD' },
      { top: '20%', left: '20%', role: 'PE' },
      { top: '20%', left: '50%', role: 'ATA' },
      { top: '20%', left: '80%', role: 'PD' },
    ]
  },
  '4-2-3-1': {
    label: '4-2-3-1 Moderno',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '75%', left: '15%', role: 'LE' },
      { top: '75%', left: '38%', role: 'ZAG' },
      { top: '75%', left: '62%', role: 'ZAG' },
      { top: '75%', left: '85%', role: 'LD' },
      { top: '60%', left: '35%', role: 'VOL' },
      { top: '60%', left: '65%', role: 'VOL' },
      { top: '40%', left: '20%', role: 'ME' },
      { top: '40%', left: '50%', role: 'MEI' },
      { top: '40%', left: '80%', role: 'MD' },
      { top: '15%', left: '50%', role: 'ATA' },
    ]
  },
  '4-1-4-1': {
    label: '4-1-4-1 Equilíbrio',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '75%', left: '15%', role: 'LE' },
      { top: '75%', left: '38%', role: 'ZAG' },
      { top: '75%', left: '62%', role: 'ZAG' },
      { top: '75%', left: '85%', role: 'LD' },
      { top: '60%', left: '50%', role: 'VOL' },
      { top: '40%', left: '15%', role: 'ME' },
      { top: '40%', left: '38%', role: 'MEI' },
      { top: '40%', left: '62%', role: 'MEI' },
      { top: '40%', left: '85%', role: 'MD' },
      { top: '15%', left: '50%', role: 'ATA' },
    ]
  },
  '4-5-1': {
    label: '4-5-1 Defensivo',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '75%', left: '15%', role: 'LE' },
      { top: '75%', left: '38%', role: 'ZAG' },
      { top: '75%', left: '62%', role: 'ZAG' },
      { top: '75%', left: '85%', role: 'LD' },
      { top: '45%', left: '10%', role: 'ME' },
      { top: '45%', left: '30%', role: 'VOL' },
      { top: '45%', left: '50%', role: 'VOL' },
      { top: '45%', left: '70%', role: 'VOL' },
      { top: '45%', left: '90%', role: 'MD' },
      { top: '15%', left: '50%', role: 'ATA' },
    ]
  },
  '5-3-2': {
    label: '5-3-2 Sólido',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '70%', left: '10%', role: 'ALA' },
      { top: '70%', left: '30%', role: 'ZAG' },
      { top: '75%', left: '50%', role: 'ZAG' },
      { top: '70%', left: '70%', role: 'ZAG' },
      { top: '70%', left: '90%', role: 'ALA' },
      { top: '45%', left: '30%', role: 'VOL' },
      { top: '45%', left: '50%', role: 'MEI' },
      { top: '45%', left: '70%', role: 'VOL' },
      { top: '15%', left: '40%', role: 'ATA' },
      { top: '15%', left: '60%', role: 'ATA' },
    ]
  },
  '5-4-1': {
    label: '5-4-1 Retranca',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '75%', left: '10%', role: 'ALA' },
      { top: '75%', left: '30%', role: 'ZAG' },
      { top: '80%', left: '50%', role: 'ZAG' },
      { top: '75%', left: '70%', role: 'ZAG' },
      { top: '75%', left: '90%', role: 'ALA' },
      { top: '45%', left: '20%', role: 'ME' },
      { top: '45%', left: '40%', role: 'VOL' },
      { top: '45%', left: '60%', role: 'VOL' },
      { top: '45%', left: '80%', role: 'MD' },
      { top: '15%', left: '50%', role: 'ATA' },
    ]
  },
  '4-2-4': {
    label: '4-2-4 Pressão Alta',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '70%', left: '15%', role: 'LE' },
      { top: '70%', left: '38%', role: 'ZAG' },
      { top: '70%', left: '62%', role: 'ZAG' },
      { top: '70%', left: '85%', role: 'LD' },
      { top: '45%', left: '35%', role: 'VOL' },
      { top: '45%', left: '65%', role: 'MEI' },
      { top: '15%', left: '15%', role: 'PE' },
      { top: '15%', left: '38%', role: 'ATA' },
      { top: '15%', left: '62%', role: 'ATA' },
      { top: '15%', left: '85%', role: 'PD' },
    ]
  },
  '4-2-2-2': {
    label: '4-2-2-2 Quadrado',
    positions: [
      { top: '90%', left: '50%', role: 'GK' },
      { top: '75%', left: '15%', role: 'LE' },
      { top: '75%', left: '38%', role: 'ZAG' },
      { top: '75%', left: '62%', role: 'ZAG' },
      { top: '75%', left: '85%', role: 'LD' },
      { top: '55%', left: '35%', role: 'VOL' },
      { top: '55%', left: '65%', role: 'VOL' },
      { top: '35%', left: '20%', role: 'MEI' },
      { top: '35%', left: '80%', role: 'MEI' },
      { top: '15%', left: '40%', role: 'ATA' },
      { top: '15%', left: '60%', role: 'ATA' },
    ]
  },
  '7-society': {
    label: 'Society (3-2-1)',
    positions: [
        { top: '90%', left: '50%', role: 'GK' },
        { top: '65%', left: '30%', role: 'ZAG' },
        { top: '65%', left: '50%', role: 'ZAG' },
        { top: '65%', left: '70%', role: 'ZAG' },
        { top: '40%', left: '40%', role: 'MEI' },
        { top: '40%', left: '60%', role: 'MEI' },
        { top: '15%', left: '50%', role: 'ATA' },
    ]
  },
  '7-society-2-3-1': {
    label: 'Society (2-3-1)',
    positions: [
        { top: '90%', left: '50%', role: 'GK' },
        { top: '70%', left: '35%', role: 'ZAG' },
        { top: '70%', left: '65%', role: 'ZAG' },
        { top: '45%', left: '20%', role: 'ALA' },
        { top: '45%', left: '50%', role: 'MEI' },
        { top: '45%', left: '80%', role: 'ALA' },
        { top: '15%', left: '50%', role: 'ATA' },
    ]
  },
  'futsal-2-2': {
    label: 'Futsal (2-2 Quadrado)',
    positions: [
        { top: '90%', left: '50%', role: 'GK' },
        { top: '60%', left: '30%', role: 'FIX' },
        { top: '60%', left: '70%', role: 'FIX' },
        { top: '30%', left: '30%', role: 'PIV' },
        { top: '30%', left: '70%', role: 'PIV' },
    ]
  },
  'futsal-3-1': {
    label: 'Futsal (3-1 Diamante)',
    positions: [
        { top: '90%', left: '50%', role: 'GK' },
        { top: '65%', left: '50%', role: 'FIX' },
        { top: '45%', left: '20%', role: 'ALA' },
        { top: '45%', left: '80%', role: 'ALA' },
        { top: '20%', left: '50%', role: 'PIV' },
    ]
  }
};
