import React, {useState} from "react";
import {observer} from "mobx-react";
import {Input, notification} from 'antd';
import qs from "querystring";
import styles from './index.module.css'
import {useTranslation} from 'react-i18next';
import {homeBackgroundImage} from "../resource/resources";

const Search = Input.Search;

const Home = observer(function () {
    const [doi, setDoi] = useState('');
    const {t} = useTranslation();

    async function handleSearch(value?: string) {
        if (!value) {
            value = doi;
        }
        if (!value) {
            notification.warning({message: t("warningEnterDOIEmpty"), duration: 3})
            return;
        }
        window.location.href = `/WorksDOI?${qs.stringify({q: value})}`
    }

    return <div className={styles.container} style={{backgroundImage: `url(${homeBackgroundImage})`}}>
        <div className={styles.inner}>
            <p className={styles.searchDescription}>Search the metadata of journal articles, books, standards, datasets & more</p>
            <Search
                placeholder={t("enterDOI")}
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
                onSearch={handleSearch}
                enterButton
                allowClear
                size="large"
            />
        </div>
    </div>
});

export default Home;
