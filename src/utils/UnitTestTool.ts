import {CrossrefClient} from "@jamesgopsill/crossref-client"
import {Work} from "../models/Work.model";

const client = new CrossrefClient();
const cacheMap: any = {};

export async function requestWorkDOI(doi: string) {
    if (!cacheMap["requestWorkDOI"]) {
        cacheMap["requestWorkDOI"] = {}
    }
    if (cacheMap["requestWorkDOI"][doi]) {
        return cacheMap["requestWorkDOI"][doi];
    }
    const r = await client.work(doi);
    if (r.ok && r.status === 200) {
        cacheMap["requestWorkDOI"][doi] = new Work(r.content.message);
    }
    return cacheMap["requestWorkDOI"][doi];
}
