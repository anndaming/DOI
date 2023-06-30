import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Button, Input, notification} from 'antd';
import {CrossrefClient} from "@jamesgopsill/crossref-client"
import {Work} from "../../models/Work.model";
import {WorkCard} from "../../components/WorkCard";
import qs from "querystring";
import {useTranslation} from 'react-i18next';
import styles from "./index.module.css";
import {MainMenu} from "../../components/MainMenu";
import {SearchOutlined} from "@ant-design/icons";

const Search = Input.Search;
const wurl = require("wurl");
const sprintf = require("sprintf");

const WorksDOI = observer(function () {
    const [doi, setDoi] = useState('');
    const [loading, setLoading] = useState(false);
    const [works, setWorks] = useState((): Work[] => []);
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
        window.history.pushState({}, "", `${window.location.pathname}?${qs.stringify({q: value})}`);
        setWorks([]);
        setLoading(true);
        // 根据用户输入的DOI去查询文献
        const r = await client.work(value);
        if (r.ok && r.status === 200) {
            // 将文献数据实例化
            setWorks([new Work(r.content.message)]);
        } else {
            notification.error({message: sprintf(t("errorDOINotFound"), value), duration: 10})
        }
        setLoading(false);
    }

    return <div className={styles.container}>
        <MainMenu activeKey="WorksDOI"/>
        <div className={styles.containerRight}>
            <div className={styles.containerSearch}>
                <Search
                    data-testid="doiInput"
                    placeholder={t("enterDOI")}
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                    onSearch={handleSearch}
                    enterButton={<Button data-testid="doiInputEnter" type="primary"><SearchOutlined/></Button>}
                    allowClear
                    loading={loading}
                    size="large"
                />
            </div>
            {
                works.map((work: Work) => <WorkCard key={work.doi} work={work} /> )
            }
        </div>
    </div>
})

export default WorksDOI;
