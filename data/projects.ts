import type { MosaicTile, ProjectDetail, ScatterThumb, SelectedWorkEntry } from "./types";
import { site } from "./site";

/** Four primary projects — centered list on homepage. */
export const selectedWork: SelectedWorkEntry[] = [
  { slug: "slayOzen", title: "{brand identity}   slayOzen  {product design}" },
  { slug: "HealingTouch", title: "{brand identity}   HealingTouch  {package design}" },
  { slug: "RAC", title: "{graphic design}   RAC  {illustration}" },
  { slug: "others-01", title: "{visual design}   hAomarket  {art direction}" },
  { slug: "MustangMachE", title: "{merch design}   MustangMachE   {branding}" },
];

/** Scatter thumbnails around the centered selected list (% inside .selected-centered__field). */
export const selectedScatter: ScatterThumb[] = [
  {
    id: "s1",
    src: "/images/projects/slayozen06.jpg",
    alt: "slayOzen preview",
    top: "-2%",
    left: "-6%",
    width: 200,
    height: 113,
    fit: "contain",
    zIndex: 2,
    linkedSlug: "slayOzen",
  },
  {
    id: "s2",
    src: "/images/projects/healingtouch01.jpg",
    alt: "HealingTouch preview",
    top: "16%",
    left: "85%",
    width: 200,
    zIndex: 2,
    linkedSlug: "HealingTouch",
  },
  {
    id: "s3",
    src: "/images/projects/Rac08.jpg",
    alt: "RAC preview",
    top: "33%",
    left: "-9%",
    width: 200,
    zIndex: 2,
    linkedSlug: "RAC",
  },
  {
    id: "s4",
    src: "/images/projects/haomarketdragon.webp",
    alt: "hAomarket preview",
    top: "49%",
    left: "82%",
    width: 320,
    // 9422 x 2392 panorama — height matches aspect so the full dragon shows uncropped.
    height: 81,
    fit: "contain",
    zIndex: 2,
    linkedSlug: "others-01",
  },
  {
    id: "s5",
    src: "/images/projects/mustang04_stickers.jpg",
    alt: "MustangMachE preview",
    top: "86%",
    left: "3%",
    width: 200,
    zIndex: 2,
    linkedSlug: "MustangMachE",
  },
];

/** Hero used by the hAomarket detail page (no longer in the Others mosaic). */
const haomarketHeroSrc = "/images/projects/haomarketdragon.webp";

/**
 * 高密度拼贴墙（参考 moodboard 排版）：
 * 卡片大面积重叠、向四边铺满并出血到画面外，几乎无留白；
 * 无倾斜（正放），靠 top/left 的紧密错位与 z 轴叠压制造满铺拼贴感。
 * 顶部一带用负 top 上顶到标题旁，压缩标题与拼贴的间距。
 */
