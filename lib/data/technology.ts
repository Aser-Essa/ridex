export interface TechPanel {
  id: string;
  label: string;
  heading: string;
  body: string;
  stat: string;
  statLabel: string;
}

export const TECH_PANELS: TechPanel[] = [
  {
    id: 'power',
    label: '01 / POWER',
    heading: 'LEARNS HOW YOU RIDE',
    body: 'Our AI battery management maps your terrain, speed patterns, and braking habits. Each charge cycle becomes more efficient than the last.',
    stat: '340KM',
    statLabel: 'max single charge range'
  },
  {
    id: 'structure',
    label: '02 / STRUCTURE',
    heading: 'T1000 CARBON FIBRE',
    body: 'The same carbon specification used in Formula 1 monocoques. Stronger than steel. Lighter than aluminium. Tested to 40,000 load cycles.',
    stat: '30%',
    statLabel: 'lighter than aluminium equivalent'
  },
  {
    id: 'recover',
    label: '03 / RECOVER',
    heading: 'EVERY STOP CHARGES',
    body: 'Kinetic energy recovery on every deceleration. On a typical urban commute, you recover enough energy to extend range by up to 15%.',
    stat: '15%',
    statLabel: 'average energy recovery per urban ride'
  },
  {
    id: 'connect',
    label: '04 / CONNECT',
    heading: 'YOUR BIKE KNOWS YOU',
    body: 'Real-time telemetry to your phone. Theft detection with GPS tracking. Over-the-air firmware updates. The bike improves while you sleep.',
    stat: '< 2s',
    statLabel: 'theft alert response time'
  }
];
