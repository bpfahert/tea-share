import { PropTeaType} from '../ts/interfaces';

export default function TeaCard(props: PropTeaType) {

    return (
        <div className="card mr-2 border border-dark rounded" style={{backgroundColor: "peachpuff", width: "18rem"}}>
            <img className="card-img-top" src="" alt="tea-image" />
            <div className="card-body">
                <li><h5><a style={{textDecoration: "none", color: "black"}}  data-testid="teacardtest"> {props.tea.tea_name}</a></h5></li> 
                <li>Type: {props.tea.type} </li> 
                <li>Brand: {props.tea.brand} </li> 
                <li>Rating(out of 10): {props.tea.rating} </li> 
                <li>Notes: {props.tea.notes} </li>
            </div>
        </div>
    )
}