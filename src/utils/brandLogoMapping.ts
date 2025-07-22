// Mapping of brand names to their logo files
export const getBrandLogo = (brandName: string): string | null => {
  const logoMapping: Record<string, string> = {
    'Philips': '/assets/images/brand-logos/philips.svg',
    'Apple': '/assets/images/brand-logos/apple.svg',
    'Samsung': '/assets/images/brand-logos/Samsung.png',
    'Sony': '/assets/images/brand-logos/Sony_logo.svg',
    'Garmin': '/assets/images/brand-logos/Garmin.png',
    'Nothing': '/assets/images/brand-logos/Nothing.png',
    'EMTOP': '/assets/images/brand-logos/emtop.svg',
    'MusicHall': '/assets/images/brand-logos/music_hall.svg',
    'ON': '/assets/images/brand-logos/onmusic_full_green.svg',
    'ON home': '/assets/images/brand-logos/on.png',
    'ON Kitchen': '/assets/images/brand-logos/on_kitchen.png',
    'Kyvol': '/assets/images/brand-logos/kyvol.png',
    'imiki': '/assets/images/brand-logos/imiki.png',
    'viwoods': '/assets/images/brand-logos/viwoods.png',
    'mi': '/assets/images/brand-logos/mi.png',
    'babyplus': '/assets/images/brand-logos/babyplus.png',
    'JBL': '/assets/images/brand-logos/jbl.svg.png',
    'Geepas': '/assets/images/brand-logos/geepas.svg',
    'Microsoft': '/assets/images/brand-logos/microsoft.svg',
    'Google': '/assets/images/brand-logos/google.svg',
    'Adobe': '/assets/images/brand-logos/adobe.svg',
    'Airbnb': '/assets/images/brand-logos/airbnb.svg',
    'Reddit': '/assets/images/brand-logos/reddit.svg',
    'Stripe': '/assets/images/brand-logos/stripe.svg',
  };

  // Try exact match first
  if (logoMapping[brandName]) {
    return logoMapping[brandName];
  }

  // Try case-insensitive match
  const normalizedBrandName = brandName.toLowerCase();
  for (const [key, value] of Object.entries(logoMapping)) {
    if (key.toLowerCase() === normalizedBrandName) {
      return value;
    }
  }

  // No logo found
  return null;
}; 