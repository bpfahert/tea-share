import TeaCard from './TeaCard';
import { PropTeaRecList } from '../ts/interfaces';

export default function RecommendedTeaList({ tealist, listname, currentuser } : PropTeaRecList) {

    const teaElements = tealist.map((tea) => {
        return (
            <TeaCard tea={tea.tea_rec} currentuser={currentuser} rec_message={tea.message} rec_user={tea.recommended_by.username} key={tea.tea_rec._id}/>
        )
    })

    return (
        <div className="container-fluid">
            <h2 className="text-center mb-3">{listname}</h2>
            <ul style={{display: "flex", justifyContent: "center", listStyle: "none", gap: "5px"}}>
                {teaElements}
            </ul>
        </div>
    )
}