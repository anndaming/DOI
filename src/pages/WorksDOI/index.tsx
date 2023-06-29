import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Input, notification} from 'antd';
import {CrossrefClient} from "@jamesgopsill/crossref-client"
import {Work} from "../../models/Work.model";
import {WorkCard} from "../../components/WorkCard";
import qs from "querystring";
import {useTranslation} from 'react-i18next';
import styles from "./index.module.css";
import {MainMenu} from "../../components/MainMenu";

const Search = Input.Search;
const wurl = require("wurl");


const WorksDOI = observer(function () {
    const [doi, setDoi] = useState('');
    const [loading, setLoading] = useState(false);
    const [work, setWork] = useState((): Work | undefined => undefined);
    const client = new CrossrefClient();
    const {t} = useTranslation();

    useEffect(() => {
        // 通过url传递的参数直接查询
        const params = wurl('?', window.location.href);
        if(params && params.q) {
            setDoi(params.q);
            handleSearch(params.q);
        }
    }, []);

    async function handleSearch(value?: string) {
        if (!value) {
            value = doi;
        }
        if (!value) {
            notification.warning({message: t("warningEnterDOIEmpty"), duration: 3})
            return;
        }
        // 替换浏览器上的地址而不刷新页面
        window.history.pushState({}, "", `${window.location.pathname}?${qs.stringify({q:value})}`);
        setLoading(true);
        // 根据用户输入的DOI去查询文献
        const r = await client.work(value);
        if (r.ok && r.status === 200) {
            // 将文献数据实例化
            setWork(new Work(r.content.message));
        }
        setLoading(false);
    }

    return <div className={styles.container}>
        <MainMenu activeKey="WorksDOI"/>
        <div className={styles.containerRight}>
            <div className={styles.containerSearch}>
                <Search
                    placeholder={t("enterDOI")}
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                    onSearch={handleSearch}
                    enterButton
                    allowClear
                    loading={loading}
                    size="large"
                />
            </div>
            <WorkCard work={work}/>
        </div>
    </div>
})

export default WorksDOI;
