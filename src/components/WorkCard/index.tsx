import React, {useState} from 'react';
import {Work} from "../../models/Work.model";
import {Link} from "react-router-dom";
import {LinkOutlined, PaperClipOutlined} from "@ant-design/icons";
import styles from "./index.module.css";
import {useTranslation} from 'react-i18next';
import {Modal} from "antd";
import {WorkDetail} from "../WorkDetail";

/**
 * 文献信息卡片
 * @param props.work 文献信息模型
 * @constructor Graig
 */
export function WorkCard(props: {
    work?: Work
}) {
    const [detailVisible, setDetailVisible] = useState(false);
    const {t} = useTranslation();
    const {work} = props;
    if (!work) return null;

    return <div className={styles.container}>
        {
            work.title.map((title: string) => <p className={styles.title} key={title}>{title}</p>)
        }
        <p className={styles.extra}>
            <span>published <b>{work.publishedDate}</b></span>
            <span> in <b>{work.shortContainerTitle}</b></span>
            {
                work.volume !== undefined && <span> volume <b>{work.volume}</b></span>
            }
            {
                work.issue !== undefined && <span> issue <b>{work.issue}</b></span>
            }
            {
                work.page !== undefined && <span> on pages <b>{work.page}</b></span>
            }
        </p>
        {
            work.funder && work.funder.length > 0 && <p className={styles.extra}>
                Research funded by {work.fundersString}
            </p>
        }
        {
            work.author && <p>{t("Authors")}: {work.authorsString}</p>
        }
        {
            work.chair && <p>{t("Chairs")}: {work.chairsString}</p>
        }
        <div className={styles.actionDetail} onClick={() => setDetailVisible(true)}>
            <PaperClipOutlined />
            &nbsp;{t("Detail")}
        </div>
        <div className={styles.linkOuter}>
            <Link to={work.url} target="_blank">
                <LinkOutlined />
                &nbsp;{work.url}
            </Link>
        </div>
        <Modal
            className={styles.actionModal}
            visible={detailVisible}
            onCancel={() => setDetailVisible(false)}
            maskClosable={false}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <WorkDetail work={work} />
        </Modal>
    </div>
}
