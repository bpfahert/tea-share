import TeaCard from "./TeaCard";
import { PropTeaList } from "../ts/interfaces";

export default function TeaList({ tealist, listname, currentuser, listtype } : PropTeaList) {

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

    return (
        <div className="container">
            <h2 className="text-center mb-3">{listname}</h2>
            <ul className="list-group list-group-horizontal-xl" style={{display: "flex", justifyContent: "center", alignItems: "center", listStyle: "none", gap: "5px"}}>
                {firstFiveElements}
            </ul>
            {moreTeaElements.length !== 0 ? 
            <div>
                <div className="container text-center">
                    <button className='btn btn-info btn-lg mb-3' type='button'  data-bs-toggle="collapse"  data-bs-target={`#expanded${listtype}tealist`}>Show more</button>
                </div>
                <div className="collapse" id={`expanded${listtype}tealist`}>
                    <ul className="list-group list-group-horizontal-xl" style={{display: "flex", justifyContent: "center", alignItems: "center",  listStyle: "none", gap: "5px"}}>
                        {moreTeaElements}
                    </ul>
                </div>
            </div> 
            : ""}
        </div>
    )
}