export const othersMosaic: MosaicTile[] = [
  // ——— Top band ———
  {
    slug: "others-circlebook",
    thumbnail: "/images/projects/otherscirclebook.jpg",
    thumbnailAlt: "Others circle book",
    top: "0%",
    left: "0%",
    width: 170,
    zIndex: 3,
  },
  {
    slug: "others-mag",
    thumbnail: "/images/projects/othersmag.jpg",
    thumbnailAlt: "Others magazine",
    top: "1%",
    left: "22%",
    width: 255,
    zIndex: 2,
  },
  {
    slug: "others-snob",
    thumbnail: "/videos/otherssnob.webm",
    thumbnailAlt: "Others snob motion",
    top: "0%",
    left: "45%",
    width: 200,
    zIndex: 2,
  },
  {
    slug: "others-tvshow1",
    thumbnail: "/videos/otherstvshow01.webm",
    thumbnailAlt: "Others TV show motion",
    top: "2%",
    left: "67%",
    width: 315,
    zIndex: 1,
  },
  // ——— Middle band ———
  {
    slug: "others-xmas",
    thumbnail: "/videos/othersxmas.webm",
    thumbnailAlt: "Others xmas motion",
    top: "0%",
    left: "76%",
    width: 255,
    zIndex: 0,
    offsetTop: 45,
    offsetLeft: 60,
  },
  {
    slug: "others-draw1",
    thumbnail: "/images/projects/othersdraw01.jpg",
    thumbnailAlt: "Others drawing",
    top: "27%",
    left: "22%",
    width: 260,
    zIndex: 2,
  },
  {
    slug: "others-culture",
    thumbnail: "/images/projects/othersculture.jpg",
    thumbnailAlt: "Others culture",
    top: "29%",
    left: "45%",
    width: 200,
    zIndex: 2,
  },
  {
    slug: "others-vj1",
    thumbnail: "/videos/othersVJ01.webm",
    thumbnailAlt: "Others VJ motion",
    top: "28%",
    left: "67%",
    width: 240,
    zIndex: 1,
  },
  // ——— Bottom band ———
  {
    slug: "others-draw2",
    thumbnail: "/images/projects/othersdraw02.jpg",
    thumbnailAlt: "Others drawing 02",
    top: "54%",
    left: "2%",
    width: 290,
    zIndex: 2,
  },
  {
    slug: "others-vj2",
    thumbnail: "/videos/othersVJ02.webm",
    thumbnailAlt: "Others VJ motion 02",
    top: "55%",
    left: "34%",
    width: 235,
    zIndex: 2,
  },
  {
    slug: "others-tvshow2",
    thumbnail: "/videos/otherstvshow02.webm",
    thumbnailAlt: "Others TV show motion 02",
    top: "53%",
    left: "64%",
    width: 325,
    zIndex: 1,
  },
];

/**
 * ─── 完整详情页示例：RAC ───
 * 访问 /projects/RAC 即可看到效果。
 * 复制此对象，改 slug / 文案 / 图片路径，即可做其他项目。
 */
