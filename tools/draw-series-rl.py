"""Generate the series RL schematic used by the first dynamics chapter."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

import matplotlib
matplotlib.use('Agg')
matplotlib.rcParams.update({'mathtext.fontset': 'cm', 'svg.fonttype': 'path'})

import schemdraw
import schemdraw.elements as elm

from schematic_style import ACCENT, INK, LINE_WIDTH, configure


OUTPUT = ROOT / "public" / "images" / "foundations" / "series-rl-circuit.svg"

drawing = schemdraw.Drawing(show=False, backend="matplotlib")
configure(drawing)
drawing.config(fontsize=12)

source = drawing.add(elm.SourceSin().up().length(2.0).label(r"$v(t)$", loc="left", ofst=0.18))
drawing.add(elm.Line().right().length(1.0))
drawing.add(elm.ResistorIEC().right().label(r"$R$", loc="bottom", ofst=0.2))
drawing.add(elm.Line().right().length(0.65))
drawing.add(elm.Inductor2(loops=4).right().label(r"$L$", loc="bottom", ofst=0.2))
drawing.add(elm.Line().right().length(1.0))
drawing.add(elm.Line().down().toy(source.start))
drawing.add(elm.Line().left().tox(source.start))
drawing.add(elm.Dot().at(source.start))
drawing.add(elm.Dot().at(source.end))

drawing.add(
    elm.Arrow()
    .at((1.25, 2.5))
    .right()
    .length(2.15)
    .color(ACCENT)
    .linewidth(LINE_WIDTH)
    .label(r"$i(t)$", loc="top", ofst=0.08, color=ACCENT)
)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
drawing.save(str(OUTPUT), transparent=True)
print(OUTPUT)
