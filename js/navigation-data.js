/**
 * navigation-data.js
 * Single Source of Truth for Appliance Categories, Brands, and Cross-Linked Landing Pages
 */

export const APPLIANCE_CATEGORIES = [
  {
    id: 'washing-machines',
    name: 'صيانة الغسالات',
    nameEn: 'Washing Machines',
    icon: '🫧',
    slug: 'washing-machines',
    generalUrl: 'service-washing-machines.html',
    description: 'صيانة متخصصة لغسالات الملابس الأوتوماتيك وفوق أوتوماتيك وتحميل أمامي.',
    supportedBrandIds: ['lg', 'samsung', 'zanussi', 'kiriazi', 'fresh', 'ariston', 'white-point', 'universal']
  },
  {
    id: 'refrigerators',
    name: 'أجهزة التبريد والتجميد',
    nameEn: 'Refrigerators & Freezers',
    icon: '❄️',
    slug: 'refrigerators',
    generalUrl: 'service-refrigerators.html',
    description: 'شحن فريون، استبدال الثرموستات، صيانة الموتور، وإصلاح تسريب الغاز.',
    supportedBrandIds: ['lg', 'samsung', 'kiriazi', 'fresh', 'zanussi', 'ariston', 'white-point', 'coldair']
  },
  {
    id: 'ovens-cookers',
    name: 'معدات الطهي والأفران والبوتاجازات',
    nameEn: 'Stoves & Ovens',
    icon: '🔥',
    slug: 'ovens-cookers',
    generalUrl: 'service-ovens.html',
    description: 'تسليك الشعلات، تغيير الفواني، صيانة صمامات الأمان، وإصلاح زجاج الأفران.',
    supportedBrandIds: ['fresh', 'universal', 'kiriazi', 'zanussi', 'ariston']
  },
  {
    id: 'dishwashers',
    name: 'غسالات الأطباق',
    nameEn: 'Dishwashers',
    icon: '🍽️',
    slug: 'dishwashers',
    generalUrl: 'service-dishwashers.html',
    description: 'إصلاح أعطال سحب وطرد المياه، مضخات التسخين، وتغيير الرشاشات.',
    supportedBrandIds: ['lg', 'samsung', 'zanussi', 'ariston', 'fresh']
  },
  {
    id: 'dryers',
    name: 'المجففات والنشافات',
    nameEn: 'Dryers',
    icon: '👕',
    slug: 'dryers',
    generalUrl: 'service-dryers.html',
    description: 'استبدال السير، تنظيف مداخن الهواء، وإصلاح أعطال الحرارة والتجفيف.',
    supportedBrandIds: ['lg', 'samsung', 'zanussi', 'ariston']
  },
  {
    id: 'ac',
    name: 'التكييفات وأجهزة التبريد الهوائي',
    nameEn: 'Air Conditioners',
    icon: '💨',
    slug: 'air-conditioners',
    generalUrl: 'service-ac.html',
    description: 'صيانة دورية، تنظيف الفلاتر، شحن الفريون، وعلاج تسريب المياه.',
    supportedBrandIds: ['fresh', 'lg', 'samsung']
  }
];

