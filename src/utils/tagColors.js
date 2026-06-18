const PALETTES = [
  { bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC" },
  { bg: "#E1F5EE", text: "#085041", border: "#5DCAA5" },
  { bg: "#FAECE7", text: "#712B13", border: "#F0997B" },
  { bg: "#FBEAF0", text: "#72243E", border: "#ED93B1" },
  { bg: "#EAF3DE", text: "#27500A", border: "#97C459" },
  { bg: "#FAEEDA", text: "#633806", border: "#EF9F27" },
];

export function getTagColor(tag) {
  let h = 0;
  for (const c of tag) h = (h * 31 + c.charCodeAt(0)) % PALETTES.length;
  return PALETTES[h];
}