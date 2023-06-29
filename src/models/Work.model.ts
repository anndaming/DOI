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
    abstract: string = "";

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
            this.abstract = serverData.abstract.replace(/<\/?jats:p>/g, '');
        }
    }

    // 输出文献的发布日期字符串
    get publishedDate(): string {
        const dateParts: number[] = this.publishedPrint.dateParts[0];
        // TODO: 这里可以引入日期格式化工具生成本地化的日期格式
        return `${dateParts[0]}-${dateParts[1] || "1"}-${dateParts[2] || "1"}`;
    }

    // 输出文献的作者，有多个作者时，以字符'|'作为分隔
    get authorsString(): string {
        return this.author ? this.author.map((item: any) => `${item.given} ${item.family}`).join(" | ") : "";
    }

    // 输出文献的主导人，有多个主导人时，以字符'|'作为分隔
    get chairsString(): string {
        return this.chair ? this.chair.map((item: any) => item.name).join(" | ") : "";
    }

    // 输出文献的赞助者及其赞助的金额，有多个赞助者时，以字符'|'作为分隔
    get fundersString(): string {
        return  this.funder ? this.funder.map((item: any) => {
            return `${item.name} (${eval(item.award.join("+"))})`;
        }).join(" | ") : "";
    }
}
