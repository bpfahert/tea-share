import { PropTeaType} from '../ts/interfaces';
import { Buffer } from 'buffer';

export default function TeaCard(props: PropTeaType) {

    return (
        <div className="card mr-2 border border-dark rounded" style={{backgroundColor: "peachpuff", width: "18rem"}}>
            {props.tea?.img ? <img className="card-img-top" src={`data:image/${props.tea.img.contentType};base64, ${Buffer.from(props.tea.img.data).toString('base64')}`} alt="tea-image" /> : <p>There is no image for this tea.</p>}
            <div className="card-body">
                <li><h5><a style={{textDecoration: "none", color: "black"}}  data-testid="teacardtest" href={`/teas/${props.tea._id}`}> {props.tea.tea_name}</a></h5></li> 
                <li>Type: {props.tea.type} </li> 
                <li>Brand: {props.tea.brand} </li> 
                <li>Rating(out of 10): {props.tea.rating} </li> 
                <li>Notes: {props.tea.notes} </li>
            </div>
        </div>
    )
}