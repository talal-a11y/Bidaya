// The colours of the seven "We focus on" squares, in the founder's order (2026-09-23):
// "light aqua dark aqua dark purple light purple dark purple dark aqua light aqua" — a mirror
// around the fourth. Read: light aqua = the token teal, dark aqua = the deep aqua of Ops,
// dark purple = plum, light purple = the lighter plum. Everywhere the seven appear, by index.
export const focusColors = ["#2A8F99", "#0A5C66", "#5A47A3", "#7462B8", "#5A47A3", "#0A5C66", "#2A8F99"];
export const focusColor = (i: number) => focusColors[i % focusColors.length];
