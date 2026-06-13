export interface Creator {
  slug: string;
  name: string;
  src: string;
  role: string;
  intro: string;
  bio: string[];
  services: string[];
  clients: string[];
  social: string[];
}

// Eine Standard-Vorlage für die Texte, damit wir nicht alles 12 mal schreiben müssen
const dummyDetails = {
  role: "Creative",
  intro: "A visionary specializing in digital experiences.",
  bio: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],
  services: ["Art Direction", "3D Design"],
  clients: ["Brand X", "Brand Y"],
  social: ["FWA"]
};

export const creatorsData: Creator[] = [
  {
    slug: "dollareuroyen",
    name: "Dollareuroyen",
    src: "/images/652770040_18398061811199312_4635558372509135957_n.jpg",
    role: "Creative Director",
    intro: "Devin is a creative visionary specializing in digital experiences and brand identity.",
    bio: [
      "ELENA IS A PARIS-BASED STYLIST, CREATIVE CONSULTANT AND FASHION FIGURE WITH AN ITALIAN HERITAGE. SHE FIRST MADE WAVES AS CO-FOUNDER AND STYLIST OF AFTERHOMEWORK, A BRAND SHE LAUNCHED STRAIGHT OUT OF HIGH SCHOOL, MAKING HER AND HER PARTNER THE YOUNGEST DESIGNERS EVER TO JOIN THE PARIS FASHION CALENDAR. SINCE THEN, ELENA HAS STYLED ICONIC PROJECTS AND COVERS FOR VOGUE ITALIA, WONDERLAND WITH LILY ROSE DEPP, CR FASHION BOOK, AND DAZED, AND HAS COLLABORATED WITH BRANDS LIKE NIKE AND BULGARI. HER WORK WITH LOUS AND THE YAKUZA HAS CREATED VIRAL FASHION MOMENTS AND ESTABLISHED HER AS A DISRUPTOR OF CELEBRITY STYLING. HER WORK COULD BE DEFINED AS SEXYFORWARD AND IN 2024, SHE EXPENDED HER VISION BY REVEALING A SERIE OF AUTODIDACT PROJECTS NAMED mottola01, mottola02… WHERE SHE PUSHED THE BOUNDARIES OF HER CRAFT BY SELF INTERPRETING HER VISION THROUGH STYLING, MODELING, ART DIRECTING AND SOMETIMES PHOTOGRAPHING. SHE IS REDEFINING WHAT IT MEANS TO BE A CREATIVE FORCE IN TODAY'S WORLD.",
      
    ],
    services: ["Creative Direction", "Art Direction", "Strategy", "3D Design"],
    clients: ["Estée Lauder", "Chanel", "Dom Perignon"],
    social: ["Instagram"]
  },
  {
    slug: "elias-don",
    name: "Elias Don",
    src: "/images/657168499_18341097094246402_3273964248574590946_n.jpg",
    role: "Art Director",
    intro: "Elias focuses on striking visual narratives, blending motion design with high-end typography.",
    bio: [
      "After studying fine arts, Elias trained in post-production and motion design as a freelancer.",
      "He specializes in luxury brands, ensuring every pixel conveys emotion and prestige."
    ],
    services: ["Graphic Design", "Motion Design", "Storyboarding"],
    clients: ["L’Oréal Paris", "Devialet", "Ruinart"],
    social: ["FWA of the Day"]
  },
  // Die restlichen 10 aus deinem alten Array
  { slug: "max-mustermann", name: "Max Mustermann", src: "/images/universe/491451305_18492991288041551_6902911927720311447_n.jpg", ...dummyDetails },
  { slug: "anna-schmidt", name: "Anna Schmidt", src: "/images/universe/508707284_18361762234144106_5988798950698380931_n.jpg", ...dummyDetails },
  { slug: "john-doe", name: "John Doe", src: "/images/universe/522865973_18511742740041551_4183107987768122259_n.jpg", ...dummyDetails },
  { slug: "jane-doe", name: "Jane Doe", src: "/images/universe/631949054_18513447736077622_491450810801928550_n.jpg", ...dummyDetails },
  { slug: "creator-seven", name: "Creator Seven", src: "/images/universe/652764890_18398061847199312_2635696673912322817_n.jpg", ...dummyDetails },
  { slug: "creator-eight", name: "Creator Eight", src: "/images/652770040_18398061811199312_4635558372509135957_n.jpg", ...dummyDetails },
  { slug: "creator-nine", name: "Creator Nine", src: "/images/657168499_18341097094246402_3273964248574590946_n.jpg", ...dummyDetails },
  { slug: "creator-ten", name: "Creator Ten", src: "/images/universe/491451305_18492991288041551_6902911927720311447_n.jpg", ...dummyDetails },
  { slug: "creator-eleven", name: "Creator Eleven", src: "/images/universe/508707284_18361762234144106_5988798950698380931_n.jpg", ...dummyDetails },
  { slug: "creator-twelve", name: "Creator Twelve", src: "/images/universe/522865973_18511742740041551_4183107987768122259_n.jpg", ...dummyDetails },
];