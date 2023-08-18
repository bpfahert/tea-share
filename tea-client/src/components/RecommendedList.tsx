import TeaCard from './TeaCard';
import { PropTeaRecList } from '../ts/interfaces';

export default function RecommendedTeaList({ tealist, listname, currentuser, listtype } : PropTeaRecList) {

    const firstFiveTeas = tealist.slice(0, 5);
    const moreTeas = tealist.slice(5);

    const firstFiveElements = firstFiveTeas.map((tea) => {
        return (
            <TeaCard tea={tea.tea_rec} currentuser={currentuser} key={tea.tea_rec._id} rec_user={tea.recommended_by.username} rec_id={tea.recommended_by._id} />
        )
    })

    const moreTeaElements = moreTeas.map((tea) => {
        return (
            <TeaCard tea={tea.tea_rec} currentuser={currentuser} key={tea.tea_rec._id} rec_user={tea.recommended_by.username} rec_id={tea.recommended_by._id}/>
        )
    })

    return (
        <div className="container-fluid">
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