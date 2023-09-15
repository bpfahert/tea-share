import TeaCard from "./TeaCard";
import { PropTeaList } from "../ts/interfaces";
import { useState } from "react";

export default function TeaList({ tealist, listname, currentuser, listtype } : PropTeaList) {
    const [displayed, setDisplayed] = useState(false);
    const [expandedDisplayed, setExpandedDisplayed] = useState(false);

    const firstFiveTeas = tealist.slice(0, 5);
    const moreTeas = tealist.slice(5);


    const firstFiveElements = firstFiveTeas.map((tea) => {
        return (
            <TeaCard tea={tea} currentuser={currentuser} key={tea._id} />
        )
    })

    const moreTeaElements = moreTeas.map((tea) => {
        return (
            <TeaCard tea={tea} currentuser={currentuser} key={tea._id}/>
        )
    })

    const handleDisplayClick = () => {
        setDisplayed((displayed) => !displayed)
    }

    const handleExpandedDisplayClick = () => {
        setExpandedDisplayed((expandedDisplayed) => !expandedDisplayed)
    }

    return (
        <div className="container">
            <h2 className="text-center mb-3">{listname}</h2>
            {tealist.length > 0 ? 
            <div>
                <div className="container text-center">
                    <button className='btn btn-info btn-lg mb-3' type='button' aria-expanded="false" data-bs-toggle="collapse" onClick={handleDisplayClick}  data-bs-target={`#${listtype}tealist`}>{displayed ? "Hide Teas" : "Show Teas"}</button>
                </div>
                <div className="collapse" id={`${listtype}tealist`}>
                    <ul className="list-group list-group-horizontal-xl d-flex justify-content-center align-items-center" style={{listStyle: "none", gap: "5px"}}>
                        {firstFiveElements}
                    </ul>
                    {moreTeaElements.length > 0 && 
                    <div>
                        <div className="container text-center">
                            <button className='btn btn-info btn-lg mb-3' type='button' aria-expanded="false" data-bs-toggle="collapse" onClick={handleExpandedDisplayClick}  data-bs-target={`#expanded${listtype}tealist`}>{expandedDisplayed ? "Hide Teas" : "Show more"}</button>
                        </div>
                        <div className="collapse" id={`expanded${listtype}tealist`}>
                            <ul className="list-group list-group-horizontal-xl d-flex justify-content-center align-items-center flex-wrap" style={{listStyle: "none", gap: "5px"}}>
                                {moreTeaElements}
                            </ul>
                        </div>
                    </div> 
                    }
                </div>
            </div>
            :
            <p>There are no {listtype} teas at the moment.</p>}
        </div>
    )
}