export const racDetail: ProjectDetail = {
  slug: "RAC",
  title: "RAC",
  category: "Graphic design, Illustration",
  year: "2023-2025",
  client: "Recording Arts of Canada",
  location: "Montreal, Canada",
  role: "Graphic designer",
  lede:
    "Created editorial illustrations and digital content for RAC, a Canadian music school specializing in sound and music production training. Collaborated with editors to bring music stories to life through website banners, Instagram carousels, and campaign assets while maintaining a cohesive visual identity across platforms.",
  pageLayout: "intro-gallery",
  story: [],
  // all = [hero(0), Rac01..Rac10 (1..10), racinsta01..03 (11..13)].
  // Rac06 stays paired with a motion piece; the other 9 banners (01-05, 07-10)
  // become a white-box left→right scroll strip as the final row.
  galleryRowIndices: [
    [0],
    [6, 11],
    [12, 13],
    [1, 2, 3, 4, 5, 7, 8, 9, 10],
  ],
  galleryRowVariant: ["hero-fill", undefined, undefined, "scroll-strip-flat"],

  hero: {
    type: "video",
    src: "/videos/racvideo01.webm",
    caption:
      "RAC website overview. For more: recordingarts.com/articles/",
    width: 1920,
    height: 1080,
    colorBlock: false,
  },

  blocks: [
    {
      type: "image",
      src: "/images/projects/Rac01.jpg",
      alt: "RAC banner 01",
      caption: "",
      width: 1500,
      height: 844,
    },
    {
      type: "image",
      src: "/images/projects/Rac02.jpg",
      alt: "RAC banner 02",
      caption: "Banner design supporting published articles and social campaigns.",
      width: 1500,
      height: 843,
    },
    {
      type: "image",
      src: "/images/projects/Rac03.jpg",
      alt: "RAC banner 03",
      caption: "Illustration series celebrating artists and audiences.",
      width: 1500,
      height: 844,
    },
    {
      type: "image",
      src: "/images/projects/Rac04.jpg",
      alt: "RAC banner 04",
      caption: "Visual identity extension across digital editorial platforms.",
      width: 1500,
      height: 844,
    },
    {
      type: "image",
      src: "/images/projects/Rac05.jpg",
      alt: "RAC banner 05",
      caption: "Instagram carousel artwork aligned with RAC editorial tone.",
      width: 1500,
      height: 845,
    },
    {
      type: "image",
      src: "/images/projects/Rac06.jpg",
      alt: "RAC banner 06",
      caption: "Editorial Graphic Design for latest music content on both website banners and Instagram Carousel.",
      width: 1500,
      height: 844,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/Rac07.jpg",
      alt: "RAC banner 07",
      caption: "Social media illustration supporting audience engagement.",
      width: 1500,
      height: 844,
    },
    {
      type: "image",
      src: "/images/projects/Rac08.jpg",
      alt: "RAC banner 08",
      caption: "Cohesive visual language across banners and carousels.",
      width: 1500,
      height: 844,
    },
    {
      type: "image",
      src: "/images/projects/Rac09.jpg",
      alt: "RAC banner 09",
      caption: "Editorial artwork connecting artists with RAC readership.",
      width: 1500,
      height: 844,
    },
    {
      type: "image",
      src: "/images/projects/Rac10.jpg",
      alt: "RAC banner 10",
      caption: "Final illustration set — unified identity across RAC channels.",
      width: 1500,
      height: 844,
    },
    {
      type: "video",
      src: "/videos/racinsta01.webm",
      caption: "Instagram carousel artwork aligned with RAC editorial tone.",
      width: 738,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/racinsta02.webm",
      caption: "RAC google ads",
      width: 1080,
      height: 1080,
      galleryFit: "contain",
      pauseOnHover: true,
      frameBackground: "#ffffff",
    },
    {
      type: "video",
      src: "/videos/racinsta03.webm",
      caption: "RAC Instagram motion",
      width: 738,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
      frameBackground: "transparent",
    },
  ],
};

