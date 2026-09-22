"""Shared visual specification for circuit schematics used by the website."""

INK = "#354037"
ACCENT = "#587078"
FONT = "Times New Roman"
FONT_SIZE = 14
LINE_WIDTH = 1.35


def configure(drawing) -> None:
    """Apply the website's standard schematic geometry and typography."""
    drawing.config(
        unit=2.6,
        inches_per_unit=0.55,
        fontsize=FONT_SIZE,
        font=FONT,
        color=INK,
        lw=LINE_WIDTH,
        margin=0.08,
    )
