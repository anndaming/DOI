import React from 'react';
import {Work} from "../../models/Work.model";
import {Link} from "react-router-dom";
import {LinkOutlined} from "@ant-design/icons";
import "./WorkCard.css";

export function WorkCard(props: {
    work?: Work
}) {
    const {work} = props;
    if (!work) return null;
    return <div className="container">
        {
            work.title.map((title: string) => <p className="title" key={title}>{title}</p>)
        }
        <p className="extra">
            <span>published <b>{work.publishedDate}</b></span>
            <span>in <b>{work.shortContainerTitle}</b></span>
            {
                work.volume !== undefined && <span>volume <b>{work.volume}</b></span>
            }
            {
                work.issue !== undefined && <span>issue <b>{work.issue}</b></span>
            }
            {
                work.page !== undefined && <span>on pages <b>{work.page}</b></span>
            }
        </p>
        {
            work.funder && work.funder.length > 0 && <p className="extra">
                Research funded by {work.fundersString}
            </p>
        }
        {
            work.author && <p>Authors: {work.authorsString}</p>
        }
        {
            work.chair && <p>Chairs: {work.chairsString}</p>
        }
        <Link to={work.url} target="_blank" className="link-outer">
            <LinkOutlined />
            &nbsp;{work.url}
        </Link>
    </div>
}
