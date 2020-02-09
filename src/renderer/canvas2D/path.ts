export class StyledPath {
    constructor(
        public path: Path2D,
        public style: string
    ) {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.style
        ctx.fill(this.path)
    }
}

export class StyledPathGroup {
    public items: (StyledPath | StyledPathGroup)[] = []

    addPath(...paths: (StyledPath | StyledPathGroup)[]) {
        this.items.push(...paths)
    }

    render(ctx: CanvasRenderingContext2D) {
        this.items.forEach(p => p.render(ctx))
    }
}