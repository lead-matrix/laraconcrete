import type {
  ConcreteService,
  ProjectShowcaseItem,
  FleetItem,
  MaterialItem,
  WarrantyRecord,
  SEOCityData,
  KnowledgeArticle,
  CustomerPortalProject,
  QuoteLead
} from '../types/concrete';

export const CONCRETE_SERVICES: ConcreteService[] = [
  {
    id: 'srv-1',
    title: 'Concrete Driveways',
    slug: 'concrete-driveways',
    category: 'residential',
    shortDesc: 'Heavy-duty rebar-reinforced poured concrete driveways built to withstand high loads & freeze-thaw cycles.',
    fullDesc: 'Lara Concrete LLC installs precision-engineered driveways built with 4,000+ PSI fiber-reinforced concrete, 1/2-inch rebar grids on 18-inch centers, and laser-guided pitch for flawless drainage.',
    iconName: 'Car',
    popular: true,
    basePricePerSqFt: 11.50,
    typicalThicknessInches: 5,
    rebarOptions: ['#4 Rebar @ 18" O.C.', '#4 Rebar @ 12" O.C.', 'Fiber Mesh + Rebar Hybrid'],
    finishTypes: ['Broom Finish', 'Stamped Border', 'Exposed Aggregate', 'Picture-Frame Border'],
    features: ['4000 PSI High Strength Mix', 'Expansion Joints every 10-12 ft', 'Heavy Vehicle Load Tolerant', '10-Year Structural Warranty'],
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-2',
    title: 'Patios & Outdoor Living',
    slug: 'patios-outdoor-living',
    category: 'residential',
    shortDesc: 'Custom architectural outdoor patios featuring stained, stamped, and hand-troweled decorative finishes.',
    fullDesc: 'Transform your backyard into a luxury oasis. Our patio installations feature integrated drainage, fire pit pads, hot tub reinforced slabs, and custom slate/wood-plank textures.',
    iconName: 'Sun',
    popular: true,
    basePricePerSqFt: 13.00,
    typicalThicknessInches: 4,
    rebarOptions: ['#3 Rebar @ 18" O.C.', 'Fiber Reinforcement Mesh'],
    finishTypes: ['Ashlar Slate Stamp', 'Wood Plank Stamp', 'Acid Stain Tint', 'Smooth Trowel'],
    features: ['UV Sealer Protection', 'Anti-Slip Texture Additives', 'Integrated Curve Layouts', 'Custom Border Colors'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-3',
    title: 'Sidewalks & Walkways',
    slug: 'sidewalks-walkways',
    category: 'residential',
    shortDesc: 'ADA compliant, non-slip concrete walkways designed for safety, accessibility, and curb appeal.',
    fullDesc: 'From front entryway paths to municipal walkways, Lara Concrete delivers clean, uniform expansion control jointing and smooth transitions.',
    iconName: 'Footprints',
    popular: false,
    basePricePerSqFt: 9.50,
    typicalThicknessInches: 4,
    rebarOptions: ['Fiber Mesh Reinforcement', '#3 Rebar Grid'],
    finishTypes: ['Standard Broom', 'Decorative Salt Finish', 'Stamped Perimeter'],
    features: ['ADA Ramp Compliant', 'Precision Slope for Runoff', 'Clean Saw-Cut Control Joints', 'Fast 48hr Cure Time'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-4',
    title: 'Foundations & Footings',
    slug: 'foundations-footings',
    category: 'structural',
    shortDesc: 'Monolithic slabs, stem walls, and deep continuous footings for residential additions & custom homes.',
    fullDesc: 'Engineered foundation pour with laser level precision. We handle soil compaction, moisture vapor barriers, anchor bolts, and steel rebar cages.',
    iconName: 'Building',
    popular: true,
    basePricePerSqFt: 16.00,
    typicalThicknessInches: 6,
    rebarOptions: ['#5 Rebar Cage Grid', 'Double Rebar Mat System'],
    finishTypes: ['Power Trowel Float', 'Screed Level'],
    features: ['Laser Screed Precision (1/16" Tolerance)', 'Vapor Barrier 15-mil Stego Wrap', 'Engineered Soil Compaction Inspection', 'Code Certified Anchoring'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-5',
    title: 'Garage Slabs & Shop Floors',
    slug: 'garage-slabs-shop-floors',
    category: 'structural',
    shortDesc: 'Heavy-duty 5000 PSI reinforced shop floors engineered for car lifts, heavy tools & oil spill protection.',
    fullDesc: 'High-density power-troweled garage slabs designed for vehicle storage, epoxy coating prep, and heavy impact resistance.',
    iconName: 'Warehouse',
    popular: false,
    basePricePerSqFt: 12.50,
    typicalThicknessInches: 5,
    rebarOptions: ['#4 Rebar @ 12" O.C.', 'Synthetic Structural Fiber + Rebar'],
    finishTypes: ['Hard-Trowel Burnished', 'Epoxy Ready Finish'],
    features: ['Chemical & Oil Spill Resistant', 'Lift Anchor Tolerances', 'Sloped Drain Pitching', 'Monolithic Curb Lip Pour'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-6',
    title: 'Stamped Concrete',
    slug: 'stamped-concrete',
    category: 'decorative',
    shortDesc: 'Architectural patterned concrete mimicking natural slate, European cobblestone, flagstone, & wood plank.',
    fullDesc: 'Our master stamp artisans use dual-color release agents, hand-carved detail touch-ups, and clear acrylic deep-penetrating sealers.',
    iconName: 'Sparkles',
    popular: true,
    basePricePerSqFt: 15.50,
    typicalThicknessInches: 4,
    rebarOptions: ['Fiber Mesh + #3 Rebar'],
    finishTypes: ['Ashlar Slate', 'Roman Cobble', 'Wood Grain', 'Granite Flagstone'],
    features: ['Integral Color Infusion', 'High-Gloss Acrylic Sealer', 'UV Fade Resistant Colors', 'Custom Color Matching'],
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-7',
    title: 'Decorative & Stained Concrete',
    slug: 'decorative-stained-concrete',
    category: 'decorative',
    shortDesc: 'Vibrant acid-stained, water-based colored, and polished concrete surfaces for indoor and outdoor spaces.',
    fullDesc: 'Create rich earth tones, marbled textures, and metallic polished finishes with custom chemical staining and micro-toppings.',
    iconName: 'Palette',
    popular: false,
    basePricePerSqFt: 14.00,
    typicalThicknessInches: 4,
    rebarOptions: ['Fiber Reinforced'],
    finishTypes: ['Acid Stain', 'Dye Tint', 'High Polish 800-Grit'],
    features: ['Permanent Color Fusion', 'Seamless Floor Aesthetic', 'Low Maintenance Polish', 'Stain Resistant Armor Coat'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-8',
    title: 'Concrete Repair & Resurfacing',
    slug: 'concrete-repair-resurfacing',
    category: 'residential',
    shortDesc: 'Polyurethane crack injection, polymer overlay resurfacing, and slab leveling for aging concrete.',
    fullDesc: 'Don\'t tear it down if you don\'t have to! Our structural polymer overlays restore pitted, spalled, and cracked slabs to like-new condition at half the cost of replacement.',
    iconName: 'Hammer',
    popular: false,
    basePricePerSqFt: 7.50,
    typicalThicknessInches: 1,
    rebarOptions: ['Polymer Bonding Agent'],
    finishTypes: ['Micro-Topping Broom', 'Spray-Deck Texture'],
    features: ['Structural Epoxy Crack Weld', 'Color Match Overlay', 'Non-Shrink Grout Injection', 'Prevents Water Freeze Damage'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-9',
    title: 'Retaining Walls & Earth Support',
    slug: 'retaining-walls',
    category: 'structural',
    shortDesc: 'Heavy poured concrete and engineered block retaining walls for soil retention and terrace landscaping.',
    fullDesc: 'Engineered continuous pour retaining walls with embedded geogrid, drainage gravel backfill, and weeping tile systems to handle earth pressure.',
    iconName: 'Layers',
    popular: false,
    basePricePerSqFt: 22.00,
    typicalThicknessInches: 8,
    rebarOptions: ['#5 Vertical Rebar @ 12" O.C.', '#4 Horizontal Rebar Cages'],
    finishTypes: ['Form-Liner Stone Face', 'Smooth Architectural Concrete'],
    features: ['Engineered Soil Load Calculations', 'Perforated Weep Hole Drainage', 'Parapet Cap Finish', '50-Year Structural Rating'],
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-10',
    title: 'Commercial Concrete',
    slug: 'commercial-concrete',
    category: 'commercial',
    shortDesc: 'High-volume commercial slabs, loading docks, dumpster pads, and parking apron construction.',
    fullDesc: 'Lara Concrete LLC mobilizes heavy equipment, laser screeds, and 100+ yard daily pour capability for commercial contractors and developers.',
    iconName: 'Building2',
    popular: true,
    basePricePerSqFt: 14.50,
    typicalThicknessInches: 6,
    rebarOptions: ['Double #5 Rebar Grid', 'Structural Steel Mesh'],
    finishTypes: ['Machine Power Trowel', 'Heavy Duty Broom'],
    features: ['Laser Screed Flatness (FF/FL Rated)', '6000 PSI High Load Concrete', 'Commercial Loading Dock Bumpers', 'OSHA Safety Certified Crew'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-11',
    title: 'Parking Lots & Pavements',
    slug: 'parking-lots-pavements',
    category: 'commercial',
    shortDesc: 'Durable reinforced concrete parking lots, ADA aprons, and commercial striping ready pavements.',
    fullDesc: 'Concrete parking lots outlast asphalt by decades with lower life-cycle maintenance costs. Complete with extruded curbs and gutter lines.',
    iconName: 'Shield',
    popular: false,
    basePricePerSqFt: 13.50,
    typicalThicknessInches: 6,
    rebarOptions: ['#4 Rebar Grid @ 18"'],
    finishTypes: ['Coarse Heavy Broom'],
    features: ['Extruded Concrete Curbs', 'Bollard Hole Coring', 'Catch Basin Drainage Ties', 'Heavy Fleet Transport Tolerant'],
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-12',
    title: 'Concrete Removal & Demolition',
    slug: 'concrete-removal-demolition',
    category: 'structural',
    shortDesc: 'Hydraulic breaker excavation, eco-friendly concrete crushing, and complete site haul-off.',
    fullDesc: 'Fast demolition with skid steer breakers, excavator attachments, and eco-friendly haul-off to crushing recycling plants.',
    iconName: 'Truck',
    popular: false,
    basePricePerSqFt: 4.50,
    typicalThicknessInches: 4,
    rebarOptions: ['N/A Demolition'],
    finishTypes: ['Graded Soil Subbase'],
    features: ['Dust Suppression Water Spray', '100% Recycled Concrete Aggregate', 'Utility Line Soft Digging', 'Clean Property Site Guarantee'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-13',
    title: 'Excavation & Site Preparation',
    slug: 'excavation-site-prep',
    category: 'structural',
    shortDesc: 'Precision laser grading, subbase compaction, gravel base layment, and soil stabilization.',
    fullDesc: 'A foundation is only as good as the ground under it. We excavate organic topsoil, install 4" of crushed CA-6 limestone gravel, and compact to 98% Proctor density.',
    iconName: 'Wrench',
    popular: false,
    basePricePerSqFt: 3.50,
    typicalThicknessInches: 6,
    rebarOptions: ['Subbase Only'],
    finishTypes: ['98% Proctor Compacted Gravel'],
    features: ['Laser Transit Slope Grading', 'Sub-Drainage Tile Laying', 'Vibratory Roller Compaction', 'Geotextile Fabric Underlayment'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'srv-14',
    title: 'Custom Architectural Projects',
    slug: 'custom-architectural-projects',
    category: 'decorative',
    shortDesc: 'Custom concrete countertops, fire pits, pool decks, outdoor steps, and artistic features.',
    fullDesc: 'If you can draw it, Lara Concrete can pour it. Custom GFRC (Glass Fiber Reinforced Concrete) architectural designs engineered for luxury outdoor spaces.',
    iconName: 'Award',
    popular: true,
    basePricePerSqFt: 18.00,
    typicalThicknessInches: 4,
    rebarOptions: ['GFRC Fiber Matrix'],
    finishTypes: ['Hand Polish', 'Custom Inlay Stone', 'Cast-in-Place Stamped'],
    features: ['Custom Molds & Formwork', 'Integrated LED Lighting Channels', 'Stain Guard Sealer', 'One-of-a-Kind Artisanship'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
  }
];

export const PROJECT_SHOWCASE: ProjectShowcaseItem[] = [
  {
    id: 'prj-1',
    title: 'Luxury Estate Stamped Driveway & Entry',
    category: 'Driveways',
    location: 'Wichita, KS (Eastborough)',
    sqFt: 2800,
    psi: 4500,
    durationDays: 4,
    costRange: '$32,000 - $36,000',
    completionDate: 'June 2026',
    materialsUsed: ['4500 PSI High Mix', '#4 Rebar 12" O.C.', 'Ashlar Slate Stamp', 'Charcoal Integral Color', 'High-Gloss Acrylic Sealer'],
    beforeImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80',
    duringImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=80',
    droneViewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    customerReview: {
      author: 'Robert & Elena Vance',
      rating: 5,
      text: 'Lara Concrete brought out their orange wrapped fleet and poured our 2,800 sq ft stamped driveway in 4 days flat. The ashlar slate pattern and charcoal border look incredible. Absolute master craftsmen!',
      verified: true
    }
  },
  {
    id: 'prj-2',
    title: 'Modern Backyard Patio & Fire Pit Oasis',
    category: 'Patios',
    location: 'Andover, KS',
    sqFt: 1400,
    psi: 4000,
    durationDays: 3,
    costRange: '$16,500 - $19,000',
    completionDate: 'May 2026',
    materialsUsed: ['4000 PSI Mix', 'Fiber Mesh Matrix', 'Wood Grain Plank Stamp', 'Desert Tan Stain', 'Anti-Slip Silane Sealer'],
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    duringImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    customerReview: {
      author: 'Marcus Sterling',
      rating: 5,
      text: 'The wood-plank stamped concrete looks like real hard timber but will last 50 years without rot. Clean work site and extremely polite crew.',
      verified: true
    }
  },
  {
    id: 'prj-3',
    title: 'Industrial Logistics Loading Dock Slab',
    category: 'Commercial',
    location: 'Derby Industrial Park, KS',
    sqFt: 8500,
    psi: 5000,
    durationDays: 6,
    costRange: '$98,000 - $110,000',
    completionDate: 'April 2026',
    materialsUsed: ['5000 PSI Heavy Duty Mix', 'Double #5 Rebar Cage', 'Laser Screed Finish', 'Steel Edge Dock Armoring'],
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    duringImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=1000&q=80',
    droneViewImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    customerReview: {
      author: 'Apex Logistics Operations',
      rating: 5,
      text: 'Needed 8,500 sq ft pour rated for heavy semi trucks. Lara Concrete passed all compression tests with flying colors. Zero downtime on our schedule.',
      verified: true
    }
  },
  {
    id: 'prj-4',
    title: 'Custom Residential Engineered Foundation',
    category: 'Foundations',
    location: 'Goddard, KS',
    sqFt: 3600,
    psi: 4500,
    durationDays: 5,
    costRange: '$48,000 - $54,000',
    completionDate: 'March 2026',
    materialsUsed: ['4500 PSI Engineered Mix', '#5 Continuous Rebar', 'Stego Wrap 15-Mil Vapor Barrier', 'Laser Screed Leveling'],
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
    duringImage: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
    customerReview: {
      author: 'Heritage Custom Builders',
      rating: 5,
      text: 'Lara is our go-to foundation pour contractor. Perfect 1/16" laser accuracy makes framing smooth and hassle free every time.',
      verified: true
    }
  }
];

export const FLEET_ITEMS: FleetItem[] = [
  {
    id: 'flt-1',
    name: 'Ford F-550 Super Duty Commander',
    type: 'Truck',
    specs: '6.7L PowerStroke Turbo Diesel | 19,500 lbs GVWR',
    capacity: 'Tows 24,000 lbs Heavy Equipment',
    livery: 'Signature Lara Orange (#F58220) & Dark Charcoal Wrap',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
    safetyScore: '100% DOT Compliant',
    description: 'Custom-wrapped service command vehicle equipped with onboard hydraulic tools, generator power, and job site communications.'
  },
  {
    id: 'flt-2',
    name: 'Heavy Equipment Enclosed Trailer',
    type: 'Trailer',
    specs: 'Dual 10,000 lb Axles | Custom Tool Lockers',
    capacity: 'Carries Concrete Stamps, Laser Screeds & Power Trowels',
    livery: 'Full Fleet Orange & Steel Gray Branding',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
    safetyScore: '100% Insured & Inspected',
    description: 'Houses mobile stamp matrix inventory, fiber mixing hoppers, diamond blade saws, and high-pressure washing gear.'
  },
  {
    id: 'flt-3',
    name: 'Somero S-485 Laser Screed',
    type: 'Laser Screed',
    specs: '3D Laser Profiler | 10ft Screed Head',
    capacity: 'Pours 50,000 sq ft/day with Ff/Fl Flatness',
    livery: 'Industrial Orange Armor',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    safetyScore: 'Precision Calibrated',
    description: 'Ensures laser-guided sub-millimeter flatness on commercial slabs and high-end residential garage floors.'
  },
  {
    id: 'flt-4',
    name: 'Bobcat T770 Compact Track Loader',
    type: 'Skid Steer',
    specs: '92 HP Turbo | Hydraulic Breaker & Grading Bucket',
    capacity: '3,475 lb Operating Capacity',
    livery: 'Lara Crew Orange Livery',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1000&q=80',
    safetyScore: 'ROPS Certified',
    description: 'Excavates old asphalt and concrete slabs, grades subbase to 98% Proctor compaction, and moves aggregate fast.'
  }
];

export const MATERIAL_ITEMS: MaterialItem[] = [
  {
    id: 'mat-1',
    name: '4,000 PSI High-Strength Concrete',
    category: 'PSI Mix',
    description: 'Standard engineered concrete mix for heavy-duty residential driveways and vehicle aprons.',
    specs: 'Compressive Strength: 4000 PSI @ 28 Days | Slump: 4"',
    durabilityYears: 45,
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=80',
    recommendedUse: 'Residential Driveways, RV Pads, Garage Slabs'
  },
  {
    id: 'mat-2',
    name: '5,000 PSI Commercial Mix',
    category: 'PSI Mix',
    description: 'High-density concrete mix designed for severe freeze-thaw cycles and extreme weight loads.',
    specs: 'Compressive Strength: 5000 PSI @ 28 Days | Low Permeability',
    durabilityYears: 60,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
    recommendedUse: 'Commercial Loading Docks, Heavy Truck Parking, Shop Floors'
  },
  {
    id: 'mat-3',
    name: '#4 Deformed Steel Rebar (1/2")',
    category: 'Reinforcement',
    description: 'Grade 60 steel rebar tied on 12" or 18" centers with chairs for 100% structural load distribution.',
    specs: 'Yield Strength: 60,000 PSI | ASTM A615 Standard',
    durabilityYears: 50,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
    recommendedUse: 'All Heavy Vehicle Driveways & Foundations'
  },
  {
    id: 'mat-4',
    name: 'Ashlar Slate Stamped Pattern',
    category: 'Stamp Pattern',
    description: 'Architectural slate stone texture providing a luxury European castle stone appearance.',
    specs: 'Hand-detailed grout lines | Dual-color release agent',
    durabilityYears: 40,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    recommendedUse: 'Backyard Patios, Pool Decks, Front Walkways'
  }
];

export const WARRANTY_RECORDS: WarrantyRecord[] = [
  {
    warrantyId: 'LARA-W-2026-9812',
    customerName: 'Robert Vance',
    propertyAddress: '1420 Eastborough Ln, Wichita, KS',
    projectType: 'Stamped Concrete Driveway',
    completionDate: '2026-06-15',
    coverageYears: 10,
    status: 'Active',
    coverageDetails: [
      '10-Year Structural Crack Guarantee (cracks > 3/16" covered)',
      'Free Freeze-Thaw Sealer Re-application at Year 3',
      'Subbase Settlement Warranty',
      'Surface Spalling & Scaling Protection'
    ]
  },
  {
    warrantyId: 'LARA-W-2026-4410',
    customerName: 'Marcus Sterling',
    propertyAddress: '804 Timberline Ct, Andover, KS',
    projectType: 'Wood-Grain Stamped Patio',
    completionDate: '2026-05-20',
    coverageYears: 10,
    status: 'Active',
    coverageDetails: [
      '10-Year Structural Integrity Warranty',
      'UV Color Fading Guarantee',
      'Drainage & Water Runoff Guarantee'
    ]
  }
];

export const SEO_CITIES: SEOCityData[] = [
  {
    slug: 'wichita-ks',
    name: 'Wichita',
    state: 'KS',
    zipCodes: ['67202', '67206', '67212', '67226', '67230'],
    projectsCompleted: 640,
    avgProjectCost: '$8,400',
    dispatchTimeHours: 24,
    testimonialCount: 410,
    topServices: ['Concrete Driveways', 'Stamped Patios', 'Commercial Slabs'],
    featuredProjectTitle: 'Eastborough Stamped Driveway Estate',
    featuredProjectImage: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    slug: 'derby-ks',
    name: 'Derby',
    state: 'KS',
    zipCodes: ['67037'],
    projectsCompleted: 215,
    avgProjectCost: '$7,200',
    dispatchTimeHours: 24,
    testimonialCount: 145,
    topServices: ['Garage Slabs', 'Concrete Removal', 'Patio Extensions'],
    featuredProjectTitle: 'Derby Industrial Park Loading Dock',
    featuredProjectImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    slug: 'andover-ks',
    name: 'Andover',
    state: 'KS',
    zipCodes: ['67002'],
    projectsCompleted: 180,
    avgProjectCost: '$9,800',
    dispatchTimeHours: 24,
    testimonialCount: 120,
    topServices: ['Stamped Concrete', 'Foundations', 'Custom Fire Pit Decks'],
    featuredProjectTitle: 'Andover Wood Grain Stamped Oasis',
    featuredProjectImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    slug: 'maize-ks',
    name: 'Maize',
    state: 'KS',
    zipCodes: ['67101'],
    projectsCompleted: 110,
    avgProjectCost: '$6,900',
    dispatchTimeHours: 24,
    testimonialCount: 88,
    topServices: ['Sidewalks', 'Driveway Additions', 'Retaining Walls'],
    featuredProjectTitle: 'Maize Residential Walkway & Steps',
    featuredProjectImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  }
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-1',
    title: 'The Ultimate Guide to Concrete Driveway Installation (2026 Edition)',
    slug: 'ultimate-concrete-driveway-guide',
    category: 'Driveway Tips',
    author: 'Chief Concrete Engineer, Lara Concrete',
    publishDate: 'July 14, 2026',
    readTime: '8 min read',
    summary: 'Everything you need to know about subbase preparation, rebar spacing, 4000 PSI concrete mixes, cure times, and cost factors before hiring a contractor.',
    heroImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80',
    tags: ['Driveway', 'Concrete Guide', 'Rebar', 'PSI Strength'],
    contentMarkdown: `
# The Ultimate Guide to Concrete Driveway Installation

A concrete driveway is one of the single most impactful investments you can make for your home's curb appeal, vehicle safety, and resale value. However, not all concrete driveways are created equal.

## 1. Why 4,000 PSI Concrete is Mandatory for Driveways
Many low-bid contractors cut costs by pouring **3,000 PSI** concrete. While 3,000 PSI is suitable for indoor residential footings, it lacks the compressive density needed to survive heavy pickup trucks, delivery vans, and winter freeze-thaw expansion. At Lara Concrete LLC, we pour a minimum of **4,000 PSI** with fiber mesh matrix for all driveways.

## 2. Rebar Grid vs. Wire Mesh: What's the Difference?
Wire mesh often gets stepped on during the pour and ends up sitting at the very bottom of the slab on dirt—rendering it useless. 
We insist on **#4 Grade 60 Rebar (1/2" steel)** tied on 18-inch centers and supported by **concrete chairs**. This suspends the steel directly in the middle of the 5-inch slab, providing maximum tensile strength.

## 3. The 28-Day Curing Rule
- **24 Hours**: You can walk on the fresh concrete carefully.
- **7 Days**: Light passenger vehicles (sedans) can park on the slab (reaches ~70% strength).
- **28 Days**: Full 4,000+ PSI compressive strength is achieved. Heavy trucks and RVs can be parked safely.
    `
  },
  {
    id: 'art-2',
    title: 'Stamped Concrete vs. Pavers: Cost, Durability & Maintenance Comparison',
    slug: 'stamped-concrete-vs-pavers',
    category: 'Stamped Concrete',
    author: 'Master Stamp Artisan, Lara Concrete',
    publishDate: 'June 28, 2026',
    readTime: '6 min read',
    summary: 'Compare upfront costs, longevity, weed growth resistance, and maintenance requirements between architectural stamped concrete and individual stone pavers.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    tags: ['Stamped Concrete', 'Pavers', 'Patio Design', 'Cost Comparison'],
    contentMarkdown: `
# Stamped Concrete vs. Pavers: Which is Right for You?

When designing a luxury backyard patio or front walkway, homeowners frequently weigh stamped concrete against interlocking brick or stone pavers.

## Cost Breakdown
- **Stamped Concrete**: $13.00 - $18.00 per sq ft installed.
- **Interlocking Pavers**: $22.00 - $35.00 per sq ft installed (due to intense manual labor).

## Weed Growth & Settlement
Pavers feature hundreds of individual sand joints. Over time, rain washes away joint sand, allowing seeds to take root and cause uneven settling. Stamped concrete is a continuous monolithic pour—**zero weeds and zero shifting blocks**.
    `
  },
  {
    id: 'art-3',
    title: 'Essential Winter Concrete Care: Preventing Scaling and Salt Damage',
    slug: 'winter-concrete-care-sealing',
    category: 'Maintenance',
    author: 'Field Maintenance Director, Lara Concrete',
    publishDate: 'May 12, 2026',
    readTime: '5 min read',
    summary: 'Learn how de-icing chemicals damage concrete and how silane/siloxane deep penetrating sealers protect your driveway during harsh freeze-thaw cycles.',
    heroImage: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=80',
    tags: ['Winter Care', 'Concrete Sealer', 'Maintenance', 'Freeze-Thaw'],
    contentMarkdown: `
# Winter Concrete Care & Sealing Secrets

Rock salt (sodium chloride) and calcium chloride eat away at raw unsealed concrete by forcing chemical freeze-thaw reactions inside microscopic pores.

## How Deep Penetrating Sealers Work
Unlike surface film sealers that peel off, **silane/siloxane sealers** penetrate 3/8" deep into the concrete capillaries, creating a hydrophobic water-repellent barrier. Water simply beads up and runs off!
    `
  }
];

export const SAMPLE_CUSTOMER_PORTAL: CustomerPortalProject = {
  id: 'portal-8821',
  quoteId: 'Q-2026-9912',
  customerName: 'David & Sarah Jenkins',
  address: '3210 North Rock Rd, Wichita, KS',
  projectType: 'Stamped Concrete Patio & Fire Pit Slab',
  contractAmount: 18500,
  paidAmount: 5000,
  currentStep: 4,
  stepLabels: [
    'Request Quote',
    'Estimate Approved',
    'Customer Portal Created',
    'Schedule & Prep Job',
    'Construction Pour',
    'Final Walkthrough & Warranty'
  ],
  scheduledDate: '2026-08-10',
  estimatedCompletion: '2026-08-13',
  projectManagerName: 'Carlos Lara (Owner)',
  projectManagerPhone: '(800) 555-5272',
  sitePhotos: [
    'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  ],
  invoices: [
    { invoiceNo: 'INV-101', date: '2026-07-20', amount: 5000, status: 'Paid' },
    { invoiceNo: 'INV-102', date: '2026-08-13', amount: 13500, status: 'Pending' }
  ],
  contractPdfUrl: '#',
  inspectionReportUrl: '#'
};

export const INITIAL_LEADS: QuoteLead[] = [
  {
    id: 'lead-1',
    createdAt: '2026-08-01 14:30',
    customerName: 'Gregory Vance',
    phone: '(316) 555-8910',
    email: 'greg.vance@example.com',
    address: '4502 Pinecrest St',
    city: 'Wichita',
    serviceType: 'Concrete Driveways',
    estimatedSqFt: 1800,
    estimatedBudget: 21000,
    status: 'New',
    preferredContact: 'Call',
    notes: 'Needs removal of old cracked 2-car driveway and pour new 4000 PSI stamped border driveway.'
  },
  {
    id: 'lead-2',
    createdAt: '2026-08-01 09:15',
    customerName: 'Jennifer Lopez',
    phone: '(316) 555-3341',
    email: 'jlopez@example.com',
    address: '1209 Cedar Dr',
    city: 'Derby',
    serviceType: 'Patios & Outdoor Living',
    estimatedSqFt: 900,
    estimatedBudget: 12500,
    status: 'Site Visit Scheduled',
    preferredContact: 'SMS',
    notes: 'Wants wood plank stamped concrete patio with fire pit extension.'
  }
];
