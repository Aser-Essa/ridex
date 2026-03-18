export interface RiderProfile {
  id: string;
  name: string;
  city: string;
  country: string;
  stat: string;
  image: string;
  aspectRatio: 'tall' | 'short'; // Added aspect ratio for masonry handling
}

export const RIDER_PROFILES: RiderProfile[] = [
  { 
    id: '1', 
    name: 'MARCUS T.', 
    city: 'Berlin', 
    country: 'DE', 
    stat: '12,400km ridden', 
    image: 'https://images.unsplash.com/photo-1558981420-c532902e58b4?w=800&q=80',
    aspectRatio: 'tall'
  },
  { 
    id: '2', 
    name: 'SARAH J.', 
    city: 'Amsterdam', 
    country: 'NL', 
    stat: 'Daily commuter', 
    image: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=800&q=80',
    aspectRatio: 'short'
  },
  { 
    id: '3', 
    name: 'DAVID K.', 
    city: 'Copenhagen', 
    country: 'DK', 
    stat: '8,200km ridden', 
    image: 'https://images.unsplash.com/photo-1520625340632-fb9f1b438515?w=800&q=80',
    aspectRatio: 'tall'
  },
  { 
    id: '4', 
    name: 'ELENA R.', 
    city: 'Barcelona', 
    country: 'ES', 
    stat: 'Weekend explorer', 
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800&q=80',
    aspectRatio: 'short'
  },
  { 
    id: '5', 
    name: 'THOMAS W.', 
    city: 'London', 
    country: 'UK', 
    stat: '15,000km ridden', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    aspectRatio: 'short'
  },
  { 
    id: '6', 
    name: 'MIA L.', 
    city: 'Oslo', 
    country: 'NO', 
    stat: 'All-weather rider', 
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    aspectRatio: 'tall'
  },
  { 
    id: '7', 
    name: 'JULIEN M.', 
    city: 'Paris', 
    country: 'FR', 
    stat: '9,500km ridden', 
    image: 'https://images.unsplash.com/photo-1517409228945-c49626eeb6f7?w=800&q=80',
    aspectRatio: 'short'
  },
  { 
    id: '8', 
    name: 'ANNA S.', 
    city: 'Stockholm', 
    country: 'SE', 
    stat: 'Daily commuter', 
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80',
    aspectRatio: 'tall'
  }
];