/** Others mosaic → intro-gallery page (RAC layout, no color blocks). */
export const others01Detail: ProjectDetail = {
  slug: "others-01",
  title: "hAomarket",
  category: "Visual design, Art direction",
  year: "2024",
  role: "Visual designer",
  location: "Shanghai, China",
  lede:
    "hAomarket is a Shanghai-based fashion and lifestyle boutique brand with a highly engaged and successful social media presence on Xiaohongshu (RED). Created campaign visuals, social media content, event key visuals, and digital assets that strengthened brand storytelling and audience engagement across platforms.",
  pageLayout: "intro-gallery",
  story: [],
  galleryRowIndices: [
    [3, 4, 5, 6],
    [1],
    [0],
    [2],
    [7],
    [8],
    [9, 10, 11],
  ],
  galleryRowOverlap: [0, 0, 30, 60, 0, 0, 0],
  galleryRowZIndex: [0, 1, 3, 2, 0, 0, 0],
  galleryRowVariant: [
    "mosaic-2up",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],

  hero: {
    type: "image",
    src: haomarketHeroSrc,
    alt: "hAomarket 2024 the year of the dragon illustration",
    caption: "hAomarket 2024 the year of the dragon illustration",
    width: 9422,
    height: 2392,
    colorBlock: false,
    frameBackground: "transparent",
  },

  blocks: [
    {
      type: "image",
      src: "/images/projects/haomarket01.webp",
      alt: "hAomarket spread 01",
      caption: "hAomarket 2024 the year of the dragon illustration",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/haomarket02.webp",
      alt: "hAomarket spread 02",
      caption: "hAomarket 2024 the year of the dragon window display.",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    
    {
      type: "video",
      src: "/videos/haomarket01.webm",
      caption: "hAomarket motion 01.",
      width: 810,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/haomarket02.webm",
      caption: "hAomarket motion 02.",
      width: 810,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/haomarket03.webm",
      caption: "hAomarket 2024 the year of the dragon window display.",
      width: 810,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/haomarket04.webm",
      caption: "hAomarket new location reveal motion poster series.",
      width: 812,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/haomarket03.webp",
      alt: "hAomarket spread 03",
      caption: "Social media campaign visuals.",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/haomarket04.webp",
      alt: "hAomarket spread 04",
      caption: "Social media campaign visuals.",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/haomarket05.webm",
      caption: "Social media campaign motion videos.",
      width: 804,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/haomarket06.webm",
      caption: "hAomarket motion 06.",
      width: 812,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/haomarket07.webm",
      caption: "hAomarket motion 07.",
      width: 830,
      height: 1080,
      galleryFit: "contain",
      colorBlock: false,
    },
    
  ],
};

/**
 * ─── 完整详情页示例：RAC ───
 * 访问 /projects/RAC 即可看到效果。
 * 复制此对象，改 slug / 文案 / 图片路径，即可做其他项目。
 */
export const mustangMachEDetail: ProjectDetail = {
  slug: "MustangMachE",
  title: "MustangMachE",
  category: "Merchandise design, Branding",
  year: "2022-2023",
  client: "Mustang Mach-E",
  location: "Shanghai, China",
  role: "Product designer",
  lede:
    "Managed campaign visuals and production assets for the Mustang Mach-E merchandise collection, directing photo/video shoots and creating designs selected for Ford’s online mall and offline event giveaways, with strong social media engagement and brand visibility.",
  pageLayout: "intro-gallery",
  // Everything before mustang06 paired two-by-two (hAomarket style); the wide
  // landscape banners (05 winter-merch, 06, 07) stay full-width singles.
  galleryRowIndices: [[0, 1], [2, 3], [4, 5], [6, 7], [8], [9], [10]],
  story: [],

  hero: {
    type: "image",
    src: "/images/projects/mustang01.jpg",
    alt: "Mustang Mach-E merchandise overview",
    caption:
      "Thermal bottles with Mach-E branding for dealership online mall.",
    width: 841,
    height: 1081,
    colorBlock: false,
    galleryFit: "contain",
  },

  blocks: [
    {
      type: "image",
      src: "/images/projects/mustang02_bottles.jpg",
      alt: "Mustang Mach-E bottle merchandise",
      caption: "Thermal bottles with Mach-E branding for dealership online mall.",
      width: 1080,
      height: 1080,
      colorBlock: false,
      galleryFit: "contain",
    },
    {
      type: "image",
      src: "/images/projects/mustang02phone.jpg",
      alt: "Mustang Mach-E bottle merchandise",
      caption: "Phone stands with Mach-E branding for dealership giveaways.",
      width: 1798,
      height: 1621,
      colorBlock: false,
      galleryFit: "contain",
    },
    {
      type: "image",
      src: "/images/projects/mustang02.jpg",
      alt: "Mustang Mach-E bottle merchandise",
      caption: "Phone stands with Mach-E branding for dealership giveaways.",
      width: 841,
      height: 1081,
      colorBlock: false,
      galleryFit: "contain",
    },
    {
      type: "image",
      src: "/images/projects/mustang03.jpg",
      alt: "Mustang Mach-E bottle merchandise",
      caption: "Car air freshener card with Mach-E branding for dealership giveaways.",
      width: 841,
      height: 1081,
      colorBlock: false,
      galleryFit: "contain",
    },
    {
      type: "image",
      src: "/images/projects/mustang03carcard.jpg",
      alt: "Mustang Mach-E bottle merchandise",
      caption: "Thermal bottles with Mach-E branding for dealership giveaways.",
      width: 1798,
      height: 1621,
      colorBlock: false,
      galleryFit: "contain",
    },
    
    {
      type: "video",
      src: "/videos/mustang03_srickers.webm",
      caption: "Stickers with Mach-E branding for dealership giveaways.",
      width: 1080,
      height: 1080,
      colorBlock: false,
      galleryFit: "contain",
    },
    {
      type: "image",
      src: "/images/projects/mustang04_stickers.jpg",
      alt: "Mustang Mach-E sticker set",
      caption: "Die-cut sticker set with Mach-E iconography and colorways.",
      width: 1728,
      height: 2304,
      colorBlock: false,
      galleryFit: "contain",
    },
    {
      type: "video",
      src: "/videos/mustang05_wintermerch.webm",
      caption: "Winter merchandise collection — scarves, mugs, and seasonal gifts.",
      width: 1920,
      height: 1080,
      pauseOnHover: true,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/mustang06_redenvlope.webp",
      alt: "Mustang Mach-E red envelope",
      caption: "Lunar New Year red envelope with Mach-E horse motif.",
      width: 1921,
      height: 1081,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/mustang07_cnygiftbox.webp",
      alt: "Mustang Mach-E CNY gift box",
      caption: "CNY gift box packaging for the China market launch.",
      width: 1921,
      height: 1081,
      colorBlock: false,
    },
  ],
};

/** 3Woods — hAomarket-style intro-gallery + horizontal scroll strip. */
export const woodsDetail: ProjectDetail = {
  slug: "3woods",
  title: "3Woods",
  category: "Visual design",
  year: "2024",
  role: "Art direction, design",
  lede:
    "A visual study from the Others collection—paired editorial heroes followed by a continuous motion-and-image strip that drifts as you scroll.",
  pageLayout: "intro-gallery",
  story: [],
  // all = [hero(0), hero02(1), hero03(2), woods001..011 (3..13)]
  galleryRowIndices: [
    [0, 1],
    [2],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  ],
  galleryRowVariant: [undefined, undefined, "scroll-strip"],

  hero: {
    type: "image",
    src: "/images/projects/3woodshero01.webp",
    alt: "3Woods hero 01",
    caption: "3Woods — hero spread, left.",
    width: 1441,
    height: 1621,
    colorBlock: false,
  },

  blocks: [
    {
      type: "image",
      src: "/images/projects/3woodshero02.webp",
      alt: "3Woods hero 02",
      caption: "3Woods — hero spread, right.",
      width: 1441,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/3woodshero03.webp",
      alt: "3Woods hero 03",
      caption: "3Woods — full spread.",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods001.webm",
      caption: "3Woods motion 01.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods002.webm",
      caption: "3Woods motion 02.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods003.webm",
      caption: "3Woods motion 03.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/3woods004.jpg",
      alt: "3Woods still 04",
      caption: "3Woods still 04.",
      width: 900,
      height: 1677,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods005.webm",
      caption: "3Woods motion 05.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/3woods006.jpg",
      alt: "3Woods still 06",
      caption: "3Woods still 06.",
      width: 900,
      height: 1196,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods007.webm",
      caption: "3Woods motion 07.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods008.webm",
      caption: "3Woods motion 08.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods009.webm",
      caption: "3Woods motion 09.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods010.webm",
      caption: "3Woods motion 10.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/3woods011.webm",
      caption: "3Woods motion 11.",
      width: 810,
      height: 1080,
      colorBlock: false,
    },
  ],
};

/** HealingTouch — hAomarket-style intro-gallery: video hero + single-row stills. */
export const healingTouchDetail: ProjectDetail = {
  slug: "HealingTouch",
  title: "HealingTouch",
  category: "Brand identity, Package design",
  year: "2024",
  role: "Art direction, design",
  location: "Shanghai, China",
  lede:
    "Healing Touch is an antioxidant wellness center under Anandi Hotel Shanghai. Contributed to its visual rebranding through VI system development, digital experience design, and branded touchpoints, supporting a scalable identity framework for future national expansion.",
  pageLayout: "intro-gallery",
  story: [],
  // all = [hero(0), jpg01..085..jpg12 (1..13), mooncake webm (14)]
  galleryRowIndices: [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12, 13], [14]],

  hero: {
    type: "video",
    src: "/videos/healingtouch01.webm",
    caption: "HealingTouch — motion intro.",
    width: 2881,
    height: 1621,
    colorBlock: false,
  },

  blocks: [
    {
      type: "image",
      src: "/images/projects/healingtouch01.jpg",
      alt: "HealingTouch 01",
      caption: "HealingTouch — LOGO design.",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch02.jpg",
      alt: "HealingTouch 02",
      caption: "VI system design.",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch03.jpg",
      alt: "HealingTouch 03",
      caption: "VI system design.",
      width: 2881,
      height: 1079,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch04.jpg",
      alt: "HealingTouch 04",
      caption: "name card design.",
      width: 2881,
      height: 1079,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch05.jpg",
      alt: "HealingTouch 05",
      caption: "Brand asset creation",
      width: 2881,
      height: 1079,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch06.jpg",
      alt: "HealingTouch 06",
      caption: "Brand asset creation.",
      width: 2881,
      height: 1079,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch07.jpg",
      alt: "HealingTouch 07",
      caption: "Brand asset creation.",
      width: 2881,
      height: 1079,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch08.jpg",
      alt: "HealingTouch 08",
      caption: "Brand asset creation.",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch085.jpg",
      alt: "HealingTouch 085",
      caption: "Product packaging design for the brand’s incense line",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch09.jpg",
      alt: "HealingTouch 09",
      caption: "Product packaging design for the brand’s incense line.",
      width: 2881,
      height: 1033,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch10.jpg",
      alt: "HealingTouch 10",
      caption: "Limited-edition Mid-Autumn Festival gift collection design.",
      width: 2881,
      height: 1033,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch11.jpg",
      alt: "HealingTouch 11",
      caption: "Limited-edition Mid-Autumn Festival gift collection design.",
      width: 1909,
      height: 1621,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/healingtouch12.jpg",
      alt: "HealingTouch 12",
      caption: "Limited-edition Mid-Autumn Festival gift collection design.",
      width: 965,
      height: 1624,
      colorBlock: false,
    },
    {
      type: "video",
      src: "/videos/healingtouchmooncake.webm",
      caption: "HealingTouch — mooncake motion.",
      width: 2881,
      height: 1621,
      colorBlock: false,
    },
  ],
};

