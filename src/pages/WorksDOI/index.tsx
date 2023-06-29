import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Input, notification} from 'antd';
import {CrossrefClient} from "@jamesgopsill/crossref-client"
import {Work} from "../../models/Work.model";
import {WorkCard} from "../../components/WorkCard";
import qs from "querystring";

const Search = Input.Search;
const wurl = require("wurl");


const WorksDOI = observer(function () {
    const [doi, setDoi] = useState('');
    const [loading, setLoading] = useState(false);
    const [work, setWork] = useState((): Work | undefined => undefined);
    const client = new CrossrefClient();

    useEffect(() => {
        // 通过url传递的参数直接查询
        const params = wurl('?', window.location.href);
        if(!!params.q) {
            setDoi(params.q);
            handleSearch(params.q);
        }
    }, []);

    async function handleSearch(value?: string) {
        if (!value) {
            value = doi;
        }
        if (!value) {
            notification.warning({message: "DOI should not be empty!", duration: 3})
            return;
        }
        // 替换浏览器上的地址而不刷新页面
        window.history.pushState({}, "", `${window.location.pathname}?${qs.stringify({q:value})}`);
        setLoading(true);
        const r = await client.work(value);
        if (r.ok && r.status === 200) {
            setWork(new Work(r.content.message));
        }
        setLoading(false);
    }

    return <div>
        <Search
            placeholder="Enter DOI"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            onSearch={handleSearch}
            enterButton
            allowClear
            loading={loading}
        />
        <WorkCard work={work}/>
    </div>
})

export default WorksDOI;
