import blog1 from "@/assets/shop9.png"
import blog2 from "@/assets/gallary2.png"
import blog3 from "@/assets/gallary.png"
import blog4 from "@/assets/shop12.png"
import blog5 from "@/assets/shop13.png"
import blog6 from "@/assets/shop14.png"

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  readTime: string
  author: string
  category: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Low-Light Plants That Thrive Indoors",
    excerpt: "Discover the best plants that flourish in low-light conditions, perfect for apartments and offices with minimal natural light.",
    content: `Low-light conditions don't have to limit your indoor gardening dreams. Many beautiful plants have adapted to thrive in the understory of dense forests, making them perfect for dimly lit rooms and offices.

## Best Low-Light Plants

### 1. Snake Plant (Sansevieria)
Almost indestructible, the snake plant tolerates extremely low light and irregular watering. Its tall, architectural leaves add vertical interest to any space.

### 2. ZZ Plant (Zamioculcas zamifolia)
With its waxy, dark green leaves, the ZZ plant is one of the most tolerant houseplants. It can survive months of neglect and thrives in low light.

### 3. Pothos (Epipremnum aureum)
This trailing vine is virtually unkillable. Its heart-shaped leaves come in various variegations and it grows well in low light.

### 4. Peace Lily (Spathiphyllum)
Not only does it tolerate low light, but it also produces elegant white blooms and helps purify the air.

### 5. Cast Iron Plant (Aspidistra elatior)
True to its name, this plant withstands almost everything — low light, temperature fluctuations, and irregular watering.

## Care Tips for Low-Light Plants

- **Water less frequently**: Low light means slower growth and less water consumption
- **Dust leaves regularly**: Dust blocks the limited light available
- **Rotate occasionally**: Ensures even growth toward the light source
- **Watch for signs**: Leggy growth means it needs more light

## Common Mistakes to Avoid

The biggest mistake with low-light plants is overwatering. Since they grow slower, they use less water. Always check the soil moisture before watering.

Another common issue is placing them too far from any light source. While they tolerate low light, they still need some indirect light to survive.

With these plants and tips, you can create a thriving indoor garden even in the darkest corners of your home.`,
    image: blog1,
    date: "Jun 12, 2026",
    readTime: "5 min",
    author: "Emma Green",
    category: "Plant Care",
    tags: ["low-light", "indoor", "beginners"],
  },
  {
    id: 2,
    title: "The Ultimate Guide to Repotting Houseplants",
    excerpt: "Learn when and how to repot your houseplants with this comprehensive step-by-step guide for healthy root growth.",
    content: `Repotting is one of the most important skills any plant parent can master. It gives your plants fresh nutrients, more room to grow, and prevents root-bound issues.

## When to Repot

Signs your plant needs repotting:
- Roots growing out of drainage holes
- Water runs straight through the pot
- Plant is top-heavy and tips over
- Growth has slowed or stopped
- Soil dries out very quickly

## Choosing the Right Pot

### Size Matters
Go up only 1-2 inches in diameter. A pot too large can cause root rot due to excess soil moisture.

### Drainage is Essential
Always choose pots with drainage holes. If you love a pot without holes, use it as a cachepot.

### Material Considerations
- **Terracotta**: Porous, dries faster — great for succulents
- **Ceramic**: Retains moisture — good for moisture-loving plants
- **Plastic**: Lightweight, retains moisture — budget-friendly

## Step-by-Step Repotting Guide

1. Water your plant 1-2 days before repotting
2. Gently remove the plant from its current pot
3. Loosen the root ball and trim any dead roots
4. Add fresh potting mix to the new pot
5. Position the plant at the same depth as before
6. Fill around the roots with soil and gently firm
7. Water thoroughly and let drain

## Aftercare

After repotting, give your plant time to adjust. Keep it in indirect light and avoid fertilizing for 4-6 weeks. Some plants may show transplant shock — drooping leaves are normal for a few days.

With this guide, you'll be a repotting pro in no time!`,
    image: blog2,
    date: "Jun 8, 2026",
    readTime: "8 min",
    author: "James Root",
    category: "Guides",
    tags: ["repotting", "soil", "roots"],
  },
  {
    id: 3,
    title: "How to Create a Stunning Indoor Jungle Wall",
    excerpt: "Transform any wall into a lush vertical garden with our expert tips on plant selection, mounting, and maintenance.",
    content: `A living plant wall is the ultimate statement piece for any home. Not only does it look spectacular, but it also improves air quality and brings nature indoors in a big way.

## Planning Your Living Wall

### Location Assessment
Before you start, evaluate your space:
- How much natural light does the wall receive?
- Is the wall structural or do you need a freestanding system?
- Can you access the wall for watering and maintenance?

### Choosing a System

There are several approaches to creating a living wall:

**Pocket Systems**: Felt pockets that mount on a frame — versatile and easy to rearrange.

**Modular Panels**: Pre-planted panels that interlock — instant results but heavier.

**Tiered Shelving**: Simple shelves with trailing plants — easiest to set up and maintain.

## Best Plants for Vertical Gardens

- **Pothos**: Trailing, fast-growing, low-light tolerant
- **Ferns**: Textured, lush, love humidity
- **Philodendrons**: Climbing or trailing, very adaptable
- **Spider Plants**: Arching leaves, easy to propagate
- **Monstera**: Bold leaves, makes a statement
- **Air Plants**: No soil needed, unique shapes

## Installation Tips

1. Ensure your wall can support the weight of a fully watered system
2. Install drip trays or a waterproof backing
3. Set up an irrigation system for larger installations
4. Layer plants by light needs — most tolerant at the top

## Maintenance

A living wall needs regular care:
- Water when the top inch feels dry
- Mist regularly to maintain humidity
- Prune and rotate plants monthly
- Fertilize lightly during growing season

With proper planning and care, your living wall will become the most talked-about feature in your home.`,
    image: blog3,
    date: "Jun 3, 2026",
    readTime: "6 min",
    author: "Lily Bloom",
    category: "DIY",
    tags: ["vertical-garden", "living-wall", "diy"],
  },
  {
    id: 4,
    title: "Essential Guide to Watering Indoor Plants",
    excerpt: "Stop killing your plants with kindness. Master the art of watering with our complete guide to proper hydration.",
    content: `Overwatering is the number one cause of houseplant death. Learning to water correctly will transform your plant parenting journey.

## The Golden Rules of Watering

1. **Check before you water** — Always test soil moisture first
2. **Water thoroughly** — Until water runs out of drainage holes
3. **Empty the saucer** — Never let plants sit in water
4. **Adjust with seasons** — Plants need less water in winter

## How to Check Soil Moisture

**The Finger Test**: Insert your finger 1-2 inches into the soil. If it feels dry, it's time to water.

**The Chopstick Method**: Insert a wooden chopstick. If soil sticks to it, the plant doesn't need water.

**Moisture Meters**: For precision, use a moisture meter — especially helpful for picky plants.

## Water Quality Matters

### Tap Water
Most plants tolerate tap water, but some are sensitive to chlorine and fluoride.

### Filtered Water
Best for sensitive plants like calatheas and ferns.

### Rainwater
The gold standard — plants love it. Collect it if you can.

### Temperature
Always use room-temperature water. Cold water shocks roots.

## Signs of Watering Issues

**Underwatering**: Wilting, crispy brown edges, drooping stems
**Overwatering**: Yellow leaves, mushy stems, mold on soil surface

## Plant-Specific Watering

- **Succulents & Cacti**: Water only when soil is completely dry
- **Tropical Plants**: Keep consistently moist but not soggy
- **Orchids**: Water when roots turn silvery-gray
- **Ferns**: Need consistent moisture and humidity

Master these watering fundamentals and your plants will thank you with lush, healthy growth.`,
    image: blog4,
    date: "May 28, 2026",
    readTime: "7 min",
    author: "Emma Green",
    category: "Plant Care",
    tags: ["watering", "care", "basics"],
  },
  {
    id: 5,
    title: "Best Pet-Friendly Plants for Your Home",
    excerpt: "Create a safe indoor jungle for your furry friends with these non-toxic plants that are beautiful and pet-safe.",
    content: `Our pets are family, and their safety comes first. Fortunately, there are plenty of stunning houseplants that are completely safe for cats and dogs.

## Top Pet-Safe Plants

### 1. Spider Plant (Chlorophytum comosum)
Easy to grow, produces baby plants, and completely non-toxic. Cats love playing with the arching leaves.

### 2. Boston Fern (Nephrolepis exaltata)
Lush and beautiful, this fern thrives in humidity and is safe for all pets.

### 3. Areca Palm (Dypsis lutescens)
Adds tropical vibes without the worry. Completely pet-safe and air-purifying.

### 4. Calathea
Stunning patterned leaves and totally non-toxic. High humidity lover.

### 5. Money Tree (Pachira aquatica)
Brings good luck and is safe for pets. Easy to care for with braided trunks.

## Plants to Avoid

Some common houseplants are toxic to pets:
- **Lilies** — Extremely toxic to cats
- **Monstera** — Can cause oral irritation
- **Pothos** — Causes vomiting and swelling
- **Peace Lily** — Not a true lily but still toxic
- **Snake Plant** — Mildly toxic if ingested

## Creating a Pet-Safe Garden

Place toxic plants out of reach if you must have them. Better yet, stick to pet-safe varieties and create a space everyone can enjoy.

Always consult the ASPCA plant database if you're unsure about a specific plant.`,
    image: blog5,
    date: "May 22, 2026",
    readTime: "5 min",
    author: "Max Whiskers",
    category: "Guides",
    tags: ["pet-friendly", "safe", "pets"],
  },
  {
    id: 6,
    title: "Seasonal Plant Care: Summer Survival Guide",
    excerpt: "Help your plants thrive during the hot summer months with essential tips on heat protection, watering, and humidity.",
    content: `Summer brings longer days and more light — great news for your plants, but the heat can also stress them. Here's how to keep your indoor jungle thriving.

## Adjusting Your Summer Care

### Light Management
More sunlight means more potential for leaf burn. Move sensitive plants back from south-facing windows or use sheer curtains to filter harsh midday rays.

### Watering Changes
Plants grow faster in summer and need more water. Check soil moisture more frequently — you may need to water twice as often as in winter.

### Humidity Matters
Air conditioning dries out the air. Group plants together, use pebble trays, or run a humidifier to maintain 50-60% humidity.

## Summer-Specific Tips

**Fertilize Regularly**: Plants are actively growing — feed them every 2-4 weeks with a balanced fertilizer.

**Watch for Pests**: Warm weather brings pests. Inspect leaves weekly and treat any infestations early.

**Air Circulation**: Good airflow prevents fungal issues. Use a gentle fan if needed.

**Vacation Care**: Going away? Set up self-watering systems or ask a friend to check on your plants.

### Signs of Heat Stress

- Wilting despite moist soil
- Sunburned leaves (brown patches)
- Leaf drop
- Stunted growth

If you notice these signs, move your plant to a cooler spot and increase humidity.

## Summer Plant Care Checklist

- [ ] Move sensitive plants away from direct sun
- [ ] Increase watering frequency
- [ ] Start regular fertilizing
- [ ] Set up humidity trays
- [ ] Inspect for pests weekly
- [ ] Prune dead or yellowing leaves
- [ ] Clean leaves for better photosynthesis

With these tips, your plants will not just survive summer — they'll thrive!`,
    image: blog6,
    date: "May 15, 2026",
    readTime: "6 min",
    author: "James Root",
    category: "Seasonal",
    tags: ["summer", "seasonal", "heat"],
  },
]
