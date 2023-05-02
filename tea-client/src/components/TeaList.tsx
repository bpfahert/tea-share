import TeaCard from './TeaCard';
import { PropTeaList } from '../ts/interfaces';

export default function TeaList({ tealist, listname } : PropTeaList) {

    const teaElements = tealist.map((tea) => {
        return (
            <TeaCard tea={tea} />
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