export class MenuItem {
    display: string;
    href: string;
    tooltip: string;

    constructor(dis: string, hr: string, tt: string) {
        this.display = dis;
        this.href = hr;
        this.tooltip = tt;
    }
}