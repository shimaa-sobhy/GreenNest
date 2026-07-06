import care1 from "@/assets/plant1-removebg-preview.png"
import care2 from "@/assets/shop5.png"
import care3 from "@/assets/shop6.png"

export interface PlantCareGuide {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  difficulty: string
  light: string
  water: string
  category: string
}

export const plantCareGuides: PlantCareGuide[] = [
  {
    id: 1,
    title: "Monstera Deliciosa Care Guide",
    excerpt: "Everything you need to know about caring for the iconic Swiss Cheese Plant, from watering to propagation.",
    content: `## Light Requirements

Monstera Deliciosa thrives in bright, indirect light. It can tolerate medium light but will grow slower. Avoid direct afternoon sun which can burn the leaves.

## Watering

Water when the top 1-2 inches of soil feel dry. Typically every 1-2 weeks, depending on your home's conditions. Reduce watering in winter.

## Humidity

Monstera loves humidity! Mist regularly, use a pebble tray, or run a humidifier for best results. Brown edges indicate low humidity.

## Soil

Use a well-draining potting mix with peat moss or coco coir. Adding perlite improves drainage.

## Fertilizer

Feed monthly during spring and summer with a balanced liquid fertilizer. Reduce to every 6-8 weeks in fall and winter.

## Propagation

Propagate via stem cuttings in water or soil. Cut below a node and place in water until roots develop.

## Common Problems

- Yellow leaves: overwatering
- Brown edges: low humidity
- Leggy growth: not enough light`,
    image: care1,
    difficulty: "Easy",
    light: "Bright indirect",
    water: "Every 1-2 weeks",
    category: "Indoor",
  },
  {
    id: 2,
    title: "Fiddle Leaf Fig Care Guide",
    excerpt: "Master the art of keeping your Fiddle Leaf Fig happy with the right light, water, and pruning techniques.",
    content: `## Light Requirements

Fiddle Leaf Fig needs bright, filtered light. A south or west-facing window with sheer curtains is ideal. Rotate regularly for even growth.

## Watering

Water when the top inch of soil is dry. Water thoroughly until it drains from the bottom. Never let it sit in water.

## Humidity

These tropical plants love humidity. Aim for 60% or higher. Group with other plants or use a humidifier.

## Soil

Use a well-draining, rich potting mix. A mix with perlite and bark works well for drainage.

## Fertilizer

Feed with a balanced fertilizer monthly during growing season. Look for fertilizers with higher nitrogen for leaf growth.

## Pruning

Prune to shape and encourage branching. Cut just above a leaf node. Always use clean, sharp tools.

## Leaf Care

Dust leaves monthly to ensure proper photosynthesis. Use a damp cloth to gently clean each leaf.

## Common Problems

- Dropping leaves: temperature change or draft
- Brown spots: inconsistent watering
- Leaning: needs rotation`,
    image: care2,
    difficulty: "Moderate",
    light: "Bright filtered",
    water: "Weekly",
    category: "Indoor",
  },
  {
    id: 3,
    title: "Barrel Cactus Care Guide",
    excerpt: "Learn how to care for these striking desert plants with minimal effort and maximum visual impact.",
    content: `## Light Requirements

Barrel cacti need full, direct sunlight. Place in your sunniest window — south or west facing. At least 6 hours of direct sun daily.

## Watering

Water very sparingly. Only water when the soil is completely dry — every 2-4 weeks in summer, every 6-8 weeks in winter.

## Soil

Use a specialized cactus and succulent mix that drains very quickly. Adding extra perlite or coarse sand improves drainage.

## Temperature

They thrive in warm temperatures between 70-100°F. Protect from frost and cold drafts.

## Fertilizer

Feed with a cactus-specific fertilizer once in spring and once in summer. No fertilizing in winter.

## Potting

Use terracotta pots for best results — they wick away excess moisture. Ensure excellent drainage.

## Common Problems

- Mushy base: overwatering (root rot)
- Shriveling: underwatering or too much sun
- Etiolation (stretching): not enough light`,
    image: care3,
    difficulty: "Easy",
    light: "Full direct sun",
    water: "Every 2-4 weeks",
    category: "Cacti",
  },
]
