import React, {useState} from "react";
import {Work} from "../../models/Work.model";
import {useTranslation} from 'react-i18next';
import styles from "./index.module.css";
import {Link} from "react-router-dom";
import {LinkOutlined} from "@ant-design/icons";
import { Card } from "antd";


/**
 * 文献详细信息
 * @param props.work 文献信息模型
 * @constructor Graig
 */
export function WorkDetail(props: {
    work?: Work
}) {
    const {t} = useTranslation();
    const {work} = props;
    if (!work) return null;
    return <div className={styles.container}>
        {
            work.title.map((title: string) => <p className={styles.title} key={title}><b>{title}</b></p>)
        }
        <div className={styles.containerDetail}>
            <div className={styles.detailLeft}>
                {
                    work.author && <div>
                        {
                            work.author.map((author: any) => <div className={styles.detailAuthor}>
                                <span><b>{author.given || ''} {author.family || ''}</b><br/></span>
                                {
                                    author.affiliation && <span className={styles.detailAffiliation}>
                                        {author.affiliation.map((affiliation: any) => affiliation.name).join(" | ")}
                                        <br/>
                                    </span>
                                }
                                {
                                    author.ORCID && <span>
                                        <Link to={author.ORCID} target="_blank" className={styles.detailLink}>
                                            <LinkOutlined />
                                            &nbsp;{author.ORCID}
                                        </Link>
                                    </span>
                                }
                            </div>)
                        }
                    </div>
                }
                <div className={styles.detailDOI}>
                    DOI:&nbsp;
                    <Link to={work.url} target="_blank" className={styles.detailLink}>
                        {work.url}
                    </Link>
                </div>
                <div className={styles.detailItemTitle}>
                    <b>{t("ABSTRACT")}</b>
                </div>
                <div className={styles.detailItemContent}>
                    {work.abstract}
                </div>
            </div>
            <div className={styles.detailRight}>
                <Card type="inner" title={t("PUBLISHED")} size="small" style={{ width: 200 }}>
                    <p>{work.publishedDate}</p>
                </Card>
                <Card type="inner" title={t("ISSUE")} size="small" style={{ width: 200, marginTop: 30 }}>
                    <p>
                        <span><b>{work.shortContainerTitle}</b></span>
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
                </Card>
            </div>
        </div>
    </div>
}
