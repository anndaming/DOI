export class Work{
    doi: string = "";
    title: string[] = [];
    publisher: string = "";
    publishedPrint: any;
    shortContainerTitle: string[] = [];
    volume: string = "";
    page: string = "";
    issue: string = "";
    author: any[] = [];
    chair: any[] = [];
    url: string = "";
    funder: any[] = [];

    constructor(serverData?: any) {
        if (!!serverData) {
            this.doi = serverData.DOI;
            this.title = serverData.title;
            this.publisher = serverData.publisher;
            this.publishedPrint = serverData.publishedPrint;
            this.shortContainerTitle = serverData.shortContainerTitle;
            this.volume = serverData.volume;
            this.page = serverData.page;
            this.issue = serverData.issue;
            this.author = serverData.author;
            this.chair = serverData.chair;
            this.url = serverData.URL;
            this.funder = serverData.funder;
        }
    }

    get publishedDate(): string {
        const dateParts: number[] = this.publishedPrint.dateParts[0];
        // TODO: 这里可以引入日期格式化工具生成本地化的日期格式
        return `${dateParts[0]}-${dateParts[1] || "1"}-${dateParts[2] || "1"}`;
    }

    get authorsString(): string {
        return this.author ? this.author.map((item: any) => `${item.given} ${item.family}`).join(" | ") : "";
    }

    get chairsString(): string {
        return this.chair ? this.chair.map((item: any) => item.name).join(" | ") : "";
    }

    get fundersString(): string {
        return  this.funder ? this.funder.map((item: any) => {
            return `${item.name} (${eval(item.award.join("+"))})`;
        }).join(" | ") : "";
    }
}