export const BRANDS = [
  {
    id: 'fresh',
    nameAr: 'فريش',
    nameEn: 'Fresh',
    slug: 'fresh',
    badge: 'صناعة مصرية رائدة',
    logo: 'assets/images/brands/fresh-logo.png',
    hubUrl: 'brand-fresh.html',
    tagline: 'مراكز صيانة فريش المعتمدة للأجهزة المنزلية بقطع غيار أصلية 100%',
    supportedApplianceIds: ['washing-machines', 'refrigerators', 'ovens-cookers', 'dishwashers', 'ac']
  },
  {
    id: 'lg',
    nameAr: 'إل جي',
    nameEn: 'LG',
    slug: 'lg',
    badge: 'تكنولوجيا كورية',
    logo: 'assets/images/brands/lg-logo.png',
    hubUrl: 'brand-lg.html',
    tagline: 'صيانة معتمدة لغسالات وثلاجات ومكيفات إل جي الذكية ومحركات Direct Drive',
    supportedApplianceIds: ['washing-machines', 'refrigerators', 'dishwashers', 'dryers', 'ac']
  },
  {
    id: 'zanussi',
    nameAr: 'زانوسي',
    nameEn: 'Zanussi',
    slug: 'zanussi',
    badge: 'جودة إيطالية عريقة',
    logo: 'assets/images/brands/zanussi-logo.png',
    hubUrl: 'brand-zanussi.html',
    tagline: 'صيانة زانوسي المتخصصة للغسالات والأفران وغسالات الأطباق',
    supportedApplianceIds: ['washing-machines', 'refrigerators', 'ovens-cookers', 'dishwashers', 'dryers']
  },
  {
    id: 'samsung',
    nameAr: 'سامسونج',
    nameEn: 'Samsung',
    slug: 'samsung',
    badge: 'تقنيات Digital Inverter',
    logo: 'assets/images/brands/samsung-logo.png',
    hubUrl: 'brand-samsung.html',
    tagline: 'مركز فحص وإصلاح أجهزة سامسونج الحديثة وكروت التحكم الإلكتروني',
    supportedApplianceIds: ['washing-machines', 'refrigerators', 'dishwashers', 'dryers', 'ac']
  },
  {
    id: 'kiriazi',
    nameAr: 'كريازي',
    nameEn: 'Kiriazi',
    slug: 'kiriazi',
    badge: 'الأكثر متانة',
    logo: 'assets/images/brands/kiriazi-logo.png',
    hubUrl: 'brand-kiriazi.html',
    tagline: 'خدمة صيانة ثلاجات وديب فريزر وغسالات وبوتاجازات كريازي المعتمدة',
    supportedApplianceIds: ['refrigerators', 'washing-machines', 'ovens-cookers']
  },
  {
    id: 'ariston',
    nameAr: 'أريستون',
    nameEn: 'Ariston',
    slug: 'ariston',
    badge: 'هندسة أوروبية',
    logo: 'assets/images/brands/ariston-logo.png',
    hubUrl: 'brand-ariston.html',
    tagline: 'صيانة متخصصة لأجهزة أريستون الإيطالية وغسالات الأطباق الحرارية',
    supportedApplianceIds: ['washing-machines', 'dishwashers', 'ovens-cookers', 'dryers', 'refrigerators']
  },
  {
    id: 'white-point',
    nameAr: 'وايت بوينت',
    nameEn: 'White Point',
    slug: 'white-point',
    badge: 'تقنية العبد',
    logo: 'assets/images/brands/white-point-logo.png',
    hubUrl: 'brand-white-point.html',
    tagline: 'صيانة غسالات وثلاجات وايت بوينت بضمان معتمد واستجابة فورية',
    supportedApplianceIds: ['washing-machines', 'refrigerators']
  },
  {
    id: 'universal',
    nameAr: 'يونيفرسال',
    nameEn: 'Universal',
    slug: 'universal',
    badge: 'ريادة الأفران والبوتاجازات',
    logo: 'assets/images/brands/universal-logo.png',
    hubUrl: 'brand-universal.html',
    tagline: 'خدمة صيانة بوتاجازات وسخانات وغسالات يونيفرسال المنزلية',
    supportedApplianceIds: ['ovens-cookers', 'washing-machines']
  },
  {
    id: 'coldair',
    nameAr: 'كولدير',
    nameEn: 'Coldair',
    slug: 'coldair',
    badge: 'خط ساخن مخصص: 01278844434',
    phone: '01278844434',
    phoneTel: '+201278844434',
    whatsapp: 'https://wa.me/201278844434',
    logo: 'assets/images/brands/coldair-logo.png',
    hubUrl: 'service-coldair.html',
    tagline: 'صيانة كولدير المعتمدة لمبردات وموزعات المياه والثلاجات والديب فريزر',
    supportedApplianceIds: ['refrigerators']
  }
];

export function getServiceLandingUrl(categoryId, brandId) {
  const routeMap = {
    'washing-machines:lg': 'service-washing-machine-lg.html',
    'washing-machines:samsung': 'service-washing-machine-samsung.html',
    'washing-machines:zanussi': 'service-washing-machine-zanussi.html',
    'washing-machines:kiriazi': 'service-washing-machine-kiriazi.html',
    'washing-machines:fresh': 'service-washing-machine-fresh.html',
    'washing-machines:universal': 'service-washing-machine-universal.html',
    'washing-machines:white-point': 'service-washing-machine-white-point.html',
    'washing-machines:ariston': 'service-washing-machine-ariston.html',
    
    'refrigerators:coldair': 'service-coldair.html',
    'refrigerators:lg': 'service-refrigerators.html#lg',
    'refrigerators:samsung': 'service-refrigerators.html#samsung',
    'refrigerators:fresh': 'service-refrigerators.html#fresh',
    'refrigerators:kiriazi': 'service-refrigerators.html#kiriazi',
    
    'ovens-cookers:fresh': 'service-ovens.html#fresh',
    'ovens-cookers:universal': 'service-ovens.html#universal',
    'ovens-cookers:zanussi': 'service-ovens.html#zanussi',
    
    'dishwashers:lg': 'service-dishwashers.html#lg',
    'dishwashers:ariston': 'service-dishwashers.html#ariston',
    'dishwashers:zanussi': 'service-dishwashers.html#zanussi',
    
    'dryers:lg': 'service-dryers.html#lg',
    'dryers:zanussi': 'service-dryers.html#zanussi',
    
    'ac:fresh': 'service-ac.html#fresh',
    'ac:lg': 'service-ac.html#lg'
  };

  const key = `${categoryId}:${brandId}`;
  return routeMap[key] || `services/${categoryId}/${brandId}.html`;
}
