import React, {useState} from "react";
import {observer} from "mobx-react";
import {Input, notification} from 'antd';
import qs from "querystring";
import styles from './index.module.css'

const Search = Input.Search;

const Home = observer(function () {
    const [doi, setDoi] = useState('');

    async function handleSearch(value?: string) {
        if (!value) {
            value = doi;
        }
        if (!value) {
            notification.warning({message: "DOI should not be empty!", duration: 3})
            return;
        }
        window.location.href = `/WorksDOI?${qs.stringify({q: value})}`
    }

    return <div className={styles.container}>
        <div className={styles.inner}>
            <p className={styles.searchDescription}>Search the metadata of journal articles, books, standards, datasets & more</p>
            <Search
                placeholder="Enter DOI"
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
