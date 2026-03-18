export interface FrameColor {
  id: string;
  name: string;
  label: string;
  hex: string;
  filter: string;
}

export interface WheelStyle {
  id: string;
  name: string;
}

export interface BatteryPack {
  id: string;
  name: string;
  specs: string;
  priceDelta: number;
}

export const BASE_PRICE = 3299;

export const FRAME_COLORS: FrameColor[] = [
  { id: 'stealth', name: 'Stealth', label: 'STEALTH', hex: '#1a1a1a', filter: 'brightness(0.8) contrast(1.2)' },
  { id: 'arctic', name: 'Arctic', label: 'ARCTIC', hex: '#f0f0f0', filter: 'brightness(1.1) saturate(0.2)' },
  { id: 'fire', name: 'Fire', label: 'FIRE', hex: '#E8450A', filter: 'hue-rotate(0deg) saturate(1.5)' },
  { id: 'carbon', name: 'Carbon', label: 'CARBON', hex: '#4a4a4a', filter: 'brightness(0.9) saturate(0.3)' }
];

export const WHEEL_STYLES: WheelStyle[] = [
  { id: 'spoke', name: 'SPOKE' },
  { id: 'aero', name: 'AERO' },
  { id: 'carbon', name: 'CARBON' }
];

export const BATTERY_PACKS: BatteryPack[] = [
  { 
    id: 'standard', 
    name: 'Standard', 
    specs: '280km Range · 4.2kg · Included', 
    priceDelta: 0 
  },
  { 
    id: 'extended', 
    name: 'Extended', 
    specs: '+60km · +0.8kg · +$299', 
    priceDelta: 299 
  },
  { 
    id: 'ultra', 
    name: 'Ultra', 
    specs: '+120km · +1.6kg · +$599', 
    priceDelta: 599 
  }
];