/** slayOzen — HealingTouch-style intro-gallery: image hero + single-row stills. */
export const slayOzenDetail: ProjectDetail = {
  slug: "slayOzen",
  title: "slayOzen",
  category: "Brand identity, Product design",
  year: "2025-Current",
  role: "Art direction, design",
  location: "Montreal, Canada & Shanghai, China",
  lede:
    "Founded and independently built Slay Ozen, a streetwear brand blending dark humor, Asian cultural elements, and playful design. Led the entire creative process, from brand strategy and visual identity to product design, content creation, and marketing execution.",
  pageLayout: "intro-gallery",
  story: [],
  galleryStickyOverlay: {
    src: "/images/projects/slayozensticker.png",
    alt: "slayOzen sticker",
    width: 250,
    height: 239,
    left: 500,
    offsetFromSidebar: 350,
    referenceViewport: 1920,
    releaseLeadPx: 50,
    stopAtIndex: 4,
  },
  // all = [hero(0), img02..img18 (1..17)] — each on its own row.
  galleryRowIndices: [
    [0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16], [17],
  ],

  hero: {
    type: "image",
    src: "/images/projects/slayozen01.jpg",
    alt: "slayOzen 01",
    caption: "slayOzen — Tshirt 001",
    width: 1800,
    height: 1308,
    colorBlock: false,
  },

  blocks: [
    {
      type: "image",
      src: "/images/projects/slayozen02.jpg",
      alt: "slayOzen 02",
      caption: "slayOzen — Visual identity system",
      width: 2881,
      height: 1091,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen03.jpg",
      alt: "slayOzen 03",
      caption: "Brand assets creation",
      width: 2881,
      height: 939,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen04.png",
      alt: "slayOzen 04",
      caption: "slayOzen — visual 04.",
      width: 2881,
      height: 894,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen05.jpg",
      alt: "slayOzen 05",
      caption: "slayOzen — visual 05.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen06.jpg",
      alt: "slayOzen 06",
      caption: "slayOzen — visual 06.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen07.jpg",
      alt: "slayOzen 07",
      caption: "slayOzen — visual 07.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen08.jpg",
      alt: "slayOzen 08",
      caption: "slayOzen — visual 08.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen09.jpg",
      alt: "slayOzen 09",
      caption: "slayOzen — visual 09.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen10.jpg",
      alt: "slayOzen 10",
      caption: "slayOzen — visual 10.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen11.jpg",
      alt: "slayOzen 11",
      caption: "slayOzen — visual 11.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen12.jpg",
      alt: "slayOzen 12",
      caption: "slayOzen — visual 12.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen13.jpg",
      alt: "slayOzen 13",
      caption: "slayOzen — visual 13.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen14.jpg",
      alt: "slayOzen 14",
      caption: "slayOzen — visual 14.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen15.jpg",
      alt: "slayOzen 15",
      caption: "slayOzen — visual 15.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen16.jpg",
      alt: "slayOzen 16",
      caption: "slayOzen — visual 16.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen17.jpg",
      alt: "slayOzen 17",
      caption: "slayOzen — visual 17.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
    {
      type: "image",
      src: "/images/projects/slayozen18.jpg",
      alt: "slayOzen 18",
      caption: "slayOzen — visual 18.",
      width: 2880,
      height: 1620,
      colorBlock: false,
    },
  ],
};

/** 其他项目仍用占位；有自定义详情时优先用自定义。 */
const customDetails: Record<string, ProjectDetail> = {
  RAC: racDetail,
  MustangMachE: mustangMachEDetail,
  HealingTouch: healingTouchDetail,
  slayOzen: slayOzenDetail,
  "others-01": others01Detail,
  "3woods": woodsDetail,
};

function placeholderDetail(
  slug: string,
  title: string,
  seed: string,
): ProjectDetail {
  return {
    slug,
    title,
    category: "Brand / digital",
    year: "2024",
    role: "Art direction, design",
    lede: `Placeholder case study for ${title}. Replace with a full object like racDetail.`,
    hero: {
      type: "image",
      src: `https://picsum.photos/seed/${seed}-hero/1600/1000`,
      alt: `${title} hero`,
      layout: "full",
    },
    story: [
      "Copy this structure from racDetail in data/projects.ts.",
      "Put image files under public/images/projects/.",
    ],
    blocks: [
      {
        type: "image",
        src: `https://picsum.photos/seed/${seed}-b1/1400/900`,
        alt: `${title} spread`,
        layout: "stagger-left",
      },
    ],
  };
}

function resolveProject(entry: SelectedWorkEntry): ProjectDetail {
  return (
    customDetails[entry.slug] ??
    placeholderDetail(entry.slug, entry.title, entry.slug.replace(/-/g, ""))
  );
}

function resolveOthersTile(tile: MosaicTile): ProjectDetail {
  return (
    customDetails[tile.slug] ??
    placeholderDetail(tile.slug, site.workshop.title, tile.slug)
  );
}

const projects: ProjectDetail[] = [
  ...selectedWork.map(resolveProject),
  ...othersMosaic.map(resolveOthersTile),
];

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<
  string,
  ProjectDetail
>;

// Ensure every custom detail page is routable even without a tile/selected entry.
for (const [slug, detail] of Object.entries(customDetails)) {
  bySlug[slug] ??= detail;
}

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return bySlug[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(bySlug);
}
